"use client";

import AiApis from "../utils/apis";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Check, Copy, PaperPlaneTilt, Robot } from "@phosphor-icons/react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const Loader = () => {
  return (
    <div className="flex space-x-1">
      <div className="dot bg-gray-500 w-2 h-2 rounded-full animate-bounce"></div>
      <div className="dot bg-gray-500 w-2 h-2 rounded-full animate-bounce delay-200"></div>
      <div className="dot bg-gray-500 w-2 h-2 rounded-full animate-bounce delay-400"></div>
    </div>
  );
};

const Chat = () => {
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const welcomeMessage = {
      from: "bot",
      content: "Hello! I'm a chatbot. How can I help you today?",
    };
    setChatMessages([welcomeMessage]);
  }, []);

  const handleChatMessageChange = (e) => {
    setChatMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (chatMessage.trim() === "") return;

    const userMessage = { from: "user", content: chatMessage };
    setChatMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await AiApis.chatStream(chatMessage);
      const botMessage = { from: "bot", content: response };
      setChatMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setChatMessage("");
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && chatMessage.trim() !== "") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isLoading]);

  const components = {
    code({ node, inline, className, children, ...props }) {
      const [copied, setCopied] = useState(false);
      const match = /language-(\w+)/.exec(className || "");

      const handleCopy = () => {
        navigator.clipboard.writeText(String(children).replace(/\n$/, ""));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      };

      return !inline && match ? (
        <div className="relative">
          <motion.button
            onClick={handleCopy}
            initial={{ scale: 1 }}
            animate={{ scale: copied ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 rounded"
          >
            <Copy size={16} />
          </motion.button>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: copied ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 rounded"
          >
            <Check size={16} />
          </motion.div>
          <SyntaxHighlighter
            style={dracula}
            language={match[1]}
            PreTag="div"
            {...props}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className="max-w-[900px] mx-auto h-screen p-5 flex flex-col pt-[96px]">
      <div className="flex flex-col gap-5 flex-grow overflow-hidden px-2">
        <div className="flex flex-col gap-4 flex-grow overflow-y-auto pl-14 pr-4">
          {chatMessages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.from === "user" && (
                <div className="bg-[#1E1E1E] px-5 py-2 rounded-xl">
                  <p>{msg.content}</p>
                </div>
              )}
              {msg.from === "bot" && (
                <div className="relative">
                  <Robot
                    size={35}
                    className="text-white absolute -left-12 p-2 rounded-full bg-[#1E1E1E]"
                  />
                  <div className="bg-[#1E1E1E] px-5 py-2 rounded-xl">
                    <ReactMarkdown components={components}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative h-20">
                <Robot
                  size={35}
                  className="text-white absolute -left-12 -top-3 p-2 rounded-full bg-[#1E1E1E]"
                />
                <Loader />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div>
          <div className="flex">
            <input
              type="text"
              value={chatMessage}
              onChange={handleChatMessageChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-grow p-2 border-2 border-[#4c4c4c] bg-[#1E1E1E] rounded-lg shadow-sm focus:outline-none transition duration-200 focus:border-[#828282]"
            />
            <button
              onClick={handleSendMessage}
              disabled={chatMessage.trim() === "" || isLoading}
              className={`ml-2 py-4 px-10 rounded-lg shadow-md transition duration-200 ${chatMessage.trim() === "" || isLoading
                  ? "bg-gray-500 cursor-not-allowed opacity-45"
                  : "bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 active:scale-95"
                }`}
            >
              <PaperPlaneTilt size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

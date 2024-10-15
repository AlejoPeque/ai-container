"use client";
import { Robot } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Sidebar = ({ routes, route, setRoute }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="fixed top-0 left-0 border-r-2 border-[#4c4c4c] w-[80px] h-screen bg-black z-10 flex flex-col items-center gap-6">
      <div className="h-[80px] flex items-center">
        <Robot size={45} className="text-white p-2" />
      </div>
      <nav className="flex flex-col gap-4">
        {routes.map((routeItem, index) => (
          <div key={routeItem.id} className="relative flex items-center">
            <motion.button
              className={`text-white p-2 rounded-lg transition-all duration-200 ${route === index && "bg-[#1E1E1E]"}`}
              onClick={() => setRoute(index)}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              {routeItem.icon}
            </motion.button>
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.div
                  className="absolute left-[70px] bg-[#1E1E1E] text-white p-1 px-3 rounded-lg shadow-lg text-sm border border-[#4c4c4c] text-nowrap"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>{routeItem.name}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

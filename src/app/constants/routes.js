import Chat from "@/app/components/Chat";
import { ChatCentered, Image } from "@phosphor-icons/react";

const routes = [
  {
    id: 0,
    name: "Chat Room",
    component: <Chat />,
    icon: <ChatCentered size={20} />,
  },
  {
    id: 1,
    name: "Texto to Image",
    component: <h1>Texto to Image</h1>,
    icon: <Image size={20} />,
  },
];

export default routes;

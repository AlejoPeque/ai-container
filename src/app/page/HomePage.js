"use client";
import Sidebar from "@/app/components/Sidebar";
import routes from "@/app/constants/routes";
import { useState } from "react";

export default function HomePage() {
  const [route, setRoute] = useState(0);
  return (
    <>
      <Sidebar routes={routes} route={route} setRoute={setRoute} />
      <div className="pl-[80px]">
        <div className="fixed top-0 left-[80px] w-full border-b-2 border-[#4c4c4c] py-4 px-5 h-[80px] bg-black flex items-center">
          <h1 className="text-2xl font-semibold">Welcome to the Chat Room</h1>
        </div>
        {routes[route].component}
      </div>
    </>
  );
}

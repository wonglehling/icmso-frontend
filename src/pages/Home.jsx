import React from "react";

import SideBar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Chat from "../components/RealTimeChat";

export default function Home() {
  return (
    <>
      <SideBar />
      <div style={{ paddingLeft: "210px", height: '100%' }}>
        <Navbar />
        Home page is coming soon
        <Chat />
      </div>
    </>
  );
}

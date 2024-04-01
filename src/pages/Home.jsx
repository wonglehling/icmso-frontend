import React from "react";

import SideBar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <SideBar />
      <div style={{ paddingLeft: "210px" }}>
        <Navbar />
        Home page is coming soon
      </div>
    </>
  );
}

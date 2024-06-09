import React from "react";
import { Container } from "react-bootstrap";

import SideBar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <SideBar />
      <div style={{ paddingLeft: "210px", height: '100%' }}>
        <Navbar />
        <Container>
          Home page is coming soon
        </Container>
      </div>
    </>
  );
}

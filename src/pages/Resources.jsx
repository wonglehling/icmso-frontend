import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SideBar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DocumentCard from "../components/DocumentCard";
import { Row, Col } from "react-bootstrap";
import useApiCall from "../hooks/useApiCall";

import "../styles/resource.css";

export default function Resources() {
  const navigate = useNavigate();
  const { data, loading, error, fetchData } = useApiCall("get", "/resource");

  useEffect(() => {
    fetchData();
  }, []);

  const handleClickDocDetail = (id) => {
    navigate("/resource-detail/" + id);
  };
  return (
    <div>
      <SideBar />
      <div style={{ paddingLeft: "210px" }}>
        <Navbar />
        <div className="resource-title">Recommendation</div>
        <Row lg={4} md={3} xs={2}></Row>
        <div className="resource-title">Recent Resources</div>
        <Row lg={4} md={3} xs={2}>
          {data &&
            data.map((doc, index) => {
              return (
                <Col key={index}>
                  <DocumentCard
                    doc_info={doc}
                    handleClickDoc={() => handleClickDocDetail(doc._id)}
                  />
                </Col>
              );
            })}
        </Row>
      </div>
    </div>
  );
}

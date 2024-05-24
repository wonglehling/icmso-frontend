import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SideBar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DocumentCard from "../components/DocumentCard";
import Chat from "../components/RealTimeChat";
import { Row, Col } from "react-bootstrap";
import useApiCall from "../hooks/useApiCall";

import "../styles/resource.css";

export default function Resources() {
  const navigate = useNavigate();
  const [selectedDocId, setSelectedDocId] = useState(0);
  const [clickFavAction, setClickFavAction] = useState('');
  const { data, loading, error, executeApi } = useApiCall("get", "/resource");
  const favApi = useApiCall("get", `/user/recommendation/${clickFavAction}/${selectedDocId}`);

  useEffect(() => {
    executeApi();
  }, []);

  const handleClickDocDetail = (id) => {
    navigate("/resource-detail/" + id);
  };

  useEffect(() => {
    if(selectedDocId!==0 && clickFavAction!=='') favApi.executeApi()
  }, [clickFavAction, selectedDocId ]);

  return (
    <div>
      <SideBar />
      <div style={{ paddingLeft: "210px" }}>
        <Navbar />
        <div className="resource-title">Recommendation</div>
        <Row lg={4} md={3} xs={2}>
        {data &&
            data?.recommended_resource?.map((doc, index) => {
              return (
                <Col key={index}>
                  <DocumentCard
                    doc_info={doc}
                    handleClickDoc={() => handleClickDocDetail(doc._id)}
                    setSelectedDocId={setSelectedDocId}
                    setClickFavAction={setClickFavAction}
                  />
                </Col>
              );
            })}
        </Row>
        <div className="resource-title">Recent Resources</div>
        <Row lg={4} md={3} xs={2}>
          {data &&
            data?.resource?.map((doc, index) => {
              return (
                <Col key={index}>
                  <DocumentCard
                    doc_info={doc}
                    handleClickDoc={() => handleClickDocDetail(doc._id)}
                    setSelectedDocId={setSelectedDocId}
                    setClickFavAction={setClickFavAction}
                  />
                </Col>
              );
            })}
        </Row>
      <Chat />
      </div>

    </div>
  );
}

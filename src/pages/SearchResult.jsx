import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SideBar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DocumentCard from "../components/DocumentCard";
import { Row, Col, Container } from "react-bootstrap";
import useApiCall from "../hooks/useApiCall";
import { useParams } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";

import "../styles/resource.css";

export default function SearchResult() {
  let { query } = useParams();

  const navigate = useNavigate();
  const [selectedDocId, setSelectedDocId] = useState(0);
  const [clickFavAction, setClickFavAction] = useState('');
  const { data, loading, error, executeApi } = useApiCall("post", "/activity/search?query=" + query, {}, {});
  const favApi = useApiCall("get", `/user/recommendation/${clickFavAction}/${selectedDocId}`);

  useEffect(() => {
    executeApi()
  }, []);

  const handleClickDocDetail = (id) => {
    navigate("/resource-detail/" + id);
  };

  const handleClickProjectDetail = (id) => {
    navigate("/project/" + id);
  };

  useEffect(() => {
    if (selectedDocId !== 0 && clickFavAction !== '') favApi.executeApi()
  }, [clickFavAction, selectedDocId]);

  return (
    <div>
      <SideBar />
      <div style={{ paddingLeft: "210px" }}>
        <Navbar />
        <Container>
          {data?.resources.length > 0 && <>
            <div className="resource-title">Relevant Resources</div>
            <Row lg={4} md={3} xs={2}>
              {data?.resources?.map((doc, index) => {
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
          </>}
          {data?.projects.length > 0 &&
            <>
              <div className="resource-title">Relevant Projects</div>
              <Row >
                {data?.projects?.map((doc, index) => {
                  return (
                    <Row >
                      <ProjectCard
                        doc_info={doc}
                        handleClickDoc={() => handleClickProjectDetail(doc._id, doc.project_name)}
                      />
                    </Row>
                  );
                })}
              </Row></>}
        </Container>

      </div>

    </div>
  );
}

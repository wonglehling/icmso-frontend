import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import SideBar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DocumentCard from "../components/DocumentCard";
import { Row, Col } from "react-bootstrap";
import useApiCall from "../hooks/useApiCall";

import "../styles/resource.css";

export default function Favourite() {
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
        <div className="resource-title">Recent Resources</div>
        <Row lg={4} md={3} xs={2}>
          {data &&
            data.map((doc, index) => {
              return doc.is_favourite && (
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
      </div>
    </div>
  );
}

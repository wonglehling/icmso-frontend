import React, { useEffect, useState } from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import useApiCall from "../hooks/useApiCall";
import DocumentCard from "../components/DocumentCard";
import SideBar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';
import { iconFormatter } from '../utils/iconFormatter';
import ProjectCard from "../components/ProjectCard";
import {formatDateTime} from '../utils/stringFormatter';

export default function Home() {
  const navigate = useNavigate();
  const resourceGetAPI = useApiCall("get", "/resource");
  const homeStatsGetAPI = useApiCall("get", "/home");
  const [selectedDocId, setSelectedDocId] = useState(0);
  const [clickFavAction, setClickFavAction] = useState('');


  useEffect(() => {
    resourceGetAPI.executeApi();
    homeStatsGetAPI.executeApi();
  }, []);

  const handleClickDocDetail = (id) => {
    navigate("/resource-detail/" + id);
  };

  const handleClickProjDetail = (id, path) => {
    navigate("/project/" + id + "/" + path);
  };

  // return filter css based on action
  const getCorrectFilter = (action) => {
    let filter = {}
    switch (action) {
      case 'create':
      case 'add':
        filter = { filter: 'invert(23%) sepia(38%) saturate(2388%) hue-rotate(103deg) brightness(89%) contrast(103%)' }
        break;
      case 'remove':
      case 'delete':
        filter = { filter: 'invert(18%) sepia(87%) saturate(2798%) hue-rotate(353deg) brightness(87%) contrast(103%)' }
        break;
      case 'edit':
        filter = { filter: 'invert(65%) sepia(99%) saturate(1315%) hue-rotate(1deg) brightness(105%) contrast(104%)' }
        break;
      default:
        filter = { filter: 'invert(18%) sepia(87%) saturate(2798%) hue-rotate(353deg) brightness(87%) contrast(103%)' }
        break;
    }
    return filter;
  }

  return (
    <>
      <SideBar />
      <div style={{ paddingLeft: "210px", height: '100vh' }}>
        <Navbar />
        <Container>
          <div className="group-title" style={{ paddingLeft: 0 }}>System Statistics</div>
          {/* <Row>
            <Col md={7}>
              <Row style={{ background: 'yellow' }}>
                <LineChart
                  xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                  series={[
                    {
                      data: [2, 5.5, 2, 8.5, 1.5, 5],
                    },
                  ]}
                  width={480}
                  height={200}
                />
              </Row>
              <Row style={{ background: 'yellow' }}>
                <LineChart
                  xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                  series={[
                    {
                      data: [2, 5.5, 2, 8.5, 1.5, 5],
                    },
                  ]}
                  width={480}
                  height={200}
                />
              </Row>
            </Col>
            <Col md={5}>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: 'series A' },
                      { id: 1, value: 15, label: 'series B' },
                      { id: 2, value: 20, label: 'series C' },
                    ],
                  },
                ]}
                width={400}
                height={200}
              />
            </Col>
          </Row> */}
          <Paper sx={{ padding: '1rem' }}>
            <Row>
              <Col md={4}>
                <Row style={{ background: 'white' }}>
                  <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                      {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                      },
                    ]}
                    width={480}
                    height={200}
                  />
                </Row>

              </Col>
              <Col md={4}>
                <Row style={{ background: 'white' }}>
                  <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                      {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                      },
                    ]}
                    width={480}
                    height={200}
                  />
                </Row>

              </Col>
              <Col md={4} style={{ display: 'flex', alignItems: 'center' }}>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 10, label: 'series A' },
                        { id: 1, value: 15, label: 'series B' },
                        { id: 2, value: 20, label: 'series C' },
                      ],
                    },
                  ]}
                  width={300}
                  height={128}

                />
              </Col>
            </Row>
          </Paper>
          <Row>
            <Col md={9}>

              <Row>
                <div className="group-title">Recommended for you</div>
                <Row style={{}} xs={4}>
                  {resourceGetAPI.data &&
                    resourceGetAPI.data?.recommended_resource?.map((doc, index) => {
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
              </Row>
              <Row style={{ paddingLeft: 0 }}>
                <div className="group-title">Jump Right In</div>
                <Row style={{}}>
                  {homeStatsGetAPI.data?.project.map((proj, index) => {
                    return (
                      <Col md={6}>
                        <ProjectCard
                          doc_info={proj}
                          handleClickDoc={() => handleClickProjDetail(proj._id, proj.project_name)}
                        />
                      </Col>
                    )
                  })}
                </Row>
              </Row>
            </Col>
            <Col md={3}>
              <div className="group-title" style={{ paddingLeft: 0 }}>Recent Activities</div>
              <Row style={{ height: '420px', marginBottom: '1rem', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: 'transparent transparent' }}>
                {
                  homeStatsGetAPI.data?.feeds.map((feed, index) => {
                    return (
                      <Paper key={index} style={{ padding: '0.5rem', marginBottom: '0.5rem' }}>
                        <Stack direction="horizontal">
                          <div>
                            <img src={iconFormatter("", `${feed.feed_type}-${feed.feed_activity}`)} alt="" width="24" height={24} style={{ marginRight: "0.5rem", ...getCorrectFilter(feed.feed_activity) }} />
                          </div>
                          <div>
                            <div style={{ fontSize: '0.8rem' }}>{formatDateTime(feed.createdAt)}</div>
                            <div>{feed.feed_message}</div>
                          </div>
                        </Stack>
                      </Paper>)
                  })
                }
              </Row>
            </Col>
          </Row>
        </Container >
      </div >
    </>
  );
}

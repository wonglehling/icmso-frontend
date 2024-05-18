import React, { useState } from "react";
import { Stack, Form } from "react-bootstrap";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";

import CloseIcon from "../../assets/icons/x.svg";
import ChatIcon from "../../assets/icons/chat-dots.svg";
import "./index.css";

function Chat() {
  const [openChatBox, setOpenChatBox] = useState(false);
  return (
    <>
      <div
        style={{
          position: "fixed",
          display: "block",
          bottom: 0,
          right: 0,
        }}
      >
        <div style={{ backgroundColor: "grey", width: "100px" }}>
          {openChatBox ? (
            <Stack
              direction="horizontal"
              gap={2}
              style={{ width: "700px", backgroundColor: "grey" }}
            >
              <div className="ps-2">Chat</div>
              <div className="ms-auto pe-2">
                <img
                  src={CloseIcon}
                  width={16}
                  height={16}
                  onClick={() => setOpenChatBox(!openChatBox)}
                />
              </div>
            </Stack>
          ) : (
            <img
              src={ChatIcon}
              width={24}
              height={24}
              onClick={() => setOpenChatBox(!openChatBox)}
            />
          )}
        </div>
        {openChatBox && (
          <Stack
            direction="horizontal"
            gap={0}
            style={{
              height: "400px",
              width: "700px",
              right: "700px",
              backgroundColor: "grey",
            }}
          >
            <div
              style={{
                width: "300px",
                backgroundColor: "red",
                height: "400px",
              }}
            >
              <section className="discussions" style={{ overflow: "auto" }}>
                <div
                  className="discussion search"
                  style={{ position: "absolute", top: 24, width: "300px", paddingLeft:"10px", paddingRight:"10px" }}
                >
                  <Paper
                    component="form"
                    sx={{
                      p: "2px 4px",
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      borderRadius: "25px",
                      height: "36px",
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1, fontSize: "14px !important" }}
                      placeholder="Search"
                    />
                    <Divider
                      sx={{ height: 28, m: 0.5 }}
                      orientation="vertical"
                    />
                    <IconButton color="primary" sx={{ p: "10px" }}>
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </div>
                <div
                  className="discussion message-active"
                  style={{ marginTop: "90px" }}
                >
                  <div
                    className="photo"
                    style={{
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)",
                    }}
                  >
                    <div className="online"></div>
                  </div>
                  <div className="desc-contact">
                    <p className="name">Megan Leib</p>
                    <p className="message">9 pm at the bar if possible 😳</p>
                  </div>
                  <div className="timer">12 sec</div>
                </div>

                <div className="discussion">
                  <div
                    className="photo"
                    style={{
                      backgroundImage:
                        "url(https://i.pinimg.com/originals/a9/26/52/a926525d966c9479c18d3b4f8e64b434.jpg)",
                    }}
                  >
                    <div className="online"></div>
                  </div>
                  <div className="desc-contact">
                    <p className="name">Dave Corlew</p>
                    <p className="message">
                      Let's meet for a coffee or something today ?
                    </p>
                  </div>
                  <div className="timer">3 min</div>
                </div>

                <div className="discussion">
                  <div
                    className="photo"
                    style={{
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80)",
                    }}
                  ></div>
                  <div className="desc-contact">
                    <p className="name">Jerome Seiber</p>
                    <p className="message">I've sent you the annual report</p>
                  </div>
                  <div className="timer">42 min</div>
                </div>

                <div className="discussion">
                  <div
                    className="photo"
                    style={{
                      backgroundImage:
                        "url(https://card.thomasdaubenton.com/img/photo.jpg)",
                    }}
                  >
                    <div className="online"></div>
                  </div>
                  <div className="desc-contact">
                    <p className="name">Thomas Dbtn</p>
                    <p className="message">See you tomorrow ! 🙂</p>
                  </div>
                  <div className="timer">2 hour</div>
                </div>

                <div className="discussion">
                  <div
                    className="photo"
                    style={{
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1553514029-1318c9127859?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80)",
                    }}
                  ></div>
                  <div className="desc-contact">
                    <p className="name">Elsie Amador</p>
                    <p className="message">What the f**k is going on ?</p>
                  </div>
                  <div className="timer">1 day</div>
                </div>

                <div className="discussion">
                  <div
                    className="photo"
                    style={{
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1541747157478-3222166cf342?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=967&q=80)",
                    }}
                  ></div>
                  <div className="desc-contact">
                    <p className="name">Billy Southard</p>
                    <p className="message">Ahahah 😂</p>
                  </div>
                  <div className="timer">4 days</div>
                </div>

                <div className="discussion">
                  <div
                    className="photo"
                    style={{
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1435348773030-a1d74f568bc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80)",
                    }}
                  >
                    <div className="online"></div>
                  </div>
                  <div className="desc-contact">
                    <p className="name">Paul Walker</p>
                    <p className="message">You can't see me</p>
                  </div>
                  <div className="timer">1 week</div>
                </div>
              </section>
            </div>
            <div
              style={{ maxHeight: "100%", overflow: "auto", width: "400px" }}
            >
              <section className="chat">
                <div
                  className="header-chat"
                  style={{ position: "absolute", top: 24, width: "400px" }}
                >
                  <p className="name">Megan Leib</p>
                  <i
                    className="icon clickable fa fa-ellipsis-h right"
                    aria-hidden="true"
                  ></i>
                </div>
                <div className="messages-chat" style={{ marginTop: "80px" }}>
                  <div className="message" style={{marginLeft:"10px"}}>
                    <div
                      className="photo"
                      style={{
                        backgroundImage:
                          "url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)",
                      }}
                    >
                      <div className="online"></div>
                    </div>
                    <p className="text"> Hi, how are you ? </p>
                  </div>
                  <div className="message text-only">
                    <p className="text">
                      What are you doing tonight ? Want to go take a drink ?
                    </p>
                  </div>
                  <p className="time"> 14h58</p>
                  <div className="message text-only">
                    <div className="response">
                      <p className="text"> Hey Megan ! It's been a while 😃</p>
                    </div>
                  </div>
                  <div className="message text-only">
                    <div className="response">
                      <p className="text"> When can we meet ?</p>
                    </div>
                  </div>
                  <p className="response-time time"> 15h04</p>
                  <div className="message">
                    <div
                      className="photo"
                      style={{
                        backgroundImage:
                          "url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)",
                      }}
                    >
                      <div className="online"></div>
                    </div>
                    <p className="text"> 9 pm at the bar if possible 😳</p>
                  </div>
                  <p className="time"> 15h09</p>
                </div>
              </section>
              <div
                className="mt-auto px-3 py-2"
                style={{
                  position: "absolute",
                  bottom: 0,
                  backgroundColor: "white",
                  width: "400px",
                }}
              >
                <Paper
                  component="form"
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    borderRadius: "25px",
                    height: "2rem",
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1, fontSize: "12px !important" }}
                    placeholder="Message"
                  />
                  <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                  <IconButton color="primary" sx={{ p: "10px" }}>
                    <SendIcon />
                  </IconButton>
                </Paper>
              </div>
            </div>
          </Stack>
        )}
      </div>
    </>
  );
}

export default Chat;

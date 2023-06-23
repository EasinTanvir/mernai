import React, { useRef, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "../ChatBox/chatbox.css";
import { Button, Card, Col, Row } from "react-bootstrap";
import PersonIcon from "@mui/icons-material/Person";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import MicIcon from "@mui/icons-material/Mic";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Loaders from "../Loaders";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useDispatch, useSelector } from "react-redux";
import Spinners from "../Spinners";
import Modals from "../Modals";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { Audio } from "react-loader-spinner";
const Vet = () => {
  const [show, setShow] = useState(false);

  const scrollRef = useRef();

  const [value, setValue] = useState("");
  const [automessage, setAutoMessage] = useState([]);
  const [puubmedLoader, setPubmedLoader] = useState(false);
  const [puubmedError, setPubmeError] = useState("");
  const [library, setLibrary] = useState(
    localStorage.getItem("petart")
      ? JSON.parse(localStorage.getItem("petart"))
      : []
  );
  const [increament, setIncreament] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [msgLoader, setMsgLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [store, setStore] = useState([]);
  const [converId, setConverId] = useState();
  const [allconversation, setAllConversation] = useState([]);
  const [delError, setDelError] = useState("");
  const [delErrorLoader, setDelErrorLoader] = useState(false);

  const [extraLoaders, setExtraLoaders] = useState(false);

  //gpt credential usestate for frontend start from here

  const { user } = useSelector((state) => state.auth);
  const { user: extra } = useSelector((state) => state.extra);
  const { text } = useSelector((state) => state.voice);

  const onChangeHandler = (e) => {
    setValue(e.target.value);
    //console.log(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIncreament("");

    const sendData = {
      converId: converId,
      token: user.token ? user.token : null,
      extraId: user.id ? user.id : extra,
      text: value,
    };

    setIsLoading(true);
    setStore((store) => [
      ...store,
      { user: value },
      { vetgpt: "" },
      { automessage: automessage },
    ]);
    setValue("");

    setTimeout(async () => {
      try {
        const { data } = await axios.post(
          process.env.REACT_APP_SERVER_URL + "/vetgpt",
          sendData,
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          }
        );

        //send request for auto generator message
        const autoSendData = {
          text: value,
          converId: converId,
          token: user.token ? user.token : null,
          extraId: user.id ? user.id : extra,
        };

        try {
          var { data: auto } = await axios.post(
            process.env.REACT_APP_SERVER_URL + "/automessage/vetgpt",
            autoSendData,
            {
              headers: {
                Authorization: "Bearer " + user.token,
              },
            }
          );
        } catch (err) {
          setIncreament(err.response.data.message);
          setIsLoading(false);
        }

        //send request for auto generator message

        const autoPrint = [
          auto.result[1] || null,
          auto.result[2] || null,
          auto.result[3] || null,
          auto.result[4] || null,
        ];

        setMessage(data.result.choices[0].message.content);
        setAutoMessage(autoPrint);
        setIsLoading(false);

        //send request for pubmed
        const pubmeDataData = {
          text: value,
        };
        try {
          setPubmedLoader(true);
          const { data: pubmed } = await axios.post(
            process.env.REACT_APP_SERVER_URL + "/pubmed",
            pubmeDataData
          );
          setLibrary(pubmed.articles);
          localStorage.setItem("petart", JSON.stringify(pubmed.articles));
          setPubmedLoader(false);
        } catch (err) {
          setPubmeError(err.response.data.message);
          setPubmedLoader(false);
        }

        const dbData = {
          converId: converId,
          automessage: autoPrint,
          vetgpt: data.result.choices[0].message.content,
          user: value,
          userId: user.id ? user.id : extra,
          token: user.token ? user.token : null,
        };

        //for db request
        try {
          await axios.post(
            process.env.REACT_APP_SERVER_URL + "/vet/createvetmessage",
            dbData
          );
        } catch (err) {
          setIncreament(err.response.data.message);
        }
      } catch (err) {
        setIncreament(err.response.data.message);
        setIsLoading(false);
      }
    }, 1000);
  };
  useEffect(() => {
    setValue(text);
  }, [text]);
  // below for conversation id

  useEffect(() => {
    //this first used for fetch data of first conversation

    const fetchData = async () => {
      const conData = {
        userId: user.id ? user.id : extra,
        first: "I am first",
      };
      console.log(conData);
      console.log("update");
      try {
        const { data } = await axios.post(
          process.env.REACT_APP_SERVER_URL + "/vet/creaetevetconversation",
          conData
        );
        setConverId(data.con);
      } catch (err) {
        console.log(err);
      }
    };
    setTimeout(() => {
      fetchData();
    }, 500);
  }, [user, extra]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const conData = {
          userId: user.id ? user.id : extra,
          // message: value,
          // token: user.token ? user.token : null,
        };

        const { data } = await axios.post(
          process.env.REACT_APP_SERVER_URL + "/vet/getvetconversation",
          conData
        );
        setAllConversation(data.conver);
      } catch (err) {
        console.log(err);
      }
    };

    setTimeout(() => {
      fetchData();
    }, 500);
  }, [converId]);

  useEffect(() => {
    if (message) {
      setStore((store) => [
        ...store,
        { user: "" },
        { vetgpt: message },
        { automessage: automessage },
      ]);
    }
    setAutoMessage([]);
  }, [message]);

  useEffect(() => {
    const fetchData = async () => {
      const sendData = {
        userId: user.id ? user.id : extra,
        converId: converId,
      };

      setMsgLoader(true);

      try {
        const { data } = await axios.post(
          process.env.REACT_APP_SERVER_URL + "/fetchvetmessage",
          sendData
        );
        //extra for api

        //extra for api

        setStore(data.result);
        setMsgLoader(false);
      } catch (err) {
        setMsgLoader(false);
        console.log(err.response.data.message);
      }
    };

    setTimeout(() => {
      fetchData();
    }, 500);
  }, [user, extra, converId, delError]);

  //age extra start

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [store, isLoading, automessage]);

  const newChatHandler = async () => {
    setDelError("");

    setExtraLoaders(true);
    try {
      const conData = {
        userId: user.id ? user.id : extra,
        token: user.token ? user.token : null,
      };

      const { data } = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/vet/creaetevetconversation",
        conData
      );
      setConverId(data.con);
      setExtraLoaders(false);
    } catch (err) {
      setIncreament(err.response.data.message);
      setExtraLoaders(false);
    }
  };

  //create new conversation
  const createNewConver = async (id) => {
    setConverId(id);
    setDelError("");
  };

  const onDeleteChatHandler = async () => {
    localStorage.setItem("petart", JSON.stringify([]));
    setLibrary([]);

    setIncreament("");
    const sendData = {
      converId: converId,
    };

    setDelErrorLoader(true);
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/deletevet",
        sendData
      );
      setDelError(data.message);
      setDelErrorLoader(false);
    } catch (err) {
      setIncreament(err.response.data.message);
      setDelErrorLoader(false);
    }
  };

  const onVoiceHandler = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      console.log("Text-to-speech is not supported in this browser.");
    }
  };
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <div className="c-containers">
        <Row className="chat">
          <Col xs={12} sm={12} md={6} lg={7}>
            <div className="chat-left">
              {/* chat */}
              {msgLoader ? (
                <Loaders />
              ) : (
                <div className="text mt-2">
                  <>
                    <div className="sender">
                      <div className="ellepse">
                        {" "}
                        <img
                          className="msg-logo"
                          src="/assests/b.png"
                          alt=""
                        />{" "}
                      </div>
                      <div className="message">
                        <p>Hello there! I'm Dr. McMega.</p>
                        <div className="shape"></div>
                      </div>
                    </div>
                    <div className="sender">
                      <div className="ellepse">
                        {" "}
                        <img
                          className="msg-logo"
                          src="/assests/b.png"
                          alt=""
                        />{" "}
                      </div>
                      <div className="message">
                        <p>How can I help your pet?</p>
                        <div className="shape"></div>
                      </div>
                    </div>
                  </>
                  {store.map((item, index) => (
                    <div ref={scrollRef} key={index}>
                      {item.user && (
                        <div className="sender own">
                          <div className="ellepse">
                            <PersonIcon />
                          </div>
                          <div
                            style={
                              item.spam
                                ? {
                                    border: "4px",
                                    borderStyle: "solid",
                                    borderColor: "red",
                                  }
                                : {}
                            }
                            className="message"
                          >
                            <p>{item.user}</p>
                            <div className="shapes"></div>
                          </div>
                        </div>
                      )}
                      {item.vetgpt && (
                        <>
                          <div className="sender">
                            <div className="ellepse">
                              {" "}
                              <img
                                className="msg-logo"
                                src="/assests/b.png"
                                alt=""
                              />{" "}
                            </div>
                            <div className="message">
                              <p>{item.vetgpt} </p>
                              <span
                                onClick={() => onVoiceHandler(item.vetgpt)}
                                style={{
                                  cursor: "pointer",
                                  marginRight: "-1rem",
                                }}
                                className="d-flex justify-content-end text-primary"
                              >
                                <VolumeUpIcon
                                  style={{
                                    fontSize: "24px",
                                  }}
                                />
                              </span>
                              <div className="shape"></div>
                            </div>
                          </div>
                        </>
                      )}
                      {item.automessage &&
                        item.automessage.map((item, i) => {
                          if (item !== null) {
                            return (
                              <div key={i}>
                                <div className="sender own ">
                                  <div class="alert alert-primary" role="alert">
                                    {item}
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        })}
                    </div>
                  ))}
                  {isLoading && (
                    <div ref={scrollRef} className="sender">
                      <div className="ellepse">
                        {" "}
                        <img
                          className="msg-logo"
                          src="/assests/b.png"
                          alt=""
                        />{" "}
                      </div>
                      <div className="message">
                        <p className="loading"></p>
                        <div className="shape"></div>
                      </div>
                    </div>
                  )}

                  {/* chat end */}
                </div>
              )}
              <form onSubmit={onSubmitHandler} className="input-text">
                <Form.Control
                  required
                  value={value}
                  onChange={onChangeHandler}
                  className="b-input"
                  type="text"
                  placeholder="Send a message"
                />
                <button className="send-btn" type="submit">
                  <span> Send</span>
                  <span>
                    <img className="btn-image" src="/assests/send.png" alt="" />
                  </span>
                </button>
                <button
                  type="button"
                  onClick={handleShow}
                  style={{ width: "100px" }}
                >
                  <MicIcon />
                </button>

                <button
                  onClick={onDeleteChatHandler}
                  style={{ backgroundColor: "red", width: "140px" }}
                  type="button"
                >
                  <span className="clear-btns">
                    {delErrorLoader ? <Spinners /> : "Clear Chat"}
                  </span>
                </button>
              </form>
              <div className="new-btns d-flex gap-2">
                <button
                  style={{ backgroundColor: "#ff1744" }}
                  onClick={newChatHandler}
                  type="button"
                >
                  <span>{extraLoaders ? <Spinners /> : "New Chat +"}</span>
                </button>{" "}
                {allconversation.map((item, index) => (
                  <button
                    style={{
                      backgroundColor:
                        item._id === converId ? "#008000" : "#073b4c",
                    }}
                    onClick={() => createNewConver(item._id)}
                    key={item._id}
                    type="button"
                  >
                    <span>Chat {index + 1}</span>
                  </button>
                ))}
              </div>
              <div style={{ marginBottom: "-10px" }} className="alerts mt-2">
                {increament && (
                  <div class="alert alert-danger" role="alert">
                    {increament}
                  </div>
                )}
                {!increament && delError && (
                  <div class="alert alert-success" role="alert">
                    {delError}
                  </div>
                )}
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={5} className="chat-right">
            <Row className="mt-3">
              <Col md={12} className="top mb-3">
                <h3>
                  <LibraryAddIcon
                    style={{ color: "#1976D2", fontSize: "28px" }}
                  />{" "}
                  DR.McMEGA Library
                </h3>
              </Col>
              <Col md={12} className="mt-2">
                {!puubmedLoader && (
                  <Col>
                    <div class="alert alert-primary" role="alert">
                      After you start your conversation, Dr. Mega will collect
                      research materials here.
                    </div>
                  </Col>
                )}
                {puubmedError && (
                  <Col>
                    <Card className="text-center">{puubmedError}</Card>
                  </Col>
                )}
              </Col>
            </Row>

            <Row className="mt-3">
              {puubmedLoader ? (
                <Col className="d-flex gap-1 justify-content-center" md={12}>
                  <span>
                    <Audio
                      height="100"
                      width="100"
                      color="#4fa94d"
                      ariaLabel="audio-loading"
                      wrapperStyle={{}}
                      wrapperClass="wrapper-class"
                      visible={true}
                    />
                  </span>
                </Col>
              ) : (
                <Col md={12} className="top">
                  {library?.map((item, i) => (
                    <Card className="p-3 m-3 rounded">
                      <h4 className="articles">{item.title}</h4>
                      <Card.Body className="d-flex flex-column gap-2">
                        <Link target={"_blank"} to={item.link}>
                          <p>PMID : {item.pmid}</p>
                        </Link>
                        <Link target={"_blank"} to={item.link}>
                          <Button>Read on Pubmed</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  ))}
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </div>
      <Modals show={show} handleClose={handleClose} handleShow={handleShow} />
    </>
  );
};

export default Vet;

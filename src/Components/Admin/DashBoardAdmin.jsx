import React, { useEffect, useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import axios from "axios";
import { useSelector } from "react-redux";
import Spinners from "../Spinners";
import AdminSpinners from "./AdminSpinners";
import Loaders from "../Loaders";

const DashBoardAdmin = () => {
  const [file, setFile] = useState(null);
  const [fileLoader, setFileLoader] = useState(false);
  const [fileError, setFileError] = useState("");
  const [fileSuccess, setFileSuccess] = useState("");
  const [apiOne, setApiOne] = useState("");
  const [apiOneLoader, setApiOneLoader] = useState(false);
  const [apiOneSuccess, setApiOneSuccess] = useState("");
  const [apiTwo, setApiTwo] = useState("");
  const [apiTwoLoader, setApiTwoLoader] = useState(false);
  const [apiTwoSuccess, setApiTwoSuccess] = useState("");

  const [apiThree, setApiThree] = useState("");
  const [apiThreeLoader, setApiThreeLoader] = useState(false);
  const [apiThreeSuccess, setApiThreeSuccess] = useState("");

  const [allUsers, setAllUsers] = useState([]);
  const [allConver, setAllConver] = useState([]);
  const [allMessage, setAllMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const { user } = useSelector((state) => state.auth);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setApiOneSuccess("");
    setApiTwoSuccess("");
    setApiThreeSuccess("");
    const sendData = {
      apikey: apiOne,
    };
    setApiOneLoader(true);
    try {
      const { data } = await axios.patch(
        process.env.REACT_APP_SERVER_URL + "/gpt/apione",
        sendData,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      setApiOneLoader(false);
      setApiOne("");
      setApiOneSuccess(data.message);
    } catch (err) {
      setIsError(err.response.data.message);
      setApiOneLoader(false);
    }
  };
  const onSubmitHandlerTwo = async (e) => {
    e.preventDefault();
    setApiOneSuccess("");
    setApiTwoSuccess("");
    setApiThreeSuccess("");
    const sendData = {
      apikey: apiTwo,
    };
    setApiTwoLoader(true);
    try {
      const { data } = await axios.patch(
        process.env.REACT_APP_SERVER_URL + "/gpt/apitwo",
        sendData,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      setApiTwoLoader(false);
      setApiTwo("");
      setApiTwoSuccess(data.message);
    } catch (err) {
      setApiTwoLoader(false);
      setIsError(err.response.data.message);
    }
  };
  const onSubmitHandlerThree = async (e) => {
    e.preventDefault();
    setApiOneSuccess("");
    setApiTwoSuccess("");
    setApiThreeSuccess("");
    const sendData = {
      apikey: apiThree,
    };
    setApiThreeLoader(true);
    try {
      const { data } = await axios.patch(
        process.env.REACT_APP_SERVER_URL + "/gpt/apithree",
        sendData,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      setApiThreeLoader(false);
      setApiThree("");
      setApiThreeSuccess(data.message);
    } catch (err) {
      setIsError(err.response.data.message);
      setApiThreeLoader(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_SERVER_URL + "/admin/allusers",
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          }
        );
        setAllUsers(data);
        setIsLoading(false);
      } catch (err) {
        setIsError(err.response.data.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_SERVER_URL + "/admin/allconver",
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          }
        );
        setAllConver(data);
        setIsLoading(false);
      } catch (err) {
        setIsError(err.response.data.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_SERVER_URL + "/admin/allmessage",
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          }
        );
        setAllMessages(data);
        setIsLoading(false);
      } catch (err) {
        setIsError(err.response.data.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const onFileHandler = (e) => {
    const filePath = e.target.files[0];
    setFile(filePath);
  };

  const onJsonHandler = async (e) => {
    e.preventDefault();
    setFileError("");
    setFileSuccess("");
    if (file && file.type === "application/json") {
      const formData = new FormData();

      formData.append("file", file);

      try {
        setFileLoader(true);
        const { data } = await axios.post(
          process.env.REACT_APP_SERVER_URL + "/gpt/upload/json",
          formData,
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          }
        );
        setFileSuccess(data.message);
        setFileLoader(false);
      } catch (err) {
        setFileError(err.response.data.message);
        setFileLoader(false);
      }
    } else {
      setFileError("Invalid file type. Please select a JSON file.");
    }
  };

  return (
    <>
      <Row className="mt-5">
        {isLoading ? (
          <div className="d-flex justify-content-center">
            {" "}
            <AdminSpinners />
          </div>
        ) : (
          <>
            <Col md={4}>
              <Card className="text-center p-2">
                <Card.Title className="d-flex gap-2 justify-content-center align-items-center">
                  <span className="members">Total Members</span>
                  <span>
                    <SupervisedUserCircleIcon />{" "}
                  </span>
                </Card.Title>
                <Card.Body>
                  <div className="fw-bold fs-5">= {allUsers.length}</div>
                </Card.Body>
              </Card>
            </Col>{" "}
            <Col md={4}>
              <Card className="text-center p-2">
                <Card.Title className="d-flex gap-2 justify-content-center align-items-center">
                  <span className="members">Total Conversations</span>
                  <span>
                    <QuestionAnswerIcon />
                  </span>
                </Card.Title>
                <Card.Body>
                  <div className="fw-bold fs-5">= {allConver.length}</div>
                </Card.Body>
              </Card>
            </Col>{" "}
            <Col md={4}>
              <Card className="text-center p-2">
                <Card.Title className="d-flex gap-2 justify-content-center align-items-center">
                  <span className="members">Chat History</span>
                  <span>
                    <MarkChatReadIcon />{" "}
                  </span>
                </Card.Title>
                <Card.Body>
                  <div className="fw-bold fs-5">= {allMessage.length}</div>
                </Card.Body>
              </Card>
            </Col>
            {isError && (
              <div
                className=" w-50 margin-auto  mt-5 alert alert-danger"
                role="alert"
              >
                {isError}
              </div>
            )}
          </>
        )}
      </Row>
      <Row className="mt-5 ">
        <Col md={6}>
          <Form onSubmit={onSubmitHandler}>
            <Form.Label className="members fw-bold">
              Update Gpt Api Key One
            </Form.Label>
            <Form.Control
              onChange={(e) => setApiOne(e.target.value)}
              type="text"
              required
              placeholder="please insert api key"
            />
            <Button className="mt-3" type="submit">
              {apiOneLoader ? <Spinners /> : "Update"}
            </Button>
          </Form>
          {apiOneSuccess && (
            <div className="alert alert-primary mt-2" role="alert">
              {apiOneSuccess}
            </div>
          )}
        </Col>
        <Col md={6}>
          <Form onSubmit={onJsonHandler}>
            <Form.Label className="members fw-bold">
              Insert your Json api key
            </Form.Label>

            <div className="alert alert-danger mt-2" role="alert">
              Note : File must be in json format
            </div>

            <Form.Control
              onChange={onFileHandler}
              type="file"
              name="file"
              accept=".json"
              required
              placeholder="please insert json api key"
            />
            <Button className="mt-3" type="submit">
              {fileLoader ? <Spinners /> : "Update"}
            </Button>
          </Form>
          {fileSuccess && (
            <div className="alert alert-primary mt-2" role="alert">
              {fileSuccess}
            </div>
          )}
          {fileError && (
            <div className="alert alert-danger mt-2" role="alert">
              {fileError}
            </div>
          )}
        </Col>
      </Row>
      <Row className="mt-5 ">
        <Col md={6}>
          <Form onSubmit={onSubmitHandlerTwo}>
            <Form.Label className="members fw-bold">
              Update Gpt Api Key Two
            </Form.Label>
            <Form.Control
              onChange={(e) => setApiTwo(e.target.value)}
              type="text"
              required
              placeholder="please insert api key"
            />
            <Button className="mt-3" type="submit">
              {apiTwoLoader ? <Spinners /> : "Update"}
            </Button>
          </Form>
          {apiTwoSuccess && (
            <div className="alert alert-primary mt-2" role="alert">
              {apiTwoSuccess}
            </div>
          )}
        </Col>
      </Row>
      <Row className="mt-5 ">
        <Col md={6}>
          <Form onSubmit={onSubmitHandlerThree}>
            <Form.Label className="members fw-bold">
              Update Gpt Api Key Three
            </Form.Label>
            <Form.Control
              onChange={(e) => setApiThree(e.target.value)}
              type="text"
              required
              placeholder="please insert api key"
            />
            <Button className="mt-3" type="submit">
              {apiThreeLoader ? <Spinners /> : "Update"}
            </Button>
          </Form>
          {apiThreeSuccess && (
            <div className="alert alert-primary mt-2" role="alert">
              {apiThreeSuccess}
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default DashBoardAdmin;

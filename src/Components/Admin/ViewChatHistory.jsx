import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import AdminSpinners from "./AdminSpinners";
const ViewChatHistory = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [currentUser, setCurrent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [totalConver, setTotalConver] = useState([]);
  const [totalMessage, setTotalMessage] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_SERVER_URL + `/admin/getuser/${id}`,
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          }
        );
        setCurrent(data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setIsError(err.response.data.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_SERVER_URL + `/admin/getconver/${id}`,
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          }
        );
        setTotalConver(data);
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
          process.env.REACT_APP_SERVER_URL + `/admin/getmessage/${id}`,
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          }
        );
        setTotalMessage(data);
        setIsLoading(false);
      } catch (err) {
        setIsError(err.response.data.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="d-flex mt-5 justify-content-center">
          <AdminSpinners />
        </div>
      ) : (
        <>
          <div>
            <h2>
              Chat History For{" "}
              <span className="fw-bold text-primary">{currentUser.email}</span>{" "}
            </h2>
            <hr />
            <Row className="mt-5">
              <Col md={4}>
                <Card className="text-center p-2">
                  <Card.Title className="d-flex gap-2 justify-content-center align-items-center">
                    <span className="members">Total Conversations</span>
                    <span>
                      <MarkChatReadIcon />
                    </span>
                  </Card.Title>
                  <Card.Body>
                    <div className="fw-bold fs-5">= {totalConver.length}</div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center p-2">
                  <Card.Title className="d-flex gap-2 justify-content-center align-items-center">
                    <span className="members">Total Messages</span>
                    <span>
                      <QuestionAnswerIcon />
                    </span>
                  </Card.Title>
                  <Card.Body>
                    <div className="fw-bold fs-5">= {totalMessage.length}</div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center p-2">
                  <Card.Title className="d-flex gap-2 justify-content-center align-items-center">
                    <span className="members">Check Messages</span>
                    <span>
                      <QuestionAnswerIcon />
                    </span>
                  </Card.Title>
                  <Card.Body>
                    <Link
                      to={`/adminpannel/viewchathistory/filtermessage/${id}`}
                    >
                      <Button variant="danger">View All Chat history</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
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
    </>
  );
};

export default ViewChatHistory;

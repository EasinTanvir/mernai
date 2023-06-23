import React, { useEffect, useState } from "react";
import { Col, Row, Card, Container } from "react-bootstrap";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import axios from "axios";
import { useSelector } from "react-redux";
import AdminSpinners from "../Admin/AdminSpinners";
const FirstProfilePages = () => {
  const { user } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [totalConver, setTotalConver] = useState([]);
  const [totalMessage, setTotalMessage] = useState([]);
  const [spam, setSpam] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_SERVER_URL + `/user/getconver`,
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
          process.env.REACT_APP_SERVER_URL + `/user/getmessage`,
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_SERVER_URL + `/user/getspam`,
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          }
        );
        setSpam(data);
        setIsLoading(false);
      } catch (err) {
        setIsError(err.response.data.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <div className="d-flex justify-content-center mt-5">
          <AdminSpinners />{" "}
        </div>
      ) : (
        <>
          <Row className="mt-3">
            <Col md={4}>
              <Card className="text-center p-2">
                <Card.Title className="d-flex gap-2 justify-content-center align-items-center">
                  <span className="members">Total Conversations</span>
                  <span>
                    <QuestionAnswerIcon />
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
                  <span className="members">Messages</span>
                  <span>
                    <MarkChatReadIcon />{" "}
                  </span>
                </Card.Title>
                <Card.Body>
                  <div className="fw-bold fs-5">= {totalMessage.length}</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center p-2 border border-danger">
                <Card.Title className="d-flex gap-2 justify-content-center align-items-center">
                  <span className="members">Spam Messages</span>
                  <span>
                    <MarkChatReadIcon />{" "}
                  </span>
                </Card.Title>
                <Card.Body>
                  <div className="fw-bold fs-5">= {spam.length}</div>
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
          </Row>
        </>
      )}
    </Container>
  );
};

export default FirstProfilePages;

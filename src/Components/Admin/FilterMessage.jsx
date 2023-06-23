import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Row, Col, Card, Button, Container, Form } from "react-bootstrap";
import AdminSpinners from "./AdminSpinners";
import Spinners from "../Spinners";

const FilterMessage = () => {
  const [totalMessage, setTotalMessage] = useState([]);
  const [currentUser, setCurrent] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [spamSuccess, setSpamSuccess] = useState("");
  const [spamLoader, setSpamLoader] = useState(false);
  const [messageId, setMessageId] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();

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
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_SERVER_URL +
            `/admin/getmessage/${id}?search=${search ? search : ""}`,
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
  }, [id, search, spamSuccess]);

  const onSpamHandler = async (id) => {
    setMessageId(id);

    setSpamSuccess("");
    const sendData = {
      userId: id,
    };
    setSpamLoader(true);
    try {
      const { data } = await axios.patch(
        process.env.REACT_APP_SERVER_URL + `/admin/spam`,
        sendData,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );

      setSpamLoader(false);
      setSpamSuccess(data.message);
    } catch (err) {
      setSpamLoader(false);
      setIsError(err.response.data.message);
    }
  };
  return (
    <div>
      <h2>
        User : <span className="fw-bold text-primary">{currentUser.email}</span>{" "}
      </h2>
      <hr />
      <Row className="mt-2">
        <Container>
          <h2 className="fw-bold text-start">Search for messages</h2>
          <Form.Control
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4 p-3 w-50 border border-primary"
            placeholder="Search for messages"
            required
          />

          <>
            {isLoading ? (
              <div className="d-flex mt-5 justify-content-center">
                {" "}
                <AdminSpinners />
              </div>
            ) : (
              <>
                {totalMessage.length === 0 ? (
                  <Button>Sorry no Message Found</Button>
                ) : (
                  totalMessage.map((item, i) => (
                    <Col className="mb-2" key={item._id} md={12}>
                      <Row className="p-2">
                        <Col md={8}>
                          <div className="d-flex gap-1 ">
                            <div
                              style={
                                item.spam
                                  ? {
                                      border: "4px",
                                      borderStyle: "solid",
                                      borderColor: "red",
                                      padding: "2px",
                                    }
                                  : {}
                              }
                              className="d-flex flex-column"
                            >
                              <span>
                                <span className="fw-bold">User : </span>
                                <span>{item.user}</span>
                              </span>
                              <span>
                                <span className="fw-bold">Gpt : </span>
                                <span>{item.gpt}</span>
                              </span>
                            </div>
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className="d-flex justify-content-end">
                            <Button
                              onClick={() => onSpamHandler(item._id)}
                              className="d-flex gap-1 justify-content-center align-items-center"
                              variant={item.spam ? "danger" : "success"}
                            >
                              <span>
                                {" "}
                                {item.spam && <RemoveCircleOutlineIcon />}
                              </span>
                              <span>
                                {spamLoader ? (
                                  <>{item._id === messageId && <Spinners />}</>
                                ) : item.spam ? (
                                  "Unmark"
                                ) : (
                                  "Mark as Spam"
                                )}
                              </span>
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  ))
                )}
              </>
            )}
          </>
          {isError && (
            <div class="alert alert-danger" role="alert">
              {isError}
            </div>
          )}
        </Container>
      </Row>
    </div>
  );
};

export default FilterMessage;

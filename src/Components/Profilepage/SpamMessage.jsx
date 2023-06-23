import React, { useEffect, useState } from "react";
import { Col, Row, Card, Container, Button } from "react-bootstrap";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import axios from "axios";
import { useSelector } from "react-redux";
import AdminSpinners from "../Admin/AdminSpinners";

const SpamMessage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const { user } = useSelector((state) => state.auth);

  const [spam, setSpam] = useState([]);

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
      <h2>Your Spam Messages List</h2>
      <hr />

      <Row className="mt-5">
        <>
          {isLoading ? (
            <div className="d-flex justify-content-center mt-5">
              <AdminSpinners />{" "}
            </div>
          ) : (
            <>
              {spam.length === 0 ? (
                <Button className="w-50 m-auto">
                  No Spam Message Founds in your account
                </Button>
              ) : (
                <>
                  {spam.map((item) => (
                    <Col className="mb-2" key={item._id} md={8}>
                      <Card>
                        <Card.Title className=" p-2 text-danger">
                          {item.user}
                          <span className="ms-3">
                            {" "}
                            <FmdBadIcon />{" "}
                          </span>
                        </Card.Title>
                      </Card>
                    </Col>
                  ))}
                </>
              )}
            </>
          )}
        </>
        {isError && (
          <div
            className=" w-50 margin-auto  mt-5 alert alert-danger"
            role="alert"
          >
            {isError}
          </div>
        )}
      </Row>
      {spam.length != 0 && (
        <div className="mt-3">
          <div
            className=" w-50 margin-auto  mt-5 alert alert-danger"
            role="alert"
          >
            *If you have more than five spam messages your profile will be
            blocked by Admin
          </div>
        </div>
      )}
    </Container>
  );
};

export default SpamMessage;

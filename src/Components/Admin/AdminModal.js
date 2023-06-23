import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import Spinners from "../Spinners";
import { useNavigate } from "react-router-dom";

function AdminModal({ show, handleClose, email, editId }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [admin, setAdmin] = useState("");
  const [adminSuccess, setAdminSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setAdminSuccess("");
    setIsError("");

    const sendData = {
      admin,
      userId: editId,
    };
    setIsLoading(true);
    try {
      const { data } = await axios.patch(
        process.env.REACT_APP_SERVER_URL + "/admin/updateadmin",
        sendData,

        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      setAdminSuccess(data.user);
      setIsLoading(false);
      navigate("/adminpannel");
    } catch (err) {
      setIsError(err.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            User - <span className="fw-bold">{email}</span>{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mt-2">
              <Form.Label className="fw-bold fs-4">User Role</Form.Label>
              <Form.Check
                name="admin"
                label="Mark as Admin"
                onChange={(e) => setAdmin(e.target.checked)}
              />
            </Form.Group>
            <Button className="mt-4" type="submit">
              {isLoading ? <Spinners /> : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
        {adminSuccess && (
          <div
            className=" w-50 margin-auto  mt-5 alert alert-success"
            role="alert"
          >
            {adminSuccess}
          </div>
        )}{" "}
        {isError && (
          <div
            className=" w-50 margin-auto  mt-5 alert alert-danger"
            role="alert"
          >
            {isError}
          </div>
        )}
      </Modal>
    </>
  );
}

export default AdminModal;

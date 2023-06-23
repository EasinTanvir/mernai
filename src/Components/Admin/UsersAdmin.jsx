import axios from "axios";
import BlockIcon from "@mui/icons-material/Block";

import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Link } from "react-router-dom";
import AdminSpinners from "./AdminSpinners";
import Spinners from "../Spinners";
import AdminModal from "./AdminModal";
import { Admin_Clear, Update_Admin_User } from "../../store/actions";

const UsersAdmin = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [blockLoader, setBlockLoader] = useState(false);
  const [block, setBlock] = useState("");
  const [blockId, setBlockId] = useState("");

  const [isError, setIsError] = useState("");
  const { user } = useSelector((state) => state.auth);

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
  }, [block]);

  const onBlockController = async (id) => {
    setBlock("");
    setBlockId(id);
    const sendData = {
      userId: id,
    };
    setBlockLoader(true);
    try {
      const { data } = await axios.patch(
        process.env.REACT_APP_SERVER_URL + `/admin/blockuser`,
        sendData,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      setBlockLoader(false);
      setBlock(data.message);
    } catch (err) {
      setIsError(err.response.data.message);
      setBlockLoader(false);
    }
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (id) => {
    setShow(true);
    setEditId(id);
  };

  const filterEmail = allUsers.find((item) => item.extraId == editId);

  return (
    <div className="p-4">
      <h2>All Users List</h2>
      <hr />
      <Row className="mt-5">
        <>
          {isLoading ? (
            <div className="d-flex justify-content-center">
              <AdminSpinners />
            </div>
          ) : (
            <>
              {allUsers.map((item) => (
                <Col className="mb-3" key={item._id} md={12}>
                  <Card className="d-flex flex-row justify-content-between p-4">
                    <div className="left d-flex flex-column gap-1">
                      <span>
                        {" "}
                        Email : <span className="fw-bold">{item.email}</span>
                        <span>
                          {" "}
                          {item.isAdmin && (
                            <VerifiedUserIcon className="text-primary" />
                          )}
                        </span>
                      </span>
                      <span>
                        {" "}
                        Id : <span className="fw-bold">{item._id}</span>
                      </span>
                    </div>
                    <div className="d-flex gap-3">
                      {!item.isAdmin && (
                        <Link
                          to={`/adminpannel/viewchathistory/${item.extraId}`}
                        >
                          <Button
                            className="ps-4 pe-4 pt-2 pb-2"
                            variant="success"
                          >
                            View Chat History{" "}
                          </Button>
                        </Link>
                      )}

                      {!item.isAdmin && (
                        <Button
                          onClick={() => handleShow(item.extraId)}
                          className="ps-4 pe-4"
                        >
                          Edit{" "}
                        </Button>
                      )}

                      {!item.isAdmin && (
                        <Button
                          onClick={() => onBlockController(item.extraId)}
                          className="ps-3 pe-3 pt-2 pb-2"
                          variant={item.block ? "danger" : "dark"}
                        >
                          {item.block && <BlockIcon />}{" "}
                          <span>
                            {item.block
                              ? blockLoader
                                ? item.extraId == blockId && <Spinners />
                                : "Unblock"
                              : blockLoader
                              ? item.extraId == blockId && <Spinners />
                              : "Block User"}
                          </span>
                        </Button>
                      )}
                    </div>
                  </Card>
                </Col>
              ))}
              <AdminModal
                email={filterEmail?.email}
                show={show}
                editId={editId}
                handleClose={handleClose}
              />
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
    </div>
  );
};

export default UsersAdmin;

import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import StorageIcon from "@mui/icons-material/Storage";
import { useDispatch, useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import { Button as Buttons } from "react-bootstrap";
// import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { Log_Out } from "../store/actions";
import Dropdown from "react-bootstrap/Dropdown";

const Navbars = () => {
  const { pathname } = useLocation();
  const vet = pathname.split("/")[1];

  const [small, setSmaill] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(Log_Out());
    localStorage.clear();
  };

  const checkScreenSize = () => {
    setSmaill(window.innerWidth < 992);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  return (
    <div className="headers">
      <div className="containers">
        <div className="logo">
          {small && (
            <div className="extra">
              <nav className="my-navs">
                <ul>
                  <div className="menu">
                    <div className="ui simple dropdown item">
                      <StorageIcon
                        style={{ fontSize: "23px" }}
                        className="my-icon"
                      />

                      <div className="menu">
                        <div className="item ">
                          <Link to="/" className="active">
                            <li>Chat</li>
                          </Link>
                        </div>
                        <div className="item ">
                          <Link to="/pricing">
                            <li>Pricing</li>
                          </Link>
                        </div>
                        <div className="item ">
                          <Link to="/terms">
                            <li>Terms</li>
                          </Link>
                        </div>
                        <div className="item">
                          <Link to="/policy">
                            <li>Policy</li>
                          </Link>
                        </div>
                        <div className="item">
                          <Link to="/contract">
                            <li>Contract</li>
                          </Link>
                        </div>
                        <div className="item">
                          <Link to="/twitter">
                            <li>Twitter</li>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </ul>
              </nav>
            </div>
          )}

          <div className="logo-main">
            <Dropdown className="d-flex">
              <Dropdown.Toggle
                className="border-0 d-flex"
                style={{ backgroundColor: "transparent" }}
                id="dropdown-basic"
              >
                {vet == "vet" ? (
                  <span className="d-flex gap-2">
                    <img style={{ objectFit: "fill" }} src="/test.png" alt="" />
                    <h4>DR.McMEGA</h4>
                    <span className="bg-danger text-light ms-2 px-3 rounded d-flex justify-content-center align-items-center">
                      VET
                    </span>
                  </span>
                ) : (
                  <span className="d-flex gap-2">
                    <img style={{ objectFit: "fill" }} src="/test.png" alt="" />
                    <h4>DR.MEGA</h4>
                  </span>
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu className="p-2 rounded">
                {vet == "vet" ? (
                  <Dropdown.Item href="/" className="bg-dark py-2 rounded">
                    <span className="d-flex gap-2">
                      <img
                        style={{ objectFit: "fill" }}
                        src="/test.png"
                        alt=""
                      />
                      <h4>DR.MEGA</h4>
                    </span>
                  </Dropdown.Item>
                ) : (
                  <Dropdown.Item href="/vet" className="bg-dark p-2 rounded">
                    <span className="d-flex gap-2">
                      <img
                        style={{ objectFit: "fill" }}
                        src="/test.png"
                        alt=""
                      />
                      <h4>DR.McMEGA</h4>
                      <span className="bg-danger text-light ms-2 px-3 py-1 rounded d-flex justify-content-center align-items-center">
                        VET
                      </span>
                    </span>
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="list-items">
          {!small && (
            <ul>
              <li>
                <Link className="active" to="/">
                  Chat
                </Link>
              </li>
              <li>
                <Link bas to="/pricing">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/terms"> Terms</Link>
              </li>
              <li>
                <Link to="/policy"> Policy</Link>
              </li>
              <li>
                <Link to="/coontract"> Contracts</Link>
              </li>
              <li>
                <Link to="/twitter"> Twitter</Link>
              </li>
            </ul>
          )}
          {user.token ? (
            <div className="chakra mt-3">
              <Dropdown>
                <Dropdown.Toggle
                  style={{ backgroundColor: "transparent", border: "none" }}
                  id="dropdown-basic"
                >
                  <div
                    style={{ backgroundColor: "#0080ff" }}
                    className="ellepse"
                  >
                    <PersonIcon />
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item className="mb-2">
                    <Buttons variant="secondary" disabled>
                      {user.email}
                    </Buttons>
                  </Dropdown.Item>

                  <Dropdown.Item>
                    <Link to={`/profile/${user.id}`}>
                      <Buttons
                        className="w-100"
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          color: "black",
                        }}
                      >
                        View Profile
                      </Buttons>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item className="mt-3 mb-3">
                    <Buttons
                      className="w-100"
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "black",
                      }}
                    >
                      {" "}
                      Manage Billings
                    </Buttons>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    {user?.isAdmin && (
                      <Link to="/adminpannel">
                        <Buttons
                          className="w-100"
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "black",
                          }}
                        >
                          Admin Pannel
                        </Buttons>
                      </Link>
                    )}
                  </Dropdown.Item>
                  <Dropdown.Item className="mt-2">
                    <Buttons onClick={logOutHandler} className="w-100">
                      LogOut
                    </Buttons>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <div className="btns">
              <Link to="/login">
                <button>LOGIN / SIGNUP</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbars;

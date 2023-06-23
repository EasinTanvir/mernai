import React from "react";
import "./profile.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { Button, Card, Col, Row } from "react-bootstrap";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, Outlet } from "react-router-dom";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useDispatch, useSelector } from "react-redux";
import { Log_Out } from "../../store/actions";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const logOutHandler = () => {
    dispatch(Log_Out());
    localStorage.clear();
  };
  return (
    <div className="profile">
      <div className="l-dash">
        <div className="d-icons">
          <div>
            <AddHomeWorkIcon style={{ fontSize: "50px" }} />
          </div>
          <div>
            <span className="text-primary">Your Profile</span>
          </div>
        </div>
        <div className="dashboard">
          <Link to={`/profile/${user.id}`}>
            <div className="d-items1 d-flex gap-2">
              <DashboardIcon />
              <span>DashBoard</span>
            </div>
          </Link>

          <Link to={`/profile/${user.id}/user`}>
            <div className="d-items2 d-flex gap-2">
              <RecordVoiceOverIcon />
              <span>Profile</span>
            </div>
          </Link>
          <Link to={`/profile/${user.id}/spam-message`}>
            <div className="d-items2 d-flex gap-2">
              <RecordVoiceOverIcon />
              <span>Spam Messages</span>
            </div>
          </Link>

          <div>
            <Button onClick={logOutHandler} variant="primary">
              <LogoutIcon /> LogOut
            </Button>
          </div>
        </div>
      </div>
      <div className="r-dash">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfilePage;

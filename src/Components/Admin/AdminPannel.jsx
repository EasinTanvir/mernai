import React from "react";
import "../Profilepage/profile.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { Button } from "react-bootstrap";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, Outlet } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import { useDispatch, useSelector } from "react-redux";
import { Log_Out } from "../../store/actions";

const AdminPannel = () => {
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
            <AdminPanelSettingsIcon
              style={{ fontSize: "50px", color: "blue" }}
            />
          </div>
          <div>
            <span className="text-primary">Admin Pannel</span>
          </div>
        </div>
        <div className="dashboard">
          <Link to="/adminpannel">
            <div className="d-items1 d-flex gap-2">
              <DashboardIcon />
              <span>DashBoard</span>
            </div>
          </Link>
          <Link to="/adminpannel/users">
            <div className="d-items2 d-flex gap-2">
              <RecordVoiceOverIcon />
              <span>Users</span>
            </div>
          </Link>

          <Link to="/adminpannel/chat">
            <div className="d-items2 d-flex gap-2">
              <MarkChatReadIcon />
              <span>Chats</span>
            </div>
          </Link>
        </div>
      </div>
      <div className="r-dash">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPannel;

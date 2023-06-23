import React from "react";
import {
  unstable_HistoryRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Layout from "./Components/Layout";
import ChatBox from "./Components/ChatBox/ChatBox";
import Pricing from "./Components/Pricing";
import Terms from "./Components/Terms";
import Policy from "./Components/Policy";
import Contract from "./Components/Contract";
import Twitter from "./Components/Twitter";
import LogIn from "./Components/Authonication/LogIn";
import history from "./history";
import UpdatePassword from "./Components/UpdatePassword";
import ProfilePage from "./Components/Profilepage/ProfilePage";
import MyProfile from "./Components/Profilepage/MyProfile";
import FirstProfilePages from "./Components/Profilepage/FirstProfilePages";
import AdminPannel from "./Components/Admin/AdminPannel";
import DashBoardAdmin from "./Components/Admin/DashBoardAdmin";
import UsersAdmin from "./Components/Admin/UsersAdmin";

import ChatAdmin from "./Components/Admin/ChatAdmin";
import ViewChatHistory from "./Components/Admin/ViewChatHistory";
import FilterMessage from "./Components/Admin/FilterMessage";
import SpamMessage from "./Components/Profilepage/SpamMessage";
import Vet from "./Components/Vet/Vet";

const App = () => {
  return (
    <Router history={history}>
      <Layout>
        <Routes>
          <Route path="/" element={<ChatBox />} />
          <Route path="/pricing" element={<Pricing />} />{" "}
          <Route path="/terms" element={<Terms />} />{" "}
          <Route path="/policy" element={<Policy />} />{" "}
          <Route path="/contract" element={<Contract />} />
          <Route path="/twitter" element={<Twitter />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/vet" element={<Vet />} />
          <Route path="/updatepassword/:token" element={<UpdatePassword />} />
          <Route path="/profile/:id" element={<ProfilePage />}>
            <Route path="/profile/:id" element={<FirstProfilePages />} />
            <Route path="/profile/:id/user" element={<MyProfile />} />
            <Route path="/profile/:id/spam-message" element={<SpamMessage />} />
          </Route>
          <Route path="/adminpannel" element={<AdminPannel />}>
            <Route path="/adminpannel" element={<DashBoardAdmin />} />
            <Route path="/adminpannel/users" element={<UsersAdmin />} />
            <Route
              path="/adminpannel/viewchathistory/:id"
              element={<ViewChatHistory />}
            />{" "}
            <Route
              path="/adminpannel/viewchathistory/filtermessage/:id"
              element={<FilterMessage />}
            />
            <Route path="/adminpannel/chat" element={<ChatAdmin />} />
            <Route
              path="/adminpannel/chat/page/:pageNumber"
              element={<ChatAdmin />}
            />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

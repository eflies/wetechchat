import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React, { useState } from "react";
import { history } from "./history";
import TopBar from "./components/TopBar";
import RegistrationForm from "./components/RegistrationForm";
import LoginPage from "./components/LoginPage";
import ChatPage from "./components/ChatPage";
import FollowedList from "./components/FollowedList";
import LandingPage from "./components/LandingPage";
import ProfilePage from "./components/ProfilePage";
import Notes from "./components/Notes";

export const BASE_URL = process.env.REACT_APP_API_URL ?? "";

function App() {
  const [user, setUser] = useState(null);
  return (
    <Router history={history}>
      <TopBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />{" "}
        <Route path="/userProfile" element={<ProfilePage />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="followed" element={<FollowedList />} />
      </Routes>
    </Router>
  );
}
export default App;

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import socketIO from "socket.io-client";
import React, { useState } from "react";
import { history } from "./history";
import TopBar from "./components/TopBar";
import ProfileForm from "./components/ProfileForm";
import LoginPage from "./components/LoginPage";
import ChatPage from "./components/ChatPage";
import FollowedList from "./components/FollowedList";
import LandingPage from "./components/LandingPage";

export const BASE_URL = process.env.REACT_APP_API_URL ?? '';

function App() {
  const socket = socketIO.connect(BASE_URL);
  
  const [user, setUser] = useState(null);
  return (
    <Router history={history}>
      <TopBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<ProfileForm socket={socket} />} />
        <Route
          path="/login"
          element={<LoginPage socket={socket} setUser={setUser} />}
        />
        <Route
          path="/chat"
          element={
            // <ProtectedRoute isAllowed={user}>
            <ChatPage socket={socket} />
            /* </ProtectedRoute> */
          }
        />
        <Route
          path="followed"
          element={
            // <ProtectedRoute isAllowed={user}>
            <FollowedList socket={socket} />
            // </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
export default App;

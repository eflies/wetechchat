import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatBody from "./ChatBody";
import NewMessage from "./NewMessage";
import Card from "@mui/material/Card";
import axios from "axios";
import socketIO from "socket.io-client";
import { BASE_URL } from "../App";

const StyledCard = styled(Card)`
  width: 80%;
  margin: 60px auto;
  padding: 20px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    padding: 20px 20px;
  }
`;

const ChatPage = () => {
  const socket = socketIO.connect(BASE_URL);
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);

  const fetchMessages = async () => {
    const result = await axios(`${BASE_URL}/messages`);
    setMessages(result?.data?.messages || []);
  };

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      return setMessages([...messages, data]);
    });
    //add msg to db
  }, [socket, messages]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingStatus(data));
  }, [socket]);

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <StyledCard>
      <ChatBody
        socket={socket}
        messages={messages}
        lastMessageRef={lastMessageRef}
        typingStatus={typingStatus}
      />
      <NewMessage socket={socket} />
    </StyledCard>
  );
};

export default ChatPage;

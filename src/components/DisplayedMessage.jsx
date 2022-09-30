import React, { useState } from "react";
import styled from "styled-components";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import axios from "axios";
import { BASE_URL } from "../App";

const MessageUserSender = styled.div`
  background-color: rgb(194, 243, 194);
  max-width: 250px;
  padding: 10px;
  border-radius: 10px;
  margin-left: auto;
  font-size: 15px;
`;
const UserSenderName = styled.p`
  text-align: right;
`;
const MessageRecipient = styled.div`
  background-color: #f5ccc2;
  width: 300px;
  padding: 10px;
  border-radius: 10px;
  font-size: 15px;
  @media (max-width: 768px) {
    width: 200px;
  }
`;
const AuthorWrapper = styled.div`
  display: flex;
`;
const MessageWrapper = styled.div``;

const DisplayedMessage = ({ message, socket }) => {
  const username = localStorage.getItem("username");
  const isUserSender = username === message.messageAuthor;
  const [isMessageSaved, setIsMessageSaved] = useState(false);
  const handleSaveMessage = (e) => {
    e.preventDefault();

    const sendData = async () => {
      await axios.post(`${BASE_URL}/saveMessage`, {
        text: message.text,
        saver: username,
        socketID: socket.id,
        messageAuthor: message.messageAuthor,
        userId: "",
      });
    };
    sendData();
    setIsMessageSaved(true);
  };
  return (
    <div key={message.id}>
      {
        /*
          Your code should be here
        */
      }
    </div>
  );
};
export default DisplayedMessage;

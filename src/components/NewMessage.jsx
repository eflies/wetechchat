import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { BASE_URL } from "../App";
import axios from "axios";

const ChatFooter = styled.div`
  border-style: solid;
  padding: 20px;
  margin: 20px;
  border-radius: 5px;
  border-color: #191919;
  width: 100%;
  border-width: 0.5px;
`;
const StyledForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const StyledTextField = styled(TextField)`
  width: 60%;
  padding: 30px;
  margin: 10px !important;
`;
const StyledParagraph = styled.p`
  text-align: center;
`;
const NewMessage = ({ socket }) => {
  const [message, setMessage] = useState("");
  const messageAuthor = localStorage.getItem("username");
  const sendMessage = async () => {
    await axios.post(`${BASE_URL}/message`, {
      text: message,
      messageAuthor,
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && messageAuthor) {
      socket.emit("message", {
        text: message,
        messageAuthor: messageAuthor,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    sendMessage();
    setMessage("");
  };
  return (
    <ChatFooter>
      <StyledForm onSubmit={handleSendMessage}>
        <div>
          <StyledParagraph>{messageAuthor}</StyledParagraph>
          <PersonIcon sx={{ fontSize: 60 }} />
        </div>
        <StyledTextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          placeholder="Write message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <Button variant="contained" type="submit">
          Send
        </Button>
      </StyledForm>
    </ChatFooter>
  );
};

export default NewMessage;

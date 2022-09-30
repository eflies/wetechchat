import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "@mui/material/Card";
import axios from "axios";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import SavedMessage from "./SavedMessage";
import { BASE_URL } from "../App";

const StyledCard = styled(Card)`
  width: 80%;
  margin: 60px auto;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledParagraph = styled.p`
  font-size: 40px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
`;
const FollowedList = () => {
  const [savedMessages, setSavedMessages] = useState([]);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${BASE_URL}/savedMessages/${username}`);
      const savedMessages = result.data.savedMessages;
      const authors = result.data.authorsData;

      let authorsDic = {};
      authors.map(
        (author) =>
          (authorsDic = {
            ...authorsDic,
            [author.username]: author,
          })
      );

      const userMessages = savedMessages?.messages.map((message) => ({
        ...message,
        author: authorsDic[message.messageAuthor],
      }));

      setSavedMessages(userMessages);
    };
    fetchData();
  }, [username]);
  const onClick = () => {
    navigate("/chat");
  };
  return (
    <StyledCard>
      <ButtonWrapper>
        <Button onClick={onClick}>Back to chat</Button>
      </ButtonWrapper>
      <StyledParagraph>Saved messages</StyledParagraph>

      {savedMessages?.length>0? savedMessages.map((savedMessage) => (
        <SavedMessage message={savedMessage} key={savedMessage._id} />
      )): <>You have no saved messages</>}
    </StyledCard>
  );
};
export default FollowedList;

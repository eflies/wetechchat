import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { BASE_URL } from "../App";
import { useNavigate } from "react-router-dom";

const StyledCard = styled(Card)`
  width: 80%;
  margin: 60px auto;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledTextField = styled(TextField)`
  margin: 5px auto !important;
  width: 100%;
`;
const StyledDiv = styled.div`
  width: 80%;
  padding: 30px 0;
`;

const Notes = () => {
  const [firstWorkshopNotes, setFirstWorkshopNotes] = useState("");
  const [secondWorkshopNotes, setSecondWorkshopNotes] = useState("");
  const [talentMatchingNotes, setTalentMatchingNotes] = useState("");
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sendNotes = async () => {
      const result = await axios.post(`${BASE_URL}/notes/${username}`, {
        firstWorkshopNotes,
        secondWorkshopNotes,
        talentMatchingNotes,
      });
      if (result.data === "success") {
        navigate("/chat");
      }
    };
    sendNotes();
  };

  useEffect(() => {
    const getNotes = async () => {
      const result = await axios(`${BASE_URL}/notes/${username}`);
      
      setFirstWorkshopNotes(result.data.notes.firstWorkshopNotes);
      setSecondWorkshopNotes(result.data.notes.secondWorkshopNotes);
      setTalentMatchingNotes(result.data.notes.talentMatchingNotes);
    };
    getNotes();
  }, [username]);

  return (
    <StyledCard>
      {
        /*
          Your code should be here
        */
      }
    </StyledCard>
  );
};
export default Notes;

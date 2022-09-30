import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import IconInput from "./IconInput";
import axios from "axios";
import { BASE_URL } from "../App";

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
const RadioWrapper = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px dotted #00edcd;
  @media (max-width: 768px) {
    padding: 20px 20px;
  }
`;
const StyledRadioGroup = styled(RadioGroup)`
  display: flex !important;
  flex-direction: row !important;
  width: 60% !important;
  justify-content: space-between;
`;

const StyledError = styled.div`
  margin: 5px;
  color: red;
`;

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [animal, setAnimal] = useState();
  const [drink, setDrink] = useState();
  const [landscape, setLandscape] = useState();
  const [error, setError] = useState(undefined);

  const handleSubmit = async (e) => {
    setError(undefined);
    e.preventDefault();
    //submit and send to BE
    const sendData = async () => {
      const result = await axios.post(`${BASE_URL}/register`, {
        username,
        password,
        description,
        facebook,
        linkedin,
        animal,
        drink,
        landscape,
      });
      result.data === "success" && navigate("/login");
      result.data === "error" && setError(result.data);
    };
    sendData();
  };
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
export default RegistrationForm;

import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import { BASE_URL } from "../App";

const StyledCard = styled(Card)`
  width: 40%;
  margin: 200px auto;
  padding: 20px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    margin: 50px auto;
    width: 80%;
  }
`;
const StyledTextField = styled(TextField)`
  margin: 5px auto !important;
  width: 100%;
`;

const StyledError = styled.div`
  margin: 5px;
  color: red;
`;

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(undefined);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setError(undefined);
    e.preventDefault();
    const sendData = async () => {
      const result = await axios.post(`${BASE_URL}/login`, {
        username: login,
        password,
      });
      if (result.data === "success") {
        navigate("/");
        localStorage.setItem("username", login);
      } else {
        setError(result.data);
      }
    };
    sendData();
  };

  return (
    <StyledCard>
      <Typography variant="h3" component="h3">
        Login
      </Typography>
      <form>
        <StyledTextField
          id="outlined-basic"
          label="Username"
          key="username"
          variant="outlined"
          name="username"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />{" "}
        <StyledTextField
          id="outlined-basic"
          label="Password"
          key="password"
          variant="outlined"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>{" "}
      <Button variant="contained" type="submit" onClick={handleSubmit}>
        Login
      </Button>
      {error && <StyledError>{error}</StyledError>}
    </StyledCard>
  );
};
export default LoginPage;

import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProfileButton from "./ProfileButton";
import { useNavigate } from "react-router-dom";

  const TopBarWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    height: 110px;
    width: 100%;
    background-color: #191919;
    align-items: center;
  `;
  const StyledWWTLink = styled.a`
    text-decoration: none;
    font-size: 24px;
    font-weight: 700;
    color: #ff0a59;
    padding: 22px;
  `;
  const StyledLink = styled(Link)`
    text-decoration: none;
    font-size: 24px;
    font-weight: 700;
    color: #00edcd;
    padding: 22px;
  `;

  const StyledTypography = styled(Typography)`
    color: #00edcd;
    font-weight: 700;
  `;
  
const TopBar = () => {
  const navigate = useNavigate();

  const link = "https://techface.ch/wetechtogether/";
  const isUserLogedIn = localStorage.getItem("username");

  const logoutUser = () => {
    localStorage.removeItem("username");
    navigate("/");
  };
  const isLoginPage = window.location.href.split("/").includes("login"); 
  return (
    <TopBarWrapper>
      <StyledWWTLink href={link}>We Tech Together</StyledWWTLink>
      {isUserLogedIn ? (
        <div>
          <ProfileButton />
          <StyledTypography onClick={logoutUser}>Log out</StyledTypography>
        </div>
      ) : isLoginPage ? (
        <StyledLink to="/register">Register</StyledLink>
      ) : (
        <StyledLink to="/login">Login</StyledLink>
      )}
    </TopBarWrapper>
  );
};
export default TopBar;

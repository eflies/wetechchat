import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UserMenu from "./UserMenu";
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

const TopBar = () => {
  const navigate = useNavigate(); 
  const link = "https://techface.ch/wetechtogether/";
  const username = localStorage.getItem("username");

  const isLoginPage = window.location.href.split("/").includes("login");
  
  const onLogoutClick=()=>{
    localStorage.removeItem("username");
    navigate("/"); 
}
  return (
    <TopBarWrapper>
      <StyledWWTLink href={link}>We Tech Together</StyledWWTLink>
      {username ? (
        <UserMenu username={username} onLogoutClick={onLogoutClick}/>
      ) : isLoginPage ? (
        <StyledLink to="/register">Register</StyledLink>
      ) : (
        <StyledLink to="/login">Login</StyledLink>
      )}
    </TopBarWrapper>
  );
};
export default TopBar;

import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledProfile = styled.div`
  border-radius: 50%;
  background: white;
  height: 60px;
  width: 60px;
  display: flex;
  flex-direction: column;
`;
const StyledParagraph = styled.p`
  text-align: center;
  color: white;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 22px;
  cursor: pointer;
  margin-top: 10px;
`;
const ProfileButton = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const onClick = () => {
    navigate("/followed");
  };
  return (
    <Wrapper onClick={onClick}>
      <StyledProfile>
        <PersonIcon sx={{ fontSize: 60 }} />
      </StyledProfile>
      <StyledParagraph>{username}</StyledParagraph>
    </Wrapper>
  );
};

export default ProfileButton;

import { Card } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../App";

const IMG_SRC =
  "https://as2.ftcdn.net/v2/jpg/02/96/39/49/1000_F_296394926_47KWuovlxc7yzUqwqP0aNNXu8mC0BX76.jpg";

const StyledCard = styled(Card)`
  width: 80%;
  margin: 60px auto;
  padding: 20px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  display: flex;
  flex-direction: column;
  font-weight: 800;
  font-size: 20px;
  @media (max-width: 768px) {
    padding: 20px 20px;
  }
`;
const SmallCard = styled(Card)`
  width: 30%;
  margin: 60px auto;
  padding: 20px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ff0a59 !important;
  font-weight: 800;
  font-size: 24px;
`;
const StyledDivLogedOut = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledDivLogedIn = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledImg = styled.img`
  width: 200px;
  padding: 20px;
  align-self: center;
`;

const LandingPage = () => {
  const navigate = useNavigate();
  const [allUsersNumber, setAllUsersNumber] = useState(undefined);
  const [currentUserNumber, setCurrentUserNumber] = useState(undefined);
  const username = localStorage.getItem("username");
  const fetchUsersNumbers = async () => {
    const result = await axios(`${BASE_URL}/users/${username}`);
    setAllUsersNumber(result.data.allUsersNumber);
    setCurrentUserNumber(result.data.currentUserNumber);
  };
  useEffect(() => {
    if (username) {
      fetchUsersNumbers();
    }
  });

  return (
    <StyledCard>
      <>Welcome on our social app! Have fun while developing and using it</>
      <StyledDivLogedOut>
        {username ? (
          <StyledDivLogedIn>
            There is already {allUsersNumber} users and you are the{" "}
            {currentUserNumber} one!
            <StyledImg src={IMG_SRC} alt="yaay" />
            <SmallCard onClick={() => navigate("/chat")}>CHAT</SmallCard>
          </StyledDivLogedIn>
        ) : (
          <>
            <SmallCard onClick={() => navigate("/register")}>
              REGISTER
            </SmallCard>
            <SmallCard onClick={() => navigate("/login")}>LOGIN</SmallCard>
          </>
        )}
      </StyledDivLogedOut>
    </StyledCard>
  );
};
export default LandingPage;

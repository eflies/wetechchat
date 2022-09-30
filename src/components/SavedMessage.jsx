import React from "react";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import PetsIcon from "@mui/icons-material/Pets";
import LandscapeIcon from "@mui/icons-material/Landscape";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const SavedMessageWrapper = styled.div`
  border-style: solid;
  border-radius: 5px;
  border-width: 1px;
  width: 100%;
  margin: 10px;
  display: flex;
  flex-direction: row;
`;
const AuthorWrapper = styled.div`
  padding: 10px;
`;
const MessageWrapper = styled.div`
  padding: 10px;
  padding-left: 40px;
  font-style: italic;
`;
const InfoWrapper = styled("div")({
  position: "relative",
  display: "inline-block",
  borderBottom: "1px dotted black",
  ":hover span": {
    visibility: "visible",
  },
});

const ToolTipText = styled("span")({
  visibility: "hidden",
  width: "120px",
  backgroundColor: "#000",
  color: "#fff",
  textAlign: "center",
  borderRadius: "6px",
  padding: "5px 0",
  position: "absolute",
  zIndex: 1,
  bottom: "150%",
  left: "50%",
  marginLeft: "-60px",
  ":after": {
    content: '""',
    position: "absolute",
    top: "100%",
    left: "50%",
    marginLeft: "-5px",
    borderWidth: "5px",
    borderStyle: "solid",
    borderColor: "black transparent transparent transparent",
  },
});
const StyledTypography = styled(Typography)`
  color: #ff0a59;
  font-weight: 700 !important;
`;

const SMLinks = styled.div`
  padding-top: 10px;
`;

const SavedMessage = ({ message }) => {
  const facebookUsername = message?.messageAuthor.facebook; 
  const linkedInUsername=message?.messageAuthor.linkedin
  return (
    <SavedMessageWrapper>
      {
        /*
          Your code should be here
        */
      }
    </SavedMessageWrapper>
  );
};

export default SavedMessage;

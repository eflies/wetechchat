import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledButton = styled(Button)`
  font-size: 24px !important;
  padding: 10px !important;
  padding-right: 30px !important;
  color: #00edcd !important;
`;

const UserMenu = ({ username, onLogoutClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onProfileClick = () => {
    navigate("/userProfile");
    handleClose();
  };
  const onChatClick = () => {
    navigate("/chat");
    handleClose();
  };
  const onSavedMessagesClick = () => {
    navigate("/followed");
    handleClose();
  };
  const onNotesClick = () => {
    navigate("/notes");
    handleClose();
  };
  const handleLogoutClick = () => {
    onLogoutClick();
    handleClose();
  };
  return (
    <div>
      <StyledButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {username}
      </StyledButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/*<MenuItem onClick={onProfileClick}>Profile</MenuItem>*/}
        <MenuItem onClick={onChatClick}>Chat</MenuItem>
        {/*<MenuItem onClick={onSavedMessagesClick}>Saved messages</MenuItem>*/}
        {/*<MenuItem onClick={onNotesClick}>Notes </MenuItem>*/}
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
    </div>
  );
};
export default UserMenu;

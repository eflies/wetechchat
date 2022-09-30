import React from "react";
import DisplayedMessage from "./DisplayedMessage";
import styled from "styled-components";

const MainHeader = styled.header`
  width: 100%;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  justify-content: center;
  font-weight: 600;
`;

const MessageContainer = styled.div`
  width: 100%;
  height: 50vh;
  background-color: #fff;
  padding: 20px;
  overflow-y: scroll;
`;

const StyledParagraph = styled.p`
  font-size: 40px;
`;
const ChatBody = ({ messages, lastMessageRef, socket }) => {
  return (
    <>
      <MainHeader>
        <StyledParagraph>Feed</StyledParagraph>
      </MainHeader>

      <MessageContainer>
        {messages.map((message) => (
          <DisplayedMessage
            message={message}
            socket={socket}
            key={message._id}
          />
        ))}
        <div ref={lastMessageRef} />
      </MessageContainer>
    </>
  );
};

export default ChatBody;

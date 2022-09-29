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
const MessageStatus = styled.div`
  position: fixed;
  bottom: 50px;
  font-size: 13px;
  font-style: italic;
`;
const StyledParagraph = styled.p`
  font-size: 40px;
`;
const ChatBody = ({ messages, typingStatus, lastMessageRef, socket }) => {
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
            key={message.id}
          />
        ))}

        <MessageStatus>
          <p>{typingStatus}</p>
        </MessageStatus>
        <div ref={lastMessageRef} />
      </MessageContainer>
    </>
  );
};

export default ChatBody;

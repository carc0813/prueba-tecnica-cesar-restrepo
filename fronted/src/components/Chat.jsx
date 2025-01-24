import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch_messages, sendMessage } from "../redux/actions";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import {Box, Container } from "@mui/material";

const Chat = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages);
  const [input, setInput] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    dispatch(fetch_messages());
  }, [dispatch]);

  const handleSend = () => {
    if (input.trim()) {
      // Se estructura el mensaje con el formato correcto
      const message = {
        content: input,
        sender: "user",
        userId: parseInt(userId), // Asegúrate de que el userId sea un número
      };
      dispatch(sendMessage(message));
      setInput("");
  };
  }
  return (
    <Container>
      <Box sx={{ display: "flex", flexDirection: "column", height: "90vh" }}>
        <MessageList messages={messages} />
        <MessageInput
          input={input}
          setInput={setInput}
          handleSend={handleSend}
        />
      </Box>
    </Container>
  );
};

export default Chat;

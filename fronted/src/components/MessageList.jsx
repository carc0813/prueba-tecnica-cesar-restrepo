import React from "react";
import { List, ListItem, ListItemText, Box } from "@mui/material";

const MessageList = ({ messages }) => {
  // Renderiza la lista solo si hay mensajes
  if (!messages || messages.length === 0) {
    return <Box sx={{ textAlign: "center", marginTop: "1rem" }}>No messages yet</Box>;
  }

  return (
    <Box sx={{ flex: 1, overflowY: "auto", marginBottom: "1rem" }}>
      <List>
        {messages.map((msg,index) => (
          <ListItem key={index}>
            <ListItemText
              primary={msg.sender === "bot" ? "Chatbot" : "You"}
              secondary={msg.content}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MessageList;


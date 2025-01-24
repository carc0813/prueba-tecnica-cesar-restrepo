import React from "react";
import { Box, TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send"; // Importamos un ícono de envío



const MessageInput = ({ input, setInput, handleSend }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        padding: "8px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
      }}
    >
      {/* Campo de texto */}
      <TextField
        fullWidth
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        sx={{
          backgroundColor: "#fff",
          borderRadius: "8px",
        }}
      />
      {/* Botón de envío */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSend}
        endIcon={<SendIcon />} // Ícono al lado derecho
        sx={{
          textTransform: "none",
          padding: "8px 16px",
          borderRadius: "20px",
          boxShadow: "0px 3px 5px rgba(0,0,0,0.2)",
        }}
      >
        Send
      </Button>
    </Box>
  );
};

export default MessageInput;

// RegisterUser.js
import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";

const RegisterUser = ({ onRegister }) => {
  const [nombre, setNombre] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/register', { nombre });
      const { userId } = response.data;  // Get the userId after successful registration
      localStorage.setItem('userId', userId);  // Store userId in localStorage
      console.log("User registered successfully, userId:", userId);
      onRegister(userId);  // Call the callback to notify successful registration
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: "auto" }}>
      <TextField
        label="Nombre"
        variant="outlined"
        fullWidth
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        sx={{ marginBottom: 2 }}
      />
      <Button type="submit" variant="contained" fullWidth>Register</Button>
    </Box>
  );
};

export default RegisterUser;


import axios from "axios";
import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [nombre, setNombre] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Para mensajes de error
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reiniciar mensaje de error
    try {
      const response = await axios.post('http://localhost:3001/login', { nombre });

      if (response.data && response.data.userId) {
        const { userId } = response.data; // Obtener el userId
        localStorage.setItem("userId", userId); // Guardar el userId en localStorage
        console.log("Inicio de sesión exitoso, userId:", userId);

        // Redirigir al chat
        navigate("/chat");
      }
    } catch (error) {
      // Manejo de errores
      if (error.response && error.response.status === 404) {
        setErrorMessage("Usuario no encontrado. Por favor, verifica el nombre ingresado.");
      } else {
        setErrorMessage("Ocurrió un error durante el inicio de sesión. Inténtalo de nuevo.");
      }
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register"); // Redirigir al formulario de registro
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: "auto" }}>
      <Typography variant="h5" textAlign="center" sx={{ marginBottom: 2 }}>
        Iniciar Sesión
      </Typography>

      <TextField
        label="Nombre"
        variant="outlined"
        fullWidth
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        sx={{ marginBottom: 2 }}
      />

      <Button type="submit" variant="contained" fullWidth>
        Login
      </Button>

      {/* Botón para redirigir al registro */}
      <Button
        variant="text"
        fullWidth
        sx={{ marginTop: 2 }}
        onClick={handleRegisterRedirect}
      >
        ¿No tienes una cuenta? Regístrate
      </Button>

      {/* Mostrar mensaje de error si hay problemas durante el login */}
      {errorMessage && (
        <Typography sx={{ marginTop: 2, color: "red", textAlign: "center" }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default Login;




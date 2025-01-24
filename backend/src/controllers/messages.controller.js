const express = require('express');
const axios = require('axios');
const { User, Message } = require('../db');

// Retrieve all messages
const getMessages = async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving messages.' });
  }
};

// Create a new message
const createMessage = async (req, res) => {
  const { content, sender, userId } = req.body;

  if (!content || !sender || !userId) {
    return res
      .status(400)
      .json({ error: 'Content, sender, and userId are required.' });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const message = await Message.create({ content, sender, UserId: userId });
    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error saving the message.' });
  }
};

// Send a message to the chatbot

const chatWithBot = async (req, res) => {
  const { content, sender, userId } = req.body;
  console.log("Request received:", { userId, content });

  try {
    // Validación de datos de entrada
    if (!userId || !content) {
      return res.status(400).json({ error: 'userId and content are required' });
    }

    // Buscar al usuario en la base de datos
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Solicitar la respuesta del chatbot mediante una API externa
    const aiResponse = await axios.post(
      'http://pocki-api-env-1.eba-pprtwpab.us-east-1.elasticbeanstalk.com/api/getOpenaiResponse',
      { input: content }
    );

    // Validar la respuesta de la API externa
    if (!aiResponse.data || !aiResponse.data.choices || !aiResponse.data.choices[0]) {
      return res.status(500).json({ error: 'Invalid response from AI API' });
    }

    const botMessage = aiResponse.data.choices[0].message.content;

    // Guardar los mensajes en la base de datos
    await Message.create({
      content: content,  // Mensaje del usuario
      sender: 'user',
      UserId: userId,
    });

    await Message.create({
      content: botMessage,  // Respuesta del bot
      sender: 'bot',
      UserId: userId,
    });

    // Enviar la respuesta del bot al cliente
    res.status(200).json({ response: botMessage });

  } catch (error) {
    console.error("Error in chatWithBot:", error);

    // Manejo de errores de Axios
    if (error.response) {
      console.error("Axios error response:", error.response.data);
      return res.status(500).json({ error: 'Error in AI API response', details: error.response.data });
    }

    // Error general del servidor
    res.status(500).json({ error: 'An error occurred' });
  }
};


module.exports = {
  getMessages,
  createMessage,
  chatWithBot,
};

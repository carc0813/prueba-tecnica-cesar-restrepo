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
  const { userId, input } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const aiResponse = await axios.post(
      'http://pocki-api-env-1.eba-pprtwpab.us-east-1.elasticbeanstalk.com/api/getOpenaiResponse',
      { input }
    );

    const botMessage = aiResponse.data.choices[0].message.content;

    await Message.create({
      content: input,
      sender: 'user',
      UserId: userId,
    });

    await Message.create({
      content: botMessage,
      sender: 'bot',
      UserId: userId,
    });

    res.json({ response: botMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = {
  getMessages,
  createMessage,
  chatWithBot,
};

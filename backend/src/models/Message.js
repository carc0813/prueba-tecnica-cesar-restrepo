const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Message', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sender: {
      type: DataTypes.ENUM('user', 'bot'), // Identifica si el mensaje es del usuario o del bot
      allowNull: false,
    },
    timestamps: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
};

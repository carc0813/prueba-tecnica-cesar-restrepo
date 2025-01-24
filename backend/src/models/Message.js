const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('message', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // Genera automáticamente el ID
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING, // Contenido del mensaje
      allowNull: false,
    },
    sender: {
      type: DataTypes.STRING, // Puede ser 'user' o 'bot'
      allowNull: false,
    },
    timestamps: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
};

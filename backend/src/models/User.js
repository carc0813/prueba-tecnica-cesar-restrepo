const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // Genera automáticamente un valor incremental para el ID
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING, // El campo 'nombre' es obligatorio
      allowNull: false,
    },
  });
};

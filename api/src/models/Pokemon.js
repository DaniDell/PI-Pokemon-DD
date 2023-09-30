const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    imagen: {
      type: DataTypes.STRING, // la URL de la imagen
      allowNull: true, 
    },
    vida: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ataque: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    defensa: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    velocidad: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    altura: {
      type: DataTypes.FLOAT, // Numero con decimales
      allowNull: true,
    },
    peso: {
      type: DataTypes.FLOAT, // 
      allowNull: true,
    },
  },{timestamps: false});
};


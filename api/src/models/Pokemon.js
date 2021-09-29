const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Vida: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Fuerza: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Defensa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Velocidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Altura: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Peso: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Tipos: {
    //   type: DataTypes.JSON,
    //   allowNull: false,
    // },
    Imagen: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    }
  });
};

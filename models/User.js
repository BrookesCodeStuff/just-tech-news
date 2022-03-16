const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create the user model
class User extends Model {}

// Define table columns and configuration
User.init(
  {
    // Table column definitions go here
    // Define an id column
    id: {
      // Sequelize DataTypes objects define what type of data it is
      type: DataTypes.INTEGER,
      // Equivalent of SQLs 'NOT NULL' option
      allowNull: false,
      // Instruct that it is the Primary Key
      primaryKey: true,
      // Endable auto increment
      autoIncrement: true,
    },
    // Define a username column
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define an email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // There cannot be duplicate email addresses
      unique: true,
      // allowNull set to false, run data through validation
      validate: {
        isEmail: true,
      },
    },
    // Define a password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // Password must be at least 4 characters long
        len: [4],
      },
    },
  },
  {
    // Table configuration options go here
    // pass in connection
    sequelize,
    // Don't auto-create createdAt/UpdatedAt timestamps fields
    timestamps: false,
    // Don't pluralize name of database table
    freezeTableName: true,
    // Use underscores instead of camel-casing
    underscored: true,
    // Make model name stay lowercase in db
    modelName: 'user',
  }
);

module.exports = User;

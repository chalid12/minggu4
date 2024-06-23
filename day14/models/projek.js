'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class projek extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  projek.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT, 
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
    nodeJS: DataTypes.BOOLEAN,
    reactJS: DataTypes.BOOLEAN,
    nextJS: DataTypes.BOOLEAN,
    typeScript: DataTypes.BOOLEAN,
    startYear: DataTypes.INTEGER, 
    durationDays: DataTypes.INTEGER 
  }, {
    sequelize,
    modelName: 'projek',
  });
  console.log(projek); 
  return projek;
};
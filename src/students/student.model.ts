import { DataTypes, Sequelize } from "sequelize";
import db from "../config/database";

const StudentModel = db.define("student", {
  name: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.NUMBER,
  },
  mark1: {
    type: DataTypes.NUMBER,
  },
  mark2: {
    type: DataTypes.NUMBER,
  },
  mark3: {
    type: DataTypes.NUMBER,
  },
  resultStatus: {
    type: DataTypes.STRING,
  },
});

export default StudentModel;

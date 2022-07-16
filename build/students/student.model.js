"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const StudentModel = database_1.default.define("student", {
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    age: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    mark1: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    mark2: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    mark3: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    resultStatus: {
        type: sequelize_1.DataTypes.STRING,
    },
});
exports.default = StudentModel;

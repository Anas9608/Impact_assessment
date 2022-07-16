"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const student_controller_1 = __importDefault(require("./students/student.controller"));
const upload_controller_1 = __importDefault(require("./upload/upload.controller"));
const app = new app_1.default([new student_controller_1.default(), new upload_controller_1.default()]);
app.listen();

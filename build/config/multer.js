"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileStorage = exports.fileFilter = void 0;
const multer_1 = __importDefault(require("multer"));
const fileFilter = (req, file, cb) => {
    if (file.mimetype.includes("csv")) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
exports.fileFilter = fileFilter;
exports.fileStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => cb(null, "./src/resources/static/assets/uploads/"),
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    },
});

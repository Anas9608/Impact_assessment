"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_middleware_1 = __importDefault(require("../middlewares/upload.middleware"));
const fs_1 = __importDefault(require("fs"));
const student_model_1 = __importDefault(require("../students/student.model"));
const csv = __importStar(require("@fast-csv/parse"));
class UploadController {
    constructor() {
        this.path = "/upload";
        this.router = (0, express_1.Router)();
        this.uploadFile = upload_middleware_1.default;
        this.StudentModel = student_model_1.default;
        this.initializeRoutes = () => {
            this.router.post(`${this.path}/`, this.uploadFile.single("file"), (req, res) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    if (req.file == undefined) {
                        return res.status(400).send("Please upload a CSV file!");
                    }
                    let students = [];
                    let path = "./src/resources/static/assets/uploads/" + req.file.filename;
                    fs_1.default.createReadStream(path)
                        .pipe(csv.parse({ headers: true }))
                        .on("error", (error) => {
                        throw error.message;
                    })
                        .on("data", (row) => {
                        students.push(row);
                    })
                        .on("end", () => {
                        console.log(students);
                        this.StudentModel.bulkCreate(students)
                            .then(() => {
                            var _a;
                            res.status(200).send({
                                message: "Uploaded the file successfully: " +
                                    ((_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname),
                            });
                        })
                            .catch((error) => {
                            res.status(500).send({
                                message: "Fail to import data into database!",
                                error: error.message,
                            });
                        });
                    });
                }
                catch (error) {
                    console.log(error);
                    res.status(500).send({
                        message: "Could not upload the file: " + ((_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname),
                    });
                }
            }));
        };
        this.initializeRoutes();
    }
}
exports.default = UploadController;

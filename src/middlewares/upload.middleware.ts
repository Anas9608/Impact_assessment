import multer, { FileFilterCallback } from "multer";
import { fileStorage, fileFilter } from "../config/multer";

const uploadFile = multer({ storage: fileStorage, fileFilter: fileFilter });

export default uploadFile;

import multer, { FileFilterCallback } from "multer";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.includes("csv")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const fileStorage = multer.diskStorage({
  destination: (
    req: any,
    file: Express.Multer.File,
    cb: DestinationCallback
  ): void => cb(null, "./src/resources/static/assets/uploads/"),
  filename: (req: any, file: Express.Multer.File, cb: FileNameCallback) => {
    console.log(file.originalname);
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

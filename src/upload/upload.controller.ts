import { Router, Request, Response } from "express";
import Controller from "../interfaces/controller.interface";
import uploadFile from "../middlewares/upload.middleware";
import fs from "fs";
import StudentModel from "../students/student.model";
import * as csv from "@fast-csv/parse";

class UploadController implements Controller {
  public path: string = "/upload";
  public router: Router = Router();
  uploadFile = uploadFile;
  private StudentModel = StudentModel;
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.post(
      `${this.path}/`,
      this.uploadFile.single("file"),
      async (req: Request, res: Response) => {
        try {
          if (req.file == undefined) {
            return res.status(400).send("Please upload a CSV file!");
          }
          let students: any = [];
          let path =
            "./src/resources/static/assets/uploads/" + req.file.filename;

          fs.createReadStream(path)
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
                  res.status(200).send({
                    message:
                      "Uploaded the file successfully: " +
                      req.file?.originalname,
                  });
                })
                .catch((error) => {
                  res.status(500).send({
                    message: "Fail to import data into database!",
                    error: error.message,
                  });
                });
            });
        } catch (error) {
          console.log(error);
          res.status(500).send({
            message: "Could not upload the file: " + req.file?.originalname,
          });
        }
      }
    );
  };
}

export default UploadController;

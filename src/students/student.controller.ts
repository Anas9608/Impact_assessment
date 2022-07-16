import { Router, Request, Response } from "express";
import Controller from "../interfaces/controller.interface";
import StudentModel from "./student.model";
import StudentService from "./student.service";

class StudentController implements Controller {
  public router: Router = Router();
  public path: string = "/students";
  public Student = StudentModel;
  public StudentService = new StudentService();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.get(
      `${this.path}/:id/result`,
      async (req: Request, res: Response) => {
        try {
          const id: string = req.params.id;
          const student = await this.StudentService.studentById(id);
          res.status(200).send({ student });
        } catch (error) {
          console.log(error);
          res.status(500);
        }
      }
    );
    this.router.get(`${this.path}/`, async (req: Request, res: Response) => {
      let resultStatus: string | any = req.query.resultStatus;
      console.log(resultStatus);
      try {
        const studentPass = await this.StudentService.studentsByResultStatus(
          resultStatus
        );
        res.send({ studentPass });
      } catch (error) {
        res.send(400);
      }
    });
  };
}

export default StudentController;

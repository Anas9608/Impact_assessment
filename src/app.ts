import express, { Router } from "express";
import errorHandler from "./middlewares/error.middleware";
import morgan from "morgan";
import "dotenv/config";
import { Sequelize } from "sequelize";
import db from "./config/database";

import Controller from "./interfaces/controller.interface";
import process from "process";
import multer from "multer";
class App {
  public app = express.application;
  public router = Router();
  DB = db;
  constructor(controllers: Controller[]) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeErrorHandling();
    this.connectToDB();
    this.initializeControllers(controllers);
  }

  public listen = () => {
    this.app.listen(process.env.PORT, () => {
      console.log(`listening on`, process.env.PORT);
    });
  };

  private initializeMiddlewares = () => {
    this.app.use(express.json());
    this.app.use(
      morgan(":method :url :status :res[content-length] - :response-time ms")
    );
  };

  private connectToDB = async () => {
    //test DB
    this.DB.authenticate()
      .then(() => {
        console.log("database connected...");
      })
      .catch((error) => console.log("error: " + error));
  };

  private initializeControllers = (controllers: Controller[]) => {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  };

  private initializeErrorHandling = () => {
    this.app.use(errorHandler);
  };
}

export default App;

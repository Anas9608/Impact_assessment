import HttpException from "../exceptions/HttpException";
import { Request, Response, NextFunction } from "express";
function errorHandler(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = error.status;
  const message = error.message;
  res.status(status).send({ status, message });
}

export default errorHandler;

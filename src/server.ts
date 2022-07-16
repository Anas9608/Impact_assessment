import App from "./app";
import StudentController from "./students/student.controller";
import UploadController from "./upload/upload.controller";

const app = new App([new StudentController(), new UploadController()]);
app.listen();

import StudentDBManager from "./student.dbmanager";
class StudentService {
  public StudentDBManager = new StudentDBManager();
  constructor() {}

  studentById = async (id: string) => {
    return await this.StudentDBManager.getStudentById(id);
  };

  studentsByResultStatus = async (resultStatus: string) => {
    return await this.StudentDBManager.getStudentsByResult(resultStatus);
  };
}

export default StudentService;

import StudentModel from "./student.model";

class StudentDBManager {
  Student = StudentModel;
  constructor() {}

  getStudentById = async (id: string) => {
    return await this.Student.findByPk(id);
  };

  getStudentsByResult = async (resultStatus: string) => {
    return await this.Student.findAll({
      where: { resultStatus: `${resultStatus}` },
    });
  };
}

export default StudentDBManager;

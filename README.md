# Impact_assessment
A web application using node.js with PostgreSQL database to get student results, with the following
Models

Create students table with following columns
●	Id
●	Name
●	Age
●	Mark1
●	Mark2
●	Mark3

 APIs
●	/upload  - Upload a CSV file and insert into students table
●	/students/:id/result -  Get the result of the student by passing id
●	/students?resultStatus=passed/failed - get all the students passed/failed by passing the resultStatus querystring

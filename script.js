const studentData = [
  { name: "Max Hermann", role: "Fullstack Developer", grade: 5.4 },
  { name: "Anthony Egbe", role: "Cloud Specialist", grade: 4.9 },
];

const teachersData = [
  {
    name: "Hannes Buhler",
    role: "Javascript Expert",
    linkStudent: "studentsLink",
    linkClass: "classLink",
  },
  {
    name: "Ali SAYAR",
    role: "AWS Expert",
    linkStudent: "studentsLink",
    linkClass: "classLink",
  },
];
const classesData = [
  {
    name: "Javascript Expert",
    teacherName: "Hannes Buhler",
    linkStudent: "studentsLink",
    linkTeacher: "teacherLink",
  },
  {
    name: "AWS Expert",
    teacherName: "Ali SAYAR",
    linkStudent: "studentsLink",
    linkTeacher: "teacherLink",
  },
];
function displayStudents() {
  let mainContent = document.getElementById("content");
  mainContent.innerHTML = "";
  let studentsRow = document.createElement("div");
  studentsRow.innerHTML = "<h1>Students</h1>";
  studentData.forEach((student) => {
    studentsRow.innerHTML += `      
      <h2>${student.name}</h2>
      <h3>${student.role}</h3>
      <p>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </p>
      <p>Average Grade: ${student.grade}</p>`;
  });
  mainContent.appendChild(studentsRow);
}

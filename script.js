// Başlangıç verileri
let studentData = JSON.parse(localStorage.getItem("studentData")) || [
  { name: "Max Hermann", role: "Fullstack Developer", grade: 5.4 },
  { name: "Anthony Egbe", role: "Cloud Specialist", grade: 4.9 },
];

let teachersData = JSON.parse(localStorage.getItem("teachersData")) || [
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

let classesData = JSON.parse(localStorage.getItem("classesData")) || [
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
  // Mevcut içeriği temizle
  mainContent.innerHTML = "<h1>Students</h1>";

  // Flex container oluştur
  let studentsRow = document.createElement("div");
  studentsRow.classList.add("d-flex", "justify-content-around", "flex-wrap");

  studentData.forEach((student) => {
    // Her öğrenci için bir kart oluştur
    let studentCard = document.createElement("div");
    studentCard.classList.add("card", "m-2");
    studentCard.style.width = "18rem";
    studentCard.innerHTML = `
              <div class="card-body">
                  <h5 class="card-title">${student.name}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">${student.role}</h6>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" class="card-link">Average Grade: ${student.grade}</a>
              </div>
          `;
    studentsRow.appendChild(studentCard);
  });

  mainContent.appendChild(studentsRow);

  // Yeni öğrenci ekleme butonunu ekle
  let addButton = document.createElement("button");
  addButton.textContent = "Add New Student";
  addButton.onclick = formRows; // 'formRows' fonksiyonunu butona bağla
  addButton.classList.add("btn", "btn-primary", "mt-3"); // Bootstrap sınıfları eklendi
  mainContent.appendChild(addButton);
}
//
function formRows() {
  let mainContent = document.getElementById("content");
  mainContent.innerHTML = `
          <form id="addStudentForm">
              <input type="text" id="studentName" placeholder="Student Name" required>
              <input type="text" id="studentRole" placeholder="Student Role" required>
              <input type="number" id="studentGrade" placeholder="Student Grade" required>
              <button type="submit">Add Student</button>
          </form>
      `;

  //
  document
    .getElementById("addStudentForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const studentName = document.getElementById("studentName").value;
      const studentRole = document.getElementById("studentRole").value;
      const studentGrade = parseFloat(
        document.getElementById("studentGrade").value
      );

      const newStudent = {
        name: studentName,
        role: studentRole,
        grade: studentGrade,
      };
      studentData.push(newStudent);

      //
      localStorage.setItem("studentData", JSON.stringify(studentData));

      //
      displayStudents();
    });
}

//
document.addEventListener("DOMContentLoaded", function () {
  displayStudents();
});

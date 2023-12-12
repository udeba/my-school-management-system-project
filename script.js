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
    teacher: "Hannes Buhler",
    linkStudent: "studentsLink",
    linkTeacher: "teacherLink",
  },
  {
    name: "AWS Expert",
    teacher: "Ali SAYAR",
    linkStudent: "studentsLink",
    linkTeacher: "teacherLink",
  },
];

function displayMain() {
  let mainContent = document.getElementById("content");
  // Mevcut içeriği temizle
  mainContent.innerHTML = "";

  // Flex container oluştur
  let mainRow = document.createElement("div");
  mainRow.classList.add("d-flex", "justify-content-around", "flex-wrap");

  // Array uzunlukları için döngü
  const dataLengths = [
    classesData.length,
    studentData.length,
    teachersData.length,
  ];
  const dataTitles = ["Classes", "Students", "Teachers"];

  for (let index = 0; index < dataLengths.length; index++) {
    mainRow.innerHTML += `  
      <div class="card" style="width: 32rem;">
        <div class="card-body">
          <h5 class="card-title">${dataTitles[index]}</h5>
          <p class="card-text">Total: ${dataLengths[index]}</p>
        </div>
      </div>
    `;
  }

  mainContent.appendChild(mainRow);
}
function displayClasses() {
  let mainContent = document.getElementById("content");
  // Mevcut içeriği temizle
  mainContent.innerHTML = "<h1>Classes</h1>";

  // Flex container oluştur
  let classesRow = document.createElement("div");
  classesRow.classList.add("d-flex", "justify-content-around", "flex-wrap");

  classesData.forEach((classItem) => {
    // 'class' yerine 'classItem' kullanılıyor
    classesRow.innerHTML += `  
    <div class="card" style="width: 18rem;">
    <div class="card-body">
    <div class="d-flex justify-content-end">
      <button class="btn text-info btn-delete" data-class-name="${classItem.name}"><i class="bi bi-dash-circle"></i></button>
      <button class="btn btn-edit" data-class-name="${classItem.name}"><i class="bi bi-pencil-square"></i></button>
    </div>
      <h5 class="card-title">${classItem.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${classItem.teacher}</h6>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="card-link">Students</a>
      <a href="#" class="card-link">Teachers</a>
    </div>
  </div>
`;
    // Burada da fonksiyonları string olarak değil, link olarak eklemek istiyorsanız, uygun HTML yapısını oluşturmalısınız.
  });
  mainContent.appendChild(classesRow);
  let addButton2 = document.createElement("button");
  addButton2.innerHTML = `<i class="bi bi-plus-circle"></i>Add New Student`;
  addButton2.onclick = formClass; // 'formRows' fonksiyonunu butona bağla
  addButton2.classList.add("btn", "btn-add", "mt-3"); // Bootstrap sınıfları eklendi
  mainContent.appendChild(addButton2);
}
function formClass() {
  let mainContent = document.getElementById("content");
  mainContent.innerHTML = `
          <form id="addClassForm">
              <input type="text" id="classesName" placeholder="Class Name" required>
              <input type="text" id="classesTeacher" placeholder="Teacher Name" required>
              <button type="submit">Add Class</button>
          </form>
      `;

  //
  document
    .getElementById("addClassForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const className = document.getElementById("classesName").value;
      const teacherName = document.getElementById("classesTeacher").value;

      const newClass = {
        name: className,
        teacher: teacherName,
      };
      classesData.push(newClass);

      //
      localStorage.setItem("classesData", JSON.stringify(classesData));

      //
      displayClasses();
    });
}
//
function displayTeachers() {
  let mainContent = document.getElementById("content");
  // Mevcut içeriği temizle
  mainContent.innerHTML = "<h1>Teachers</h1>";

  // Flex container oluştur
  let teachersRow = document.createElement("div");
  teachersRow.classList.add("d-flex", "justify-content-around", "flex-wrap");

  teachersData.forEach((classItem) => {
    // 'class' yerine 'classItem' kullanılıyor
    teachersRow.innerHTML += `  
    <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${classItem.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${classItem.role}</h6>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="card-link">Students</a>
      <a href="#" class="card-link">Teachers</a>
    </div>
  </div>
`;
    // Burada da fonksiyonları string olarak değil, link olarak eklemek istiyorsanız, uygun HTML yapısını oluşturmalısınız.
  });
  mainContent.appendChild(teachersRow);
  let addButton3 = document.createElement("button");
  addButton3.textContent = "Add New Teacher";
  addButton3.onclick = formTeacher; // 'formRows' fonksiyonunu butona bağla
  addButton3.classList.add("btn", "btn", "mt-3"); // Bootstrap sınıfları eklendi
  mainContent.appendChild(addButton3);
}
function formTeacher() {
  let mainContent = document.getElementById("content");
  mainContent.innerHTML = `
          <form id="addTeacherForm">
              <input type="text" id="teachersName" placeholder="Teacher Name" required>
              <input type="text" id="teachersRole" placeholder="Teacher Role" required>
              <button type="submit">Add Teacher</button>
          </form>
      `;

  //
  document
    .getElementById("addTeacherForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const teacherName = document.getElementById("teachersName").value;
      const teacherRole = document.getElementById("teachersRole").value;

      const newTeacher = {
        name: teacherName,
        role: teacherRole,
      };
      teachersData.push(newTeacher);

      //
      localStorage.setItem("teachersData", JSON.stringify(teachersData));

      //
      displayTeachers();
    });
}
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
  addButton.classList.add("btn", "btn", "mt-3"); // Bootstrap sınıfları eklendi
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
// Ilk sayfa acildiginda home sayfsini yukleyen fonksiyonu cagirir.
document.addEventListener("DOMContentLoaded", function () {
  displayMain();
});

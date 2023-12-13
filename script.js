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

let mode = "add";
let oldClassName = "";

function displayMain() {
  let mainContent = document.getElementById("content");
  // Mevcut içeriği temizle
  mainContent.innerHTML = "";

  // Flex container oluştur
  let mainRow = document.createElement("div");
  mainRow.classList.add(
    "d-flex",
    "justify-content-center",
    "flex-wrap",
    "gap-5"
  );

  // Array uzunlukları için döngü
  const dataLengths = [
    classesData.length,
    studentData.length,
    teachersData.length,
  ];
  const dataTitles = [
    "number of classes",
    "number of students",
    "number of teachers",
  ];

  for (let index = 0; index < dataLengths.length; index++) {
    mainRow.innerHTML += `  
      <div class="card" style="width: 12rem;">
        <div class="card-home">
          <h6 class="card-text">${dataLengths[index]}</h6>
          <h6 class="card-title">${dataTitles[index]}</h6>
        </div>
      </div>
    `;
  }

  mainContent.appendChild(mainRow);
}
function displayClasses() {
  let mainContent = document.getElementById("content");
  // Mevcut içeriği temizle
  mainContent.innerHTML = `<h1>Classes</h1>`;

  // Flex container oluştur
  let classesRow = document.createElement("div");
  classesRow.classList.add(
    "d-flex",
    "justify-content-around",
    "flex-wrap",
    "gap-5"
  );

  classesData.forEach((classItem) => {
    // 'class' yerine 'classItem' kullanılıyor
    classesRow.innerHTML += `  
    <div class="card" style="width: 18rem;">
    <div class="card-body">
    <div class="d-flex justify-content-end">
      <button class="btn text-info btn-delete" data-class-name="${classItem.name}"><i class="bi bi-dash-circle"></i></button>
      <button class="btn text-info btn-edit" data-class-name="${classItem.name}"><i class="bi bi-pencil-square"></i></button>
    </div>
      <h5 class="card-title">${classItem.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${classItem.teacher}</h6>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="card-link link-students">Students</a>
      <a href="#" class="card-link link-teachers">Teachers</a>
    </div>
  </div>
`;
    // Burada da fonksiyonları string olarak değil, link olarak eklemek istiyorsanız, uygun HTML yapısını oluşturmalısınız.
  });
  mainContent.appendChild(classesRow);

  const btnDeletes = classesRow.querySelectorAll(".btn-delete");

  btnDeletes.forEach((btnDelete) => {
    btnDelete.addEventListener("click", function (e) {
      const btnDelete = e.target.closest(".btn-delete");
      const className = btnDelete.dataset.className;
      classesData = classesData.filter(
        (classObject) => classObject.name !== className
      );
      localStorage.setItem("classesData", JSON.stringify(classesData));
      btnDelete.closest(".card").remove();
    });
  });

  const btnEdits = classesRow.querySelectorAll(".btn-edit");

  btnEdits.forEach((btnEdit) => {
    btnEdit.addEventListener("click", (e) => {
      const btnEdit = e.target.closest(".btn-edit");
      const className = btnEdit.dataset.className;

      const foundedClass = classesData.find(
        (classObject) => classObject.name === className
      );

      mode = "update";
      oldClassName = foundedClass.name;
      formClass(foundedClass);
    });
  });
  const linkStudents = classesRow.querySelectorAll(".link-students");

  linkStudents.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      displayStudents();
    });
  });
  const linkTeachers = classesRow.querySelectorAll(".link-teachers");
  linkTeachers.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      displayTeachers();
    });
  });
  let addButton2 = document.createElement("button");
  addButton2.innerHTML = `<i class="bi bi-plus-circle"></i>Add New Class`;
  addButton2.onclick = function () {
    mode = "add";
    oldClassName = "";
    formClass();
  }; // 'formRows' fonksiyonunu butona bağla
  addButton2.classList.add("btn", "btn-add", "mx-auto"); // Bootstrap sınıfları eklendi
  mainContent.appendChild(addButton2);
}
function formClass(classObject) {
  let mainContent = document.getElementById("content");
  mainContent.innerHTML = `
          <form id="addClassForm">
              <input type="text" id="classesName" placeholder="Class Name" required value="${
                classObject ? classObject.name : ""
              }">
              <input type="text" id="classesTeacher" placeholder="Teacher Name" required value="${
                classObject ? classObject.teacher : ""
              }">
              <button type="submit">${
                classObject ? "Update" : "Add"
              } Class</button>
          </form>
      `;

  //
  document
    .getElementById("addClassForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const className = document.getElementById("classesName").value;
      const teacherName = document.getElementById("classesTeacher").value;

      if (mode === "add") {
        const newClass = {
          name: className,
          teacher: teacherName,
        };
        classesData.push(newClass);
      } else {
        const updatedClass = classesData.find(
          (classObject) => classObject.name === oldClassName
        );

        updatedClass.name = className;
        updatedClass.teacher = teacherName;
      }

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
  mainContent.innerHTML = `<h1>Teachers</h1>`;

  // Flex container oluştur
  let teachersRow = document.createElement("div");
  teachersRow.classList.add(
    "d-flex",
    "justify-content-around",
    "flex-wrap",
    "gap-5"
  );

  teachersData.forEach((classItem) => {
    // 'class' yerine 'classItem' kullanılıyor
    teachersRow.innerHTML += `  
    <div class="card" style="width: 18rem;">
    <div class="card-body">
    <div class="d-flex justify-content-end">
      <button class="btn text-info btn-delete" data-class-name="${classItem.name}"><i class="bi bi-dash-circle"></i></button>
      <button class="btn text-info btn-edit" data-class-name="${classItem.name}"><i class="bi bi-pencil-square"></i></button>
    </div>
      <h5 class="card-title">${classItem.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${classItem.role}</h6>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="card-link link-students">Students</a>
      <a href="#" class="card-link link-classes">Classes</a>
    </div>
  </div>
`;
    // Burada da fonksiyonları string olarak değil, link olarak eklemek istiyorsanız, uygun HTML yapısını oluşturmalısınız.
  });
  mainContent.appendChild(teachersRow);
  const btnDeletes = teachersRow.querySelectorAll(".btn-delete");
  btnDeletes.forEach((btnDelete) => {
    btnDelete.addEventListener("click", function (e) {
      const btnDelete = e.target.closest(".btn-delete");
      const className = btnDelete.dataset.className;
      teachersData = teachersData.filter(
        (classObject) => classObject.name !== className
      );
      localStorage.setItem("teachersData", JSON.stringify(teachersData));
      btnDelete.closest(".card").remove();
    });
  });
  const btnEdits = teachersRow.querySelectorAll(".btn-edit");

  btnEdits.forEach((btnEdit) => {
    btnEdit.addEventListener("click", (e) => {
      const btnEdit = e.target.closest(".btn-edit");
      const className = btnEdit.dataset.className;

      const foundedTeacher = teachersData.find(
        (classObject) => classObject.name === className
      );

      mode = "update";
      oldClassName = foundedTeacher.name;
      formTeacher(foundedTeacher);
    });
  });

  let addButton3 = document.createElement("button");
  addButton3.innerHTML = `<i class="bi bi-plus-circle"></i>Add New Teacher`;
  addButton3.onclick = function () {
    mode = "add";
    oldClassName = "";
    formTeacher();
  }; // 'formRows' fonksiyonunu butona bağla
  addButton3.classList.add("btn", "btn-add", "mt-3", "mx-auto"); // Bootstrap sınıfları eklendi
  mainContent.appendChild(addButton3);
}
function formTeacher(classObject) {
  let mainContent = document.getElementById("content");
  mainContent.innerHTML = `
          <form id="addTeacherForm">
          <input type="text" id="teachersName" placeholder="Teacher Name" required value="${
            classObject ? classObject.name : ""
          }">
          <input type="text" id="teachersRole" placeholder="Teacher Role" required value="${
            classObject ? classObject.role : ""
          }">
          <button type="submit">${
            classObject ? "Update" : "Add"
          } Teacher</button>
      </form>
  `;

  //
  document
    .getElementById("addTeacherForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const teacherName = document.getElementById("teachersName").value;
      const teacherRole = document.getElementById("teachersRole").value;
      if (mode === "add") {
        const newTeacher = {
          name: teacherName,
          role: teacherRole,
        };
        teachersData.push(newTeacher);
      } else {
        const updatedTeacher = teachersData.find(
          (classObject) => classObject.name === oldClassName
        );

        updatedTeacher.name = teacherName;
        updatedTeacher.role = teacherRole;
      }
      //
      localStorage.setItem("teachersData", JSON.stringify(teachersData));

      //
      displayTeachers();
    });
}
function displayStudents() {
  let mainContent = document.getElementById("content");
  // Mevcut içeriği temizle
  mainContent.innerHTML = `<h1>Students</h1>`;

  // Flex container oluştur
  let studentsRow = document.createElement("div");
  studentsRow.classList.add(
    "d-flex",
    "justify-content-around",
    "flex-wrap",
    "gap-5"
  );

  studentData.forEach((classItem) => {
    // 'class' yerine 'classItem' kullanılıyor
    studentsRow.innerHTML += `  
    <div class="card" style="width: 18rem;">
    <div class="card-body">
    <div class="d-flex justify-content-end">
      <button class="btn text-info btn-delete" data-class-name="${classItem.name}"><i class="bi bi-dash-circle"></i></button>
      <button class="btn text-info btn-edit" data-class-name="${classItem.name}"><i class="bi bi-pencil-square"></i></button>
    </div>
      <h5 class="card-title">${classItem.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${classItem.role}</h6>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="card-link">Average Grade: ${classItem.grade}</a>

    </div>
  </div>
`;
    // Burada da fonksiyonları string olarak değil, link olarak eklemek istiyorsanız, uygun HTML yapısını oluşturmalısınız.
  });

  mainContent.appendChild(studentsRow);
  const btnDeletes = studentsRow.querySelectorAll(".btn-delete");
  btnDeletes.forEach((btnDelete) => {
    btnDelete.addEventListener("click", function (e) {
      const btnDelete = e.target.closest(".btn-delete");
      const className = btnDelete.dataset.className;
      studentData = studentData.filter(
        (classObject) => classObject.name !== className
      );
      localStorage.setItem("studentData", JSON.stringify(studentData));
      btnDelete.closest(".card").remove();
    });
  });
  const btnEdits = studentsRow.querySelectorAll(".btn-edit");

  btnEdits.forEach((btnEdit) => {
    btnEdit.addEventListener("click", (e) => {
      const btnEdit = e.target.closest(".btn-edit");
      const className = btnEdit.dataset.className;

      const foundedStudent = studentData.find(
        (classObject) => classObject.name === className
      );

      mode = "update";
      oldClassName = foundedStudent.name;
      formStudent(foundedStudent);
    });
  });
  // Yeni öğrenci ekleme butonunu ekle

  let addButton = document.createElement("button");
  addButton.innerHTML = `<i class="bi bi-plus-circle"></i>Add New Student`;
  addButton.onclick = function () {
    mode = "add";
    oldStudentName = "";
    formStudent();
  };
  addButton.classList.add("btn", "btn-add", "mt-3", "mx-auto"); // Bootstrap sınıfları eklendi
  mainContent.appendChild(addButton);
}
//
function formStudent(classObject) {
  let mainContent = document.getElementById("content");
  mainContent.innerHTML = `
          <form id="addStudentForm">
              <input type="text" id="studentName" placeholder="Student Name" required value="${
                classObject ? classObject.name : ""
              }">
              <input type="text" id="studentRole" placeholder="Student Role" required value="${
                classObject ? classObject.role : ""
              }">
              <input step 0.1type="number" step="0.1"id="studentGrade" placeholder="Student Grade" required value="${
                classObject ? classObject.grade : ""
              }">
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
      if (mode === "add") {
        const newStudent = {
          name: studentName,
          role: studentRole,
          grade: studentGrade,
        };
        studentData.push(newStudent);
      } else {
        const updatedStudent = studentData.find(
          (classObject) => classObject.name === oldClassName
        );

        updatedStudent.name = studentName;
        updatedStudent.role = studentRole;
        updatedStudent.grade = studentGrade;
      }
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

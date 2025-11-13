// let student = []

// fetch("students.json")
//     .then(response => response.json())
//     .then (data => {
//         student = data;
//         console.log(`Data Loaded: ${student}`)
//     })
//     .catch (error => console.error('Error loading JSON:', error));

// const form = document.querySelector('form');
// const input = document.querySelector('input');
// const resultDiv = document.getElementById('result');
// const button = document.getElementById('buttons');

// button.addEventListener("click", function(event){
//     event.preventDefault();
//     const query = input.value.trim().toUpperCase();
//     const found = student.find(stu => 
//         stu.CODE.toUpperCase() === query || stu.NAME.toUpperCase().includes(query)
//     );

//     if (found){
//         resultDiv.innerHTML = `<p><strong>Name:</strong> ${found.NAME}</p>
//                                <p><strong>Code:</strong> ${found.CODE}</p>
//                                <p><strong>Country:</strong> ${found.COUNTRY}</p>
//                                <p><strong>Score:</strong> ${found.SCORE}</p>`;  
//     }else {
//         resultDiv.innerHTML = `<p style = "color = red">No student found with the provided code or name.</p>`;
//     }
// })

let students = [];

// Load data
fetch("students.json")
  .then((r) => r.json())
  .then((data) => {
    // Accept either an array or an object with { students: [...] }
    students = Array.isArray(data) ? data : (data.students || []);
    console.log("Data loaded. Count:", students.length);
    console.table(students);
  })
  .catch((err) => console.error("Error loading JSON:", err));

// DOM refs
const form = document.querySelector("form");
const input = document.querySelector("input");
const resultDiv = document.getElementById("result");
const button = document.getElementById("buttons"); // ensure the id matches your HTML

// Normalize helper (prevents toUpperCase errors)
const norm = (v) => String(v ?? "").trim().toUpperCase();

button.addEventListener("click", function (event) {
  event.preventDefault();

  const query = norm(input.value);
  if (!query) {
    resultDiv.innerHTML = `<p style="color: red">Please enter a name or code.</p>`;
    return;
  }

  if (!students.length) {
    resultDiv.innerHTML = `<p style="color: red">Data not loaded yet. Try again in a moment.</p>`;
    return;
  }

  // Safe search: handles missing CODE/NAME and partial name matches
  const found = students.find((stu) => {
    const code = norm(stu.CODE ?? stu.code);     // tolerate different key cases
    const name = norm(stu.NAME ?? stu.name);
    return code === query || name.includes(query);
  });

  if (found) {
    // Prefer either UPPER or lower keys—support both
    const NAME = found.NAMEOFCANDIDATE ?? found.name ?? "—";
    const CODE = found.CODE ?? found.code ?? "—";
    const COUNTRY = found.COUNTRY ?? found.country ?? "—";
    const SCORE = found.SCORE ?? found.score ?? "—";

    resultDiv.innerHTML = `
      <p><strong>Name:</strong> ${NAME}</p>
      <p><strong>Code:</strong> ${CODE}</p>
      <p><strong>Country:</strong> ${COUNTRY}</p>
      <p><strong>Score:</strong> ${SCORE}</p>
    `;
  } else {
    resultDiv.innerHTML = `<p style="color: red">No student found with the provided details.</p>`;
  }
});
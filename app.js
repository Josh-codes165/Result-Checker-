// // let student = []

// // fetch("students.json")
// //     .then(response => response.json())
// //     .then (data => {
// //         student = data;
// //         console.log(`Data Loaded: ${student}`)
// //     })
// //     .catch (error => console.error('Error loading JSON:', error));

// // const form = document.querySelector('form');
// // const input = document.querySelector('input');
// // const resultDiv = document.getElementById('result');
// // const button = document.getElementById('buttons');

// // button.addEventListener("click", function(event){
// //     event.preventDefault();
// //     const query = input.value.trim().toUpperCase();
// //     const found = student.find(stu =>
// //         stu.CODE.toUpperCase() === query || stu.NAME.toUpperCase().includes(query)
// //     );

// //     if (found){
// //         resultDiv.innerHTML = `<p><strong>Name:</strong> ${found.NAME}</p>
// //                                <p><strong>Code:</strong> ${found.CODE}</p>
// //                                <p><strong>Country:</strong> ${found.COUNTRY}</p>
// //                                <p><strong>Score:</strong> ${found.SCORE}</p>`;
// //     }else {
// //         resultDiv.innerHTML = `<p style = "color = red">No student found with the provided code or name.</p>`;
// //     }
// // })

// let students = [];

// // Load data
// fetch("students.json")
//   .then((r) => r.json())
//   .then((data) => {
//     // Accept either an array or an object with { students: [...] }
//     students = Array.isArray(data) ? data : (data.students || []);
//     console.log("Data loaded. Count:", students.length);
//     console.table(students);
//   })
//   .catch((err) => console.error("Error loading JSON:", err));

// // DOM refs
// const form = document.getElementById("searchForm");
// const input = document.querySelector("input");
// const resultDiv = document.getElementById("result");
// const button = document.getElementById("buttons"); // ensure the id matches your HTML

// // Normalize helper (prevents toUpperCase errors)
// const norm = (v) => String(v ?? "").trim().toUpperCase();

// button.addEventListener("click", function (event) {
//   event.preventDefault();

//   const query = norm(input.value);
//   if (!query) {
//     resultDiv.innerHTML = `<p style="color: red">Please enter a name or code.</p>`;
//     return;
//   }

//   if (!students.length) {
//     resultDiv.innerHTML = `<p style="color: red">Data not loaded yet. Try again in a moment.</p>`;
//     return;
//   }

//   // Safe search: handles missing CODE/NAME and partial name matches
//   const found = students.find((stu) => {
//     const code = norm(stu.CODE ?? stu.code);     // tolerate different key cases
//     const name = norm(stu.NAME ?? stu.name);
//     return code === query || name.includes(query);
//   });

//   if (found) {
//     // Prefer either UPPER or lower keys—support both
//     const NAME = found.NAMEOFCANDIDATE ?? found.name ?? "—";
//     const CODE = found.CODE ?? found.code ?? "—";
//     const COUNTRY = found.COUNTRY ?? found.country ?? "—";
//     const SCORE = found.SCORE ?? found.score ?? "—";

//     resultDiv.innerHTML = `
//       <p><strong>Name:</strong> ${NAME}</p>
//       <p><strong>Code:</strong> ${CODE}</p>
//       <p><strong>Country:</strong> ${COUNTRY}</p>
//       <p><strong>Score:</strong> ${SCORE}</p>
//     `;
//   } else {
//     resultDiv.innerHTML = `<p style="color: red">No student found with the provided details.</p>`;
//   }
// });
let students = [];
const statusMessage = document.getElementById("statusMessage");

if (statusMessage) {
  statusMessage.textContent = "Loading Results...";
}
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    students = data;
    console.log("Loaded Students:", students.length);
    if (statusMessage) {
      statusMessage.textContent = `Loaded ${students.length} records. You can search now.`;
    }
  })
  .catch((error) => {
    console.error("Error Loading students.json", error);
    if (statusMessage) {
      statusMessage.textContent =
        "Could not load result. Please Contact the Administrator.";
    }
  });

  function normalizeName(name){
    return String(name)
      .toUpperCase()
      .replace(/\s+/g, " ")
      .trim();
  }

const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const result = document.getElementById("result");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!students || students.length === 0) {
    result.textContent =
      "Results are still loading. Please wait a moment and try again";
    return;
  }
  let ent = input.value;
  const entry = ent.trim().toUpperCase();
  if (!entry || entry.length<1) {
    alert("Please enter a code or a name");
    return;
  }
  let foundStudent = students.find(
    (student) => student.CODE.toUpperCase() === entry
  );
  // if (!foundStudent) {
  //   foundStudent = students.find((student) =>
  //     student["NAME OF CANDIDATE"].toUpperCase().includes(entry)
  //   );
  // }
  if(!foundStudent){
    const nameParts = entry.split(/\s+/).filter(Boolean);
    if(nameParts.length < 2){
      result.textContent = "Please enter your Fullname (at least first name and surname) or use Code";
      return;
    }
    const normalizeEntryName = normalizeName(entry);
    foundStudent = students.find(student => normalizeName(student["NAME OF CANDIDATE"]) === normalizeEntryName);
  }
  if (foundStudent) {
    result.innerHTML = `<p> <strong>NAME:</strong> ${foundStudent["NAME OF CANDIDATE"]}</p>
    <p> <strong>CODE:</strong> ${foundStudent.CODE}</p>
    <p> <strong>COUNTRY:</strong> ${foundStudent.COUNTRY}</p>
    <p> <strong>SCORE:</strong> ${foundStudent.SCORE}</p>`;
  } else {
    result.innerHTML = `<p style = "color: red;">Opps!, No student Found</p>`;
  }
  input.value = "";
});
input.addEventListener("input", () => {
  result.textContent = " ";
});

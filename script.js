const TABLE_SIZE = 10;

const students = [
    { roll: 101, name: "Hemanth", branch: "CSE" },
    { roll: 112, name: "Nethaji", branch: "CSE" },
    { roll: 125, name: "Prashanth", branch: "ECE" },
    { roll: 135, name: "Uday", branch: "CSE" },
    { roll: 145, name: "Jeevan", branch: "IT" },
    { roll: 155, name: "Dileep", branch: "CSE" },

    // Collision examples
    { roll: 102, name: "Rohith", branch: "CSE" },
    { roll: 122, name: "Rakshith", branch: "ECE" }
];

let hashTable = [];

function createHashTable() {

    hashTable = [];

    for (let i = 0; i < TABLE_SIZE; i++) {
        hashTable[i] = [];
    }

    students.forEach(student => {

        const index = student.roll % TABLE_SIZE;

        hashTable[index].push(student);

    });
}


function displayHashTable() {

    const container = document.getElementById("hashTable");

    container.innerHTML = "";

    for (let i = 0; i < TABLE_SIZE; i++) {

        const bucket = document.createElement("div");

        bucket.className =
    hashTable[i].length > 1
        ? "bucket collision"
        : "bucket";

        bucket.innerHTML = `
    <div class="bucket-title">
        Bucket ${i}
    </div>

    ${
        hashTable[i].length > 1
            ? `<div class="collision-label">
                 ⚡ COLLISION: ${hashTable[i].length} records
               </div>`
            : ""
    }
`;

        hashTable[i].forEach(student => {

            bucket.innerHTML += `
                <div class="student">
                    <div class="student-name">
                        ${student.name}
                    </div>

                    <div class="student-roll">
                        Roll: ${student.roll}
                    </div>
                </div>
            `;

        });

        container.appendChild(bucket);
    }
}


function searchStudent() {

    const input = document.getElementById("rollInput").value;

    const result = document.getElementById("searchResult");

    const pipeline = document.getElementById("searchPipeline");

    if (input === "") {

        result.innerHTML = "⚠️ Please enter a roll number.";

        pipeline.innerHTML = "<div>Enter Roll Number</div>";

        return;
    }

    const roll = Number(input);

    const index = roll % TABLE_SIZE;

    const bucket = hashTable[index];

    const student = bucket.find(
        student => student.roll === roll
    );


    // RESULT

    if (student) {

        result.innerHTML = `
            <h3>✅ Student Found</h3>

            <br>

            <p><b>Name:</b> ${student.name}</p>

            <p><b>Roll Number:</b> ${student.roll}</p>

            <p><b>Branch:</b> ${student.branch}</p>
        `;

    } else {

        result.innerHTML = `
            <h3>❌ Student Not Found</h3>

            <p>
                Bucket ${index} was checked,
                but the record does not exist.
            </p>
        `;
    }


    // ANIMATION PIPELINE

    pipeline.innerHTML = `
        <div class="pipeline-step">
            🎯 Roll No: ${roll}
        </div>

        <div class="pipeline-arrow">→</div>

        <div class="pipeline-step">
            ⚙️ ${roll} % ${TABLE_SIZE} = ${index}
        </div>

        <div class="pipeline-arrow">→</div>

        <div class="pipeline-step">
            📦 Bucket ${index}
        </div>

        <div class="pipeline-arrow">→</div>

        <div class="pipeline-step">
            ${student ? "✅ Record Found" : "❌ Not Found"}
        </div>
    `;


    // SHOW EACH STEP ONE BY ONE

    const steps =
        pipeline.querySelectorAll(
            ".pipeline-step, .pipeline-arrow"
        );

    steps.forEach((step, i) => {

        setTimeout(() => {

            step.classList.add("show");

        }, i * 500);

    });

}
function startSearch() {

    document
        .getElementById("search")
        .scrollIntoView({
            behavior: "smooth"
        });

}


function showAlgorithm() {

    alert(
        "SmartHash uses Hashing with Separate Chaining. " +
        "Average search complexity is O(1)."
    );

}


createHashTable();

displayHashTable();
function runComparison() {

    const linear = document.getElementById("linearResult");
    const binary = document.getElementById("binaryResult");
    const hashing = document.getElementById("hashResult");

    linear.innerHTML = "Checking records one by one...";

    binary.innerHTML = "Dividing the search space...";

    hashing.innerHTML = "Calculating hash index...";


    setTimeout(() => {

        linear.innerHTML =
            "May check up to 1000 records.";

    }, 700);


    setTimeout(() => {

        binary.innerHTML =
            "Approximately 10 comparisons for 1000 records.";

    }, 1200);


    setTimeout(() => {

        hashing.innerHTML =
            "Directly jumps to the required bucket.";

    }, 1700);

}
function togglePresentation() {

    document.body.classList.toggle("presentation-mode");

    const button =
        document.querySelector(".presentation-btn");

    if (document.body.classList.contains("presentation-mode")) {

        button.innerHTML = "✕ Exit Presentation";

    } else {

        button.innerHTML = "🎤 Presentation Mode";

    }

}
function addStudent() {

    const roll =
        Number(document.getElementById("newRoll").value);

    const name =
        document.getElementById("newName").value.trim();

    const branch =
        document.getElementById("newBranch").value.trim();

    const result =
        document.getElementById("addResult");


    // VALIDATION

    if (!roll || !name || !branch) {

        result.innerHTML =
            "⚠️ Please fill all student details.";

        return;
    }


    // CHECK DUPLICATE

    const existingStudent =
        students.find(student => student.roll === roll);

    if (existingStudent) {

        result.innerHTML = `
            ❌ Roll Number ${roll} already exists.
        `;

        return;
    }


    // HASH CALCULATION

    const index = roll % TABLE_SIZE;


    // CREATE STUDENT

    const newStudent = {
        roll: roll,
        name: name,
        branch: branch
    };


    // ADD TO STUDENT LIST

    students.push(newStudent);


    // INSERT INTO HASH TABLE

    hashTable[index].push(newStudent);


    // COLLISION CHECK

    const collision =
        hashTable[index].length > 1;


    // REFRESH TABLE

    displayHashTable();


    // SHOW RESULT

    result.innerHTML = `
        <h3>✅ Student Added Successfully</h3>

        <br>

        <p>
            <b>Student:</b> ${name}
        </p>

        <p>
            <b>Roll Number:</b> ${roll}
        </p>

        <p>
            <b>Hash Calculation:</b>
            ${roll} % ${TABLE_SIZE} = ${index}
        </p>

        <p>
            📦 Inserted into Bucket ${index}
        </p>

        ${
            collision
            ? `
                <p class="collision-label">
                    ⚡ Collision Detected —
                    Separate Chaining Used
                </p>
              `
            : `
                <p>
                    ✓ No Collision
                </p>
              `
        }
    `;


    // CLEAR FORM

    document.getElementById("newRoll").value = "";
    document.getElementById("newName").value = "";
    document.getElementById("newBranch").value = "";

}
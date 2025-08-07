const questions = [
  {
    type: "single",
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    type: "multi",
    question: "Which of these are programming languages?",
    options: ["HTML", "Python", "CSS", "Java"],
    answer: ["Python", "Java"]
  },
  {
  type: "single",
  question: "Which keyword is used to declare a variable in JavaScript?",
  options: ["var", "int", "float", "define"],
  answer: "var"
},
{
  type: "multi",
  question: "Which of the following are JavaScript data types?",
  options: ["String", "Boolean", "Character", "Undefined"],
  answer: ["String", "Boolean", "Undefined"]
},
{
  type: "multi",
  question: "Which of the following are falsy values in JavaScript?",
  options: ["0", "false", "''", "null", "NaN", "undefined", "[]"],
  answer: ["0", "false", "''", "null", "NaN", "undefined"]
},
{
  type: "fill",
  question: "Fill in the blank: The function used to convert a string to an integer in JavaScript is ____.",
  answer: "parseInt"
},
{
  type: "fill",
  question: "Fill in the blank: JavaScript can be used to manipulate the ____ of a webpage.",
  answer: "DOM"
},
{
  type: "single",
  question: "Which method is used to add an element to the end of an array in JavaScript?",
  options: ["push()", "pop()", "shift()", "unshift()"],
  answer: "push()"
},
{
  type: "fill",
  question: "Fill in the blank: The keyword used to define a constant variable in JavaScript is ____.",
  answer: "const"
}
];

let currentIndex = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const optionsForm = document.getElementById("options");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const progressEl = document.getElementById("progress");

function renderQuestion() {
  const current = questions[currentIndex];
  answered = false;

  questionEl.textContent = current.question;
  optionsForm.innerHTML = "";
  progressEl.textContent = `Question ${currentIndex + 1} of ${questions.length}`;

  submitBtn.disabled = false;
  nextBtn.classList.add("hidden");

  if (current.type === "single") {
    current.options.forEach(option => {
      const label = document.createElement("label");
      label.className = "option-label";
      label.innerHTML = `
        <input type="radio" name="option" value="${option}" required />
        ${option}
      `;
      optionsForm.appendChild(label);
    });
  } else if (current.type === "multi") {
    current.options.forEach(option => {
      const label = document.createElement("label");
      label.className = "option-label";
      label.innerHTML = `
        <input type="checkbox" name="option" value="${option}" />
        ${option}
      `;
      optionsForm.appendChild(label);
    });
  } else if (current.type === "fill") {
    const input = document.createElement("input");
    input.type = "text";
    input.name = "fill";
    input.required = true;
    optionsForm.appendChild(input);
  }
}

function checkAnswer() {
  if (answered) return; // prevent double scoring
  const current = questions[currentIndex];
  let userAnswer;

  if (current.type === "single") {
    const selected = optionsForm.querySelector('input[name="option"]:checked');
    if (!selected) return alert("Please select an answer.");
    userAnswer = selected.value;
    if (userAnswer === current.answer) score++;

  } else if (current.type === "multi") {
    const selected = Array.from(
      optionsForm.querySelectorAll('input[name="option"]:checked')
    ).map(cb => cb.value);
    if (
      selected.length === current.answer.length &&
      selected.every(val => current.answer.includes(val))
    ) score++;

  } else if (current.type === "fill") {
    const userInput = optionsForm.querySelector('input[name="fill"]');
    if (!userInput || userInput.value.trim() === "") return alert("Please type your answer.");
    userAnswer = userInput.value.trim().toLowerCase();
    if (userAnswer === current.answer.toLowerCase()) score++;
  }

  answered = true;
  submitBtn.disabled = true;
  nextBtn.classList.remove("hidden");
}

function showResult() {
  document.getElementById("quiz-box").classList.add("hidden");
  resultEl.classList.remove("hidden");
  resultEl.innerHTML = `
    You scored <strong>${score}</strong> out of <strong>${questions.length}</strong>.
  `;
}

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  checkAnswer();
});

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
});

renderQuestion();

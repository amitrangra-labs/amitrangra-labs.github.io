async function loadPuzzle() {
  const response = await fetch("/assets/data/puzzles.json");
  const puzzles = await response.json();

  const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];

  document.getElementById("puzzle-question").textContent = puzzle.question;

  const statementsEl = document.getElementById("puzzle-statements");
  statementsEl.innerHTML = "";

  for (const key in puzzle.statements) {
    const p = document.createElement("p");
    p.innerHTML = `<strong>${key}</strong>: ${puzzle.statements[key]}`;
    statementsEl.appendChild(p);
  }

  const choicesEl = document.getElementById("puzzle-choices");
  choicesEl.innerHTML = "";

  puzzle.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => checkAnswer(choice, puzzle);
    choicesEl.appendChild(btn);
  });
}

function checkAnswer(choice, puzzle) {
  const result = document.getElementById("puzzle-result");

  if (choice === puzzle.answer) {
    result.innerHTML = `✅ Correct. ${puzzle.explanation}`;
  } else {
    result.innerHTML =
      "❌ Not quite. Try testing assumptions for contradictions.";
  }
}

document.addEventListener("DOMContentLoaded", loadPuzzle);

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "❌";
let board = ["", "", "", "", "", "", "", "", ""];
let running = true;

const winningConditions = [
  [0, 1, 2], // filas
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // columnas
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diagonales
  [2, 4, 6]
];

initializeGame();

function initializeGame() {
  cells.forEach(cell => cell.addEventListener("click", cellClicked));
  resetButton.addEventListener("click", resetGame);
  statusText.textContent = `Turno de: ${currentPlayer}`;
}

function cellClicked() {
  const cellIndex = this.getAttribute("data-index");

  if (board[cellIndex] !== "" || !running) {
    return;
  }

  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = (currentPlayer === "❌") ? "⭕" : "❌";
  statusText.textContent = `Turno de: ${currentPlayer}`;
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const condition = winningConditions[i];
    const a = board[condition[0]];
    const b = board[condition[1]];
    const c = board[condition[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `¡${currentPlayer} gana! 🎉`;
    running = false;
  } else if (!board.includes("")) {
    statusText.textContent = `¡Empate! 😅`;
    running = false;
  } else {
    changePlayer();
  }
}

function resetGame() {
  currentPlayer = "❌";
  board = ["", "", "", "", "", "", "", "", ""];
  running = true;
  statusText.textContent = `Turno de: ${currentPlayer}`;
  cells.forEach(cell => cell.textContent = "");
}

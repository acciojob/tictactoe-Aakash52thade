// Get input elements and sections
const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const submitBtn = document.getElementById("submit");

const inputSection = document.getElementById("input-section");
const gameSection = document.getElementById("game-section");
const messageDiv = document.getElementById("message");
const board = document.getElementById("board");

// Game state
let currentPlayer = "x"; // Lowercase to match Cypress tests
let player = { x: "", o: "" };
let gameOver = false;

const winningCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];

// Handle submit
submitBtn.addEventListener("click", function () {
  const p1 = player1Input.value.trim();
  const p2 = player2Input.value.trim();

  if (p1 === "" || p2 === "") {
    alert("Please enter both player names.");
    return;
  }

  player.x = p1;
  player.o = p2;

  inputSection.style.display = "none";
  gameSection.style.display = "block";
  messageDiv.textContent = `${player[currentPlayer]}, you're up`;
});

// Handle game click
board.addEventListener("click", function (event) {
  if (gameOver) return;

  const cell = event.target;
  if (cell.classList.contains("cell") && cell.textContent === "") {
    cell.textContent = currentPlayer;

   if (checkWinner(currentPlayer)) {
  messageDiv.textContent = `${player[currentPlayer]} congratulations you won!`; // NO COMMA!
  gameOver = true;
  return;
}
    const allFilled = [...document.querySelectorAll(".cell")].every(c => c.textContent !== "");
    if (allFilled) {
      messageDiv.textContent = "It's a draw!";
      gameOver = true;
      return;
    }

    currentPlayer = currentPlayer === "x" ? "o" : "x";
    messageDiv.textContent = `${player[currentPlayer]}, you're up`;
  }
});

// Check win
function checkWinner(symbol) {
  const filledCells = [...document.querySelectorAll(".cell")]
    .filter(cell => cell.textContent === symbol)
    .map(cell => parseInt(cell.id));

  return winningCombinations.some(combo =>
    combo.every(id => filledCells.includes(id))
  );
}

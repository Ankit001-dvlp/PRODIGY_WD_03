let currentPlayer = "X"; // X always starts
let gameBoard = ["", "", "", "", "", "", "", "", ""]; // 3x3 game grid
let gameActive = true; // Tracks whether the game is active or not
let statusElement = document.getElementById("gameStatus");
let cells = document.querySelectorAll(".cell");

// Winning combinations (indices in the gameBoard array)
const winningCombinations = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal from top-left to bottom-right
  [2, 4, 6], // Diagonal from top-right to bottom-left
];

const resetButton = document.getElementById("resetBtn");
resetButton.addEventListener("click", resetGame);

// Function to handle a cell click
function handleCellClick(event) {
  const cellIndex = event.target.getAttribute("data-index");

  // Only allow clicks on empty cells and if the game is active
  if (gameBoard[cellIndex] !== "" || !gameActive) return;

  // Mark the cell with the current player's symbol
  gameBoard[cellIndex] = currentPlayer;
  event.target.textContent = currentPlayer;

  // Check if the current player has won the game
  checkWin();

  // Switch players after every valid move
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Function to check for a win or a draw
function checkWin() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;

    if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameActive = false;
      // Highlight the winning cells
      document.querySelectorAll(".cell")[a].style.backgroundColor = "#4caf50";
      document.querySelectorAll(".cell")[b].style.backgroundColor = "#4caf50";
      document.querySelectorAll(".cell")[c].style.backgroundColor = "#4caf50";
      statusElement.textContent = `${gameBoard[a]} wins!`;
      return;
    }
  }

  // Check for a draw
  if (!gameBoard.includes("") && gameActive) {
    gameActive = false;
    statusElement.textContent = "It's a draw!";
  }
}

// Reset the game to start a new round
function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusElement.textContent = "";
  document.querySelectorAll(".cell").forEach(cell => {
    cell.textContent = "";
    cell.style.backgroundColor = "#f0f0f0";
  });
}

// Add event listeners to the cells
cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

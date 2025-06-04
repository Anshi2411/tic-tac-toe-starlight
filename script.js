const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('reset');
const xScore = document.getElementById('x-score');
const oScore = document.getElementById('o-score');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let scores = { X: 0, O: 0 };

const winCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function handleClick(e) {
  const index = e.target.getAttribute('data-index');
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer.toLowerCase());

  if (checkWinner()) {
    statusText.textContent = `🌟 Player ${currentPlayer} wins!`;
    scores[currentPlayer]++;
    updateScoreboard();
    triggerConfetti();
    statusText.classList.add("win");
    gameActive = false;
  } else if (board.every(cell => cell !== "")) {
    statusText.textContent = "💫 It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `🌠 Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  return winCombos.some(combo => combo.every(i => board[i] === currentPlayer));
}

function updateScoreboard() {
  xScore.textContent = scores.X;
  oScore.textContent = scores.O;
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = "🌠 Player X's turn";
  statusText.classList.remove("win");
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetBtn.addEventListener('click', resetGame);

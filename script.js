const form = document.getElementById('players-form');
const startBtn = document.getElementById('start-btn');
const gameBoard = document.getElementById('game-board');
const score = document.getElementById('score');

let currentPlayer = 'X';
let player1Name = '';
let player2Name = '';
let player1Score = 0;
let player2Score = 0;

function updateScore() {
  score.innerHTML = `${player1Name}: ${player1Score} - ${player2Name}: ${player2Score}`;
}

function checkWin() {
  const cells = gameBoard.getElementsByTagName('td');
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (cells[a].innerHTML === currentPlayer && cells[b].innerHTML === currentPlayer && cells[c].innerHTML === currentPlayer) {
      if (currentPlayer === 'X') {
        player1Score++;
      } else {
        player2Score++;
      }
      updateScore();
      alert(`${currentPlayer} ganhou!`);
      resetGame();
      return true;
    }
  }
  return false;
}

function resetGame() {
  const cells = gameBoard.getElementsByTagName('td');
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = '';
    cells[i].addEventListener('click', handleCellClick);
  }
  currentPlayer = 'X';
}

function handleCellClick(event) {
  const cell = event.target;
  cell.innerHTML = currentPlayer;
  cell.removeEventListener('click', handleCellClick);
  if (checkWin()) {
    return;
  }
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
}

function handleStart(event) {
  event.preventDefault();
  player1Name = document.getElementById('player1').value;
  player2Name = document.getElementById('player2').value;
  updateScore();
  gameBoard.style.display = 'table';
  form.style.display = 'none';
  const cells = gameBoard.getElementsByTagName('td');
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', handleCellClick);
  }
}
function handleBack(event) {
  event.preventDefault();
  gameBoard.style.display = 'none';
  form.style.display = 'block';
  player1Name = '';
  player2Name = '';
  player1Score = 0;
  player2Score = 0;
  updateScore();
  resetGame();
}

document.getElementById('back-btn').addEventListener('click', handleBack);

startBtn.addEventListener('click', handleStart);

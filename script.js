// script.js
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const messageElement = document.getElementById('message');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !isGameActive) {
        return;
    }

    updateCell(cell, index);
    checkWinner();
    if (isGameActive) {
        switchPlayer();
        if (currentPlayer === 'O') {
            aiMove();
        }
    }
};

const updateCell = (cell, index) => {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
};

const switchPlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateMessage();
};

const updateMessage = () => {
    if (isGameActive) {
        messageElement.textContent = `Player ${currentPlayer}'s turn`;
    }
};

const checkWinner = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        isGameActive = false;
        messageElement.textContent = `Player ${currentPlayer} has won!`;
    } else if (!board.includes('')) {
        isGameActive = false;
        messageElement.textContent = 'Game is a draw!';
    }
};

const aiMove = () => {
    let emptyCells = [];
    board.forEach((cell, index) => {
        if (cell === '') {
            emptyCells.push(index);
        }
    });

    if (emptyCells.length === 0) {
        return;
    }

    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const cell = document.querySelector(`.cell[data-index='${randomIndex}']`);
    updateCell(cell, randomIndex);
    checkWinner();
    if (isGameActive) {
        switchPlayer();
    }
};

const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
    messageElement.textContent = `Player ${currentPlayer}'s turn`;
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetBoard);
resetBoard(); 
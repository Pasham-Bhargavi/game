// script.js
document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusText = document.getElementById("status");
    const resetButton = document.getElementById("resetButton");
    let isXTurn = true;
    let board = ["", "", "", "", "", "", "", "", ""];

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleClick(event) {
        const cell = event.target;
        const index = cell.dataset.index;

        if (board[index] !== "") {
            return; // Cell already filled
        }

        board[index] = isXTurn ? "X" : "O";
        cell.textContent = board[index];
        isXTurn = !isXTurn;

        if (checkWinner()) {
            statusText.textContent = `Player ${isXTurn ? "O" : "X"} wins!`;
            cells.forEach(cell => cell.removeEventListener("click", handleClick));
        } else if (board.every(cell => cell !== "")) {
            statusText.textContent = "It's a tie!";
        } else {
            statusText.textContent = `Player ${isXTurn ? "X" : "O"}'s turn`;
        }
    }

    function checkWinner() {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }

    function resetGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        isXTurn = true;
        statusText.textContent = "Player X's turn";
        cells.forEach(cell => {
            cell.textContent = "";
            cell.addEventListener("click", handleClick);
        });
    }

    cells.forEach(cell => cell.addEventListener("click", handleClick));
    resetButton.addEventListener("click", resetGame);
});

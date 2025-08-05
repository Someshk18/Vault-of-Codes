let currentPlayer = "X";

function makeMove(cell) {
  if (cell.textContent === "") {
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer === "X" ? "red" : "blue");
    if (checkWinner()) {
      document.getElementById(
        "status"
      ).textContent = `Player ${currentPlayer} wins! 🎉`;
      disableBoard();
    } else if (isDraw()) {
      document.getElementById("status").textContent = "It's a draw!";
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      document.getElementById(
        "status"
      ).textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWinner() {
  const cells = document.querySelectorAll("td");
  const combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return combos.some(([a, b, c]) => {
    return (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    );
  });
}

function isDraw() {
  return [...document.querySelectorAll("td")].every(
    (cell) => cell.textContent !== ""
  );
}

function disableBoard() {
  document.querySelectorAll("td").forEach((cell) => (cell.onclick = null));
}

function restartGame() {
  const cells = document.querySelectorAll("td");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.className = "";
    cell.onclick = function () {
      makeMove(cell);
    };
  });
  currentPlayer = "X";
  document.getElementById("status").textContent = "Player X's turn";
}

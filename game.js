const board = document.getElementById("board");

// 보드 생성
function createBoard() {
  for (let row = 1; row <= 10; row++) {
    for (let col = 0; col < 10; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = String.fromCharCode(97 + col); // a~j
      board.appendChild(cell);

      // 플레이어1 코어 (2,e)~(3,f)
      if ((row === 2 || row === 3) && (col === 4 || col === 5)) {
        cell.classList.add("core1");
      }

      // 플레이어2 코어 (8,h)~(9,i)
      if ((row === 8 || row === 9) && (col === 7 || col === 8)) {
        cell.classList.add("core2");
      }
    }
  }
}

createBoard();

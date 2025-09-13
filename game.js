// game.js — 보드 생성 + 코어 위치 검사(디버깅용)
// 로드 시 createBoard() 자동 실행

const boardEl = document.getElementById('board');
const debugEl = document.getElementById('debugLog');
const statusEl = document.getElementById('status');
const btnReset = document.getElementById('btnReset');

function logDebug(s){
  const time = new Date().toLocaleTimeString();
  debugEl.innerHTML += `[${time}] ${s}<br>`;
  debugEl.scrollTop = debugEl.scrollHeight;
}

// 좌표 도우미: colIndex 0..9 -> letter 'a'..'j'
function colLetter(i){ return String.fromCharCode(97 + i); }

// 보드 생성. 기존 내용 초기화 후 새로 그림.
function createBoard(){
  // 초기화
  boardEl.innerHTML = '';

  for(let row = 1; row <= 10; row++){
    for(let col = 0; col < 10; col++){
      const cell = document.createElement('div');
      cell.className = 'cell';
      // 데이터 속성
      cell.dataset.row = String(row);
      cell.dataset.colIndex = String(col);            // 0..9 (내부검사용)
      cell.dataset.col = colLetter(col);              // 'a'..'j' (표시용)
      // 좌표 라벨
      const coord = document.createElement('div');
      coord.className = 'coord';
      coord.textContent = `${colLetter(col)}${row}`;
      cell.appendChild(coord);

      // 코어 표시: 요청된 좌표로 설정
      // 플레이어1 코어: (2,b) ~ (3,c) -> rows 2,3 cols b(1),c(2)
      if ((row === 2 || row === 3) && (col === 1 || col === 2)) {
        cell.classList.add('core1');
        cell.dataset.core = 'p1';
      }
      // 플레이어2 코어: (8,h) ~ (9,i) -> rows 8,9 cols h(7),i(8)
      if ((row === 8 || row === 9) && (col === 7 || col === 8)) {
        cell.classList.add('core2');
        cell.dataset.core = 'p2';
      }

      // 클릭 테스트용: 클릭하면 상태영역에 좌표 출력
      cell.addEventListener('click', ()=> {
        statusEl.textContent = `클릭: ${cell.dataset.col}${cell.dataset.row}`;
      });

      boardEl.appendChild(cell);
    }
  }

  // 디버그 검사 실행
  runSanityChecks();
}

// 디버그: 코어 셀 수와 좌표 매핑 검사
function runSanityChecks(){
  debugEl.innerHTML = ''; // 초기화
  // 1) 코어 개수 체크
  const core1Cells = boardEl.querySelectorAll('.core1');
  const core2Cells = boardEl.querySelectorAll('.core2');
  if(core1Cells.length !== 4){
    logDebug(`오류: 플레이어1 코어 셀 개수 = ${core1Cells.length} (예상 4)`);
  } else {
    logDebug('플레이어1 코어: 4셀 정상');
  }
  if(core2Cells.length !== 4){
    logDebug(`오류: 플레이어2 코어 셀 개수 = ${core2Cells.length} (예상 4)`);
  } else {
    logDebug('플레이어2 코어: 4셀 정상');
  }

  // 2) 좌표 매핑 샘플 체크: (2,b) 위치가 core1인지
  const sample1 = boardEl.querySelector(`.cell[data-row="2"][data-col="b"]`);
  if(!sample1) logDebug('오류: (2,b) 셀 없음(매핑 문제)');
  else logDebug(`(2,b) 클래스 목록: ${sample1.className}`);

  const sample2 = boardEl.querySelector(`.cell[data-row="3"][data-col="c"]`);
  if(!sample2) logDebug('오류: (3,c) 셀 없음(매핑 문제)');
  else logDebug(`(3,c) 클래스 목록: ${sample2.className}`);

  const sample3 = boardEl.querySelector(`.cell[data-row="8"][data-col="h"]`);
  const sample4 = boardEl.querySelector(`.cell[data-row="9"][data-col="i"]`);
  if(!sample3) logDebug('오류: (8,h) 셀 없음(매핑 문제)'); else logDebug(`(8,h) 클래스 목록: ${sample3.className}`);
  if(!sample4) logDebug('오류: (9,i) 셀 없음(매핑 문제)'); else logDebug(`(9,i) 클래스 목록: ${sample4.className}`);

  // 3) 중복 생성 검사: 보드 내부 셀 수가 100인지
  const cells = boardEl.querySelectorAll('.cell').length;
  if(cells !== 100){
    logDebug(`오류: 셀 총 개수 = ${cells} (예상 100)`);
  } else {
    logDebug('셀 총 개수: 100 (정상)');
  }

  logDebug('디버그 검사 완료.');
}

// 바인딩
btnReset.addEventListener('click', ()=> { createBoard(); logDebug('수동 리셋 실행'); });

// 키보드 단축: R 키로 리셋
window.addEventListener('keydown', (e)=>{
  if(e.key === 'r' || e.key === 'R'){ createBoard(); logDebug('키보드 리셋 (R)'); }
});

// 최초 생성
createBoard();

const grid = document.getElementById('grid');
const message = document.getElementById('message');
let selected = null;

let layout = [
  ['A', '', '', '', ''],
  ['M', '', 'E', '', ''],
  ['', 'K', 'L', '', ''],
  ['S', 'A', 'K', 'L', ''],
  ['', '', '', '', 'e']
];

function renderGrid() {
  grid.innerHTML = '';
  layout.forEach((row, i) => {
    row.forEach((cell, j) => {
      const div = document.createElement('div');
      div.classList.add('cell');
      if (cell === '') div.classList.add('empty');
      div.textContent = cell;
      div.dataset.row = i;
      div.dataset.col = j;

      if (selected && selected.row == i && selected.col == j) {
        div.classList.add('selected');
      }

      div.onclick = () => handleClick(i, j);
      grid.appendChild(div);
    });
  });
}

function handleClick(i, j) {
  const value = layout[i][j];

  if (value && value !== '') {
    selected = { row: i, col: j };
  } else if (selected) {
    layout[i][j] = layout[selected.row][selected.col];
    layout[selected.row][selected.col] = '';
    selected = null;
    checkWin();
  }

  renderGrid();
}

function checkWin() {
  const target = 'SELMAK';
  const rows = layout.map(r => r.join('')).join('\n');
  const cols = [0,1,2,3,4].map(j => layout.map(r => r[j]).join('')).join('\n');
  if (rows.includes(target) && cols.includes(target)) {
    message.textContent = '🎉 Bravo ! Vous avez réussi !';
  } else {
    message.textContent = '';
  }
}

renderGrid();

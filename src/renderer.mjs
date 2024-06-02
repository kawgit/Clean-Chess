import { Dummy, Engine } from './lib/agent.mjs';
import { Game } from './lib/game.mjs';

const consoleInputElement = document.getElementById('console-input');
const consoleSubmitElement = document.getElementById('console-submit');
const consoleLogElement = document.getElementById('console-log');

function consoleSubmit() {
  window.api.send(consoleInputElement.value + '\n');
  consoleLogElement.innerText += consoleInputElement.value + '\n';
  consoleInputElement.value = '';
}

consoleInputElement.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    consoleSubmit();
  }
});

consoleSubmitElement.addEventListener('click', consoleSubmit);

window.api.onrecieve((message) => {
  consoleLogElement.innerText += message;
});

let board = new Chessboard('myBoard', {
  draggable: true,
  dropOffBoard: 'trash',
  sparePieces: true,
});

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    board.start();
  }, 400);
});

$('#startBtn').on('click', board.start);
$('#clearBtn').on('click', board.clear);
$('#goBtn').on('click', async function () {
  let agent0 = new Dummy('Random Player 0');
  let agent1 = new Dummy('Random Player 1');

  let game = new Game(agent0, agent1, 'myBoard');

  while (!game.state.isGameOver()) {
    console.log(game.state.fen());
    await game.go();
  }
});

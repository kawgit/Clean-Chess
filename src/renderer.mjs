import { Dummy, Engine } from './lib/agent.mjs';
import { Game } from './lib/game.mjs';

const consoleInputElement = document.getElementById('console-input');
const consoleSubmitElement = document.getElementById('console-submit');
const consoleLogElement = document.getElementById('console-log');

function consoleSubmit() {
  window.api.send(consoleInputElement.value + '\n');
  consoleLogElement.innerText += consoleInputElement.value + '<br>';
  consoleInputElement.value = '';
}

consoleInputElement.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    consoleSubmit();
  }
});

consoleSubmitElement.addEventListener('click', consoleSubmit);

function baseCallback(message) {
  let text =
    consoleLogElement.innerHTML + '<br>' + message.replace('\n', '<br>');

  let lines = text.split('<br>').filter((line) => line !== '');

  if (lines.length > 10) {
    lines.splice(0, lines.length - 10);
  }

  consoleLogElement.innerHTML = lines.join('<br>');
}

window.api.setCallback(baseCallback);

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
  // let agent1 = new Dummy('Random Player 1');
  let agent1 = new Engine('Random Player 1', window.api, baseCallback);

  let game = new Game(agent0, agent1, 'myBoard');

  while (!game.state.isGameOver()) {
    await game.go();
  }
});

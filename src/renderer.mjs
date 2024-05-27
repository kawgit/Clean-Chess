import { Dummy, Engine } from './lib/agent.mjs';
import { Game } from './lib/game.mjs';

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
  let agent1 = new Engine('Random Player 1', window.api);

  let game = new Game(agent0, agent1, 'myBoard');

  while (!game.state.isGameOver()) {
    console.log(game.state.fen());
    await game.go();
  }
});

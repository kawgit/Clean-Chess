import { Agent, Dummy } from './lib/agent.mjs';

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
  let state = new State();
  board.start();

  let agent0 = new Dummy('Random Player 0');
  let agent1 = new Dummy('Random Player 1');

  while (!state.isGameOver()) {
    console.log(state.turn());
    const move = await (state.turn() == 'w'
      ? agent0.go(state)
      : agent1.go(state));
    state.move(move);
    if (
      move.flags.includes('e') ||
      move.flags.includes('p') ||
      move.flags.includes('k') ||
      move.flags.includes('q')
    ) {
      board.move(`${move.from}-${move.to}`);
      board.position(move.after, false);
    } else {
      board.move(`${move.from}-${move.to}`);
    }
    await sleep(100);
  }
});

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

  while (!state.isGameOver()) {
    const moves = state.moves({ verbose: true });
    const move = moves[Math.floor(Math.random() * moves.length)];
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
    window.api.send(state.fen());
  }
});

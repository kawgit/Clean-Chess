export class Game {
  constructor(agent0, agent1, board_id = '') {
    this.agent0 = agent0;
    this.agent1 = agent1;
    this.board = board_id
      ? new Chessboard('myBoard', {
          draggable: true,
          dropOffBoard: 'trash',
          sparePieces: true,
        })
      : null;
    this.board.start();
    this.state = new State();
  }

  do(move) {
    this.state.move(move);

    if (this.board == null) return;

    if (
      move.flags.includes('e') ||
      move.flags.includes('p') ||
      move.flags.includes('k') ||
      move.flags.includes('q')
    ) {
      this.board.move(`${move.from}-${move.to}`);
      this.board.position(move.after, false);
    } else {
      this.board.move(`${move.from}-${move.to}`);
    }
  }

  async go() {
    const move = await (this.state.turn() == 'w'
      ? this.agent0.go(this.state, 100)
      : this.agent1.go(this.state, 300));
    this.do(move);
  }
}

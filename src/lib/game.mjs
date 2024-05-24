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

  async do(move) {
    const moveInfo = this.state.move(move);

    if (this.board == null) return;

    if (
      moveInfo.flags.includes('e') ||
      moveInfo.flags.includes('p') ||
      moveInfo.flags.includes('k') ||
      moveInfo.flags.includes('q')
    ) {
      await this.board.move(`${moveInfo.from}-${moveInfo.to}`);
      await this.board.position(moveInfo.after, false);
    } else {
      await this.board.move(`${moveInfo.from}-${moveInfo.to}`);
    }
  }

  async go() {
    const move = await (this.state.turn() == 'w'
      ? this.agent0.go(this.state, 700)
      : this.agent1.go(this.state, 1600));
    this.do(move);
  }
}

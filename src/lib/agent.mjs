export class Agent {
  constructor(type, name) {
    this.name = name;
    this.type = type;
  }
}

export class Dummy extends Agent {
  constructor(name) {
    super('dummy', name);
  }
  go(state) {
    const moves = state.moves({ verbose: true });
    return moves[Math.floor(Math.random() * moves.length)];
  }
}

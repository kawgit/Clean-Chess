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
  async go(state, movetime) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(state.fen());
        const moves = state.moves({ verbose: true });
        resolve(moves[Math.floor(Math.random() * moves.length)]);
      }, movetime);
    });
  }
}

export class Engine extends Agent {
  constructor(name, api) {
    super('engine', name);
    this.api = api;
  }
  async go(state, movetime) {
    return await new Promise((resolve) => {
      this.api.send(`position fen ${state.fen()} \n go movetime ${movetime}`);
      this.api.onrecieve = (message) => {
        assert(message.startsWith('bestmove '));
        move = message.split(' ')[1];
        this.api.onrecieve = null;
        console.log(state.fen(), move);
        resolve(move);
      };
    });
  }
}

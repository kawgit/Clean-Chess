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
        const move = moves[Math.floor(Math.random() * moves.length)];
        resolve(move.from + move.to);
      }, movetime);
    });
  }
}

export class Engine extends Agent {
  constructor(name, api, baseCallback) {
    super('engine', name);
    this.api = api;
    this.baseCallback = baseCallback;
  }
  async go(state, movetime) {
    return await new Promise((resolve) => {
      this.api.send(`position fen ${state.fen()}\n`);
      this.api.send(`go movetime ${movetime}\n`);
      this.api.setCallback((message) => {
        this.baseCallback(message);

        for (let line of message.split('\n')) {
          if (!line.startsWith('bestmove ')) {
            continue;
          }

          const move = line.split(' ')[1];
          this.api.setCallback(this.baseCallback);
          resolve(move);
        }
      });
    });
  }
}

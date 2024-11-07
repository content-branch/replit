class Mediator {
  commandHandlers: unknown;

  constructor() {
    this.commandHandlers = {};
  }

  registerHandler(commandType, handler) {
    this.commandHandlers[commandType] = handler;
  }

  async send(command:{
    type: string;
  }) {
    const handler = this.commandHandlers[command.type];
    if (handler) {
      return await handler(command);
    } else {
      throw new Error(`No handler registered for ${command.type}`);
    }
  }
}

export default new Mediator();  // Export an instance of Mediator

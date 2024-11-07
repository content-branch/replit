class Mediator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  commandHandlers: Record<string, Function>;

  constructor() {
    this.commandHandlers = {};
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  registerHandler<T extends Function>(commandType: string, handler: T) {
    this.commandHandlers[commandType] = handler;
  }

  async send(command: { type: string }) {
    const handler = this.commandHandlers[command.type];
    if (handler) {
      return await handler(command);
    } else {
      throw new Error(`No handler registered for ${command.type}`);
    }
  }
}

export default new Mediator();  // Export an instance of Mediator

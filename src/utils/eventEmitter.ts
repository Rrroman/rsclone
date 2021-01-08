export default class EventEmitter {
  events: {
    [key: string]: any[];
  };

  constructor() {
    this.events = {};
  }

  on({ event, listener }: { event: string; listener: () => {} }) {
    (this.events[event] || (this.events[event] = [])).push(listener);
    return this;
  }

  emit(event: string, ...arg: any[]) {
    (this.events[event] || []).forEach((listener: (...args: any) => any) =>
      listener(...arg)
    );
  }
}

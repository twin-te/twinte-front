export type Observer<T> = (message: T) => void;

export class Subject<T> {
  #observers: Observer<T>[] = [];

  attach(observer: Observer<T>) {
    this.#observers.push(observer);
  }

  detach(observer: Observer<T>) {
    this.#observers = this.#observers.filter((obs) => obs !== observer);
  }

  notify(message: T) {
    this.#observers.forEach((observer) => observer(message));
  }
}

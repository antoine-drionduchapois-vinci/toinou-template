export abstract class Base<T> {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(model?: Partial<T>) {
    Object.assign(this, model);
  }

  set(model: Partial<T>): void {
    Object.assign(this, model);
  }
}

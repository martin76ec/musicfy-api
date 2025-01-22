// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function singleton<T extends new (...args: any[]) => any>(ctr: T): T {
  let instance: T | undefined;

  return class {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      // eslint-disable-next-line
      if (!instance) instance = new ctr(...args);
      if (instance === undefined) throw new Error("cannot instantiate class");
      return instance;
    }
  } as T;
}

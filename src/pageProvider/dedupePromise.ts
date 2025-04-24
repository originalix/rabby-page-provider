import { ethErrors } from 'eth-rpc-errors';

const log = (event, ...args) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(
      `%c [rabby] (${new Date().toTimeString().substr(0, 8)}) ${event}`,
      "font-weight: bold; background-color: #7d6ef9; color: white;",
      ...args
    );
  }
};

class DedupePromise {
  private _blackList: string[];
  private _tasks: Record<string, number> = {};

  constructor(blackList) {
    this._blackList = blackList;
  }

  async call(key: string, defer: () => Promise<any>) {
    if (this._blackList.includes(key) && this._tasks[key]) {
      log("[DedupePromise] transactionRejected: ", key);
      throw ethErrors.rpc.transactionRejected(
        'there is a pending request, please request after it resolved'
      );
    }

    return new Promise((resolve) => {
      this._tasks[key] = (this._tasks[key] || 0) + 1;
      log("[DedupePromise] call: ", key, this._tasks[key]);

      resolve(
        defer().finally(() => {
          this._tasks[key]--;
          log("[DedupePromise] finally: ", key, this._tasks[key]);
          if (!this._tasks[key]) {
            delete this._tasks[key];
          }
        })
      );
    });
  }
}

export default DedupePromise;

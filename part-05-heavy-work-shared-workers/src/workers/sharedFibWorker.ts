interface Task {
  port: MessagePort;
  id: number;
  n: number;
}

const queue: Task[] = [];
let processing = false;

// Cache para memoization
const fibCache = new Map<number, number>();

onconnect = (e: MessageEvent) => {
  const port = e.ports[0];
  port.start();

  port.onmessage = (evt: MessageEvent) => {
    const { id, n, type } = evt.data;

    if (type === "reset") {
      fibCache.clear();
      port.postMessage({ id, status: "cache_cleared" });
      return;
    }

    queue.push({ port, id, n });
    if (!processing) processNext();
  };
};

function processNext() {
  if (!queue.length) {
    processing = false;
    return;
  }

  processing = true;
  const task = queue.shift();
  if (task) {
    const result = fib(task.n);
    task.port.postMessage({ id: task.id, result });
  }

  setTimeout(processNext, 0);
}

function fib(n: number): number {
  if (fibCache.has(n)) return fibCache.get(n)!;

  const result = rawFib(n);

  fibCache.set(n, result);
  return result;
}

function rawFib(n: number): number {
  return n <= 1 ? n : rawFib(n - 1) + rawFib(n - 2);
}

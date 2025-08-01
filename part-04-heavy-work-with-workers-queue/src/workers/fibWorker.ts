// Implementing a Queue!
interface Task {
  id: number;
  n: number;
}

const queue: Task[] = [];
let processing = false;

self.onmessage = (e: MessageEvent<Task>) => {
  queue.push(e.data);
  if (!processing) processNext();
};

function processNext() {
  if (queue.length === 0) {
    processing = false;
    return;
  }

  processing = true;
  const task = queue.shift();
  if (task) {
    const result = fib(task.n);
    self.postMessage({ id: task.id, result });
  }

  setTimeout(processNext, 0);
}

function fib(n: number): number {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

// What about with "impredictable time jobs"?
// interface Task {
//   id: number;
//   n: number;
// }

// const queue: Task[] = [];
// let processing = false;

// self.onmessage = (e: MessageEvent<Task>) => {
//   queue.push(e.data);
//   if (!processing) processNext();
// };

// async function processNext() {
//   if (queue.length === 0) {
//     processing = false;
//     return;
//   }

//   processing = true;
//   const task = queue.shift();
//   if (task) {
//     await delay(Math.random() * 2000);

//     const result = fib(task.n);
//     self.postMessage({ id: task.id, result });
//   }

//   setTimeout(processNext, 0);
// }

// function fib(n: number): number {
//   return n <= 1 ? n : fib(n - 1) + fib(n - 2);
// }

// function delay(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// Simple Implementation
self.onmessage = ({ data }) => {
  const result = fib(data.n);
  self.postMessage({ id: data.id, result });
};

function fib(n: number): number {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

// What happens now?

// function fib(n: number): number {
//   return n <= 1 ? n : fib(n - 1) + fib(n - 2);
// }

// function delay(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// self.onmessage = async (e: MessageEvent<{ id: number; n: number }>) => {
//   await delay(Math.random() * 2000);

//   const result = fib(e.data.n);

//   self.postMessage({ id: e.data.id, result });
// };

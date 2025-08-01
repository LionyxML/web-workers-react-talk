import { useEffect, useRef, useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";

interface Result {
  id: number;
  result: number;
}

function App() {
  const [results, setResults] = useState<Result[]>([]);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const idRef = useRef(1);
  const workerRef = useRef<Worker>(null);

  useEffect(() => {
    // TODO: duplicate worker
    workerRef.current = new Worker(
      new URL("./workers/fibWorker.ts", import.meta.url),
      { type: "module" },
    );

    workerRef.current.onmessage = (e: MessageEvent<Result>) => {
      setResults((prev) => [...prev, e.data]);
    };
  }, []);

  const handleClick = () => {
    if (workerRef.current) {
      workerRef.current.postMessage({ id: idRef.current++, n: 42 });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <img src={reactLogo} className="logo react spin" alt="React logo" />

      <div className="clock">{time}</div>

      <button onClick={handleClick}>Calcular Fibonacci(42)</button>
      <ul>
        {results.map((r) => (
          <li key={r.id}>
            Tarefa {r.id}: {r.result}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

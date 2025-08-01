import { useEffect, useRef, useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";

interface Result {
  id: number;
  result: number;
}

function App() {
  const [sourceNum, setSourceNum] = useState<number>(42);
  const [results, setResults] = useState<Result[]>([]);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const idRef = useRef(1);
  const sharedWorkerRef = useRef<SharedWorker>(null);

  useEffect(() => {
    sharedWorkerRef.current = new SharedWorker(
      new URL("./workers/sharedFibWorker.ts", import.meta.url),
      { type: "module" },
    );
    sharedWorkerRef.current.port.start();
    sharedWorkerRef.current.port.onmessage = (e: MessageEvent<Result>) => {
      setResults((prev) => [...prev, e.data]);
    };
  }, []);

  const handleClick = () => {
    if (sharedWorkerRef.current) {
      sharedWorkerRef.current.port.postMessage({
        id: idRef.current++,
        n: sourceNum,
      });
    }
  };

  const handleReset = () => {
    if (sharedWorkerRef.current) {
      sharedWorkerRef.current.port.postMessage({
        type: "reset",
        id: "limpar cache",
      });
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

      <input
        type="number"
        value={sourceNum}
        onChange={(e) => setSourceNum(Number(e.target.value))}
      />

      <button onClick={handleClick}>Calcular Fibonacci({sourceNum})</button>
      <button onClick={handleReset}>Resetar Cache</button>
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

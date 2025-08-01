import { useRef, useState, useEffect } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";

interface Result {
  id: number;
  result: number;
}

function fib(n: number): number {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

function App() {
  const [results, setResults] = useState<Result[]>([]);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const idRef = useRef(1);

  const handleClick = () => {
    setResults((results) => [
      ...results,
      { id: idRef.current++, result: fib(42) },
    ]);
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

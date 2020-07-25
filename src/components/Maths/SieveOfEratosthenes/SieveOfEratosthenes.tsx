import React from "react";
import useSieveOfEratosthenes from "./useSieveOfEratosthenes";

const SieveOfEratosthenes: React.FunctionComponent = () => {
  const {
    index,
    iteration: { p, primeNumbers },
    stepForward,
    stepBackward,
  } = useSieveOfEratosthenes({
    limit: 20,
  });

  return (
    <div>
      <h1>Sieve Of Eratosthenes</h1>

      <h2>
        Prime Numbers at Iteration {index} with p={p}
      </h2>
      {primeNumbers.join(", ")}

      <div className="btn-group">
        <button className="btn btn-danger" onClick={stepBackward}>
          Decrement
        </button>
        <button className="btn btn-primary" onClick={stepForward}>
          Increment
        </button>
      </div>
    </div>
  );
};

export default SieveOfEratosthenes;

import React from "react";
import useSieveOfEratosthenes from "./useSieveOfEratosthenes";
import useItemInArray from "../../lib/useLoopCounter/useItemInArray";
import PrimesListing from "./PrimesListing";

const LIMIT: number = 20;

const SieveOfEratosthenes: React.FunctionComponent = () => {
  const { primeNumbers, iterations } = useSieveOfEratosthenes({
    limit: LIMIT,
  });

  const {
    index,
    item: { p, tickedOff },
    stepBackward,
    stepForward,
  } = useItemInArray({ items: iterations });

  return (
    <div>
      <h1>Sieve Of Eratosthenes</h1>

      <h2>Prime Numbers at Iteration</h2>
      <div>{primeNumbers.join(", ")}</div>

      <h2>
        Ticked off at Iteration {index} with p={p}
      </h2>
      <div>
        Divisible by {p}:{tickedOff.join(", ")}
      </div>

      <div className="btn-group">
        <button className="btn btn-danger" onClick={stepBackward}>
          Decrement
        </button>
        <button className="btn btn-primary" onClick={stepForward}>
          Increment
        </button>
      </div>

      <PrimesListing limit={LIMIT} primeNumbers={tickedOff} />
    </div>
  );
};

export default SieveOfEratosthenes;

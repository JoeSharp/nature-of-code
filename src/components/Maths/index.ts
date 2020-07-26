import SolveEquation from "./SolveEquation";
import SieveOfEratosthenes from "./SieveOfEratosthenes";
import { Page } from "src/types";

export default [
  {
    component: SolveEquation,
    href: "/maths/equationSolver",
    title: "Solve Equations",
  },
  {
    component: SieveOfEratosthenes,
    href: "/maths/sieveOfEratosthenes",
    title: "Sieve Of Eratosthenes",
  },
] as Page[];

import SolveEquation from "./SolveEquation";
import SieveOfEratosthenes from "./SieveOfEratosthenes";
import { Page } from "src/types";
import Divisibility from "./Divisibility/Divisibility";

export default [
  {
    component: SolveEquation,
    href: "/maths/equationSolver",
    title: "Solve Equations",
  },
  {
    component: Divisibility,
    href: "/maths/divisibilityRules",
    title: "Divisibility Rules",
  },
  {
    component: SieveOfEratosthenes,
    href: "/maths/sieveOfEratosthenes",
    title: "Sieve Of Eratosthenes",
  },
] as Page[];

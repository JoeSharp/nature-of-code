import React from "react";
import { Page } from "src/types";

import { page as divisibilityPage } from "./Divisibility";
import { page as primeFactorsPage } from "./PrimeFactors";
import { page as sievePage } from "./SieveOfEratosthenes";
import { page as solveEqPage } from "./SolveEquation";

const Maths: React.FunctionComponent = () => (
  <div>
    <h1>Maths</h1>
    <p>The algorithms here are focussed on Key Stage 3 Maths.</p>
  </div>
);

export const page: Page = {
  href: "/maths",
  title: "Maths",
  description: "Explore some KS3 Maths algorithms",
  component: Maths,
};

export const pages: Page[] = [
  page,
  divisibilityPage,
  primeFactorsPage,
  sievePage,
  solveEqPage,
];

export default Maths;

import React from "react";
import { Page } from "src/types";

import { page as divisibilityPage } from "./Divisibility";
import { page as primeFactorsPage } from "./PrimeFactors";
import { page as sievePage } from "./SieveOfEratosthenes";
import { page as solveEqPage } from "./SolveEquation";
import CardCollection from "../Bootstrap/CardCollection";
import Jumbotron from "../Bootstrap/Jumbotron";

const primeNumberPages = [divisibilityPage, primeFactorsPage, sievePage];
const miscPages = [solveEqPage];

const Maths: React.FunctionComponent = () => (
  <div>
    <Jumbotron
      title="Maths"
      lead="The algorithms here are focussed on Key Stage 3 Maths."
    />

    <h2>Prime Numbers</h2>
    <CardCollection cards={primeNumberPages} />

    <h2>Miscellaneous</h2>
    <CardCollection cards={miscPages} />
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

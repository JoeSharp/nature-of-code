import React from "react";
import { NamedDivisibilityRule } from "ocr-cs-alevel-ts/dist/types";
import {
  defaultNamedDivisibilityRule,
  isDivisibleBy,
} from "ocr-cs-alevel-ts/dist/algorithms/primeNumbers/divisibilityRules";

interface Props {
  divisibilityRule?: NamedDivisibilityRule;
  value: number;
}

interface UseDivisibilityRule {
  isDivisible: boolean;
  logLines: string[];
}

const useDivisibilityRule = ({
  divisibilityRule: { factor, rule } = defaultNamedDivisibilityRule,
  value,
}: Props): UseDivisibilityRule => {
  return React.useMemo(() => {
    const logLines: string[] = [];

    rule(value, (d) => logLines.push(d));

    return {
      isDivisible: isDivisibleBy(value, factor),
      logLines,
    };
  }, [factor, rule, value]);
};

export default useDivisibilityRule;

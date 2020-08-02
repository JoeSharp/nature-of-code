import React from "react";

import {
  divisibilityRules,
  defaultNamedDivisibilityRule,
} from "ocr-cs-alevel-ts/dist/algorithms/primeNumbers/divisibilityRules";
import { ControlledInput } from "src/types";
import { NamedDivisibilityRule } from "ocr-cs-alevel-ts/dist/types";

interface Props extends ControlledInput<NamedDivisibilityRule> {
  className?: string;
}

const DivisibilityRulePicker: React.FunctionComponent<Props> = ({
  value,
  onChange,
  className,
}) => {
  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = React.useCallback(
    ({ target: { value } }) =>
      onChange(
        divisibilityRules.find(({ factor }) => factor.toString(10) === value) ||
          defaultNamedDivisibilityRule
      ),
    [onChange]
  );

  React.useEffect(() => onChange(divisibilityRules[0]), [onChange]);

  return (
    <select
      className={className}
      onChange={onSelectChange}
      value={value && value.factor}
    >
      <option />
      {divisibilityRules.map(({ factor }) => (
        <option key={factor} value={factor}>
          {factor}
        </option>
      ))}
    </select>
  );
};

interface UsePicker {
  divisibilityRule: NamedDivisibilityRule;
  componentProps: Props;
}

export const useDivisibilityRulePicker = (className?: string): UsePicker => {
  const [value, onChange] = React.useState<NamedDivisibilityRule | undefined>(
    undefined
  );

  return {
    divisibilityRule: value || defaultNamedDivisibilityRule,
    componentProps: {
      className,
      value,
      onChange,
    },
  };
};

export default DivisibilityRulePicker;

import React from "react";

import useInterval from "./useInterval";

interface Props {
  iterate: () => any;
}

interface UseToggledInterval {
  isAutoIterating: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const useToggledInterval = ({ iterate }: Props): UseToggledInterval => {
  const [isAutoIterating, setIsAutoIterating] = React.useState<boolean>(false);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { checked } }) => setIsAutoIterating(checked),
    [setIsAutoIterating]
  );

  const autoIterate = React.useCallback(() => isAutoIterating && iterate(), [
    isAutoIterating,
    iterate,
  ]);

  useInterval(autoIterate, 1000);

  return { isAutoIterating, onChange };
};

export default useToggledInterval;

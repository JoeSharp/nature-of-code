import React from "react";
import cogoToast from "cogo-toast";

import ErrorReportingContext from "./ErrorReportingContext";

const ErrorReportingContextProvider: React.FunctionComponent = ({
  children,
}) => {
  const [error, setError] = React.useState<string | undefined>(undefined);

  const reportError = React.useCallback(
    (error: string) => {
      cogoToast.error(error, {
        hideAfter: 5,
        onClick: () => {
          setError(error);
        },
      });
    },
    [setError]
  );

  return (
    <ErrorReportingContext.Provider value={{ error, reportError }}>
      {children}
    </ErrorReportingContext.Provider>
  );
};

export default ErrorReportingContextProvider;

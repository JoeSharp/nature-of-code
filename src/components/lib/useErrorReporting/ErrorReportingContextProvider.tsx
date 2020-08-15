import React from "react";
import cogoToast from "cogo-toast";

import ErrorReportingContext from "./ErrorReportingContext";
import { AppError } from "./AppError";

const ErrorReportingContextProvider: React.FunctionComponent = ({
  children,
}) => {
  const [error, setError] = React.useState<AppError | undefined>(undefined);

  const reportError = React.useCallback(
    (error: AppError) => {
      const msg = `Error, Code ${error.status}, Msg: ${error.message}`;
      cogoToast.error(msg, {
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

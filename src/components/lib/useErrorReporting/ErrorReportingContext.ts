import React from "react";
import { AppError } from "./AppError";

interface ErrorReportingContextState {
  error?: AppError;
  reportError: (e: AppError) => void;
}

export default React.createContext<ErrorReportingContextState>({
  error: new AppError(0, "DEFAULT ERROR"),
  reportError: (e) =>
    console.error("Reporting error to disconnected default context", e),
});

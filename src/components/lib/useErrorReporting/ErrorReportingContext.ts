import React from "react";

interface ErrorReportingContextState {
  error?: string;
  reportError: (e: string) => void;
}

export default React.createContext<ErrorReportingContextState>({
  error: "DEFAULT ERROR",
  reportError: (e) =>
    console.error("Reporting error to disconnected default context", e),
});

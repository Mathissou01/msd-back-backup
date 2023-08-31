import { ApolloError } from "@apollo/client";
import { ReactNode } from "react";
import "./common-errors.scss";

export type TErrorDisplayMode = "replace" | "under" | "toaster";

interface ICommonErrorsProps {
  children: ReactNode;
  errors?: Array<ApolloError | undefined>;
  displayMode?: TErrorDisplayMode;
}

export default function CommonErrors({
  children,
  errors,
  displayMode = "replace",
}: ICommonErrorsProps) {
  /* Static Data */
  const errorTitle = "Erreur";

  /* Local Data */
  const hasErrors = errors && errors?.some((error) => error);

  /* Log Error in console */
  errors?.map((error) => {
    if (error && process.env.NODE_ENV !== "test") {
      process.env.NODE_ENV !== "production"
        ? console.error(error)
        : console.error(error?.message);
    }
  });

  if (hasErrors && displayMode === "toaster") {
    // TODO: implement error handling with "toaster" notifications, or redirects
    return <>{children}</>;
  } else if (hasErrors && displayMode !== "toaster") {
    const errorBlock = (
      <div className="c-CommonErrors">
        {errors?.map((error, index) => {
          if (error && error.message) {
            return (
              <span key={`error_${index}`}>{`${error.name ?? errorTitle}: ${
                error?.message
              }`}</span>
            );
          }
        })}
      </div>
    );

    switch (displayMode) {
      case "replace":
        return errorBlock;
      case "under":
        return (
          <>
            {children}
            {errorBlock}
          </>
        );
    }
  } else {
    return <>{children}</>;
  }
}

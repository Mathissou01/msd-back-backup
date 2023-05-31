import classNames from "classnames";
import { ApolloError } from "@apollo/client";
import { ReactNode, useState } from "react";
import CommonSpinner from "../CommonSpinner/CommonSpinner";
import "./common-loader.scss";

interface ICommonLoaderProps {
  isLoading: boolean;
  isShowingContent?: boolean;
  isCover?: boolean;
  isFlexGrow?: boolean;
  hasSpinner?: boolean;
  hasSkeleton?: boolean;
  hasDelay?: boolean;
  minHeight?: number;
  errors?: Array<ApolloError | undefined>;
  children: ReactNode;
}

export default function CommonLoader({
  isLoading,
  isShowingContent = false,
  isCover = true,
  isFlexGrow = true,
  hasSpinner = true,
  hasSkeleton = false,
  hasDelay = false,
  minHeight,
  errors,
  children,
}: ICommonLoaderProps) {
  const hasErrors = errors?.some((error) => error);
  const [isShowingLoader, setIsShowingLoader] = useState(!hasDelay);

  if (isLoading && hasDelay) {
    setTimeout(() => {
      setIsShowingLoader(true);
    }, 200);
  }

  const wrapperClassnames = classNames("c-CommonLoader", {
    "c-CommonLoader_absolute": isShowingContent,
    "c-CommonLoader_cover": isCover,
    "c-CommonLoader_grow": isFlexGrow,
    "c-CommonLoader_skeleton": hasSkeleton,
  });

  return (hasDelay ? isShowingLoader : isLoading) ? (
    <>
      <div
        className={wrapperClassnames}
        style={minHeight ? { minHeight: `${minHeight}px` } : {}}
      >
        {hasSpinner && <CommonSpinner />}
      </div>
      {isShowingContent && children}
    </>
  ) : hasErrors ? (
    <div className="c-CommonLoader__Errors">
      {errors?.map((error, index) => {
        if (error && error.message) {
          return <span key={`error_${index}`}>{error?.message}</span>;
        }
      })}
    </div>
  ) : (
    <>{children}</>
  );
}

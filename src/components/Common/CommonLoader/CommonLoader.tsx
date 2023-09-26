import classNames from "classnames";
import { ApolloError } from "@apollo/client";
import { ReactNode, useState } from "react";
import CommonSpinner from "../CommonSpinner/CommonSpinner";
import CommonErrors, { TErrorDisplayMode } from "../CommonErrors/CommonErrors";
import "./common-loader.scss";

interface ICommonLoaderProps {
  isLoading: boolean;
  isShowingContent?: boolean;
  errorDisplayMode?: TErrorDisplayMode;
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
  errorDisplayMode,
  isCover = true,
  isFlexGrow = true,
  hasSpinner = true,
  hasSkeleton = false,
  hasDelay = false,
  minHeight,
  errors,
  children,
}: ICommonLoaderProps) {
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

  // Apollo has wrong typing for its own networkError to access statsuCode.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const networkError: any =
    errors && errors.length > 0 && errors[0]?.networkError;

  return (
    hasDelay ? isShowingLoader : isLoading || networkError?.statusCode === 401
  ) ? (
    <>
      <div
        className={wrapperClassnames}
        style={minHeight ? { minHeight: `${minHeight}px` } : {}}
      >
        {hasSpinner && <CommonSpinner />}
      </div>
      {isShowingContent && children}
    </>
  ) : (
    <CommonErrors errors={errors} displayMode={errorDisplayMode}>
      {children}
    </CommonErrors>
  );
}

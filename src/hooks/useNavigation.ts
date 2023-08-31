import React, { useContext } from "react";
import { ENavigationPages } from "../lib/navigation";

export interface INavigationContext {
  currentRoot: string | null;
  setCurrentRoot: (root: string) => void;
  currentPage: keyof typeof ENavigationPages | string;
  setCurrentPage: (page: keyof typeof ENavigationPages | string) => void;
}

export const NavigationContext = React.createContext<INavigationContext>({
  currentRoot: null,
  setCurrentRoot: () => null,
  currentPage: "/",
  setCurrentPage: () => null,
});

export const useNavigation = () => useContext(NavigationContext);

export function isNavigationPath(
  path: string,
): path is keyof typeof ENavigationPages {
  return Object.keys(ENavigationPages).includes(path);
}

export function containsNavigationPath(path: string) {
  return Object.keys(ENavigationPages).filter((page) => path.includes(page));
}

export function matchLongestNavigationPath(
  virtualPath: string,
  realPath: string,
) {
  const numberOfVirtualPathSlashes = [
    ...virtualPath.matchAll(new RegExp("/", "gi")),
  ].map((a) => a.index).length;
  const virtualSlug =
    numberOfVirtualPathSlashes >= 2
      ? virtualPath.slice(virtualPath.indexOf("/", 1))
      : "/";
  const numberOfRealPathSlashes = [
    ...realPath.matchAll(new RegExp("/", "gi")),
  ].map((a) => a.index).length;
  const realSlug =
    numberOfRealPathSlashes >= 2
      ? realPath.slice(realPath.indexOf("/", 1))
      : "/";

  let virtualMatchingSlug = virtualSlug;
  let realMatchingSlug = realSlug;

  if (virtualSlug !== "/") {
    const virtualMatches = Object.keys(ENavigationPages).filter((page) => {
      return virtualSlug.includes(page);
    });
    let longestLength = 0;
    for (let i = 0; i < virtualMatches.length; i++) {
      const value = virtualMatches[i];
      if (value.length > longestLength) {
        longestLength = value.length;
        virtualMatchingSlug = value;
      }
    }
  }

  if (virtualMatchingSlug !== realMatchingSlug) {
    // count how many slashes are in the route, truncate the real path to the same number of slashes
    const slashes = [
      ...virtualMatchingSlug.matchAll(new RegExp("/", "gi")),
    ].map((a) => a.index);
    const realSlashes = [...`${realSlug}/`.matchAll(new RegExp("/", "gi"))].map(
      (a) => a.index,
    );
    realMatchingSlug = realSlug.slice(0, realSlashes[slashes.length]);
  }

  return { virtualMatchingSlug, realMatchingSlug };
}

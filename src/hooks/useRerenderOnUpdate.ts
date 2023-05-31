import { useEffect, useState } from "react";

export function useRerenderOnUpdate(watchedValue: unknown): {
  rerender: boolean;
} {
  const [rerender, setRerender] = useState(true);

  useEffect(() => {
    setRerender(false);
  }, [watchedValue]);

  useEffect(() => {
    if (!rerender) {
      setRerender(true);
    }
  }, [rerender]);

  return { rerender };
}

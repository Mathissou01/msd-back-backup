import { useRouter } from "next/router";

export function useRoutingQueryId(
  queryParam: string,
  specialRoute?: string,
): `${number}` | false {
  const router = useRouter();
  const query = router.query[queryParam];

  if (query?.toString()) {
    if (Number.parseInt(query.toString())) {
      return `${Number.parseInt(query.toString())}`;
    } else if (query.toString() === specialRoute) {
      return "-1";
    } else if (window !== undefined) {
      void router.push("/404");
    }
  }
  return false;
}

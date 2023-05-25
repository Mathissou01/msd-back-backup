import { useRouter } from "next/router";

export function useRoutingQueryCustomId(
  queryParam: string,
): `${string}` | undefined {
  const router = useRouter();
  const query = router.query[queryParam];

  if (query?.toString()) {
    return query?.toString();
  } else if (typeof window === undefined) {
    void router.push("/404");
  }

  return undefined;
}

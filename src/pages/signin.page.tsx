import { useEffect } from "react";
import { useRouter } from "next/router";
import CommonLoader from "../components/Common/CommonLoader/CommonLoader";
import { useUser } from "../hooks/useUser";

export default function SignInPage() {
  const router = useRouter();
  const { setIsConnected } = useUser();

  useEffect(() => {
    // NextJS router takes time to be ready.
    if (!router.isReady || !router.query.code) {
      return;
    }

    // If there is a code, it's the callback from Azure. Generate token in middleware.
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/token?code=${router.query.code}`,
      { credentials: "include" },
    )
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Error while fetching token");
        }
      })
      .then(() => {
        setIsConnected(true);
        router.push("/");
      });
  }, [router, setIsConnected]);

  return (
    <CommonLoader isLoading={true}>
      <div></div>
    </CommonLoader>
  );
}

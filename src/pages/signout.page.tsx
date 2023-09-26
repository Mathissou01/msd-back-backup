import { useEffect } from "react";
import { useRouter } from "next/router";
import CommonLoader from "../components/Common/CommonLoader/CommonLoader";

export default function SignOutPage() {
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signout`, {
      credentials: "include",
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error("Error while signout.");
      }

      router.push("/");
    });
  }, [router]);

  return (
    <CommonLoader isLoading={true}>
      <div></div>
    </CommonLoader>
  );
}

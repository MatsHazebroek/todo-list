import { useSession } from "next-auth/react";
import Loading from "../loading";
import { useRouter } from "next/router";
type props = {
  children: React.ReactNode;
};
function Auth(props: props) {
  const { status, data: session } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    router.push("/Login").catch(() => {
      console.log("error");
      return;
    });
    return <></>;
  }

  if (status === "authenticated" && session !== null) {
    return <>{props.children}</>;
  }

  return <div></div>;
}

export default Auth;

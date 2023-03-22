import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

function Index() {
  const { status, data: session } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <>
        <button
          //   className="text-sm font-semibold leading-6 text-gray-900"
          onClick={() => {
            void (async () => {
              await signIn("github").catch(() => {
                return;
              });
              return;
            })();
          }}
        >
          Log in
        </button>
      </>
    );
  }

  if (status === "authenticated" && session !== null) {
    return (
      <>
        <button
          //   className="text-sm font-semibold leading-6 text-gray-900"
          onClick={() => {
            void (async () => {
              await signOut().catch(() => {
                return;
              });
              return;
            })();
          }}
        >
          Sign out
        </button>
      </>
    );
  }

  return <div></div>;
}

export default Index;

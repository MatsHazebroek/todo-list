import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Loading from "../loading"

function Auth() {
  const { status, data: session } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    return (
      <>
        <div className="h-96 w-96 rounded bg-blue-200 shadow-lg">
          <h1 className="p-2 text-center text-4xl font-bold">Login</h1>
          <p className="text-1xl p-2">
            Als je aan deze taken applicatie je eigen taken wilt toevoegen, moet
            je eerst inloggen met je Google account. Vervolgens kan je je eigen
            taken toevoegen, bewerken en verwijderen.
          </p>

          <div className="items-center justify-center">
            <button
              className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
              onClick={() => {
                void (async () => {
                  await signIn("google").catch(() => {
                    return;
                  });
                  return;
                })();
              }}
            >
              Log in
            </button>
          </div>
        </div>
      </>
    );
  }

  if (status === "authenticated" && session !== null) {
    return (
      <>
        <button
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

export default Auth;

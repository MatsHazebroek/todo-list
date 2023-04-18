import { signIn } from "next-auth/react";
import Head from "next/head";

function Login() {
  return (
    <>
      <Head>
        <title>To do - Login</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen items-center justify-center text-center">
        <div className="h-96 w-96 rounded bg-blue-200 shadow-lg">
          <h1 className="p-2 text-center text-4xl font-bold">Login</h1>
          <p className="text-1xl p-2">
            Als je aan deze taken applicatie je eigen taken wilt toevoegen, moet
            je eerst inloggen met je Google account. Vervolgens kan je je eigen
            taken toevoegen, bewerken en verwijderen.
          </p>

          <button
            className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            onClick={() => {
              void (async () => {
                await signIn("google", {
                  redirect: true,
                  callbackUrl: "/",
                }).catch(() => {
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

export default Login;

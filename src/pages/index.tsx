import Auth from "n/components/auth/Auth";
import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>To do</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col justify-center">
        <div>
          <Auth></Auth>
        </div>
      </main>
    </>
  );
};

export default Home;

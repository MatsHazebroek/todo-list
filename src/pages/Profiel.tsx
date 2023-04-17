import Auth from "../components/Basics/auth/Auth";
import { type NextPage } from "next";
import Head from "next/head";
import Sidebar from "../components/Basics/sidebar";

import { useSession } from "next-auth/react";

const Profiel: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>To do - Profiel</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Auth>
          <div className="fixed top-0 left-0 flex h-screen w-screen flex-row">
            <Sidebar />
            <div className="h-screen w-full overflow-y-auto overflow-x-hidden">
              <div className="w-100 ml-20 mr-20 mt-[5%] h-[85%] rounded-2xl p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">Profiel</h1>
                </div>

                <div className="mx-auto my-8 max-w-lg px-4">
                  <div className="mb-8 flex items-center space-x-4">
                    <div>
                      {typeof session?.user.image == "string" ? (
                        <img
                          src={session.user.image}
                          alt={"Image"}
                          width={25}
                          height={25}
                          className={"rounded-full"}
                        ></img>
                      ) : null}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">
                        {session?.user.name}
                      </h2>
                      <p className="text-gray-500">{session?.user.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Auth>
      </div>
    </>
  );
};
export default Profiel;

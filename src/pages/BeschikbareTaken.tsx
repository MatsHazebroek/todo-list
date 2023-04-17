import Auth from "../components/Basics/auth/Auth";
import { type NextPage } from "next";
import Head from "next/head";
import Sidebar from "../components/Basics/sidebar";

const BeschikbareTaken: NextPage = () => {
  return (
    <>
      <Head>
        <title>To do - BeschikbareTaken</title>
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
                  <h1 className="text-2xl font-bold">BeschikbareTaken</h1>
                </div>
              </div>
            </div>
          </div>
        </Auth>
      </div>
    </>
  );
};
export default BeschikbareTaken;

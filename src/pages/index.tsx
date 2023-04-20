import Head from "next/head";
import Sidebar from "../components/Basics/sidebar";
import Auth from "../components/Basics/auth/Auth";
import { useState } from "react";
import LoadTask from "../components/Tasks/loadTasks";

function Index() {
  return (
    <>
      <Auth>
        <PageContent />
      </Auth>
    </>
  );
}

export default Index;

const PageContent = () => {
  const [createModal, setCreateModal] = useState(false);
  return (
    <>
      <Head>
        <title>To do</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main data-theme="light">
        <div className="fixed top-0 left-0 flex h-screen w-screen flex-row">
          <Sidebar />
          <div className="mr-10 ml-10 max-h-[800px] w-full overflow-y-auto">
            <div className="container relative mx-auto mt-10 overflow-x-auto bg-gray-100 px-4 py-4">
              <div className="flex items-center justify-between">
                <h1 className="mb-4 text-3xl font-bold">Taken</h1>
                <button
                  className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                  onClick={() => {
                    setCreateModal(true);
                  }}
                >
                  + Toevoegen
                </button>
              </div>

              <LoadTask
                show={createModal}
                onClose={() => {
                  setCreateModal(false);
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

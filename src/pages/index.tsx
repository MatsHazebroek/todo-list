import Head from "next/head";
import Sidebar from "../components/sidebar";
import Auth from "../components/auth/Auth";
import AddTaskModal from "../components/Modals/addTaskModal";
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
  const [modal, setModal] = useState(false);

  return (
    <>
      <AddTaskModal
        title={{ text: "Test", color: "black", size: 1.5 }}
        onClose={() => {
          setModal(false);
        }}
        show={modal}
      />

      <Head>
        <title>To do</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main data-theme="light">
        <div className="fixed top-0 left-0 flex h-screen w-screen flex-row">
          <Sidebar />
          {/* make a container with margins */}
          <div className="h-screen w-full overflow-y-auto overflow-x-hidden">
            <div className="w-100 ml-10 mr-10 mt-[5%] h-[85%] rounded-2xl p-4 shadow-lg">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Taken</h1>
                <button
                  className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  + Toevoegen
                </button>
              </div>

              <LoadTask />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

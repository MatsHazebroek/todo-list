import Head from "next/head";
import { api } from "../utils/api";
import Sidebar from "../components/sidebar";
import Loading from "../components/loading";
import Auth from "../components/auth/Auth";
import Modal from "../components/addTaskModal";
import { GrDrag } from "react-icons/gr";
import React, { useState } from "react";

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

  // const createTask = api.tasks.createTasks.useMutation({
  //   onError: (error) => {
  //     console.log(error);
  //   },
  // });
  const tasks = api.tasks.getTasks.useQuery();

  if (tasks.isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Modal
        title={{ text: "Test", color: "black", size: 1.5 }}
        onClose={() => {
          console.log("closed");
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
            <div className="w-100 ml-20 mr-20 mt-[5%] h-[85%] rounded-2xl p-4 shadow-lg">
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

              <div className="mt-4 rounded-lg border border-solid border-[#e6e6e6] bg-[#f2f2f2]">
                <div className="ml-7 flex items-center gap-y-5 p-4 font-bold">
                  <div className="w-1/5">Title</div>
                  <div className="w-2/5">Description</div>
                  <div className="w-1/5">Created At</div>
                  <div className="w-1/5">End Date</div>
                  <div className="w-1/5">Status</div>
                </div>
                {tasks.data?.map((task, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-y-5 p-4"
                    draggable
                  >
                    <div className="mr-4">
                      <GrDrag />
                    </div>
                    <div className="w-1/5">{task.title}</div>
                    <div className="w-2/5">{task.description}</div>
                    <div className="w-1/5">task.createdAt</div>
                    <div className="w-1/5">task.endDate</div>
                    <div className="w-1/5">task.status</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* <div>
    <h1>
      {tasks.data?.map((task) => (
        <div key={task.userId}>{task.title}</div>
      ))}
    </h1>
    <button
      onClick={() => {
        createTask.mutate({ title: "test", description: "test" });
      }}
    >
      Create
    </button>
  </div> */}
        </div>
      </main>
    </>
  );
};

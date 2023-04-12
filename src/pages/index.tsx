import Head from "next/head";
import { api } from "../utils/api";
import Sidebar from "../components/sidebar";
import Auth from "../components/auth/Auth";
import AddTaskModal from "../components/addTaskModal";
import DeleteTaskModal from "../components/deleteTaskModal";
import { useState } from "react";
import LoadTasks from "../components/loadTasks";
import Loading from "../components/loading";

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
  const [deleteModal, setDeleteModal] = useState(false);

  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [amountChecked, setAmountChecked] = useState(0);
  const tasks = api.tasks.getTasks.useQuery();
  const deleteTask = api.tasks.deleteTask.useMutation();

  const createTask = api.tasks.createTasks.useMutation({
    onError: (error) => {
      console.log(error);
    },
  });
  if (tasks.isLoading) {
    return <Loading />;
  }

  return (
    <>
      <AddTaskModal
        title={{ text: "Test", color: "black", size: 1.5 }}
        onClose={() => {
          console.log("closed");
          setModal(false);
        }}
        show={modal}
      />
      <DeleteTaskModal
        title={{ text: "Test", color: "black", size: 1.5 }}
        onClose={() => {
          console.log("closed");
          setDeleteModal(false);
        }}
        show={deleteModal}
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
                    // createTask.mutate({ title: "test", description: "kaas" });
                  }}
                >
                  + Toevoegen
                </button>
              </div>

              {tasks.data?.length ? (
                <div className="mt-4 rounded-lg border border-solid border-[#e6e6e6] bg-[#f2f2f2]">
                  <div className="ml-7 flex items-center gap-y-5 p-4 font-bold">
                    <div className="w-1/5">Title</div>
                    <div className="w-2/5">Description</div>
                    <div className="w-1/5">Created At</div>
                    <div className="w-1/5">End Date</div>
                    <div className="w-1/5">Status</div>
                    <div className="w-1/5">Klaar</div>
                    <div className="w-1/5">Verwijder</div>
                  </div>
                  {tasks.data.map((task, i) => (
                    <LoadTasks
                      onChecked={(id, test) => {
                        const isChecked = checked;
                        if (test) {
                          isChecked.add(id);
                          setChecked(isChecked);
                          setAmountChecked(isChecked.size);
                          return;
                        }
                        isChecked.delete(id);
                        setChecked(isChecked);
                        setAmountChecked(isChecked.size);
                      }}
                      key={i}
                      {...task}
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-4 text-center font-bold text-gray-600">
                  Er zijn geen taken beschikbaar.
                </div>
              )}

              <div className="bottom-0 flex items-end justify-end">
                {amountChecked > 0 ? (
                  <button
                    className="rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
                    onClick={() => {
                      setDeleteModal(true);
                      [...checked].map((id) => {
                        deleteTask.mutate({ id: id });
                      });
                    }}
                  >
                    Verwijder
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

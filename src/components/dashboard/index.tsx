import Sidebar from "../sidebar";
import { api } from "../../utils/api";
import Loading from "../loading";

function Index() {
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
      <div className="fixed top-0 left-0 flex h-screen w-screen flex-row">
        <Sidebar />
        {/* make a container with margins */}
        <div className="h-screen w-full overflow-y-auto overflow-x-hidden">
          <div className="w-100 ml-20 mr-20 h-auto rounded p-4 shadow-2xl">
            {tasks.data?.map((task) => (
              <div key={task.userId} className="p-4">
                <div>{task.title}</div>
                <div>{task.description}</div>
              </div>
            ))}
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
    </>
  );
}

export default Index;

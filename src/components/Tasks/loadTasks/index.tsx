import Loading from "n/components/Basics/loading";
import AddTaskModal from "n/components/Modals/addTaskModal";
import DeleteTaskModal from "n/components/Modals/deleteTaskModal";
import { api } from "n/utils/api";
import { type NextPage } from "next";
import { useState } from "react";
import Tasks from "../tasks";
type props = {
  show: boolean;
  onClose: () => void;
};
const Index: NextPage<props> = (props) => {
  const [deleteModal, setDeleteModal] = useState(false);

  const [tasks, setTasks] = useState<
    Map<
      string,
      {
        id: string;
        userId: string;
        startDate: Date | null;
        endDate: Date | null;
        title: string;
        description: string;
        status: string;
      }
    >
  >(new Map());
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [amountChecked, setAmountChecked] = useState(0);
  const deleteTask = api.tasks.deleteTask.useMutation({
    onSuccess: (data) => {
      const newTasks = tasks;
      data.map((data) => {
        newTasks.delete(data);
      });
      setTasks(newTasks);
      setDeleteModal(false);
    },
  });
  const createTask = api.tasks.createTasks.useMutation({
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      const newTasks = tasks;
      newTasks.set(data.id, data);
      setTasks(newTasks);
      props.onClose();
    },
  });
  const loadTasks = api.tasks.getTasks.useQuery(undefined, {
    onSuccess: (data) => {
      const newTasks: typeof tasks = new Map();
      data.map((data) => {
        newTasks.set(data.id, data);
      });
      setTasks(newTasks);
    },
  });

  if (loadTasks.isLoading || deleteTask.isLoading) {
    return <Loading />;
  }

  return (
    <>
      <AddTaskModal
        title={{ text: "Test", color: "black", size: 1.5 }}
        onClose={(data) => {
          if (data == undefined) {
            return props.onClose();
          }
          createTask.mutate(data);
        }}
        show={props.show}
      />
      <DeleteTaskModal
        onAccept={() => {
          deleteTask.mutate({ id: [...checked] });
        }}
        title={{ text: "Test", color: "black", size: 1.5 }}
        onClose={() => {
          setDeleteModal(false);
        }}
        show={deleteModal}
      />

      {tasks.size ? (
        <div className="mt-4 rounded-lg border border-solid border-[#e6e6e6] bg-[#f2f2f2]">
          <div className="flex items-center gap-y-5 p-4 font-bold">
            <div className="w-1/5">Title</div>
            <div className="w-2/5">Description</div>
            <div className="w-1/5">Created At</div>
            <div className="w-1/5">End Date</div>
            <div className="w-1/5">Status</div>
            <div className="w-1/5">Klaar</div>
            <div className="w-1/5">Verander</div>
            <div className="w-1/5">Verwijder</div>
          </div>
          {[...tasks].map((task, i) => (
            <Tasks
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
              {...task[1]}
            />
          ))}
        </div>
      ) : (
        <div className="mt-4 text-center font-bold text-gray-600">
          Er zijn geen taken beschikbaar.
        </div>
      )}

      <div className="flex items-end justify-end">
        {amountChecked > 0 ? (
          <button
            className="absolute bottom-28 rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
            onClick={() => {
              setDeleteModal(true);
              // console.log(checked);
            }}
          >
            Verwijder
          </button>
        ) : null}
      </div>
    </>
  );
};

export default Index;

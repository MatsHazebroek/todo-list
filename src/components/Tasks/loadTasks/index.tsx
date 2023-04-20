import AddTaskModal from "n/components/Modals/addTaskModal";
import DeleteTaskModal from "n/components/Modals/deleteTaskModal";

import { api } from "n/utils/api";
import { type NextPage } from "next";
import { useEffect, useState } from "react";
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
  const [changeStatusOf, setChangeStatusOf] = useState<string | null>(null);
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
  useEffect(() => {
    if (changeStatusOf == null) return;
    const newTasks = tasks;
    newTasks.delete(changeStatusOf);
    setTasks(newTasks);
    setChangeStatusOf(null);
  }, [changeStatusOf, tasks]);

  if (loadTasks.isLoading || deleteTask.isLoading) {
    return <></>;
  }
  return (
    <>
      <AddTaskModal
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
        onClose={() => {
          setDeleteModal(false);
        }}
        show={deleteModal}
      />

      <div className="mb-4 flex flex-col rounded-md bg-white p-4 shadow md:flex-row">
        <div className="w-full text-center md:w-1/6">Titel</div>
        <div className="w-full text-center md:w-2/6">Beschrijving</div>
        <div className="w-full text-center md:w-1/6">Start Datum</div>
        <div className="w-full text-center md:w-1/6">Eind Datum</div>
        <div className="w-full text-center md:w-1/6">Status</div>
        <div className="w-full text-center md:w-2/6">Acties</div>
      </div>

      {[...tasks].map((task, i) => (
        <Tasks
          onCompleted={(id) => {
            setChangeStatusOf(id);
          }}
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
          onEdit={(data) => {
            const edit = tasks;
            edit.set(data.id, { ...data });
            setTasks(edit);
          }}
          key={i}
          {...task[1]}
        />
      ))}

      <div className="inset-x-0 bottom-0 flex items-end justify-end">
        {amountChecked > 0 ? (
          <button
            className="rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
            onClick={() => {
              setDeleteModal(true);
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

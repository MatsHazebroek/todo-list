import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";
import { useEffect, useState } from "react";
import EditTaskModal from "n/components/Modals/editTaskModal";
import CompletedTaskModal from "n/components/Modals/completedTaskModal";
import { api } from "n/utils/api";

type props = {
  title: string;
  id: string;
  description: string;
  status: string;
  startDate: Date | null;
  endDate: Date | null;
  onChecked: (id: string, checked: boolean) => void;
  onEdit: (props: {
    id: string;
    title: string;
    description: string;
    status: string;
    startDate: Date | null;
    endDate: Date | null;
  }) => void;
  onCompleted: (id: string) => void;
};

function Index(props: props) {
  const [checked, setChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [editTaskModal, setEditTaskModal] = useState(false);
  const [completedTaskModal, setCompletedTaskModal] = useState(false);

  useEffect(() => {
    props.onChecked(props.id, checked);
  }, [checked, props]);

  const deleteTask = api.tasks.deleteTask.useMutation({
    onSuccess: (data) => {
      if (data[0] != null) props.onCompleted(data[0]);
    },
  });

  return (
    <>
      <EditTaskModal
        onClose={(editedData) => {
          if (editedData != null) {
            props.onEdit(editedData);
          }
          setEditTaskModal(false);
        }}
        onCloseModal={() => {
          setEditTaskModal(false);
        }}
        show={editTaskModal}
        parent={{ ...props }}
      />

      <CompletedTaskModal
        onClose={(accept) => {
          if (accept) {
            deleteTask.mutate({ id: [props.id] });
          }
          setCompletedTaskModal(false);
        }}
        show={completedTaskModal}
      />

      <div className="mb-4 flex flex-col items-center rounded-md bg-white p-4 shadow md:flex-row">
        <div className="w-full text-center md:w-1/6">{props.title}</div>
        <div className="w-full text-center md:w-2/6">{props.description}</div>
        <div className="w-full text-center md:w-1/6">
          {props.startDate != null && props.startDate.toDateString()}
        </div>
        <div className="w-full text-center md:w-1/6">
          {props.endDate != null && props.endDate.toDateString()}
        </div>
        <div className="w-full text-center md:w-1/6">{props.status}</div>
        <div className="flex w-full justify-center text-center md:w-2/6">
          <button
            className="mr-2 rounded-full bg-blue-500 py-1 px-3 font-bold text-white hover:bg-blue-700"
            onClick={() => {
              // checkedItems.delete(props.id);
              setCompletedTaskModal(true);
            }}
          >
            <AiOutlineCheck />
          </button>
          <button
            className="mr-2 rounded-full bg-blue-500 py-1 px-3 font-bold text-white hover:bg-blue-700"
            onClick={() => {
              console.log(props.id);

              setEditTaskModal(true);
            }}
          >
            <FaPencilAlt />
          </button>
          <button
            className={`mr-2 rounded-full py-1 px-3 font-bold text-white ${
              checked ? "bg-green-500" : "bg-blue-500"
            }`}
            onClick={() => {
              const updatedCheckedItems = new Set(checkedItems);
              if (updatedCheckedItems.has(props.id)) {
                updatedCheckedItems.delete(props.id);
              } else {
                updatedCheckedItems.add(props.id);
              }
              setCheckedItems(updatedCheckedItems);
              setChecked(!checked);
            }}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </>
  );
}

export default Index;

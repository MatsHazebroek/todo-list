import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import EditTaskModal from "n/components/Modals/editTaskModal";

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
};

function Index(props: props) {
  const [checked, setChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [editTaskModal, setEditTaskModal] = useState(false);
  useEffect(() => {
    props.onChecked(props.id, checked);
  }, [checked]);

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

      <div className="flex items-center gap-y-5 p-4" draggable>
        <div className="">{/* <GrDrag /> */}</div>
        <div className="w-1/5">{props.title}</div>
        <div className="w-2/5">{props.description}</div>
        <div className="w-1/5">
          {props.startDate != null && props.startDate.toDateString()}
        </div>
        <div className="w-1/5">
          {props.endDate != null && props.endDate.toDateString()}
        </div>
        <div className="w-1/5">{props.status}</div>
        <div className="w-1/5">Completed</div>
        <div className="w-1/5">
          <button
            onClick={() => {
              console.log(props.id);

              setEditTaskModal(true);
            }}
            className="flex h-5 w-5 items-center justify-center rounded border-gray-300 focus:outline-none"
          >
            <FaPencilAlt />
          </button>
        </div>
        <div className="w-1/5 font-bold">
          <button
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
            className={`flex h-5 w-5 items-center justify-center rounded border-gray-300 focus:outline-none  ${
              checkedItems.has(props.id) ? "text-green-500" : ""
            }`}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </>
  );
}

export default Index;

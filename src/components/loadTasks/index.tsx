import { GrDrag } from "react-icons/gr";
import { useEffect, useState } from "react";

type props = {
  title: string;
  id: string;
  userId: string;
  description: string;
  onChecked: (id: string, checked: boolean) => void;
};

function Index(props: props) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    props.onChecked(props.id, checked);
  }, [checked]);

  return (
    <>
      <div className="flex items-center gap-y-5 p-4" draggable>
        <div className="mr-4">
          <GrDrag />
        </div>
        <div className="w-1/5">{props.title}</div>
        <div className="w-2/5">{props.description}</div>
        <div className="w-1/5">task.createdAt</div>
        <div className="w-1/5">task.endDate</div>
        <div className="w-1/5">task.status</div>
        <div className="w-1/5">Completed</div>
        <div className="w-1/5">
          <input
            onClick={() => {
              setChecked(!checked);
            }}
            type="checkbox"
            id="test"
            name="test"
            className="h-5 w-5 rounded border-gray-300 text-blue-600"
          />
        </div>
      </div>
    </>
  );
}

export default Index;

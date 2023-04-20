import { stat } from "fs";
import { api } from "n/utils/api";
import { type NextPage } from "next";
import { useEffect, useState } from "react";

type props = {
  show: boolean;
  onCloseModal(): void;
  onClose: (data?: {
    id: string;
    title: string;
    description: string;
    status: string;
    startDate: Date | null;
    endDate: Date | null;
  }) => void;
  className?: string;
  children?: React.ReactNode;
  parent: {
    title: string;
    id: string;
    description: string;
    status: string;
    startDate: Date | null;
    endDate: Date | null;
  };
};

const Index: NextPage<props> = (props) => {
  const updateTask = api.tasks.updateTask.useMutation({
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
      props.onClose(data);
    },
  });
  useEffect(() => {
    window.addEventListener("keypress", (e: KeyboardEvent) => {
      //escape key pressed no key code
      if (e.key == "Escape") {
        props.onCloseModal();
      }
    });
    // cleanup this component
    return () => {
      window.removeEventListener("keypress", (e: KeyboardEvent) => {
        //escape key pressed no key code
        if (e.key == "Escape") {
          props.onCloseModal();
        }
      });
    };
  }, [props]);

  const [title, setTitle] = useState(props.parent.title);
  const [status, setStatus] = useState(props.parent.status);
  const [startDatum, setStartDatum] = useState<Date>(
    new Date(props.parent.startDate as Date)
  );
  const [eindDatum, setEindDatum] = useState<Date>(
    new Date(props.parent.endDate as Date)
  );
  const [description, setDescription] = useState(props.parent.description);

  if (props.show == false) return <></>;

  return (
    <div className="fixed top-0 left-0 z-40 h-screen w-screen">
      <div
        className="absolute top-0 left-0 z-40 h-full w-full bg-black/20"
        onClick={() => {
          props.onCloseModal();
        }}
      ></div>
      <div className="absolute top-0 left-0  flex h-full w-full items-center justify-center">
        <div
          onClick={(event: React.MouseEvent<HTMLDivElement>) => {
            event.stopPropagation();
            return;
          }}
          className={`z-50 h-full max-h-[95vh] w-full max-w-[100vw] overflow-y-auto rounded-lg bg-white shadow-md lg:h-2/3 lg:w-1/2 ${
            props.className == undefined ? "" : props.className
          }`}
        >
          <div className="flex h-full w-full flex-col">
            <div className="relative flex-grow p-4">
              <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4 sm:mb-5">
                <h3 className="text-lg font-semibold text-gray-900">
                  Taak veranderen
                </h3>
                <button
                  type="button"
                  className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                  data-modal-toggle="defaultModal"
                  onClick={() => {
                    props.onCloseModal();
                  }}
                >
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Sluit scherm</span>
                </button>
              </div>
              <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Titel
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                    required
                    defaultValue={props.parent.title}
                    onChange={(event) => {
                      setTitle(event.target.value);
                    }}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Status
                  </label>
                  <select
                    id="category"
                    className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                    onChange={(event) => {
                      setStatus(event.target.value);
                    }}
                  >
                    <option
                      selected={
                        !["1", "2", "3", "4"].includes(props.parent.status)
                      }
                    >
                      Selecteer prioriteit
                    </option>
                    <option selected={props.parent.status == "1"} value="1">
                      Prioriteit 1
                    </option>
                    <option selected={props.parent.status == "2"} value="2">
                      Prioriteit 2
                    </option>
                    <option selected={props.parent.status == "3"} value="3">
                      Prioriteit 3
                    </option>
                    <option selected={props.parent.status == "4"} value="4">
                      Prioriteit 4
                    </option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Start Datum
                  </label>
                  <input
                    type="date"
                    defaultValue={
                      props.parent.endDate != null
                        ? props.parent.endDate.toISOString().substring(0, 10)
                        : new Date().toISOString().substring(0, 10)
                    }
                    onChange={(event) => {
                      setStartDatum(new Date(event.target.value));
                    }}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Eind Datum
                  </label>
                  <input
                    type="date"
                    defaultValue={
                      props.parent.endDate != null
                        ? props.parent.endDate.toISOString().substring(0, 10)
                        : new Date().toISOString().substring(0, 10)
                    }
                    onChange={(event) => {
                      setEindDatum(new Date(event.target.value));
                    }}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Beschrijving
                  </label>
                  <textarea
                    id="description"
                    className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                    defaultValue={props.parent.description}
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="hover:bg-primary-800 focus:ring-primary-300 inline-flex items-center rounded-lg bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                onClick={() => {
                  updateTask.mutate({
                    id: props.parent.id,
                    title: title,
                    description: description,
                    status: status,
                    endDate: eindDatum,
                    startDate: startDatum,
                  });
                }}
              >
                Pas taak aan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

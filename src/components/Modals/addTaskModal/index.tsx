import type { NextPage } from "next";
import React, { useEffect, useState } from "react";

type props = {
  show: boolean;
  onClose: (data?: {
    title: string;
    description: string;
    status: string;
    startDate: Date;
    endDate: Date;
  }) => void;
  className?: string;
  children?: React.ReactNode;
};

const Index: NextPage<props> = (props) => {
  useEffect(() => {
    window.addEventListener("keypress", (e: KeyboardEvent) => {
      //escape key pressed no key code
      if (e.key == "Escape") {
        props.onClose();
      }
    });
    // cleanup this component
    return () => {
      window.removeEventListener("keypress", (e: KeyboardEvent) => {
        //escape key pressed no key code
        if (e.key == "Escape") {
          props.onClose();
        }
      });
    };
  }, [props]);

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [startDatum, setStartDatum] = useState<Date>(new Date());
  const [eindDatum, setEindDatum] = useState<Date>(new Date());
  const [description, setDescription] = useState("");

  if (props.show == false) return <></>;
  return (
    <div className="fixed top-0 left-0 z-40 h-screen w-screen">
      <div
        className="absolute top-0 left-0 z-40 h-full w-full bg-black/20"
        onClick={() => {
          props.onClose();
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
              {/* <!-- Modal header --> */}
              <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4 sm:mb-5">
                <h3 className="text-lg font-semibold text-gray-900">
                  Taak aanmaken
                </h3>
                <button
                  type="button"
                  className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                  data-modal-toggle="defaultModal"
                  onClick={() => {
                    props.onClose();
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
              {/* <!-- Modal body --> */}
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
                    placeholder="Typ hier de titel van de taak"
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
                    <option selected>Selecteer prioriteit</option>
                    <option value="1">Prioriteit 1</option>
                    <option value="2">Prioriteit 2</option>
                    <option value="3">Prioriteit 3</option>
                    <option value="4">Prioriteit 4</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Start Datum
                  </label>
                  <input
                    type="date"
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
                    onChange={() => {
                      setEindDatum(new Date());
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
                    placeholder="Typ hier de beschrijving van de taak"
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
                  if (
                    !title ||
                    !status ||
                    !startDatum ||
                    !eindDatum ||
                    !description
                  ) {
                    alert("Vul alle velden in");
                  } else {
                    props.onClose({
                      title: title,
                      status: status,
                      startDate: startDatum,
                      endDate: eindDatum,
                      description: description,
                    });
                  }
                }}
              >
                <svg
                  className="mr-1 -ml-1 h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Maak taak aan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;

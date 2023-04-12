import type { NextPage } from "next";
import React, { useEffect, useState } from "react";

type props = {
  title: {
    text: string;
    color: string;
    size: number;
  };
  show: boolean;
  onClose: () => void;
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
              <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4 dark:border-gray-600 sm:mb-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Taak aanmaken
                </h3>
                <button
                  type="button"
                  className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
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
              <form action="#">
                <div className="mb-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      Titel
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                      placeholder="Typ hier de titel van de taak"
                      // onChange={(event: any) => {
                      //   setTitle(event.target.value);
                      // }}
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      Status
                    </label>
                    <select
                      id="category"
                      className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    >
                      <option selected>Selecteer prioriteit</option>
                      <option value="TV">Prioriteit 1</option>
                      <option value="PC">Prioriteit 2</option>
                      <option value="GA">Prioriteit 3</option>
                      <option value="PH">Prioriteit 4</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      Datum
                    </label>
                    <input type="date" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      Datum
                    </label>
                    <input type="date" />
                  </div>
                  {/* <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      Datum
                    </label>
                    <input type="date" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      Datum
                    </label>
                    <input type="date" />
                  </div> */}
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      Beschrijving
                    </label>
                    <textarea
                      id="description"
                      className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                      placeholder="Typ hier de beschrijving van de taak"
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  className="hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center rounded-lg bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;

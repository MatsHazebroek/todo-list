import type { NextPage } from "next";
import React, { useEffect } from "react";

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
  onAccept: () => void;
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
          className={`z-50 h-full max-h-[40vh] w-full max-w-[40vw] overflow-y-auto rounded-lg bg-white shadow-md lg:h-2/3 lg:w-1/2 ${
            props.className == undefined ? "" : props.className
          }`}
        >
          <div className="flex h-full w-full flex-col">
            <div className="relative flex-grow p-4">
              {/* <!-- Modal header --> */}
              <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4 dark:border-gray-600 sm:mb-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Taak verwijderen
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
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      <h1 className="text-center text-4xl">
                        Weet je het zeker?
                      </h1>
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-center pt-4">
                  <button
                    type="button"
                    className="mr-4 inline-flex items-center rounded-lg bg-gray-100 px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                    onClick={props.onClose}
                  >
                    Annuleren
                  </button>
                  <button
                    type="submit"
                    onClick={props.onAccept}
                    className="inline-flex items-center rounded-lg bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >
                    Verwijder
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;

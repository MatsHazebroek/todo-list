import { type NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { api } from "n/utils/api";

const Index: NextPage = () => {
  const { status, data: session } = useSession();

  const users = api.users.getUsers.useQuery();

  return (
    <>
      <div className=" top-0 left-0 flex h-screen w-64 flex-col border-r bg-white">
        <div className="flex-grow overflow-y-auto overflow-x-hidden">
          <ul className="flex flex-col space-y-1 py-4">
            <li className="px-5">
              <div className="flex h-8 flex-row items-center">
                <div className="text-sm font-light tracking-wide text-gray-500">
                  Menu
                </div>
              </div>
            </li>
            <li>
              <Link
                href="/"
                className="relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 text-gray-600 hover:border-sky-400 hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
              >
                <span className="ml-4 inline-flex items-center justify-center">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 truncate text-sm tracking-wide">
                  Dashboard
                </span>
              </Link>
            </li>
            {/* <li>
              <a
                href="#"
                className="relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 text-gray-600 hover:border-sky-400 hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
              >
                <span className="ml-4 inline-flex items-center justify-center">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 truncate text-sm tracking-wide">
                  Inbox
                </span>
                <span className="ml-auto rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium tracking-wide text-indigo-500">
                  New
                </span>
              </a>
            </li> */}
            {/* <li>
              <a
                href="#"
                className="hover: relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 text-gray-600 hover:border-sky-400 hover:text-gray-800 focus:outline-none"
              >
                <span className="ml-4 inline-flex items-center justify-center">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 truncate text-sm tracking-wide">
                  Messages
                </span>
              </a>
            </li> */}
            <li>
              <a
                href="#"
                className="relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 text-gray-600 hover:border-sky-400 hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
              >
                <span className="ml-4 inline-flex items-center justify-center">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 truncate text-sm tracking-wide">
                  ! Feature (Notify)
                </span>
                {/* <span className="ml-auto rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium tracking-wide text-red-500">
                  1.2k
                </span> */}
              </a>
            </li>
            <li className="px-5">
              <div className="flex h-8 flex-row items-center">
                <div className="text-sm font-light tracking-wide text-gray-500">
                  Taken
                </div>
              </div>
            </li>
            <li>
              <Link
                href="BeschikbareTaken"
                className="relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 text-gray-600 hover:border-sky-400 hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
              >
                <span className="ml-4 inline-flex items-center justify-center">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 truncate text-sm tracking-wide">
                  ! Feature (Available Tasks)
                </span>
              </Link>
            </li>
            {/* {session?.user.admin ? ( */}
              <>
                <li className="px-5">
                  <div className="flex h-8 flex-row items-center">
                    <div className="text-sm font-light tracking-wide text-gray-500">
                      Admin
                    </div>
                  </div>
                </li>
                <li>
                  <Link
                    href="Users"
                    className="relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 text-gray-600 hover:border-sky-400 hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
                  >
                    <span className="ml-4 inline-flex items-center justify-center">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        ></path>
                      </svg>
                    </span>
                    <span className="ml-2 truncate text-sm tracking-wide">
                      ! WIP (Users)
                    </span>
                    <span className="ml-auto rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium tracking-wide text-green-500">
                      {users.data?.length}
                    </span>
                  </Link>
                </li>
              </>
            {/* ) : null} */}

            <li className="px-5">
              <div className="flex h-8 flex-row items-center">
                <div className="text-sm font-light tracking-wide text-gray-500">
                  Groepen
                </div>
              </div>
            </li>
            <li>
              <Link
                href="Groep"
                className="relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 text-gray-600 hover:border-sky-400 hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
              >
                <span className="ml-4 inline-flex items-center justify-center">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 truncate text-sm tracking-wide">
                  Groep
                </span>
              </Link>
            </li>

            <li className="px-5">
              <div className="flex h-8 flex-row items-center">
                <div className="text-sm font-light tracking-wide text-gray-500">
                  Instellingen
                </div>
              </div>
            </li>
            <li>
              <Link
                href="Profiel"
                className="relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 text-gray-600 hover:border-sky-400 hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
              >
                <span className="ml-4 inline-flex items-center justify-center">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 truncate text-sm tracking-wide">
                  ! WIP (Profiel)
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="Instellingen"
                className="relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 text-gray-600 hover:border-sky-400 hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
              >
                <span className="ml-4 inline-flex items-center justify-center">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 truncate text-sm tracking-wide">
                  ! WIP (Instellingen)
                </span>
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 text-gray-600 hover:border-sky-400 hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
              >
                <span className="ml-4 inline-flex items-center justify-center">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 truncate text-sm tracking-wide">
                  <button
                    onClick={() => {
                      void (async () => {
                        await signOut().catch(() => {
                          return;
                        });
                        return;
                      })();
                    }}
                  >
                    Log uit
                  </button>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Index;

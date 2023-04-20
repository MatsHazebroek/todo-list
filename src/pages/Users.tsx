import { type NextPage } from "next";
import Head from "next/head";

import { api } from "../utils/api";
import Loading from "../components/Basics/loading";
import Auth from "../components/Basics/auth/Auth";
import Sidebar from "../components/Basics/sidebar";

const Users: NextPage = () => {
  const users = api.users.getUsers.useQuery();
  const deleteUser = api.users.deleteUser.useMutation();

  if (users.isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>To do - Users</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Auth>
          <div className="fixed top-0 left-0 flex h-screen w-screen flex-row">
            <Sidebar />
            {/* make a container with margins */}
            <div className="h-screen w-full overflow-y-auto overflow-x-hidden">
              <div className="w-100 ml-20 mr-20 mt-[5%] h-[85%] rounded-2xl p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">Users</h1>

                  <div className="flex items-center">
                    <div className="ml-4">
                      <input
                        type="text"
                        placeholder="Zoek"
                        className="h-10 rounded-lg border-2 border-gray-300 bg-white px-5 pr-16 text-sm focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="absolute right-0 top-0 mt-5 mr-4"
                      >
                        <svg
                          className="h-4 w-4 fill-current text-gray-600"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 56.966 56.966"
                        >
                          <path d="M55.71 52.629l-14.14-14.14c1.172-1.672 1.862-3.69 1.862-5.862 0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10c2.172 0 4.19-.69 5.862-1.862l14.14 14.14c.586.586 1.344.879 2.102.879s1.516-.293 2.102-.879c1.172-1.172 1.172-3.071 0-4.243zM10 20c0-3.859 3.141-7 7-7s7 3.141 7 7-3.141 7-7 7-7-3.141-7-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-4 max-h-[650px] min-h-[650px] gap-y-3 overflow-y-auto rounded-lg border border-solid border-[#e6e6e6] bg-[#f2f2f2] p-4">
                  <div className="flex items-center gap-y-5 p-4 font-bold">
                    <div className="w-1/2">Name</div>
                    <div className="w-1/2">Email</div>
                    <div className="w-1/4"></div>
                  </div>
                  {users.data?.map((user) => (
                    <div
                      key={user.name}
                      className="flex items-center gap-y-5 p-4"
                    >
                      <div className="w-1/2">{user.name}</div>
                      <div className="w-1/2">{user.email}</div>
                      <div className="w-1/4">
                        <button
                          className="rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
                          onClick={() => {
                            deleteUser.mutate({ id: user.id });
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Auth>
      </div>
    </>
  );
};

export default Users;

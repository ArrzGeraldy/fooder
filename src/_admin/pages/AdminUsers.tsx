/* eslint-disable react-hooks/exhaustive-deps */
import DeleteButton from "@/components/admin/DeleteButton";
import { Badge } from "@/components/ui/badge";
import useAuth from "@/hooks/useAuth";
import { convertDate } from "@/lib/utils";
// import { convertDate } from "@/lib/utils";
import { UserDetailI } from "@/types";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const AdminUsers = () => {
  const [users, setUsers] = useState<UserDetailI[]>();
  const { auth } = useAuth();

  const getAllUsers = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users`, {
      headers: {
        "Content-type": "Application/json",
        authorization: `Bearer ${auth?.accessToken}`,
      },
    });
    const json = await res.json();
    // console.log(typeof json.data[0].createdAt);
    setUsers(json.data);
    // setOrders(json.data);
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <section className="py-1 w-full  bg-blueGray-50">
      <Toaster />
      {/* 662fc447df2e1cd9fb17291b */}
      <div className="w-full  mb-12  mx-auto mt-4 ">
        <div className=" flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
          <div className="rounded-t mb-0 px-4 py-3 border border-gray-300">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                <h3 className="font-semibold text-base text-blueGray-700">
                  Users
                </h3>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto border border-gray-300">
            <table className="items-center bg-transparent w-full border-collapse ">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Email
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Username
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    role
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    sign-up
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {users?.map((user, i) => (
                  <tr key={i}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                      {user.email}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {user.username}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {user.role}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {convertDate(user.createdAt)}
                    </td>
                    <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div className="flex gap-2">
                        <Badge className="bg-sky-500 text-white cursor-pointer">
                          Edit
                        </Badge>
                        <DeleteButton
                          endPoint="users"
                          fetchData={getAllUsers}
                          id={user._id}
                          token={auth?.accessToken}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminUsers;

import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";

const User = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });
  const handleCheckRole = (user) => {
    if (user.role === "admin") {
      axiosSecure
        .patch(`/users/user/${user._id}`)
        .then(() => {
          refetch();
          Swal.fire({
            title: "Change role admin to user",
            icon: "success",
          });
        })
        .catch(() => {
          const errorStatus = error?.response?.status;
          const errorMessage = error?.response?.message;
          Swal.fire({
            title: `${errorStatus} - ${errorMessage}`,
            icon: "error",
          });
        });
    }
    axiosSecure.patch(`/users/admin/${user._id}`).then(() => {
      refetch();
      Swal.fire({
        title: "Change role user to admin",
        icon: "success",
      });
    });
  };
  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you Sure",
      text: "You want to delete this " + `${user.name}` + "user?",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: `${res.data.name} has deleted!`,
            icon: "success",
          });
        });
      }
    });
  };
  return (
    <div>
      <div className=" flex justify-between mx-4 my-4">
        <h2 className=" text-2xl"> All users</h2>
        <h2 className=" text-2xl"> {users.length}</h2>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[870px]">
            {/* head */}
            <thead className="bg-red text-white text-center">
              <tr>
                <th>
                  <label>#</label>
                </th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                <th> Action</th>
              </tr>
            </thead>

            <tbody className=" text-center">
              {/* row 1 */}

              {users.map((user, index) => (
                <tr key={index}>
                  <th>
                    <label>{index + 1}</label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={user.photoURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td className="">
                    User
                    <input
                      type="checkbox"
                      className="toggle"
                      onClick={() => handleCheckRole(user)}
                      checked={user.role === "admin"}
                    />
                    Admin
                  </td>
                  <th>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => handleDeleteUser(user)}
                    >
                      <FaTrash />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
            <tfoot className="bg-red text-white text-center">
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User;

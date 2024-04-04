import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
  const axios = useAxiosSecure();
  const axiosPublic = useAxios();
  const navigate = useNavigate();

  const [reset, setReset] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [filteredItems, setFilteredItems] = useState([]);

  const indexOfLastItem = itemPerPage * currentPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const deleteUser = (productId: string) => {
    try {
      Swal.fire({
        title: "Do you want to delete the User?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "delete",
        denyButtonText: `Don't delete`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios.delete(`/users/${productId}`).then((response) => {
            if (response.status === 200 || response.status === 201) {
              Swal.fire("deleted!", "", "success");
              setReset(!reset);
            }
          });
        } else if (result.isDenied) {
          Swal.fire("Changes are not delete", "", "info");
        }
      });
    } catch (error) {
      const errorMessage = error.response.message;
      Swal.fire({
        title: `${errorMessage}`,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
        position: "center",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get("/users");
        const data = await response.data;

        setFilteredItems(data);
      } catch (error) {
        console.error("Error Fetching data", error);
      }
    };
    fetchData();
  }, [reset]);

  return (
    <div className="flex flex-col p-2 gap-3">
      <h1 className="text-4xl font-medium">Manage All Product Items</h1>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Create at</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{<img src={user?.photoURL} className="w-14 " />}</td>
                <td>{user?.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.createdAt}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm text-white"
                    onClick={() => {
                      navigate("/dashboard/userProduct", {
                        state: {
                          data: user,
                        },
                      });
                    }}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-error text-white"
                    onClick={() => deleteUser(user?._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center my-8 flex-wrap gap-2">
        {Array.from({
          length: Math.ceil(filteredItems.length / itemPerPage),
        }).map((_, index) => {
          return (
            <button
              key={index}
              className={`my-1 px-3 py-1 rounded-full ${
                currentPage === index + 1 ? "bg-red text-white" : "bg-gray-200"
              }`}
              onClick={() => {
                paginate(index + 1);
              }}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default UsersList;

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

const UserProduct = () => {
  const { state } = useLocation();
  const axios = useAxiosSecure();
 
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      name: state.data.name,
      photoURL: state.data.photoURL,
      role: state.data.role,
    },
  });

  const onSubmit = (data:any,e) => {
    try {
      axios.put(`/users/${state.data._id}`, data).then((response) => {
        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            title: "Product added success",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            position: "center",
          });
          e.target.reset();
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
      e.target.reset();
    }
  };
  return (
    <div className="flex flex-col p-2 gap-3">
      <h1 className="text-4xl font-medium">Update a User</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-control grow">
          <div className="label">
            <span className="label-text">User name</span>
          </div>
          <input
            type="text"
            // placeholder="Type here"

            required
            {...register("name")}
            className="input input-bordered w-auto"
          />
        </label>
        <div className="flex gap-5">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Role</span>
            </div>
            <select
              className="select select-bordered"
              required
              {...register("role")}
            >
              <option disabled selected value={"user"}>
                เลือก
              </option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          <label className="form-control grow">
            <div className="label">
              <span className="label-text">photoURL</span>
            </div>
            <input
              type="text"
              required
              {...register("photoURL")}
              className="input input-bordered w-auto"
            />
          </label>
        </div>

        <button type="submit" className="btn btn-accent text-white w-full my-4">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default UserProduct;

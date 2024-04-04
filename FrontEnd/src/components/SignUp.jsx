import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGooglePlusG, FaFacebookF, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import Modal from "./Modal";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const SignUp = ({ name }) => {
  const { createUser, updateUserProfile, signUpWithGoogle } = useAuth();
  const axiosPublic = useAxios();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        // Signed up
        const user = result.user;
        console.log(user);

        updateUserProfile(data.name, data.photoURL).then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axiosPublic.post("/users", userInfo).then((response) => {
            console.log(response);
            console.log(user);
            Swal.fire({
              title: "Account created Successfully",
              icon: "success",
              timer: 1500,
            });
            navigate(from, { replace: true });
          });
        });
        // alert("Account created Successfully")
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const googleSigUp = () => {
    signUpWithGoogle()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
          photoURL: result.user?.photoURL,
        };
        axiosPublic.post("/users", userInfo).then((response) => {
          console.log(response);
          console.log(user);
          Swal.fire({
            title: "SignUp google account successfully",
            icon: "success",
            timer: 1500,
          });
        });
        navigate(from, { replace: true });

        // document.getElementById("login").close()
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className=" max-w-md bg-white shadow-w-full mx-auto flex-items-center justify-center my-40">
      <form
        className="card-body flex flex-col justify-center text-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="font-bold text-lg ">Create Account</h3>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered"
            required
            {...register("name")}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered"
            required
            {...register("email")}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            required
            {...register("password")}
          />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-6">
          <input
            type="submit"
            value="SignUp"
            className="btn bg-red text-white"
          />
        </div>
        <p className="text-center my-2 ">
          Have an account ?
          <button
            onClick={() => document.getElementById("login").showModal()}
            className="underline ml-1"
          >
            {" "}
            Login Now{" "}
          </button>
        </p>
      </form>
      <div className="text-center space-x-3 mb-3">
        <button
          onClick={googleSigUp}
          className="btn btn-circle btn-ghost hover:bg-red hover:text-white"
        >
          <FaGooglePlusG />
        </button>
        <button className="btn btn-circle btn-ghost hover:bg-red hover:text-white">
          <FaFacebookF />
        </button>
        <button className="btn btn-circle btn-ghost hover:bg-red hover:text-white">
          <FaGithub />
        </button>
      </div>
      <Modal nameModal={"login"} />
    </div>
  );
};

export default SignUp;

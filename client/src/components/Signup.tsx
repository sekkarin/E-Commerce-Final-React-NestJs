"use client";
import React from "react";
import { FaGooglePlusG, FaFacebookF, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Modal from "@/components/Modal";
import { usePathname, useRouter } from "next/navigation";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/configs/firebase/firebase.config";
import { useAppDispatch } from "@/lib/hooks";
import { signInWithPopup } from "firebase/auth";
import { setUserCredential } from "@/lib/features/auth/authSlice";
import axios from "@/api/axios";
import { AxiosError } from "axios";

const SignUp = () => {
  const route = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const createUser = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const body = {
        name: createUser.user?.displayName,
        email: createUser.user?.email,
        photoURL: createUser.user?.photoURL,
      };
      if (createUser) {
        const res = await axios.post("/users", body);
        if (res.status === 201) {
          Swal.fire({
            title: "Account created Successfully",
            icon: "success",
            timer: 1500,
          });
          (document.getElementById("login") as HTMLFormElement).close();
          route.replace("/");
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.request.status !== 302) {
          Swal.fire({
            title: "An error occurred in this account.",
            icon: "error",
            timer: 1500,
            text: error?.message,
          });
          route.refresh();
        }
        Swal.fire({
          title: "SignUp google account successfully",
          icon: "success",
          timer: 1500,
        });
        (document.getElementById("login") as HTMLFormElement).close();
        route.replace("/");
      }
    }
  };
  const googleSigUp = async () => {
    const provider = new GoogleAuthProvider();
    const authGoogle = await signInWithPopup(auth, provider);

    try {
      if (authGoogle) {
        const body = {
          name: authGoogle.user?.displayName,
          email: authGoogle.user?.email,
          photoURL: authGoogle.user?.photoURL,
        };
        const res = await axios.post("/users", body);
        if (res.status === 201) {
          // localStorage.setItem("access_token", res.data.access_token);
          Swal.fire({
            title: "SignUp google account successfully",
            icon: "success",
            timer: 1500,
          });
          (document.getElementById("login") as HTMLFormElement).close();
          route.replace("/");
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.request.status !== 302) {
          Swal.fire({
            title: "An error occurred in this account.",
            icon: "error",
            timer: 1500,
            text: error?.message,
          });
          route.refresh();
        }
        Swal.fire({
          title: "SignUp google account successfully",
          icon: "success",
          timer: 1500,
        });
        (document.getElementById("login") as HTMLFormElement).close();
        route.replace("/");
      }
    }
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
            onClick={() =>
              (document.getElementById("login") as HTMLFormElement).showModal()
            }
            className="underline ml-1"
          >
            Login Now
          </button>
        </p>
        {/* <button htmlFor={name} className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
                    onClick={() => document.getElementById(name).close()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="bg-red w-6 h-6 rounded-full text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>


                </button> */}
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

import React, { useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaGooglePlusG, FaFacebookF, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useAppDispatch } from "@/lib/hooks";
import { setUserCredential } from "@/lib/features/auth/authSlice";
import {
  GoogleAuthProvider,
  UserCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/configs/firebase/firebase.config";
import Swal from "sweetalert2";
import axios from "@/api/axios";
import { AxiosError } from "axios";
import { re } from "mathjs";

const Modal = (props: { nameModal: string }) => {
  const route = useRouter();
  const pathname = usePathname();
  const { nameModal } = props;
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const signIn = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (signIn) {
        dispatch(setUserCredential(signIn));
        const res = await requestUserCreateFormServer(signIn);
        if (res.status === 201) {
          Swal.fire({
            title: "SignUp google account successfully",
            icon: "success",
            timer: 1500,
          });
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
        }
        Swal.fire({
          title: "SignUp google account successfully",
          icon: "success",
          timer: 1500,
        });
      }
    }
  };

  const googleSigUp = async () => {
    const provider = new GoogleAuthProvider();
    const authGoogle = await signInWithPopup(auth, provider);
    if (authGoogle) {
      dispatch(setUserCredential(authGoogle));
      const res = await requestUserCreateFormServer(authGoogle);
      if (res.status === 201) {
        Swal.fire({
          title: "SignUp google account successfully",
          icon: "success",
          timer: 1500,
        });
        (document.getElementById("login") as HTMLFormElement).close();
      }
    }
    (document.getElementById(nameModal) as HTMLFormElement).close();
    try {
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
      }
    }
  };
  const goToSignUpPage = () => {
    (window.document.getElementById(nameModal) as HTMLFormElement).close();
  };
  return (
    <dialog id={nameModal} className="modal">
      <div className="modal-box">
        <div className="modal-action mt-0 flex flex-col justify-center ">
          <form
            className="card-body flex flex-col justify-center text-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="font-bold text-lg ">Please Login!</h3>
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
                value="Login"
                className="btn bg-red text-white"
              />
            </div>
            <p className="text-center my-2 ">
              Don&apos;t have an account ?
              <Link
                href="/signup"
                onClick={goToSignUpPage}
                className="underline ml-1"
              >
                Sign Up Now
              </Link>
            </p>
            <button
              // htmlFor={nameModal}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() =>
                (
                  window.document.getElementById("login") as HTMLFormElement
                ).close()
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="bg-red w-6 h-6 rounded-full text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
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
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
async function requestUserCreateFormServer(authGoogle: UserCredential) {
  const body = {
    name: authGoogle.user?.displayName,
    email: authGoogle.user?.email,
    photoURL: authGoogle.user?.photoURL,
  };
  try {
    const res = await axios.post("/users", body);
    return res;
  } catch (error: AxiosError | any) {
    return error;
    // return error;
  }
}

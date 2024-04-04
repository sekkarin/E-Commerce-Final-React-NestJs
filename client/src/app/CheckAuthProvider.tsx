"use client";
import axios from "@/api/axios";
import { auth } from "@/configs/firebase/firebase.config";
import { setUserCredential } from "@/lib/features/auth/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export default function CheckAuthProvider({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const dispatch = useAppDispatch();
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      dispatch(setUserCredential(currentUser));
      try {
        const userInfo = { email: currentUser?.email };
        axios.post(`/auth/jwt`, userInfo).then((response) => {
          if (response.data.access_token) {
            localStorage.setItem("access_token", response.data.access_token);
          }
        });
      } catch (error) {
        console.log(error);
        localStorage.removeItem("access_token");
      }
    } else {
      localStorage.removeItem("access_token");
    }
    return () => {
      return unsubscribe();
    };
  });
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
  //     if (currentUser) {
  //       dispatch(setUserCredential(currentUser));
  //       console.log("use Auth", currentUser);
  //       const userInfo = { email: currentUser?.email };
  //       axios.post(`/auth/jwt`, userInfo).then((response) => {
  //         if (response.data.access_token) {
  //           localStorage.setItem("access_token", response.data.access_token);
  //         }
  //       });
  //     } else {
  //       localStorage.removeItem("access_token");
  //     }
  //     return () => {
  //       return unsubscribe();
  //     };
  //   });
  // }, [dispatch]);

  return children;
}

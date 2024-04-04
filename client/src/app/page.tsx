"use client";
import Categories from "./_componnents/Categories";
import { useAppDispatch } from "@/lib/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { setUserCredential } from "@/lib/features/auth/authSlice";
import { auth } from "@/configs/firebase/firebase.config";
import SpecialProduct from "./_componnents/SpecialProduct";
import axios from "@/api/axios";
import Testimonials from "./_componnents/Testimonials";
import OurService from "./_componnents/OurService";

export default function Home() {
 
  return (
    <>
      <Categories />
      <SpecialProduct />
      <Testimonials/>
      <OurService/>
    </>
  );
}

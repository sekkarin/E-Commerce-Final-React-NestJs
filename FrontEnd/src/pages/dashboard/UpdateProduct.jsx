import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

const UpdateProduct = () => {
  const { state } = useLocation();
  const axios = useAxiosSecure();
 
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      price: state.data.price,
      description: state.data.description,
      name: state.data.name,
      image: state.data.image,
    },
  });

  const onSubmit = (data, e) => {
    try {
      axios.put(`/products/${state.data._id}`, data).then((response) => {
        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            title: "Product added success",
            icon: "success",
            showConfirmButton: false,
            timer: "1500",
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
        timer: "1500",
        position: "center",
      });
    }
  };
  return (
    <div className="flex flex-col p-2 gap-3">
      <h1 className="text-4xl font-medium">Update a Product Item</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-control grow">
          <div className="label">
            <span className="label-text">Product name</span>
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
              <span className="label-text">Category</span>
            </div>
            <select
              className="select select-bordered"
              required
              {...register("category")}
            >
              <option disabled selected value={"อื่นๆ"}>
                เลือก
              </option>
              <option value="คอมพิวเตอร์">คอมพิวเตอร์</option>
              <option value="เสื้อผ้า">เสื้อผ้า</option>
              <option value="รองเท้า">รองเท้า</option>
              <option value="เครื่องสำอาง">เครื่องสำอาง</option>
              <option value="อุปกรณ์กีฬา">อุปกรณ์กีฬา</option>
              <option value="อุปกรณ์ตกปลา">อุปกรณ์ตกปลา</option>
              <option value="เครื่องใช้ไฟฟ้า">เครื่องใช้ไฟฟ้า</option>
              <option value="เครื่องใช้สำนักงาน">เครื่องใช้สำนักงาน</option>
              <option value="ของเล่นเด็ก">ของเล่นเด็ก</option>
              <option value="อุปกรณ์แต่งบ้าน">อุปกรณ์แต่งบ้าน</option>
              <option value="อาหารและเครื่องดื่ม">อาหารและเครื่องดื่ม</option>
              <option value="เครื่องดนตรี">เครื่องดนตรี</option>
              <option value="หนังสือ">หนังสือ</option>
              <option value="เครื่องมือช่าง">เครื่องมือช่าง</option>
              <option value="ของสะสม">ของสะสม</option>
              <option value="อุปกรณ์ทำสวน">อุปกรณ์ทำสวน</option>
              <option value="เครื่องดื่มและอาหารสุนัข">
                เครื่องดื่มและอาหารสุนัข
              </option>
              <option value="อุปกรณ์ตกแต่งรถ">อุปกรณ์ตกแต่งรถ</option>
              <option value="อุปกรณ์ทำอาหาร">อุปกรณ์ทำอาหาร</option>
              <option value="เสียงรถยนต์">เสียงรถยนต์</option>
            </select>
          </label>

          <label className="form-control grow">
            <div className="label">
              <span className="label-text">Price</span>
            </div>
            <input
              type="number"
              required
              {...register("price")}
              className="input input-bordered w-auto"
            />
          </label>
        </div>
        <label className="form-control grow">
          <div className="label">
            <span className="label-text">Product Detail</span>
          </div>
          <textarea
            placeholder="description"
            {...register("description")}
            className="textarea textarea-bordered textarea-lg w-full "
          ></textarea>
        </label>
        <label className="form-control grow">
          <div className="label">
            <span className="label-text">Image Url</span>
          </div>
          <input
            type="text"
            // placeholder="Type here"
            required
            {...register("image")}
            className="input input-bordered w-auto"
          />
        </label>
        <button type="submit" className="btn btn-accent text-white w-full my-4">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;

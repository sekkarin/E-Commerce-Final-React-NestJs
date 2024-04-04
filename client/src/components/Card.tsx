import React, { useState } from "react";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { useAppSelector } from "@/lib/hooks";
import useAxiosPrivate from "@/hooks/axiosPrivate";

const Card =  ({ item }: { item: any }) => {
  const { _id, name, image, price, description } = item;
  const user = useAppSelector((state) => state.auth.userCredential);
  const axiosPrivate = useAxiosPrivate();
  const [isHeartFailed, setIsHeartFiled] = useState(false);
  const handleHeartClick = () => {
    setIsHeartFiled(!isHeartFailed);
  };
  const handleAddProduct = (item: any) => {
    if (user && user.email) {
      const cartItemObject = {
        productId: item._id.toString(),
        name: item.name,
        email: user.email,
        price: item.price,
        image: item.image,
        quantity: 1,
      };
      try {
        axiosPrivate.post(`/carts`, cartItemObject).then((response) => {
          if (response.status === 200 || response.status === 201) {
            Swal.fire({
              title: "Product added to cart",
              icon: "success",
              timer: 1500,
              position: "center",
            });
            // console.log(cartItemObject);
          }
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMessage = error.message;
          Swal.fire({
            title: errorMessage,
            icon: "success",
            timer: 1500,
            // text: error?.message,
            position: "center",
          });
        }
      }
    } else {
      Swal.fire({
        title: "Product added to cart?",
        position: "center",
        icon: "warning",
        confirmButtonColor: "blue",
        cancelButtonColor: "blue",
        showConfirmButton: true,
        confirmButtonText: "Login Now",
      });
    }
  };
  return (
    <div className="card shadow-xl relative mr-5 md:my-5 h-120">
      <div
        className={`rating heart gap-1 absolute right-2 top-2 rounded-full p-4 heartStar bg-red ${
          isHeartFailed ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
        </svg>
      </div>
      <div>
        <figure>
          <img
            src={image}
            alt=""
            className="hover:scale-105 transition-all duration-300 md:h-60"
          />
        </figure>
      </div>
      <div className="card-body">
        <div>
          <h2 className="card-title">{name}</h2>
          <p>{description}</p>
          <div className="card-actions justify-between items-center mt-2">
            <h5 className="font-semibold">
              {price} <span className="text-sm text-red">฿ </span>
            </h5>
            <button
              className="btn bg-red text-white "
              onClick={() => handleAddProduct(item)}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

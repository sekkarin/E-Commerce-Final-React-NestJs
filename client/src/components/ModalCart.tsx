import React, { useContext, useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import { FiPlus, FiMinus } from "react-icons/fi";
import useCart from "../hooks/useCart";
import { useAppSelector } from "@/lib/hooks";
import axios from "@/api/axios";

const ModalCard = ({
  name,
  totalQuantity,
  setTotalQuantity,
}: {
  name: string;
  totalQuantity: number;
  setTotalQuantity: React.Dispatch<React.SetStateAction<number>>;
}) => {
  // const [cart , refetch] = useCart()
  // const {user , setReload} = useContext(AuthContext)
  const user = useAppSelector((state) => state.auth.userCredential);
  const [dataCart, setDataCart] = useState<any[]>([]);
  const [dataProduct, setDataProduct] = useState<any[]>([]);
  const [nodata, setNodata] = useState([]);
  const [randomOneCary, setRandomOneCart] = useState();
  const [totalCash, setTotalCash] = useState([]);
  // const cartHook = useCart();

  useEffect(() => {
    // cartHook.then(async (result) => {
    //   const data = result?.data;
    //   if (data) {
    //     setDataCart(data);
    //     const productDataPromises = data.map(async (cartItem: any) => {
    //       console.log(cartItem.productId);
    //       const productResponse = await axios(
    //         `/products/${cartItem.productId}`
    //       );
    //       return productResponse.data;
    //     });

    //     const productDataResults = await Promise.all(productDataPromises);

    //     setDataProduct(productDataResults);

    //     // const randomOne = data[0];
    //     // setRandomOneCart(randomOne);

    //     const totalCashInCart = data.reduce(
    //       (Bath: number, item: any) => Bath + item.price * item.quantity,
    //       0
    //     );
    //     setTotalCash(totalCashInCart);
    //   }
    // });
  }, []);

  const closeModal = () => {
    const modal = document.getElementById(name) as HTMLFormElement;
    modal.close();
  };

  const handleIncreaseQuantity = async (cartItem: any) => {
    const cartObjects = {
      productId: cartItem.productId,
      email: cartItem.email,
      price: cartItem.price,
      name: cartItem.name,
      image: cartItem.image,
      quantity: 1,
    };
    try {
      await axios.post(`http://localhost:4000/carts`, cartObjects);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecreaseQuantity = async (cartItem: any) => {
    const DecreaseQuantity = cartItem.quantity - 1;
    const cartObjects = {
      product_id: cartItem.productId,
      email: cartItem.email,
      price: cartItem.price,
      name: cartItem.name,
      image: cartItem.image,
      quantity: DecreaseQuantity,
    };
    try {
      if (cartItem.quantity !== 1) {
        await axios.put(
          `http://localhost:4000/carts/${cartItem._id}`,
          cartObjects
        );
      } else {
        console.log("Cannot DecreaseQuantity");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (cartItem: any) => {
    try {
      await axios.delete(`http://localhost:4000/carts/${cartItem._id}`);
      const total = totalQuantity - cartItem.quantity;

      setTotalQuantity(total);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearAll = async (user: any) => {
    try {
      await axios.delete(`http://localhost:4000/carts/clear/${user.email}`);

      setTotalQuantity(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <dialog id={name} className="modal">
      <div className="modal-box flex flex-col">
        <button className="close-button self-end mr-4" onClick={closeModal}>
          <AiOutlineClose />
        </button>
        {/* เนื้อหา Modal */}
        {nodata ? (
          <div className="items-center justify-center ml-auto mr-auto mt-[100px] mb-[100px]">
            <h1>No product in carts</h1>
          </div>
        ) : (
          <>
            {dataCart.map((cartItem, index) => (
              <div key={index} className="modal-content flex p-4 items-center">
                {/* รูปสินค้า */}
                <img
                  src={cartItem.image}
                  alt="Product"
                  className="w-12 h-12 mr-4"
                />

                {/* ชื่อสินค้า */}
                <div>
                  <p className="text-sm font-semibold">
                    {dataProduct[index]?.name}
                  </p>
                  <p className="text-gray-500">
                    {dataProduct[index]?.description}
                  </p>
                </div>

                {/* จำนวนสินค้า */}
                <div className="flex items-center ml-auto">
                  <button
                    className="quantity-button"
                    onClick={() => handleDecreaseQuantity(cartItem)}
                  >
                    <FiMinus />
                  </button>
                  <span className="mx-2">{cartItem?.quantity}</span>
                  <button
                    className="quantity-button"
                    onClick={() => handleIncreaseQuantity(cartItem)}
                  >
                    <FiPlus />
                  </button>
                </div>

                {/* ถังขยะ */}
                <button
                  className="delete-button ml-[30px]"
                  onClick={() => handleDelete(cartItem)}
                >
                  <AiOutlineDelete />
                </button>
              </div>
            ))}
            {/* ข้อมูลรายละเอียดเพิ่มเติม */}
            <div className="flex p-4 items-center">
              <p>Name : {user.displayName}</p>
              <p className="ml-auto">{totalQuantity} รายการ</p>
            </div>
            <div className="flex p-4 items-center">
              <p>Email : {user.email}</p>
              <p className="ml-auto">รวม {totalCash} บาท</p>
            </div>
            <div className="flex p-4 items-center">
              <p>PhoneNumber : 086-251-0754</p>
            </div>
            {/* ปุ่ม Clear All และ Buy Now */}
            <div className="flex">
              <button
                className="bg-red text-white px-4 py-2 rounded ml-auto"
                onClick={() => handleClearAll(user)}
              >
                Clear All
              </button>
              <button className="bg-blue text-white px-4 py-2 rounded ml-[10px]">
                Buy Now
              </button>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
};

export default ModalCard;

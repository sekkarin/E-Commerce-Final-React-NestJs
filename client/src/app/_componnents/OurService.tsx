/* eslint-disable react/no-unescaped-entities */
import React from "react";

const OurService = () => {
  const serviceList = [
    {
      id: 1,
      title: "High Quality Product",
      description: "We offer a curated selection of high-quality products",
      image: "/images/home/services/assurance.png",
    },
    {
      id: 2,
      title: "Fast Delivery",
      description: "We delivery your order promptly to your door",
      image: "/images/home/services/fast-delivery.png",
    },
    {
      id: 3,
      title: "Online Ordering",
      description:
        "Explore products & order with ease using our Online Ordering ",
      image: "/images/home/services/order.png",
    },
    {
      id: 1,
      title: "Gift Cards",
      description:
        "Give the gift of exceptional dining with SE Shop Gift Cards",
      image: "/images/home/services/gift.png",
    },
  ];

  return (
    <div className="section-container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle"> OUR STORY & SERVICES</p>
            <h2 className="title"> Our Journet And Services</h2>
            <blockquote className="my-5 text-secondary leading-[30px]">
              " We provide a curated selection of high-quality tech-inspired
              product backed by fast shipping and exceptional customer service.
              Our mission is to empower and inspire tech enthusiasts through our
              carefully chosen merchandise and community engagement initiatives"
            </blockquote>
            <button className="btn bg-red text-white rounded-full">
              Explore
            </button>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 items-center">
            {serviceList.map((service,i) => (
              <div
                key={i}
                className="shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-red cursor-pointer
             hover:border hover:border-indigo-600 transition-all duration-200"
              >
                <img src={service.image} alt="" className="mx-auto h-16" />
                <h5 className="pt-3 font-semibold">{service.title}</h5>
                <p className="text-[#bd9090]">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurService;

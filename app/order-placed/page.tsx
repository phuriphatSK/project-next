"use client";

import Image from "next/image";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const OrderPlaced = () => {
  const appContext = useAppContext();

  if (!appContext || !appContext.router) {
    throw new Error("AppContext or router is not available");
  }

  const { router } = appContext;

  useEffect(() => {
    setTimeout(() => {
      router.push("/my-orders");
    }, 5000);
  }, [router]);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-5">
      <div className="flex justify-center items-center relative">
        <Image className="absolute p-5" src={assets.checkmark} alt="" />
        <div className="animate-spin rounded-full h-24 w-24 border-4 border-t-green-300 border-gray-200"></div>
      </div>
      <div className="text-center text-2xl font-semibold">
        Order Placed Successfully
      </div>
    </div>
  );
};

export default OrderPlaced;

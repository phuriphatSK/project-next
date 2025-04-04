"use client";
import { productsDummyData, userDummyData } from "../assets/assets";

type Product = {
  _id: string;
  offerPrice: number;
  // Add other properties of Product as needed
};
import { useUser } from "@clerk/nextjs";
import type { UserResource } from "@clerk/types"; // ✅ เพิ่มตรงนี้
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type AppContextType = {
  user: UserResource | null | undefined;
  currency: string | undefined;
  router: ReturnType<typeof useRouter>;
  isSeller: boolean;
  setIsSeller: React.Dispatch<React.SetStateAction<boolean>>;
  userData: typeof userDummyData | null;
  fetchUserData: () => Promise<void>;
  products: Product[];
  fetchProductData: () => Promise<void>;
  cartItems: Record<string, number>;
  setCartItems: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  addToCart: (itemId: string) => Promise<void>;
  updateCartQuantity: (itemId: string, quantity: number) => Promise<void>;
  getCartCount: () => number;
  getCartAmount: () => number;
};

export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const currency = process.env.NEXT_PUBLIC_CURRENCY;
  const router = useRouter();

  const { user } = useUser();

  const [userData, setUserData] = useState<typeof userDummyData | null>(null);
  const [isSeller, setIsSeller] = useState(true);
  const [cartItems, setCartItems] = useState<Record<string, number>>({});

  const fetchProductData = async () => {
    setProducts(productsDummyData);
  };

  const fetchUserData = async () => {
    setUserData(userDummyData);
  };

  const addToCart = async (itemId: string | number) => {
    const cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
  };

  const updateCartQuantity = async (
    itemId: string | number,
    quantity: number
  ) => {
    const cartData = structuredClone(cartItems);
    if (quantity === 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      if (cartItems[items] > 0) {
        totalCount += cartItems[items];
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      const itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0) {
        if (itemInfo) {
          totalAmount += itemInfo.offerPrice * cartItems[items];
        }
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  useEffect(() => {
    fetchUserData();
  }, []);

  const value = {
    user,
    currency,
    router,
    isSeller,
    setIsSeller,
    userData,
    fetchUserData,
    products,
    fetchProductData,
    cartItems,
    setCartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

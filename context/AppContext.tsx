"use client";
import { productsDummyData, userDummyData } from "../assets/assets";

import { useUser } from "@clerk/nextjs";
import type { UserResource } from "@clerk/types"; // ✅ เพิ่มตรงนี้
import { useParams, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { Product, ProductType } from "../app/type";

type AppContextType = {
  id: string;
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
  productData: ProductType | null;
  addToCart: (itemId: string) => Promise<void>;
  updateCartQuantity: (itemId: string, quantity: number) => Promise<void>;
  getCartCount: () => number;
  getCartAmount: () => number;
  setProductData: React.Dispatch<React.SetStateAction<ProductType | null>>;
};

export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { id } = useParams<{ id: string }>(); // Specify the type of the params
  const [products, setProducts] = useState<Product[]>([]);
  const currency = process.env.NEXT_PUBLIC_CURRENCY;
  const router = useRouter();

  const { user } = useUser();

  const [userData, setUserData] = useState<typeof userDummyData | null>(null);
  const [isSeller, setIsSeller] = useState(true);
  const [cartItems, setCartItems] = useState<Record<string, number>>({});

  const [productData, setProductData] = useState<ProductType | null>(null);

  const fetchProductData = async () => {
    setProducts(
      productsDummyData.map((product) => ({
        ...product,
        image: Array.isArray(product.image) ? product.image : [product.image],
      }))
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchProductDataid = async () => {
    const product = products.find((product) => product._id === id);
    setProductData(
      product
        ? {
            ...product,
            description: "", // Provide default or fetched values
            price: product.offerPrice, // Map offerPrice to price
            category: "", // Provide default or fetched values
            image: Array.isArray(product.image)
              ? product.image
              : [product.image], // Ensure image is an array
          }
        : null
    );
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

  useEffect(() => {
    fetchProductDataid();
  }, [fetchProductDataid, id, products.length]);

  const value = {
    productData,
    setProductData,
    id,
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

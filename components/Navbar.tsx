"use client";
import React from "react";

import Link from "next/link";

import Image from "next/image";
import { useAppContext } from "../context/AppContext";
import { assets, BagIcon, CartIcon } from "../assets/assets";
import { useClerk, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const appContext = useAppContext();

  if (!appContext) {
    return null; // Handle the case where the context is null
  }

  const { isSeller, router, user } = appContext;

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push("/")}
        src={assets.logo}
        alt="logo"
      />
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          Contact
        </Link>

        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
      </div>

      <ul className="hidden md:flex items-center gap-4 ">
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
        {user ? (
          <>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Cart"
                  labelIcon={<CartIcon />}
                  onClick={() => router.push("/cart")}
                ></UserButton.Action>
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Orders"
                  labelIcon={<BagIcon />}
                  onClick={() => router.push("/my-orders")}
                ></UserButton.Action>
              </UserButton.MenuItems>
            </UserButton>
          </>
        ) : (
          <button
            onClick={() => openSignIn()}
            className="flex items-center gap-2 hover:text-gray-900 transition cursor-pointer"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full  cursor-pointer"
          >
            Seller Dashboard
          </button>
        )}
        <button
          onClick={() => openSignIn()}
          className="flex items-center gap-2 hover:text-gray-900 transition  cursor-pointer"
        >
          <Image src={assets.user_icon} alt="user icon" />
          Account
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

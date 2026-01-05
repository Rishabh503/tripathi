"use client";

import { useState } from "react";
import Link from "next/link";
import UserDetails from "./UserExist";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-200">
        <UserDetails/>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl font-semibold text-gray-800">
          Share & Loan
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-gray-600">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <Link href="/login" className="hover:text-black">
            Login
          </Link>
          <Link href="/register" className="hover:text-black">
            Register
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 flex flex-col gap-4 text-gray-600">
          <Link href="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/login" onClick={() => setIsOpen(false)}>
            Login
          </Link>
          <Link href="/register" onClick={() => setIsOpen(false)}>
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

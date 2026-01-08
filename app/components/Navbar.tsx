"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import { useState } from "react";

export default function Navbar() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [open, setOpen] = useState(false);

  if (!isLoaded) return null;

  return (
    <nav className="hidden md:block w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-green-700 text-lg">🏛</span>
          </div>
          <span className="text-lg font-semibold text-gray-900">
            Tripathi Society
          </span>
        </div>

        {/* Right */}
        {!isSignedIn ? (
          <a
            href="/login"
            className="px-5 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition"
          >
            Log In
          </a>
        ) : (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition"
            >
              <img
                src={user.imageUrl}
                alt="Profile"
                className="w-9 h-9 rounded-full border"
              />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">
                  {user.fullName}
                </p>
                <p className="text-xs text-gray-500">Member</p>
              </div>
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border overflow-hidden">
                <MenuItem label="Dashboard" />
                <MenuItem label="My Shares" />
                <MenuItem label="My Loans" />
                <MenuItem label="Payments" />

                <div className="border-t">
                  <SignOutButton>
                    <button className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50">
                      Sign Out
                    </button>
                  </SignOutButton>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

function MenuItem({ label }: { label: string }) {
  return (
    <button className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
      {label}
    </button>
  );
}

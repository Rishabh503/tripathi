"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import { useState } from "react";

export default function MobileNavbar() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [open, setOpen] = useState(false);

  if (!isLoaded) return null;

  // ❌ If not signed in, use your existing design
  if (!isSignedIn) return null;

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="px-4 py-3 flex items-center justify-between">
        
        {/* Left: Greeting */}
        <div>
          <p className="text-xs text-gray-500">Good Morning</p>
          <p className="text-sm font-semibold text-gray-900">
            {user.fullName}
          </p>
        </div>

        {/* Right: Profile */}
        <button onClick={() => setOpen(!open)} className="relative">
          <img
            src={user.imageUrl}
            alt="Profile"
            className="w-9 h-9 rounded-full border"
          />
        </button>
      </div>

      {/* Dropdown / Sheet */}
      {open && (
        <div className="absolute right-4 top-16 w-56 bg-white rounded-xl shadow-lg border overflow-hidden">
          
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
  );
}

function MenuItem({ label }: { label: string }) {
  return (
    <button className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
      {label}
    </button>
  );
}

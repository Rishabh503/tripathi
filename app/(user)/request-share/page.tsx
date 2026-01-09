"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import {startDate} from "../../../app/utils/constants.js"
export default function RequestSharePage() {
  const { user } = useUser();
  const date1=new Date("2025-10-1");
   const endDate=new Date();
 function getMonthDifference(startDate, endDate) {
  return (
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth())
  );
}
 
  
  const SHARE_PRICE = getMonthDifference(date1,endDate)*100 // ₹ per share

  const [shares, setShares] = useState(100);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [agree, setAgree] = useState(false);

  const totalAmount = shares * SHARE_PRICE;

  const submitRequest = async () => {
    if (!user || !agree) return;

    setLoading(true);
    setMsg("");

    const res = await fetch("/api/request-share", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        numberOfShares: shares,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setMsg("Share request submitted for approval.");
      setShares(100);
      setAgree(false);
    } else {
      setMsg(data.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7f9] p-5">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button className="text-xl">←</button>
        <h1 className="text-lg font-semibold">Request Shares</h1>
      </div>

      {/* Current Share Price */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100 mb-6">
        <p className="text-xs text-green-600 uppercase tracking-wide">
          Current One Share Price
        </p>
        <div className="flex items-end gap-2 mt-1">
          <p className="text-3xl font-semibold text-gray-900">
            ₹{SHARE_PRICE.toFixed(2)}
          </p>
          <span className="text-sm text-green-600 font-medium">
            100₹ per month after this
          </span>
        </div>
      </div>

      {/* Input */}
      <div className="mb-6">
        <p className="font-medium mb-1">
          How many shares?
        </p>
        <p className="text-sm text-gray-500 mb-2">
          Enter the number of shares you wish to acquire.
        </p>

        <input
          type="number"
          min={1}
          value={shares}
          onChange={(e) => setShares(Number(e.target.value))}
          className="w-full rounded-xl border px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Total Amount */}
      <div className="bg-green-50 rounded-2xl p-5 mb-6 border border-green-200">
        <p className="text-xs text-green-700 uppercase tracking-wide">
          Total Amount To Pay
        </p>
        <p className="text-3xl font-semibold text-green-600 mt-1">
          ₹{totalAmount.toFixed(2)}
        </p>
        <p className="text-xs text-green-700 mt-1">
          Fees and taxes included
        </p>
      </div>

      {/* Info Cards */}
      <div className="space-y-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm flex gap-3">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            ℹ️
          </div>
          <div>
            <p className="font-medium text-sm">
              Why buy shares?
            </p>
            <p className="text-xs text-gray-500">
              Purchasing shares increases your ownership in the society
              and qualifies you for annual dividends.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm flex gap-3">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            ✓
          </div>
          <div>
            <p className="font-medium text-sm">
              Approval Process
            </p>
            <p className="text-xs text-gray-500">
              Share the Payment screenshot if u have done upi 
              Requests are reviewed and approved within 1–2 business days.
              You will be notified once approved.
            </p>
          </div>
        </div>
      </div>

      {/* Agreement */}
      <div className="flex items-start gap-3 mb-6">
        <input
          type="checkbox"
          checked={agree}
          onChange={() => setAgree(!agree)}
          className="mt-1 accent-green-500"
        />
        <p className="text-xs text-gray-600">
          I confirm my intent to purchase these shares and agree to the{" "}
          <span className="text-green-600 underline cursor-pointer">
            Terms & Conditions
          </span>
        </p>
      </div>

      {/* Submit */}
      <button
        onClick={submitRequest}
        disabled={loading || !agree}
        className="w-full bg-green-500 text-white py-4 rounded-2xl text-lg font-medium disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Request →"}
      </button>

      {msg && (
        <p className="text-center text-sm text-gray-600 mt-4">
          {msg}
        </p>
      )}
    </div>
  );
}

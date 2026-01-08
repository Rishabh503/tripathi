"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function RequestSharePage() {
  const { user } = useUser();
  const [shares, setShares] = useState(1);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const submitRequest = async () => {
    if (!user) return;

    setLoading(true);
    setMsg("");

    const res = await fetch("/api/request-share", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id, // clerkId
        numberOfShares: shares,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setMsg("Share request submitted for approval.");
      setShares(1);
    } else {
      setMsg(data.error || "Something went wrong");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 bg-white p-6 rounded-xl shadow">
      <h1 className="text-xl font-semibold text-gray-900 mb-4">
        Request New Shares
      </h1>

      <label className="block text-sm text-gray-600 mb-1">
        Number of Shares
      </label>
      <input
        type="number"
        min={1}
        value={shares}
        onChange={(e) => setShares(Number(e.target.value))}
        className="w-full border rounded-lg px-3 py-2 mb-4"
      />

      <button
        onClick={submitRequest}
        disabled={loading}
        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
      >
        {loading ? "Submitting..." : "Submit Request"}
      </button>

      {msg && (
        <p className="text-sm text-center text-gray-600 mt-4">{msg}</p>
      )}
    </div>
  );
}

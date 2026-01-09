"use client";

import { useEffect, useState } from "react";

export default function ShareApprovalsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    const res = await fetch("/api/admin/share/requests");
    const data = await res.json();
    setRequests(data);
    setLoading(false);
    console.log(data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approve = async (id: string) => {
    await fetch("/api/admin/share/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId: id }),
    });

    fetchRequests();
  };

  const reject = async (id: string) => {
    await fetch("/api/admin/share/reject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId: id }),
    });

    fetchRequests();
  };

  if (loading) return <p className="p-6">Loading approvals...</p>;

  const totalPending = requests.filter((r) => r.status === "pending").length;
  const totalValue = requests.reduce((sum, r) => sum + (r.totalAmount || 0), 0);

  return (
    <div className="min-h-screen bg-[#f5f7f9] p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button className="text-xl">←</button>
        <h1 className="text-lg font-semibold">Share Request Approvals</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500">Total Pending</p>
          <p className="text-2xl font-semibold">{totalPending}</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500">Total Value</p>
          <p className="text-2xl font-semibold">₹{totalValue}</p>
        </div>
      </div>

      {/* Pending Requests */}
      <div>
        <p className="text-sm tracking-widest text-gray-500 mb-3">
          PENDING REQUESTS
        </p>

        <div className="space-y-4">
          {requests.map((r) => (
            <div key={r.id} className="bg-white rounded-2xl p-4 shadow-sm">
              {/* User info */}
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
                    {r.user?.name?.[0] || "U"}
                  </div>

                  <div>
                    <p className="font-medium text-gray-900">{r.user?.name}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(r.requestDate).toDateString()}
                    </p>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium
    ${
      r.status === "pending"
        ? "bg-orange-100 text-orange-700"
        : r.status === "approved"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }
  `}
                >
                  {r.status}
                </span>
              </div>

              {/* Share info */}
              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-gray-500">Shares Requested</p>
                <p className="font-semibold text-blue-600">
                  {r.numberOfShares} Shares
                </p>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                  onClick={() => reject(r.id)}
                  disabled={r.status !== "pending"}
                  className="py-2 rounded-xl border border-red-200 text-red-600 disabled:opacity-50"
                >
                  ✕ Reject
                </button>

                <button
                  onClick={() => approve(r.id)}
                  disabled={r.status !== "pending"}
                  className="py-2 rounded-xl bg-blue-600 text-white disabled:opacity-50"
                >
                  ✓ Approve
                </button>
              </div>
            </div>
          ))}

          {requests.length === 0 && (
            <p className="text-center text-gray-500">No pending requests</p>
          )}
        </div>
      </div>
    </div>
  );
}

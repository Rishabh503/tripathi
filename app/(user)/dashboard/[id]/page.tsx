"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const params = useParams();
  const id = params.id as string;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      const res = await fetch(`/api/user?userId=${id}`);
      const result = await res.json();
      setData(result);
      setLoading(false);
    };

    fetchUser();
  }, [id]);

  if (loading) return <p className="p-6">Loading dashboard...</p>;
  if (!data?.user) return <p className="p-6">User not found</p>;

  const { user } = data;
  const shares = user.shares || [];

  // -----------------------------
  // Derived data from shares
  // -----------------------------
  const amountPerShare = 100;
  const totalShares = shares.length;
  const totalShareValue = totalShares * amountPerShare;

  // -----------------------------
  // Dummy loan data (for now)
  // -----------------------------
  const loan = {
    id: "#402",
    outstanding: 2100,
    emi: 150,
    dueDate: "Oct 15",
    disbursed: "Jan 12, 2023",
  };

  return (
    <div className="min-h-screen bg-[#f5f7f9] p-5 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300" />
          <div>
            <p className="text-xs text-gray-500 uppercase">Welcome Back</p>
            <p className="text-lg font-semibold text-gray-900">
              {user.name}
            </p>
          </div>
        </div>

        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
          🔔
        </div>
      </div>

      {/* Financial Summary */}
      <div>
        <p className="text-sm tracking-widest text-gray-500 mb-3">
          FINANCIAL SUMMARY
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl p-5 bg-[#18345b] text-white shadow-sm">
            <p className="text-sm text-gray-300">
              Total Share Value
            </p>
            <p className="text-3xl font-semibold mt-2">
              ₹{totalShareValue}
            </p>
          </div>

          <div className="rounded-2xl p-5 bg-white shadow-sm">
            <p className="text-sm text-gray-500">
              Shares Owned
            </p>
            <p className="text-3xl font-semibold mt-2">
              {totalShares}
            </p>
            <p className="text-sm text-gray-400">UNITS</p>
          </div>
        </div>
      </div>

      {/* Request Shares */}
      <button className="w-full bg-teal-500 text-white py-4 rounded-2xl text-lg font-medium">
       <Link href='/request-share'>
        + Request New Shares
       </Link>
      </button>

      {/* Current Active Loans */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm tracking-widest text-gray-500">
            CURRENT ACTIVE LOANS
          </p>
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
            1 ACTIVE
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-lg font-semibold">
                Personal Loan {loan.id}
              </p>
              <p className="text-sm text-gray-500">
                Disbursed {loan.disbursed}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <p className="text-xs text-gray-500">
                Outstanding Balance
              </p>
              <p className="text-xl font-semibold">
                ₹{loan.outstanding}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-500">Next EMI</p>
              <p className="text-xl font-semibold text-teal-600">
                ₹{loan.emi}
              </p>
              <p className="text-xs text-gray-400">
                Due {loan.dueDate}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-white rounded-2xl py-5 shadow-sm font-medium">
          Request Loan
        </button>
        <button className="bg-white rounded-2xl py-5 shadow-sm font-medium">
          View Status
        </button>
      </div>

      {/* Upcoming Payments */}
      <div>
        <p className="text-sm tracking-widest text-gray-500 mb-3">
          UPCOMING PAYMENTS
        </p>

        <div className="bg-white rounded-2xl p-5 shadow-sm flex justify-between items-center">
          <div>
            <p className="font-medium">
              Monthly Contribution
            </p>
            <p className="text-sm text-gray-500">
              Auto-debit on Oct 15
            </p>
          </div>
          <p className="text-lg font-semibold">
            ₹{totalShares * amountPerShare}
          </p>
        </div>
      </div>

    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

export default function ShareApprovalsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    const res = await fetch("/api/admin/share/requests");
    const data = await res.json();
    console.log(data)
    setRequests(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approve = async (id: string) => {
    await fetch("/api/admin/share/approve?status=pending", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId: id }),
    });

    fetchRequests(); // refresh list
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-6">
        Share Requests Approval
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3">Shares</th>
              <th className="p-3">Total Amount</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-3">{r.user?.name}</td>
                <td className="p-3 text-center">{r.numberOfShares}</td>
                <td className="p-3 text-center">₹{r.totalAmount}</td>
                <td className="p-3 text-center">
                  <button disabled={r.status=="approved"}
                    onClick={() => approve(r.id)}
                    className="px-4 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    {r.status=="approved"?"APPROVED":"APPROVE"}
                  </button>
                </td>
              </tr>
            ))}

            {requests.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No pending requests
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

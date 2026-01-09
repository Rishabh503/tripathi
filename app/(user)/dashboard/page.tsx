"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function UserDetailsPage() {
  const { id } = useParams();
  console.log(id)
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/user?id=51131b60-cc0e-4b8e-a6d3-a3df71453ac9`);
      const result = await res.json();
      setData(result);
      setLoading(false);
    };

    fetchUser();
  }, [id]);

  if (loading) return <p className="p-6">Loading user details...</p>;
  if (!data) return <p className="p-6">User not found</p>;

  const { user, shares, loans, payments } = data;

  return (
    <div className="max-w-6xl mx-auto mt-10 space-y-8">

      {/* User Info */}
      <Section title="User Information">
        <Info label="Name" value={user.name} />
        <Info label="Email" value={user.email} />
        <Info label="Phone" value={user.phone || "—"} />
        <Info label="Role" value={user.role} />
        <Info label="Status" value={user.status} />
        <Info
          label="Joined"
          value={new Date(user.createdAt).toLocaleDateString()}
        />
      </Section>

      {/* Shares */}
      {/* <Section title="Shares">
        {shares.length === 0 ? (
          <Empty text="No shares owned" />
        ) : (
          <Table
            headers={["Share No", "Amount", "Purchase Date"]}
            rows={shares.map((s: any) => [
              s.shareNumber,
              `₹${s.amount}`,
              new Date(s.purchaseDate).toLocaleDateString(),
            ])}
          />
        )}
      </Section> */}

      {/* Loans */}
      {/* <Section title="Loans">
        {loans.length === 0 ? (
          <Empty text="No loans found" />
        ) : (
          <Table
            headers={["Principal", "Remaining", "Interest", "Status"]}
            rows={loans.map((l: any) => [
              `₹${l.principal}`,
              `₹${l.remaining}`,
              `${l.interestRate}%`,
              l.status,
            ])}
          />
        )}
      </Section> */}

      {/* Payments */}
      {/* <Section title="Recent Payments">
        {payments.length === 0 ? (
          <Empty text="No payments recorded" />
        ) : (
          <Table
            headers={["Month", "Year", "Total Paid"]}
            rows={payments.slice(0, 5).map((p: any) => [
              p.month,
              p.year,
              `₹${p.totalPaid}`,
            ])}
          />
        )}
      </Section> */}
    </div>
  );
}

export function Section({ title, children }: any) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export function Info({ label, value }: any) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-900 font-medium">{value}</span>
    </div>
  );
}

export function Table({ headers, rows }: any) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((h: string) => (
              <th key={h} className="p-2 border text-left">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row: any[], i: number) => (
            <tr key={i} className="border-t">
              {row.map((cell, j) => (
                <td key={j} className="p-2 border">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Empty({ text }: any) {
  return (
    <p className="text-sm text-gray-500">{text}</p>
  );
}

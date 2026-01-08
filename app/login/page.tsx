import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f4f7f5] flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* Left Visual Section */}
        <div className="relative hidden md:block bg-gradient-to-br from-[#0f3d2e] to-[#1f6f54] p-6">
          <div className="absolute inset-6 rounded-xl overflow-hidden">
            <Image
              src="/image.png"
              alt="Shares and loans"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Content Section */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-700 font-bold">🏛</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              Tripathi Society
            </h1>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-semibold text-gray-900 mb-3">
            Secure Management for Your Shares & Loans
          </h2>

          <p className="text-gray-600 mb-8 leading-relaxed">
            Easily track your monthly payments, view share details,
            and manage loans with complete transparency.
            Designed for the Tripathi community.
          </p>

          {/* Feature Cards */}
          <div className="space-y-4 mb-8">
            <Feature
              title="Track Shares"
              desc="Real-time updates on your holdings"
            />
            <Feature
              title="Manage Loans"
              desc="Clear EMI tracking and approvals"
            />
            <Feature
              title="Payment Transparency"
              desc="Complete monthly payment history"
            />
          </div>

          {/* Actions */}
          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium text-lg transition">
           <Link href='/sign-in'>
            Log In →
           </Link>
          </button>

          <Link href='/sign-in'  className="w-full mt-4 border border-gray-300 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition">
            New Member? Register Here
          </Link>

          <p className="text-sm text-gray-500 text-center mt-6">
            Need help? Contact Admin
          </p>
        </div>
      </div>
    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
        ●
      </div>
      <div>
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{desc}</p>
      </div>
    </div>
  );
}

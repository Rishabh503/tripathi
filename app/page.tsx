// import Trial from "./components/Trial";

import Trial from "./components/Trial";

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">
          Manage Shares & Loans Easily
        </h2>

        <p className="text-gray-600 mb-10">
          A simple management system where users can buy shares, pay monthly
          installments, request loans, and track everything transparently —
          all managed securely by admins.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/register"
            className="px-6 py-3 rounded-md bg-black text-white hover:bg-gray-800"
          >
            Get Started
          </a>

          <a
            href="/login"
            className="px-6 py-3 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Login
          </a>
        </div>
        <Trial/>
      </div>
    </main>
  );
}

import Link from "next/link";

export default function EmailVerifiedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Email Verified</h1>
        <p className="text-gray-700 mb-6">
          Thank you — your email address has been successfully verified. You can
          now sign in and access your dashboard.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/login"
            className="inline-block rounded bg-blue-600 text-white px-5 py-2.5"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

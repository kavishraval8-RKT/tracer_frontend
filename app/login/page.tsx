"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F9FA] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-black/[0.04] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-semibold tracking-tight text-slate-900">
            Welcome back
          </h1>
          <p className="text-slate-600">
            Sign in to continue to Tracer
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <Link href="/reset-password" className="text-xs font-medium text-blue-600 hover:text-blue-700">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-blue-600 py-2.5 font-semibold text-white transition-all hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            Don't have an account?{" "}
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-700">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

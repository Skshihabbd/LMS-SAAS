"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  BookOpen,
  Mail,
  Lock,
  ArrowRight,
  Chrome,
  Eye,
  EyeOff,
} from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ Google redirect থেকে token ধরবে
  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("accessToken", token);
      router.push("/token"); // 🔥 Home এ redirect
    }
  }, [searchParams, router]);

  // ✅ Credential Login
  const handleCredentialLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost:5000/api/v1/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("accessToken", data.data.token);
        router.push("/token"); // 🔥 Home redirect
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  // ✅ Google Login
  const handleGoogleLogin = () => {
    window.location.href =
      "http://localhost:5000/api/v1/user/google";
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4 md:p-6">
      <div className="max-w-md w-full">
        <div className="flex justify-center mb-10">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center">
              <BookOpen size={22} className="text-white" />
            </div>
            <span className="text-2xl font-black text-zinc-900">
              EduSphere
            </span>
          </Link>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black">
              Welcome Back!
            </h2>
          </div>

          <form
            className="space-y-5"
            onSubmit={handleCredentialLogin}
          >
            {/* Email */}
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                size={18}
              />
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full bg-zinc-50 border rounded-2xl py-4 pl-12 pr-4 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-zinc-50 border rounded-2xl py-4 pl-12 pr-12 outline-none"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-all"
            >
              Sign In
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8 text-center text-sm text-zinc-400">
            Or login with
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border py-3.5 rounded-xl hover:bg-zinc-50 font-semibold"
          >
            <Chrome size={18} className="text-red-500" />
            Google
          </button>
        </div>

        <p className="text-center mt-6 text-zinc-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/registration"
            className="text-red-600 font-bold"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
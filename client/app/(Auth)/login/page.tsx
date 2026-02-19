"use client";
import React, { useState } from "react";
import Link from "next/link";
import { 
  BookOpen, Mail, Lock, 
  ArrowRight, Github, Chrome, 
  Eye, EyeOff 
} from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4 md:p-6">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-80 h-80 bg-red-50 rounded-full blur-[120px] opacity-70" />
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-zinc-200 rounded-full blur-[120px] opacity-50" />
      </div>

      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-200 group-hover:rotate-12 transition-transform">
              <BookOpen size={22} className="text-white" />
            </div>
            <span className="text-2xl font-black text-zinc-900 tracking-tight">EduSphere</span>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-zinc-200/50 border border-zinc-100 p-8 md:p-10 relative overflow-hidden">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-zinc-900">Welcome Back!</h2>
            <p className="text-zinc-500 text-sm mt-2">Please enter your details to sign in</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-50 transition-all text-zinc-700"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Password</label>
                <Link href="#" className="text-xs font-bold text-red-600 hover:underline">Forgot Password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl py-4 pl-12 pr-12 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-50 transition-all text-zinc-700"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <Link 
              href="/dashboard"
              className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-all shadow-lg shadow-red-100 active:scale-95 group mt-2"
            >
              Sign In
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </form>

          {/* Divider */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-zinc-400 font-bold tracking-widest">Or login with</span>
            </div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 border border-zinc-100 py-3.5 rounded-xl hover:bg-zinc-50 transition-all font-semibold text-zinc-600 text-sm active:scale-95">
              <Chrome size={18} className="text-red-500" /> Google
            </button>
            <button className="flex items-center justify-center gap-2 border border-zinc-100 py-3.5 rounded-xl hover:bg-zinc-50 transition-all font-semibold text-zinc-600 text-sm active:scale-95">
              <Github size={18} /> Github
            </button>
          </div>
        </div>

        {/* Bottom Link */}
        <p className="text-center mt-8 text-zinc-500 font-medium">
          Don&apos;t have an account?{" "}
          <Link href="/registration" className="text-red-600 font-bold hover:underline transition-all">Create Account</Link>
        </p>
      </div>
    </div>
  );
}
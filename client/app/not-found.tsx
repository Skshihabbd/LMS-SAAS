"use client";
import Link from "next/link";
import { MoveLeft, Home, AlertCircle, LayoutDashboard } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Animated Icon */}
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-red-100 rounded-full scale-150 blur-xl opacity-50 animate-pulse"></div>
          <div className="relative w-24 h-24 bg-red-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-red-200 rotate-12 transition-transform hover:rotate-0 duration-500">
            <AlertCircle size={48} className="text-white" />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-8xl font-black text-zinc-900 mb-2 tracking-tighter">404</h1>
        <h2 className="text-2xl font-bold text-zinc-800 mb-4">Page Not Found</h2>
        <p className="text-zinc-500 mb-10 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          {/* Main Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-red-200 hover:bg-red-700 hover:-translate-y-1 transition-all active:scale-95 w-full sm:w-auto justify-center"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
            
            <Link
              href="/"
              className="flex items-center gap-2 bg-white text-zinc-800 border border-zinc-200 px-6 py-3 rounded-xl font-bold hover:bg-zinc-50 hover:-translate-y-1 transition-all shadow-sm active:scale-95 w-full sm:w-auto justify-center"
            >
              <Home size={18} className="text-red-600" />
              Back to Home
            </Link>
          </div>

          {/* Secondary Action */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 text-zinc-400 hover:text-zinc-600 transition-colors text-sm font-semibold mt-2"
          >
            <MoveLeft size={14} />
            Go Back to Previous Page
          </button>
        </div>

        {/* Footer Decorative Text */}
        <p className="mt-16 text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">
          EduSphere Learning Platform
        </p>
      </div>
    </div>
  );
}
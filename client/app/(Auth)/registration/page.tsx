"use client";
import React, { useState } from "react";
import Link from "next/link";
import { 
  BookOpen, Mail, Lock, User, 
  ArrowRight, Github, Chrome, 
  ChevronLeft, CheckCircle2, Eye, EyeOff 
} from "lucide-react";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  
  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4 md:p-6">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-red-100 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-zinc-200 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="max-w-xl w-full">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-200 group-hover:rotate-12 transition-transform">
              <BookOpen size={22} className="text-white" />
            </div>
            <span className="text-2xl font-black text-zinc-900 tracking-tight">EduSphere</span>
          </Link>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-zinc-200/50 border border-zinc-100 overflow-hidden">
          {/* Progress Bar */}
          <div className="flex h-1.5 bg-zinc-100">
            <div 
              className="bg-red-600 transition-all duration-500 ease-in-out" 
              style={{ width: `${(step / 2) * 100}%` }}
            />
          </div>

          <div className="p-8 md:p-12">
            {step === 1 ? (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-black text-zinc-900">Create Account</h2>
                  <p className="text-zinc-500 text-sm mt-2">Join thousands of learners worldwide</p>
                </div>

                <div className="space-y-4">
                  {/* Name */}
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="Full Name"
                      className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-50 transition-all text-zinc-700"
                    />
                  </div>
                  
                  {/* Email */}
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <input 
                      type="email" 
                      placeholder="Email Address"
                      className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-50 transition-all text-zinc-700"
                    />
                  </div>

                  {/* Password */}
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <input 
                      type={showPass ? "text" : "password"} 
                      placeholder="Password"
                      className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl py-4 pl-12 pr-12 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-50 transition-all text-zinc-700"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                    >
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {/* Confirm Password */}
                  <div className="relative">
                    <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <input 
                      type={showConfirmPass ? "text" : "password"} 
                      placeholder="Confirm Password"
                      className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl py-4 pl-12 pr-12 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-50 transition-all text-zinc-700"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                    >
                      {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Terms and Condition Checkbox */}
                <label className="flex items-start gap-3 cursor-pointer group px-1">
                  <div className="relative flex items-center mt-1">
                    <input type="checkbox" className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-zinc-200 bg-zinc-50 checked:bg-red-600 checked:border-red-600 transition-all" />
                    <CheckCircle2 className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 left-0.5 pointer-events-none" />
                  </div>
                  <span className="text-sm text-zinc-500 leading-tight">
                    I agree to the <Link href="#" className="text-red-600 font-bold hover:underline">Terms of Service</Link> and <Link href="#" className="text-red-600 font-bold hover:underline">Privacy Policy</Link>
                  </span>
                </label>

                <button 
                  onClick={nextStep}
                  className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-all shadow-lg shadow-red-100 group mt-2"
                >
                  Continue
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-100"></div></div>
                  <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest text-zinc-400"><span className="bg-white px-4">Or Connect With</span></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-2 border border-zinc-100 py-3.5 rounded-xl hover:bg-zinc-50 transition-colors font-bold text-zinc-600 text-xs">
                    <Chrome size={16} className="text-red-500" /> Google
                  </button>
                 
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <button onClick={prevStep} className="flex items-center gap-1 text-zinc-400 hover:text-red-600 transition-colors mb-4 font-bold text-sm">
                  <ChevronLeft size={16} /> Back to Details
                </button>
                
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-black text-zinc-900">Account Type</h2>
                  <p className="text-zinc-500 text-sm mt-2">How do you plan to use EduSphere?</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {["Student", "Teacher"].map((role) => (
                    <label key={role} className="relative cursor-pointer group">
                      <input type="radio" name="role" className="peer sr-only" defaultChecked={role === "Student"} />
                      <div className="p-6 rounded-2xl border-2 border-zinc-100 peer-checked:border-red-600 peer-checked:bg-red-50/50 transition-all group-hover:border-zinc-200 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-zinc-400 peer-checked:text-red-600 transition-colors">
                            {role === "Student" ? <User size={24} /> : <BookOpen size={24} />}
                          </div>
                          <div>
                            <p className="font-bold text-zinc-900">{role}</p>
                            <p className="text-xs text-zinc-500">I want to {role === "Student" ? "learn" : "teach"} skills</p>
                          </div>
                        </div>
                        <CheckCircle2 size={24} className="text-red-600 opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                    </label>
                  ))}
                </div>

                <Link 
                  href="/dashboard"
                  className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-all shadow-lg shadow-red-100 mt-8"
                >
                  Complete Registration
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Footer Link */}
        <p className="text-center mt-8 text-zinc-500 font-medium text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-red-600 font-bold hover:underline transition-all">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { 
  BookOpen, Users, Award, ShieldCheck, 
  ChevronRight, PlayCircle, Star, Github, 
  Twitter, Linkedin, Facebook, Menu, X 
} from "lucide-react";

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center shadow-md shadow-red-200">
              <BookOpen size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-zinc-900 tracking-tight">EduSphere</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Courses", "Mentors", "Pricing", "About"].map((item) => (
              <Link key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-zinc-600 hover:text-red-600 transition-colors">
                {item}
              </Link>
            ))}
            <Link href="/dashboard" className="bg-red-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-100">
              Get Started
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-zinc-100 p-4 space-y-4">
          {["Courses", "Mentors", "Pricing", "About"].map((item) => (
            <Link key={item} href="#" className="block text-zinc-600 font-medium">{item}</Link>
          ))}
          <Link href="/dashboard" className="block bg-red-600 text-white text-center py-3 rounded-xl font-bold">Dashboard</Link>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-zinc-950 text-zinc-400 py-12 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-1">
        <div className="flex items-center gap-2 mb-4 text-white">
          <BookOpen className="text-red-600" />
          <span className="text-xl font-bold">EduSphere</span>
        </div>
        <p className="text-sm leading-relaxed">
          The world's leading learning management platform. Empowering students and teachers worldwide.
        </p>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">Platform</h4>
        <ul className="space-y-2 text-sm">
          <li><Link href="#" className="hover:text-red-500">Browse Courses</Link></li>
          <li><Link href="#" className="hover:text-red-500">Scholarships</Link></li>
          <li><Link href="#" className="hover:text-red-500">Mentorship</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">Support</h4>
        <ul className="space-y-2 text-sm">
          <li><Link href="#" className="hover:text-red-500">Help Center</Link></li>
          <li><Link href="#" className="hover:text-red-500">Privacy Policy</Link></li>
          <li><Link href="#" className="hover:text-red-500">Contact Us</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">Socials</h4>
        <div className="flex gap-4">
          <Twitter size={20} className="hover:text-red-500 cursor-pointer" />
          <Linkedin size={20} className="hover:text-red-500 cursor-pointer" />
          <Facebook size={20} className="hover:text-red-500 cursor-pointer" />
          <Github size={20} className="hover:text-red-500 cursor-pointer" />
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto border-t border-zinc-800 mt-12 pt-8 text-center text-xs tracking-widest">
      © 2026 EDUSPHERE. ALL RIGHTS RESERVED.
    </div>
  </footer>
);

// --- Main Home Page ---

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white selection:bg-red-100 selection:text-red-600">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-50 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-50 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-xs font-bold mb-6">
            <Star size={14} fill="currentColor" />
            <span>Over 10,000+ students joined this week</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-zinc-900 tracking-tight mb-6">
            Master Any Skill with <br />
            <span className="text-red-600">Expert-Led</span> Courses
          </h1>
          <p className="max-w-2xl mx-auto text-zinc-500 text-lg mb-10 leading-relaxed">
            EduSphere is your ultimate destination for high-quality education. 
            Learn from industry professionals and get certified today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="bg-red-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-red-200 hover:bg-red-700 hover:-translate-y-1 transition-all w-full sm:w-auto">
              Start Learning Now
            </Link>
            <button className="flex items-center gap-2 text-zinc-700 font-bold px-8 py-4 hover:text-red-600 transition-colors">
              <PlayCircle /> Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Active Students", value: "50k+" },
            { label: "Total Courses", value: "1,200+" },
            { label: "Expert Mentors", value: "450+" },
            { label: "Success Rate", value: "98%" },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-3xl font-black text-zinc-900">{stat.value}</p>
              <p className="text-sm text-zinc-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-zinc-900 mb-4">Why Choose EduSphere?</h2>
          <p className="text-zinc-500">We provide the best tools and resources for your growth.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Learn Anywhere", 
              desc: "Access your courses on any device, anytime. Learn at your own pace.", 
              icon: ShieldCheck, 
              color: "bg-blue-500" 
            },
            { 
              title: "Expert Instruction", 
              desc: "Courses designed and taught by industry experts with years of experience.", 
              icon: Award, 
              color: "bg-red-500" 
            },
            { 
              title: "Community Support", 
              desc: "Join a global community of learners and share your progress.", 
              icon: Users, 
              color: "bg-zinc-900" 
            },
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-3xl border border-zinc-100 hover:border-red-100 hover:bg-red-50/30 transition-all group">
              <div className={`w-12 h-12 ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">{feature.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">{feature.desc}</p>
              <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-red-600 group-hover:gap-3 transition-all">
                Learn More <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 mb-24">
        <div className="max-w-7xl mx-auto bg-red-600 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-red-200">
           {/* Decorative circles */}
           <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
           <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
           
           <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 relative z-10">
             Ready to Start Your Journey?
           </h2>
           <p className="text-red-100 mb-10 text-lg max-w-xl mx-auto relative z-10">
             Join thousands of students who are already learning and growing with EduSphere.
           </p>
           <Link href="/registration" className="relative z-10 inline-block bg-white text-red-600 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-zinc-100 transition-all active:scale-95 shadow-xl">
             Create Free Account
           </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
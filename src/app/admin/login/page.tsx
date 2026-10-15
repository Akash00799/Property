"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Compass,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@terrafirma.in");
  const [password, setPassword] = useState("jaipur-plots-2026");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/admin");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#07140F] text-[#FAF8F5] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Ambient background ornamentation */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C8A870_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full glow-gold" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full glow-emerald" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-[#0A1D16] border border-[#C8A870]/30 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8 backdrop-blur-xl">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-[#DFBE82] to-[#8F6F3B] p-[1.5px] flex items-center justify-center shadow-lg">
            <div className="w-full h-full bg-[#07140F] rounded-[10px] flex items-center justify-center">
              <Compass className="w-7 h-7 text-[#C8A870]" />
            </div>
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-white tracking-wider">
              TERRA<span className="text-[#C8A870] font-light">FIRMA</span>
            </h1>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#C8A870]/80 font-mono mt-1">
              Executive Land Administration Portal
            </p>
          </div>
        </div>

        {/* Demo Mode Notice */}
        <div className="p-3.5 rounded-xl bg-[#0E261D] border border-[#C8A870]/25 text-xs text-stone-300 space-y-1">
          <div className="flex items-center gap-2 text-[#DFBE82] font-semibold text-[11px]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Prototype Authentication (Phase 1)</span>
          </div>
          <p className="text-[11px] text-stone-400 font-light leading-relaxed">
            Click below to enter the admin panel directly. Secure backend sessions and role-based ACL will be linked in Phase 2.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-300 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#07140F] border border-stone-700 focus:border-[#C8A870] text-white text-xs outline-none transition-colors"
                placeholder="admin@terrafirma.in"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-300 mb-1.5">
              Secure Key / Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#07140F] border border-stone-700 focus:border-[#C8A870] text-white text-xs outline-none transition-colors font-mono"
                placeholder="••••••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#DFBE82] via-[#C8A870] to-[#AF8D54] text-[#07140F] font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg mt-2 cursor-pointer"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-[#07140F] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Access Admin Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer links */}
        <div className="pt-2 text-center border-t border-stone-800/80">
          <Link
            href="/"
            className="text-xs text-stone-400 hover:text-[#C8A870] transition-colors inline-flex items-center gap-1.5"
          >
            <span>&larr; Return to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

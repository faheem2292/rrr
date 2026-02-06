// src/app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, LogIn, Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Fake delay to feel like real login
    setTimeout(() => {
      // ✅ FIXED: Dashboard se same key use kar rahe hain
      const savedPassword = localStorage.getItem("uswaPrincipalPassword") || "uswa123";

      if (username.trim().toLowerCase() === "principal" && password === savedPassword) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "principal");
        router.push("/principal/admin");
      } else {
        setError(`Invalid credentials. Default: principal / ${savedPassword === "uswa123" ? "uswa123" : "your custom password"}`);
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50 to-blue-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-3xl shadow-2xl shadow-indigo-200/50 p-8 sm:p-10 w-full max-w-md border-t-4 border-indigo-600 animate-fade-in">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl text-white mb-4 shadow-lg">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            USWA PRO
          </h1>
          <p className="text-slate-500 mt-1 font-medium">Principal / Admin Portal</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl mb-6 text-center text-sm animate-shake">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1.5">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-2xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200/50 outline-none transition-all text-base placeholder-slate-400"
              placeholder="principal"
              autoComplete="username"
              required
              autoFocus
            />
          </div>

          {/* Password Field with Toggle */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-2xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200/50 outline-none transition-all text-base pr-11"
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Signing in...
              </>
            ) : (
              <>
                <LogIn size={20} />
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Forgot Password & Hint */}
        <div className="mt-6 text-center text-sm">
          <button
            onClick={() => alert("Contact school IT or admin to reset your password.\nDefault credentials: principal / uswa123")}
            className="text-indigo-600 hover:underline font-medium"
          >
            Forgot Password?
          </button>

          <p className="mt-4 text-slate-500">
            Default: <strong className="text-indigo-700">principal</strong> /{" "}
            <strong className="text-indigo-700">uswa123</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
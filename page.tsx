"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "register") {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name: name || undefined }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Registration failed");
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(
          mode === "register"
            ? "Account created but sign-in failed"
            : "Invalid email or password"
        );
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-zinc-800/80">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-zinc-100 flex items-center justify-center">
              <span className="text-zinc-900 text-xs font-bold tracking-tight">N</span>
            </div>
            <span className="font-medium tracking-tight text-zinc-100">Nexus</span>
          </div>
          <div className="text-xs text-zinc-500 font-mono">v0.1 · Simulation</div>
        </div>
      </header>

      <main className="flex-1 flex">
        {/* Left - Marketing */}
        <section className="hidden lg:flex flex-1 flex-col justify-center px-16 xl:px-24 border-r border-zinc-800/80">
          <p className="text-xs font-medium tracking-widest text-zinc-500 uppercase mb-6">
            Trading Terminal
          </p>
          <h1 className="text-4xl xl:text-5xl font-semibold tracking-tight text-zinc-50 leading-[1.15] max-w-lg mb-6">
            Professional tools for serious market research.
          </h1>
          <p className="text-zinc-400 text-base leading-relaxed max-w-md mb-10">
            Charts, signals, news, AI analysis and paper trading — in one clean,
            distraction-free workspace.
          </p>

          <div className="space-y-4 text-sm text-zinc-400">
            <div className="flex items-start gap-3">
              <span className="text-zinc-600 mt-0.5">01</span>
              <div>
                <p className="text-zinc-200 font-medium">Advanced charting</p>
                <p className="text-zinc-500">TradingView charts with full indicator suite</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-zinc-600 mt-0.5">02</span>
              <div>
                <p className="text-zinc-200 font-medium">Simulated trading</p>
                <p className="text-zinc-500">Paper trade with real-time market data</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-zinc-600 mt-0.5">03</span>
              <div>
                <p className="text-zinc-200 font-medium">AI research assistant</p>
                <p className="text-zinc-500">Ask questions about markets and strategies</p>
              </div>
            </div>
          </div>
        </section>

        {/* Right - Auth */}
        <section className="w-full lg:w-[420px] xl:w-[460px] flex flex-col justify-center px-8 py-12">
          <div className="max-w-sm mx-auto w-full">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-50 mb-1">
              {mode === "signin" ? "Sign in" : "Create account"}
            </h2>
            <p className="text-sm text-zinc-500 mb-8">
              {mode === "signin"
                ? "Access your trading workspace"
                : "Start with a free simulation account"}
            </p>

            {/* Google */}
            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 h-10 rounded-md border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-sm font-medium text-zinc-200 transition-colors disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[#09090b] px-3 text-zinc-600">or</span>
              </div>
            </div>

            {error && (
              <div className="mb-4 px-3 py-2 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "register" && (
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Optional"
                    className="w-full h-10 px-3 rounded-md bg-zinc-900 border border-zinc-700 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-500 focus:border-zinc-500"
                  />
                </div>
              )}
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-10 px-3 rounded-md bg-zinc-900 border border-zinc-700 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-500 focus:border-zinc-500"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full h-10 px-3 rounded-md bg-zinc-900 border border-zinc-700 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-500 focus:border-zinc-500"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-10 rounded-md bg-zinc-100 hover:bg-white text-zinc-900 text-sm font-medium transition-colors disabled:opacity-50"
              >
                {loading
                  ? "Please wait…"
                  : mode === "register"
                  ? "Create account"
                  : "Sign in"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-500">
              {mode === "signin" ? (
                <>
                  No account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("register");
                      setError("");
                    }}
                    className="text-zinc-300 hover:text-white transition-colors"
                  >
                    Create one
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signin");
                      setError("");
                    }}
                    className="text-zinc-300 hover:text-white transition-colors"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>

            <p className="mt-10 text-center text-[11px] text-zinc-600 leading-relaxed">
              Simulation environment only. No real-money trading.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

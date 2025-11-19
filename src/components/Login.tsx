import React, { useState } from "react";
import supabase from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleAuth = async (mode: "login" | "signup" | "google") => {
    setLoading(true);
    setMessage(null);
    try {
      if (mode === "login") {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setMessage("Acceso autorizado");
        setTimeout(() => navigate("/Dashboard"), 1200);
      } else if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage("Cuenta creada · Verificación enviada");
      } else if (mode === "google") {
        await supabase.auth.signInWithOAuth({ provider: "google" });
      }
    } catch (err: any) {
      setMessage(err.message || "Acceso denegado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Fondo animado sutil con partículas y pulso */}
      <div className="fixed inset-0 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-slate-950" />
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-32 right-32 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        {/* Líneas de escaneo lentas */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan" />
        </div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Panel principal con glow dinámico */}
          <div className="relative group">
            {/* Glow externo que reacciona al hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-1000" />
            
            <div className="relative bg-slate-950/90 backdrop-blur-3xl border border-cyan-500/40 rounded-2xl p-10 shadow-2xl transition-all duration-500">
              {/* Línea superior animada */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-shimmer" />

              <div className="text-center mb-10">
                <h1 className="text-5xl font-extralight tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  NEURAL GATE
                </h1>
                <p className="mt-3 text-sm text-cyan-400/70 tracking-wider font-light animate-fade-in">
                  Secure Authentication System
                </p>
              </div>

              {message && (
                <div className={`mb-6 p-4 text-center text-sm font-medium rounded-lg border backdrop-blur-sm transition-all animate-slide-down ${
                  message.includes("denegado") || message.includes("Error")
                    ? "bg-red-500/10 border-red-500/50 text-red-400"
                    : "bg-emerald-500/10 border-emerald-500/50 text-emerald-400"
                }`}>
                  <span className="tracking-wider">{message}</span>
                </div>
              )}

              <div className="space-y-6">
                <div className="relative group/input">
                  <label className="block text-xs font-medium text-cyan-400 tracking-widest mb-2 opacity-80">
                    CREDENTIAL ID
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-4 bg-black/40 border border-gray-700 rounded-lg text-cyan-100 placeholder-gray-600
                               focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/20
                               transition-all duration-300 backdrop-blur-sm group-hover/input:border-cyan-500/60"
                    placeholder="operator@secure.node"
                  />
                  <div className="absolute inset-0 border border-cyan-500/0 group-focus-within/input:border-cyan-500/60 rounded-lg pointer-events-none transition-colors" />
                </div>

                <div className="relative group/input">
                  <label className="block text-xs font-medium text-cyan-400 tracking-widest mb-2 opacity-80">
                    ACCESS KEY
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-4 bg-black/40 border border-gray-700 rounded-lg text-cyan-100 placeholder-gray-600
                               focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/20
                               transition-all duration-300 backdrop-blur-sm group-hover/input:border-cyan-500/60"
                    placeholder="••••••••••••••••"
                  />
                </div>
              </div>

              <div className="mt-10 space-y-4">
                <button
                  onClick={() => handleAuth("login")}
                  disabled={loading}
                  className="relative w-full py-5 font-medium tracking-wider text-black bg-gradient-to-r from-cyan-400 to-cyan-500
                             hover:from-cyan-300 hover:to-purple-500 rounded-lg overflow-hidden transition-all duration-500
                             shadow-lg shadow-cyan-500/50 hover:shadow-cyan-400/70 transform hover:scale-[1.02] disabled:opacity-70"
                >
                  <span className="relative z-10">{loading ? "VERIFYING..." : "GRANT ACCESS"}</span>
                  <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 -translate-x-full animate-shine" />
                </button>

                <button
                  onClick={() => handleAuth("signup")}
                  disabled={loading}
                  className="w-full py-4 font-medium tracking-wider text-cyan-400 border border-cyan-500/60
                             hover:bg-cyan-500/10 rounded-lg transition-all duration-300 backdrop-blur-sm hover:border-cyan-400"
                >
                  REGISTER NEW PROFILE
                </button>

                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-6 bg-slate-950 text-gray-500 tracking-widest">OR</span>
                  </div>
                </div>

                <button
                  onClick={() => handleAuth("google")}
                  disabled={loading}
                  className="w-full py-4 font-medium tracking-wider text-white border border-gray-600
                             hover:border-cyan-500 hover:bg-cyan-500/5 rounded-lg transition-all duration-300 flex items-center justify-center gap-3
                             backdrop-blur-sm group"
                >
                  <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v.57C3.94 19.92 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.94 4.08 2.18 7.07l3. 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  CONTINUE WITH GOOGLE
                </button>
              </div>

              <div className="mt-10 text-center">
                <button
                  onClick={() => supabase.auth.signOut()}
                  className="text-xs text-gray-500 hover:text-cyan-400 transition-colors duration-300 tracking-wider"
                >
                  TERMINATE CURRENT SESSION
                </button>
              </div>

              <div className="mt-12 text-center text-xs font-mono text-cyan-600/60 tracking-widest animate-pulse">
                SUPABASE DATAVAULT • AES-256 • QUANTUM-RESISTANT CHANNEL
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animaciones personalizadas */}
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-scan { animation: scan 20s linear infinite; }
        .animate-shimmer { animation: shimmer 4s ease-in-out infinite; }
        .animate-shine { animation: shine 2s ease-in-out; }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        .animate-slide-down { animation: slide-down 0.5s ease-out forwards; }
        .delay-1000 { animation-delay: 1s; }
      `}</style>
    </>
  );
}
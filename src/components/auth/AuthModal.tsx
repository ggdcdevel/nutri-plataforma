"use client";

import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="#1877F2" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

type Tab = "entrar" | "criar";

export default function AuthModal() {
  const { isModalOpen, closeAuthModal } = useAuth();
  const [tab, setTab] = useState<Tab>("entrar");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!isModalOpen) return null;

  function reset() {
    setEmail("");
    setPassword("");
    setNome("");
    setError("");
    setSuccess("");
    setLoading(false);
    setShowPassword(false);
  }

  function switchTab(t: Tab) {
    setTab(t);
    reset();
  }

  async function handleOAuth(provider: "google" | "facebook") {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/minha-conta` },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError("E-mail ou senha incorretos.");
    } else {
      closeAuthModal();
      reset();
    }
  }

  async function handleEmailSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: nome },
        emailRedirectTo: `${window.location.origin}/minha-conta`,
      },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess("Verifique seu e-mail para confirmar o cadastro.");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={(e) => e.target === e.currentTarget && closeAuthModal()}
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-nutri-text">
            {tab === "entrar" ? "Entrar na sua conta" : "Criar conta"}
          </h2>
          <button
            onClick={() => { closeAuthModal(); reset(); }}
            className="text-nutri-muted transition-colors hover:text-nutri-text"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex rounded-lg border border-border bg-muted p-1">
          {(["entrar", "criar"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => switchTab(t)}
              className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-colors ${
                tab === t
                  ? "bg-white text-nutri-text shadow-sm"
                  : "text-nutri-muted hover:text-nutri-text"
              }`}
            >
              {t === "entrar" ? "Entrar" : "Criar conta"}
            </button>
          ))}
        </div>

        {success ? (
          <div className="rounded-lg bg-nutri-green/10 p-4 text-center text-sm text-nutri-green">
            {success}
          </div>
        ) : (
          <>
            {/* Botões sociais */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleOAuth("google")}
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-white py-2.5 text-sm font-medium text-nutri-text transition-colors hover:bg-muted disabled:opacity-60"
              >
                <GoogleIcon />
                Continuar com Google
              </button>
              <button
                onClick={() => handleOAuth("facebook")}
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-white py-2.5 text-sm font-medium text-nutri-text transition-colors hover:bg-muted disabled:opacity-60"
              >
                <FacebookIcon />
                Continuar com Facebook
              </button>
            </div>

            {/* Separador */}
            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-nutri-muted">ou</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* Formulário */}
            <form
              onSubmit={tab === "entrar" ? handleEmailLogin : handleEmailSignup}
              className="flex flex-col gap-4"
            >
              {tab === "criar" && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-nutri-text">
                    Nome completo
                  </label>
                  <Input
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ana Beatriz"
                  />
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-nutri-text">
                  E-mail
                </label>
                <Input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ana@email.com"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-nutri-text">
                    Senha
                  </label>
                  {tab === "entrar" && (
                    <a
                      href="/recuperar-senha"
                      onClick={() => { closeAuthModal(); reset(); }}
                      className="text-xs text-nutri-green transition-colors hover:text-nutri-green-dark"
                    >
                      Esqueci minha senha
                    </a>
                  )}
                </div>
                <div className="relative">
                  <Input
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pr-10"
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-nutri-muted hover:text-nutri-text"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button
                type="submit"
                disabled={loading}
                className="mt-1 h-11 w-full bg-nutri-green text-white hover:bg-nutri-green-dark disabled:opacity-60"
              >
                {loading
                  ? "Aguarde..."
                  : tab === "entrar"
                  ? "Entrar"
                  : "Criar conta"}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

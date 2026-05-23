"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export default function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/redefinir-senha`,
    });

    setLoading(false);
    if (error) {
      setError("Não foi possível enviar o e-mail. Verifique o endereço e tente novamente.");
    } else {
      setSent(true);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-nutri-surface px-6 py-16">
      <div className="w-full max-w-md">
        <a
          href="/"
          className="mb-8 flex items-center gap-2 text-sm font-medium text-nutri-muted transition-colors hover:text-nutri-text"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao início
        </a>

        <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
          {sent ? (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-nutri-green/10">
                <CheckCircle2 className="h-7 w-7 text-nutri-green" />
              </div>
              <h1 className="text-xl font-semibold text-nutri-text">
                E-mail enviado!
              </h1>
              <p className="text-sm leading-relaxed text-nutri-muted">
                Enviamos um link para <strong>{email}</strong>. Verifique sua
                caixa de entrada e a pasta de spam.
              </p>
              <a
                href="/"
                className="mt-2 text-sm font-medium text-nutri-green transition-colors hover:text-nutri-green-dark"
              >
                Voltar ao início
              </a>
            </div>
          ) : (
            <>
              <h1 className="text-xl font-semibold text-nutri-text">
                Recuperar senha
              </h1>
              <p className="mt-1.5 text-sm text-nutri-muted">
                Informe seu e-mail e enviaremos um link para criar uma nova senha.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
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

                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button
                  type="submit"
                  disabled={loading}
                  className="h-11 w-full bg-nutri-green text-white hover:bg-nutri-green-dark disabled:opacity-60"
                >
                  {loading ? "Enviando..." : "Enviar link de recuperação"}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

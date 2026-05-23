"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { CheckCircle2, Eye, EyeOff } from "lucide-react";

export default function RedefinirSenha() {
  const [canReset, setCanReset] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === "PASSWORD_RECOVERY") {
          setCanReset(true);
        }
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError("As senhas não coincidem.");
      return;
    }
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setError("Não foi possível redefinir a senha. Tente novamente.");
    } else {
      setDone(true);
      setTimeout(() => router.push("/"), 3000);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-nutri-surface px-6 py-16">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
          {done ? (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-nutri-green/10">
                <CheckCircle2 className="h-7 w-7 text-nutri-green" />
              </div>
              <h1 className="text-xl font-semibold text-nutri-text">
                Senha redefinida!
              </h1>
              <p className="text-sm text-nutri-muted">
                Você será redirecionado em instantes...
              </p>
            </div>
          ) : !canReset ? (
            <div className="py-4 text-center">
              <h1 className="text-xl font-semibold text-nutri-text">
                Aguardando verificação...
              </h1>
              <p className="mt-2 text-sm text-nutri-muted">
                Verifique que você acessou este link diretamente do e-mail de
                recuperação.
              </p>
            </div>
          ) : (
            <>
              <h1 className="text-xl font-semibold text-nutri-text">
                Criar nova senha
              </h1>
              <p className="mt-1.5 text-sm text-nutri-muted">
                Escolha uma senha com pelo menos 6 caracteres.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-nutri-text">
                    Nova senha
                  </label>
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
                      aria-label={showPassword ? "Ocultar" : "Mostrar"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-nutri-text">
                    Confirmar nova senha
                  </label>
                  <Input
                    required
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="••••••••"
                    minLength={6}
                  />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button
                  type="submit"
                  disabled={loading}
                  className="h-11 w-full bg-nutri-green text-white hover:bg-nutri-green-dark disabled:opacity-60"
                >
                  {loading ? "Salvando..." : "Salvar nova senha"}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

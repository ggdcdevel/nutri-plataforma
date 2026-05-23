"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Navbar from "@/components/navbar";
import { CalendarDays, Users, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MinhaConta() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-nutri-surface">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-nutri-green border-t-transparent" />
      </div>
    );
  }

  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "Paciente";

  const initials = displayName
    .split(" ")
    .slice(0, 2)
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-nutri-surface">
      <Navbar />

      <main className="mx-auto max-w-4xl px-6 pb-16 pt-28">
        {/* Header do perfil */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-nutri-green text-xl font-bold text-white">
              {initials}
            </div>
            <div>
              <h1 className="text-xl font-semibold text-nutri-text">
                Olá, {displayName.split(" ")[0]}!
              </h1>
              <p className="text-sm text-nutri-muted">{user.email}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={signOut}
            className="hidden gap-2 sm:flex"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {/* Minhas consultas */}
          <div className="rounded-xl border border-border bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-nutri-green/10">
                <CalendarDays className="h-5 w-5 text-nutri-green" />
              </div>
              <h2 className="font-semibold text-nutri-text">
                Minhas consultas
              </h2>
            </div>
            <div className="mt-6 flex flex-col items-center gap-3 py-6 text-center">
              <CalendarDays className="h-10 w-10 text-muted-foreground/30" />
              <p className="text-sm text-nutri-muted">
                Você ainda não tem consultas agendadas.
              </p>
              <a href="/nutricionistas">
                <Button
                  size="sm"
                  className="mt-1 bg-nutri-green text-white hover:bg-nutri-green-dark"
                >
                  Encontrar nutricionista
                </Button>
              </a>
            </div>
          </div>

          {/* Meus nutricionistas */}
          <div className="rounded-xl border border-border bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-nutri-green/10">
                <Users className="h-5 w-5 text-nutri-green" />
              </div>
              <h2 className="font-semibold text-nutri-text">
                Meus nutricionistas
              </h2>
            </div>
            <div className="mt-6 flex flex-col items-center gap-3 py-6 text-center">
              <Users className="h-10 w-10 text-muted-foreground/30" />
              <p className="text-sm text-nutri-muted">
                Nenhum nutricionista favorito ainda.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

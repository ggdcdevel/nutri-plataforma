"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import Navbar from "@/components/navbar";
import { CalendarDays, Users, LogOut, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFavoritosNutricionistas } from "@/lib/queries/favoritos";
import type { Nutricionista } from "@/lib/types";

const avatarColors = [
  "bg-emerald-100 text-emerald-700",
  "bg-sky-100 text-sky-700",
  "bg-amber-100 text-amber-700",
  "bg-violet-100 text-violet-700",
  "bg-rose-100 text-rose-700",
  "bg-teal-100 text-teal-700",
];

function getInitials(name: string) {
  const parts = name.split(" ");
  return (parts[0][0] + (parts[parts.length - 1]?.[0] ?? "")).toUpperCase();
}

export default function MinhaConta() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [favoritos, setFavoritos] = useState<Nutricionista[]>([]);
  const [loadingFavoritos, setLoadingFavoritos] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      setLoadingFavoritos(true);
      getFavoritosNutricionistas(user.id)
        .then(setFavoritos)
        .finally(() => setLoadingFavoritos(false));
    }
  }, [user]);

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

            {loadingFavoritos ? (
              <div className="mt-6 flex justify-center py-6">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-nutri-green border-t-transparent" />
              </div>
            ) : favoritos.length === 0 ? (
              <div className="mt-6 flex flex-col items-center gap-3 py-6 text-center">
                <Users className="h-10 w-10 text-muted-foreground/30" />
                <p className="text-sm text-nutri-muted">
                  Nenhum nutricionista favorito ainda.
                </p>
                <Link href="/nutricionistas">
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-1 border-nutri-green/30 text-nutri-green hover:bg-nutri-green/5"
                  >
                    Explorar nutricionistas
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="mt-4 flex flex-col gap-3">
                {favoritos.map((nutri, i) => (
                  <Link
                    key={nutri.slug}
                    href={`/nutricionistas/${nutri.slug}`}
                    className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:border-nutri-green/40 hover:bg-nutri-green/5"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${avatarColors[i % avatarColors.length]}`}
                    >
                      {getInitials(nutri.nome)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {nutri.nome}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {nutri.especialidades[0]}
                        {nutri.especialidades[1]
                          ? ` · ${nutri.especialidades[1]}`
                          : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-0.5 shrink-0">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-medium text-foreground">
                        {nutri.nota}
                      </span>
                    </div>
                  </Link>
                ))}
                <Link href="/nutricionistas" className="mt-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-nutri-green/30 text-nutri-green hover:bg-nutri-green/5"
                  >
                    Ver todos os nutricionistas
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

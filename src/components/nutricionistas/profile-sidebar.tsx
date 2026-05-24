"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Clock,
  Video,
  MapPin,
  Monitor,
  Globe,
  CalendarDays,
  Heart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { NutricionistaProfile } from "@/lib/types";
import { useAuth } from "@/lib/auth-context";
import {
  getFavoritosIds,
  addFavorito,
  removeFavorito,
} from "@/lib/queries/favoritos";
import { AgendamentoModal } from "@/components/nutricionistas/agendamento-modal";

export function ProfileSidebar({ nutri }: { nutri: NutricionistaProfile }) {
  const { user, openAuthModal } = useAuth();
  const [isFavorited, setIsFavorited] = useState(false);
  const [agendamentoOpen, setAgendamentoOpen] = useState(false);

  useEffect(() => {
    if (user) {
      getFavoritosIds(user.id).then((ids) =>
        setIsFavorited(ids.includes(nutri.id))
      );
    } else {
      setIsFavorited(false);
    }
  }, [user, nutri.id]);

  const handleToggleFavorite = useCallback(async () => {
    if (!user) {
      openAuthModal();
      return;
    }
    if (isFavorited) {
      setIsFavorited(false);
      await removeFavorito(user.id, nutri.id);
    } else {
      setIsFavorited(true);
      await addFavorito(user.id, nutri.id);
    }
  }, [user, isFavorited, nutri.id, openAuthModal]);

  return (
    <>
    <AgendamentoModal
      nutri={nutri}
      isOpen={agendamentoOpen}
      onClose={() => setAgendamentoOpen(false)}
    />
    <div className="flex flex-col gap-4">
      {/* Agendar card */}
      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-2xl font-bold text-foreground">
          R$ {nutri.preco}{" "}
          <span className="text-sm font-normal text-muted-foreground">
            / consulta
          </span>
        </p>

        <div className="mt-3">
          <Badge
            className={
              nutri.modalidade === "Online"
                ? "border-nutri-green/20 bg-nutri-green/10 text-nutri-green"
                : "border-amber-500/20 bg-amber-500/10 text-amber-600"
            }
          >
            {nutri.modalidade}
          </Badge>
        </div>

        <div className="mt-5 flex gap-2">
          <Button
            onClick={() => setAgendamentoOpen(true)}
            className="flex-1 bg-nutri-green text-white hover:bg-nutri-green-dark"
          >
            Solicitar agendamento
          </Button>
          <button
            onClick={handleToggleFavorite}
            aria-label={isFavorited ? "Remover dos favoritos" : "Favoritar"}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors ${
              isFavorited
                ? "border-rose-200 bg-rose-50 text-rose-500 hover:bg-rose-100"
                : "border-border bg-card text-muted-foreground hover:border-rose-200 hover:text-rose-500"
            }`}
          >
            <Heart
              className={`h-4 w-4 ${isFavorited ? "fill-rose-500" : ""}`}
            />
          </button>
        </div>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          {"Você será contatado pelo nutricionista para confirmar horário"}
        </p>

        <Separator className="my-4" />

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Responde em {"até"} 24h
            </span>
          </div>
          {nutri.modalidade === "Online" && (
            <div className="flex items-center gap-2.5">
              <Video className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Consulta online por videochamada
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Informações card */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="text-base font-semibold text-foreground">
          {"Informações"}
        </h3>
        <div className="mt-4 flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {nutri.cidade}{nutri.estado ? `, ${nutri.estado}` : ""}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <Monitor className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {nutri.modalidade}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <Globe className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {nutri.idiomas.join(", ")}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <CalendarDays className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Membro desde {nutri.membroDesde}
            </span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

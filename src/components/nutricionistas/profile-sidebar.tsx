import {
  Clock,
  Video,
  MapPin,
  Monitor,
  Globe,
  CalendarDays,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { NutricionistaProfile } from "@/lib/types";

export function ProfileSidebar({ nutri }: { nutri: NutricionistaProfile }) {
  return (
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

        <Button className="mt-5 w-full bg-nutri-green text-white hover:bg-nutri-green-dark">
          Solicitar agendamento
        </Button>

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

      {/* Informacoes card */}
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
  );
}

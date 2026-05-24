"use client";

import { useState, useEffect, useCallback } from "react";
import { X, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { NutricionistaProfile } from "@/lib/types";
import { useAuth } from "@/lib/auth-context";
import { saveAgendamentoLead } from "@/lib/queries/agendamento";

// ─── Mapeamento especialidade → objetivo ────────────────────────────────────

type ObjetivoItem = { label: string; icon: string };

const OBJETIVO_MAP: Record<string, ObjetivoItem> = {
  "Emagrecimento": { label: "Quero emagrecer com saúde", icon: "⚖️" },
  "Perda de Peso": { label: "Quero emagrecer com saúde", icon: "⚖️" },
  "Nutrição Esportiva": { label: "Melhorar minha performance esportiva", icon: "🏃" },
  "Performance Esportiva": { label: "Melhorar minha performance esportiva", icon: "🏃" },
  "Esporte": { label: "Melhorar minha performance esportiva", icon: "🏃" },
  "Ganho de Massa": { label: "Ganhar massa muscular", icon: "💪" },
  "Hipertrofia": { label: "Ganhar massa muscular", icon: "💪" },
  "Diabetes": { label: "Controlar o diabetes", icon: "🩺" },
  "Controle Glicêmico": { label: "Controlar o diabetes", icon: "🩺" },
  "Hipertensão": { label: "Controlar a pressão arterial", icon: "❤️" },
  "Colesterol": { label: "Melhorar meu colesterol", icon: "💊" },
  "Síndrome Metabólica": { label: "Controlar minha síndrome metabólica", icon: "🔬" },
  "Vegetarianismo": { label: "Adotar alimentação vegetariana", icon: "🥗" },
  "Veganismo": { label: "Adotar alimentação vegana", icon: "🌱" },
  "Nutrição Infantil": { label: "Melhorar a alimentação do meu filho", icon: "👶" },
  "Nutrição na Gestação": { label: "Cuidar da alimentação na gestação", icon: "🤱" },
  "Gestação": { label: "Cuidar da alimentação na gestação", icon: "🤱" },
  "Oncologia": { label: "Apoio nutricional oncológico", icon: "🎗️" },
  "Nutrição Funcional": { label: "Melhorar minha saúde de forma funcional", icon: "✨" },
  "Nutrição Clínica": { label: "Tratar uma condição de saúde", icon: "🏥" },
  "Alimentação Saudável": { label: "Ter uma alimentação mais saudável", icon: "🥦" },
  "Intolerâncias Alimentares": { label: "Lidar com intolerâncias alimentares", icon: "🚫" },
};

function buildObjetivos(especialidades: string[]): ObjetivoItem[] {
  const seen = new Set<string>();
  const result: ObjetivoItem[] = [];
  for (const esp of especialidades) {
    const obj = OBJETIVO_MAP[esp];
    if (obj && !seen.has(obj.label)) {
      seen.add(obj.label);
      result.push(obj);
    }
  }
  if (result.length === 0) {
    result.push({ label: "Melhorar minha saúde e alimentação", icon: "🥗" });
  }
  result.push({ label: "Outro objetivo", icon: "✨" });
  return result;
}

// ─── Gerador de templates de mensagem ───────────────────────────────────────

function gerarTemplates(primeiroNome: string, objetivo: string, modalidade: string): string[] {
  const modo = modalidade === "Online" ? "consulta online" : "consulta presencial";
  const obj = objetivo.charAt(0).toLowerCase() + objetivo.slice(1);
  return [
    `Olá ${primeiroNome}! Vi seu perfil no NutriMatch e gostaria de agendar uma ${modo}. Meu objetivo é ${obj}. Poderia me informar sua disponibilidade?`,
    `Oi ${primeiroNome}, encontrei você no NutriMatch! Tenho interesse em uma ${modo} com foco em ${obj}. Quando você tem horário disponível?`,
    `Olá! Vi seu trabalho no NutriMatch e adorei. Gostaria de agendar uma ${modo} e entender como você pode me ajudar. Pode me passar sua disponibilidade?`,
  ];
}

// ─── Ícone WhatsApp (SVG inline) ─────────────────────────────────────────────

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ─── Avatar initials ─────────────────────────────────────────────────────────

const AVATAR_COLORS = [
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

// ─── Props ───────────────────────────────────────────────────────────────────

type Props = {
  nutri: NutricionistaProfile;
  isOpen: boolean;
  onClose: () => void;
};

// ─── Componente ──────────────────────────────────────────────────────────────

export function AgendamentoModal({ nutri, isOpen, onClose }: Props) {
  const { user, openAuthModal } = useAuth();

  const objetivos = buildObjetivos(nutri.especialidades);
  const primeiroNome = nutri.nome.split(" ")[0];

  const [showLoginBanner, setShowLoginBanner] = useState(!user);
  const [modalidade, setModalidade] = useState(nutri.modalidade);
  const [objetivo, setObjetivo] = useState<string>("");
  const [templateIndex, setTemplateIndex] = useState<number | null>(null);
  const [mensagem, setMensagem] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Atualiza banner quando o estado de login muda
  useEffect(() => {
    if (user) setShowLoginBanner(false);
  }, [user]);

  // Reseta estado ao abrir/fechar
  useEffect(() => {
    if (isOpen) {
      setShowLoginBanner(!user);
      setModalidade(nutri.modalidade);
      setObjetivo("");
      setTemplateIndex(null);
      setMensagem("");
    }
  }, [isOpen, nutri.modalidade, user]);

  // Atualiza templates quando objetivo ou modalidade mudam
  useEffect(() => {
    if (objetivo && templateIndex !== null) {
      const templates = gerarTemplates(primeiroNome, objetivo, modalidade);
      setMensagem(templates[templateIndex] ?? "");
    }
  }, [objetivo, modalidade, templateIndex, primeiroNome]);

  const handleSelectTemplate = useCallback(
    (idx: number) => {
      if (!objetivo) return;
      const templates = gerarTemplates(primeiroNome, objetivo, modalidade);
      setTemplateIndex(idx);
      setMensagem(templates[idx]);
    },
    [objetivo, modalidade, primeiroNome]
  );

  const handleSelectObjetivo = useCallback(
    (label: string) => {
      setObjetivo(label);
      setTemplateIndex(null);
      setMensagem("");
    },
    []
  );

  const handleEnviar = useCallback(async () => {
    if (!mensagem.trim() || !objetivo) return;

    const whatsapp = nutri.whatsapp?.replace(/\D/g, "") ?? "";
    if (!whatsapp) return;

    setIsSubmitting(true);

    try {
      await saveAgendamentoLead({
        nutricionistaId: nutri.id,
        nutricionistaNome: nutri.nome,
        nutricionistaCrn: nutri.crn,
        nutricionistaCidade: nutri.cidade,
        nutricionistaEspecialidades: nutri.especialidades,
        nutricionistaWhatsapp: whatsapp,
        modalidadeEscolhida: modalidade,
        objetivo,
        mensagem: mensagem.trim(),
        pacienteId: user?.id ?? null,
        pacienteEmail: user?.email ?? null,
      });
    } catch {
      // Não bloqueia o fluxo se o lead falhar
    }

    const text = encodeURIComponent(mensagem.trim());
    window.open(`https://api.whatsapp.com/send?phone=55${whatsapp}&text=${text}`, "_blank");
    setIsSubmitting(false);
    onClose();
  }, [nutri, modalidade, objetivo, mensagem, user, onClose]);

  // Fecha ao pressionar Esc
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Trava scroll do body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const avatarColor = AVATAR_COLORS[0];
  const templates = objetivo ? gerarTemplates(primeiroNome, objetivo, modalidade) : [];
  const canSend = !!objetivo && !!mensagem.trim() && !!(nutri.whatsapp?.replace(/\D/g, ""));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative flex w-full max-w-[520px] flex-col rounded-2xl bg-white shadow-xl max-h-[90vh]">

        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
          aria-label="Fechar"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Scroll area */}
        <div className="overflow-y-auto">

          {/* Banner de login */}
          {showLoginBanner && (
            <div className="mx-5 mt-5 rounded-xl border border-nutri-green/20 bg-nutri-green/5 p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-nutri-green/10">
                  <UserPlus className="h-4 w-4 text-nutri-green" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-nutri-text">
                    Crie sua conta gratuita
                  </p>
                  <p className="mt-0.5 text-xs text-nutri-muted">
                    Acompanhe seus agendamentos e histórico de consultas
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <Button
                      size="sm"
                      className="h-8 bg-nutri-green text-xs text-white hover:bg-nutri-green-dark"
                      onClick={() => { openAuthModal(); onClose(); }}
                    >
                      Criar conta
                    </Button>
                    <button
                      className="text-xs text-nutri-muted underline-offset-2 hover:underline"
                      onClick={() => setShowLoginBanner(false)}
                    >
                      Continuar sem login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Header: avatar + nome + modalidade */}
          <div className="flex items-center gap-4 px-6 pb-5 pt-6">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${avatarColor}`}
            >
              {getInitials(nutri.nome)}
            </div>
            <div>
              <h2 className="text-base font-semibold text-nutri-text">
                {nutri.nome}
              </h2>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-xs text-nutri-muted">{nutri.crn}</span>
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
            </div>
          </div>

          <div className="h-px bg-border" />

          <div className="flex flex-col gap-6 px-6 py-5">

            {/* Seção modalidade */}
            <div>
              <p className="text-sm font-medium text-nutri-text">
                Como prefere ser atendido?
              </p>
              <div className="mt-3 flex gap-3">
                {(["Online", "Presencial"] as const)
                  .filter((m) => m === nutri.modalidade)
                  .map((m) => (
                    <label
                      key={m}
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                        modalidade === m
                          ? "border-nutri-green bg-nutri-green/5 text-nutri-green"
                          : "border-border text-nutri-muted hover:border-nutri-green/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="modalidade"
                        value={m}
                        checked={modalidade === m}
                        onChange={() => setModalidade(m)}
                        className="hidden"
                      />
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                          modalidade === m
                            ? "border-nutri-green"
                            : "border-muted-foreground"
                        }`}
                      >
                        {modalidade === m && (
                          <span className="block h-2 w-2 rounded-full bg-nutri-green" />
                        )}
                      </span>
                      {m}
                    </label>
                  ))}
              </div>
            </div>

            {/* Seção objetivo */}
            <div>
              <p className="text-sm font-medium text-nutri-text">
                Qual o seu principal objetivo?
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {objetivos.map((obj) => (
                  <button
                    key={obj.label}
                    onClick={() => handleSelectObjetivo(obj.label)}
                    className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${
                      objetivo === obj.label
                        ? "border-nutri-green bg-nutri-green/5 text-nutri-text"
                        : "border-border text-nutri-muted hover:border-nutri-green/40 hover:bg-muted/40"
                    }`}
                  >
                    <span className="text-base leading-none">{obj.icon}</span>
                    <span className="text-xs font-medium leading-tight">
                      {obj.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Seção mensagem */}
            <div>
              <p className="text-sm font-medium text-nutri-text">
                Escolha como quer se apresentar
              </p>

              {!objetivo && (
                <p className="mt-2 text-xs text-nutri-muted">
                  Selecione um objetivo acima para ver as sugestões de mensagem.
                </p>
              )}

              {objetivo && (
                <div className="mt-3 flex flex-col gap-2">
                  {templates.map((tpl, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectTemplate(i)}
                      className={`rounded-lg border p-3 text-left text-xs leading-relaxed transition-colors ${
                        templateIndex === i
                          ? "border-nutri-green bg-nutri-green/5 text-nutri-text"
                          : "border-border text-nutri-muted hover:border-nutri-green/30 hover:bg-muted/30"
                      }`}
                    >
                      {tpl}
                    </button>
                  ))}
                </div>
              )}

              <textarea
                value={mensagem}
                onChange={(e) => {
                  setMensagem(e.target.value);
                  setTemplateIndex(null);
                }}
                placeholder={
                  objetivo
                    ? "Selecione uma opção acima ou escreva sua mensagem..."
                    : "Escreva sua mensagem diretamente..."
                }
                rows={4}
                className="mt-3 w-full resize-none rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-nutri-text placeholder:text-muted-foreground outline-none transition-colors focus:border-nutri-green focus:ring-2 focus:ring-nutri-green/20"
              />
            </div>

            {/* Aviso se WhatsApp não cadastrado */}
            {!nutri.whatsapp && (
              <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
                Este nutricionista ainda não cadastrou o WhatsApp. O botão ficará disponível em breve.
              </p>
            )}

          </div>

          {/* Footer */}
          <div className="px-6 pb-6">
            <button
              onClick={handleEnviar}
              disabled={!canSend || isSubmitting}
              className="flex w-full items-center justify-center gap-2.5 rounded-xl py-3.5 text-sm font-semibold text-white transition-opacity disabled:opacity-40"
              style={{ backgroundColor: "#25D366" }}
            >
              <WhatsAppIcon className="h-5 w-5" />
              {isSubmitting ? "Enviando..." : "Enviar pelo WhatsApp"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

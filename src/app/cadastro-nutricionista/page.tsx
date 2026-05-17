"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { CheckCircle2 } from "lucide-react";

const especialidadesList = [
  "Emagrecimento",
  "Nutrição esportiva",
  "Diabetes",
  "Vegetarianismo",
  "Nutrição materno-infantil",
  "Oncologia",
  "Saúde intestinal",
  "Outro",
];

function maskWhatsapp(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function CadastroNutricionista() {
  const [origem, setOrigem] = useState("direto");
  const [form, setForm] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    crn: "",
    cidade: "",
    modalidade: "Online",
    especialidades: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const o = params.get("origem");
    if (o) setOrigem(o);
  }, []);

  function handleEspecialidade(value: string) {
    setForm((f) => ({
      ...f,
      especialidades: f.especialidades.includes(value)
        ? f.especialidades.filter((e) => e !== value)
        : [...f.especialidades, value],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: err } = await supabase
      .from("leads_nutricionistas")
      .insert({
        nome: form.nome,
        email: form.email,
        whatsapp: form.whatsapp,
        crn: form.crn,
        cidade: form.cidade,
        modalidade: form.modalidade,
        especialidades: form.especialidades,
        origem,
      });

    setLoading(false);
    if (err) {
      setError("Erro ao enviar cadastro. Tente novamente.");
    } else {
      setSuccess(true);
    }
  }

  return (
    <div className="min-h-screen bg-nutri-surface">
      {/* Navbar simplificada */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="/" className="text-xl font-bold text-nutri-green">
            NutriMatch
          </a>
          <a
            href="#"
            className="text-sm font-medium text-nutri-muted transition-colors hover:text-nutri-text"
          >
            Já sou cadastrado — Entrar
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="bg-white px-6 pb-16 pt-28 text-center">
        <div className="mx-auto max-w-2xl">
          <span className="mb-5 inline-block rounded-full bg-nutri-green/10 px-4 py-1.5 text-sm font-medium text-nutri-green">
            Lista de espera aberta
          </span>
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-nutri-text md:text-5xl">
            Leve sua agenda para o próximo nível
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-nutri-muted">
            Cadastre-se gratuitamente e comece a receber pacientes online ou
            presencial pelo NutriMatch.
          </p>
          <a href="#formulario">
            <Button className="mt-8 h-auto bg-nutri-green px-8 py-3.5 text-base text-white hover:bg-nutri-green-dark">
              Quero me cadastrar
            </Button>
          </a>
        </div>
      </section>

      {/* Benefícios */}
      <section className="bg-nutri-surface px-6 py-14">
        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-3">
          {[
            {
              icon: "✦",
              title: "Perfil gratuito",
              desc: "Crie seu perfil sem pagar nada. Sem mensalidade, sem taxa de cadastro.",
            },
            {
              icon: "🌐",
              title: "Pacientes online e presencial",
              desc: "Atenda do jeito que preferir — defina sua modalidade e horários.",
            },
            {
              icon: "📈",
              title: "Visibilidade",
              desc: "Apareça para pacientes que buscam exatamente a sua especialidade.",
            },
          ].map((b) => (
            <div
              key={b.title}
              className="rounded-xl border border-border bg-white p-6"
            >
              <span className="text-2xl">{b.icon}</span>
              <h3 className="mt-3 text-base font-semibold text-nutri-text">
                {b.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-nutri-muted">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Prova social */}
      <section className="bg-nutri-green px-6 py-12">
        <div className="mx-auto grid max-w-3xl gap-8 text-center text-white sm:grid-cols-3">
          {[
            { value: "200+", label: "Nutricionistas cadastrados" },
            { value: "5.000+", label: "Pacientes ativos" },
            { value: "4.9★", label: "Avaliação média da plataforma" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold">{s.value}</p>
              <p className="mt-1 text-sm text-white/80">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Formulário */}
      <section id="formulario" className="bg-nutri-surface px-6 py-16">
        <div className="mx-auto max-w-xl">
          <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
            {success ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-nutri-green/10">
                  <CheckCircle2 className="h-8 w-8 text-nutri-green" />
                </div>
                <h2 className="text-xl font-semibold text-nutri-text">
                  Cadastro recebido!
                </h2>
                <p className="text-nutri-muted">
                  Entraremos em contato em até 48h pelo WhatsApp.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-center text-xl font-semibold text-nutri-text">
                  Quero me cadastrar
                </h2>
                <p className="mt-1 text-center text-sm text-nutri-muted">
                  Preencha os dados abaixo para entrar na lista de espera.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-nutri-text">
                      Nome completo *
                    </label>
                    <Input
                      required
                      value={form.nome}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, nome: e.target.value }))
                      }
                      placeholder="Dra. Ana Beatriz Moura"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-nutri-text">
                      E-mail profissional *
                    </label>
                    <Input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      placeholder="ana@clinica.com.br"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-nutri-text">
                      WhatsApp *
                    </label>
                    <Input
                      required
                      type="tel"
                      value={form.whatsapp}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          whatsapp: maskWhatsapp(e.target.value),
                        }))
                      }
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-nutri-text">
                      CRN *
                    </label>
                    <Input
                      required
                      value={form.crn}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, crn: e.target.value }))
                      }
                      placeholder="CRN-3 12345"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-nutri-text">
                      Cidade e Estado *
                    </label>
                    <Input
                      required
                      value={form.cidade}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, cidade: e.target.value }))
                      }
                      placeholder="São Paulo, SP"
                    />
                  </div>

                  <fieldset>
                    <legend className="mb-2 text-sm font-medium text-nutri-text">
                      Modalidade de atendimento *
                    </legend>
                    <div className="flex flex-wrap gap-5">
                      {["Online", "Presencial", "Ambos"].map((opt) => (
                        <label
                          key={opt}
                          className="flex cursor-pointer items-center gap-2 text-sm text-nutri-text"
                        >
                          <input
                            type="radio"
                            name="modalidade"
                            value={opt}
                            checked={form.modalidade === opt}
                            onChange={() =>
                              setForm((f) => ({ ...f, modalidade: opt }))
                            }
                            className="h-4 w-4 accent-nutri-green"
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-2 text-sm font-medium text-nutri-text">
                      Especialidades
                    </legend>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {especialidadesList.map((esp) => (
                        <label
                          key={esp}
                          className="flex cursor-pointer items-center gap-2 text-sm text-nutri-text"
                        >
                          <input
                            type="checkbox"
                            checked={form.especialidades.includes(esp)}
                            onChange={() => handleEspecialidade(esp)}
                            className="h-4 w-4 rounded accent-nutri-green"
                          />
                          {esp}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  {error && (
                    <p className="text-sm text-red-500">{error}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="mt-2 h-11 w-full bg-nutri-green text-base text-white hover:bg-nutri-green-dark disabled:opacity-60"
                  >
                    {loading ? "Enviando..." : "Quero me cadastrar gratuitamente"}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-white py-6 text-center text-sm text-nutri-muted">
        © 2025 NutriMatch
      </footer>
    </div>
  );
}

import { Search, CalendarDays, Video } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Busque e filtre",
    description: "Encontre por especialidade, modalidade e cidade.",
  },
  {
    icon: CalendarDays,
    title: "Veja o perfil",
    description: "Leia avaliacoes e escolha o profissional certo.",
  },
  {
    icon: Video,
    title: "Agende sua consulta",
    description: "Online ou presencial, no horario que funciona pra voce.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-nutri-text md:text-4xl">
          Como funciona
        </h2>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex flex-col items-center rounded-2xl border border-border bg-background p-8 text-center transition-shadow hover:shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-nutri-green/10">
                <step.icon className="h-6 w-6 text-nutri-green" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-nutri-text">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-nutri-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const benefits = [
  "Crie seu perfil gratuitamente",
  "Receba pacientes online ou presencial",
  "Gerencie sua agenda",
];

export default function ForNutritionists() {
  return (
    <section id="para-nutricionistas" className="px-6 py-20 md:py-28">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-10 md:flex-row md:items-center md:justify-between">
        <h2 className="max-w-sm text-3xl font-bold tracking-tight text-nutri-text md:text-4xl text-balance">
          {"Voce e nutricionista?"}
        </h2>
        <div className="flex flex-col gap-6">
          <ul className="flex flex-col gap-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 text-nutri-text">
                <Check className="h-5 w-5 shrink-0 text-nutri-green" />
                <span className="text-lg">{benefit}</span>
              </li>
            ))}
          </ul>
          <a href="/cadastro-nutricionista?origem=organico">
            <Button
              variant="outline"
              size="lg"
              className="w-fit border-nutri-green text-nutri-green hover:bg-nutri-green/10 hover:text-nutri-green"
            >
              Cadastre-se como profissional
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

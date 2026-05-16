import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import NutricionistasListing from "@/components/nutricionistas/nutricionistas-listing";
import { getNutricionistas } from "@/lib/queries/nutricionistas";

export const metadata: Metadata = {
  title: "Nutricionistas - NutriMatch",
  description:
    "Encontre nutricionistas verificados. Filtre por especialidade, modalidade, cidade e avaliação.",
};

export default async function NutricionistasPage() {
  const nutricionistas = await getNutricionistas();

  return (
    <div className="flex min-h-screen flex-col bg-nutri-surface">
      <Navbar />
      <main className="flex-1 pt-[73px]">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <h1 className="text-2xl font-bold text-foreground">
            Encontre seu nutricionista
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Profissionais verificados e prontos para ajudar você a alcançar seus
            objetivos.
          </p>
        </div>
        <NutricionistasListing nutricionistas={nutricionistas} />
      </main>
      <Footer />
    </div>
  );
}

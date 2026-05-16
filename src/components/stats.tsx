import { Star } from "lucide-react";

const metrics = [
  { value: "200+", label: "Nutricionistas cadastrados" },
  { value: "5.000+", label: "Consultas realizadas" },
  { value: "4.9", label: "Avaliacao media", hasStar: true },
];

export default function Stats() {
  return (
    <section className="bg-nutri-surface px-6 py-20 md:py-24">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="text-center">
            <p className="flex items-center justify-center gap-2 text-5xl font-bold tracking-tight text-nutri-text">
              {metric.value}
              {metric.hasStar && (
                <Star className="h-8 w-8 fill-nutri-green text-nutri-green" />
              )}
            </p>
            <p className="mt-2 text-lg text-nutri-muted">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

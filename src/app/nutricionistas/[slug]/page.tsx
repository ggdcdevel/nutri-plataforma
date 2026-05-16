import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  ProfileAbout,
  ProfileFormacao,
  ProfileAvaliacoes,
} from "@/components/nutricionistas/profile-sections";
import { ProfileSidebar } from "@/components/nutricionistas/profile-sidebar";
import { getNutricionistaBySlug } from "@/lib/queries/nutricionistas";

export default async function NutricionistaProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const nutri = await getNutricionistaBySlug(slug);

  if (!nutri) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-nutri-surface">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pt-24 pb-12 md:px-6">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-1 text-sm text-muted-foreground"
        >
          <Link
            href="/"
            className="transition-colors hover:text-foreground"
          >
            {"Início"}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            href="/nutricionistas"
            className="transition-colors hover:text-foreground"
          >
            Nutricionistas
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-foreground">{nutri.nome}</span>
        </nav>

        {/* Two-column layout */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Main column */}
          <div className="flex flex-1 flex-col gap-6 lg:max-w-[65%]">
            <ProfileAbout nutri={nutri} />
            <ProfileFormacao nutri={nutri} />
            <ProfileAvaliacoes nutri={nutri} />
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-[35%]">
            <div className="lg:sticky lg:top-24">
              <ProfileSidebar nutri={nutri} />
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

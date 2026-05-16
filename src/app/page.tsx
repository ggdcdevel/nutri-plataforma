import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import HowItWorks from "@/components/how-it-works";
import Stats from "@/components/stats";
import ForNutritionists from "@/components/for-nutritionists";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Stats />
        <ForNutritionists />
      </main>
      <Footer />
    </>
  );
}

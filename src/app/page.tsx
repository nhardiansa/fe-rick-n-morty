import { FilterSection } from "@/components/FilterSection";
import Header from "@/components/header";
import { ListCharacterGrid } from "@/components/ListCharacterGrid";
import ResultCount from "@/components/ResultCount";

export default async function Home() {


  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          <FilterSection />

          <ResultCount />

          <ListCharacterGrid />

        </div>
      </div>
    </main>
  );
}


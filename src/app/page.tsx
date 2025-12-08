import CharacterGrid from "@/components/character-grid";
import Header from "@/components/header";
// import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      {/* <Suspense fallback={<div className="text-center py-12">Loading characters...</div>}> */}
      <CharacterGrid />
      {/* </Suspense> */}
    </main>
  );
}

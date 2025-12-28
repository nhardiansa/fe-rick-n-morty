import { FilterSection } from "@/components/FilterSection";
import Header from "@/components/header";
import { ListCharacterGrid } from "@/components/ListCharacterGrid";
import ResultCount from "@/components/ResultCount";
import { fetchCharacters } from "@/lib/request";

export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const filters = await searchParams;
  const params: { [key: string]: string | string[] } = {}

  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null && value !== "") {
      params[key] = value;
    }
  }

  const response = await fetchCharacters(params);


  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          <FilterSection defaultFilters={params} />

          <ResultCount />

          <ListCharacterGrid preFetchResult={{
            filters: {
              name: typeof filters.name === "string" ? filters.name : "",
              status: filters.status === "string" ? filters.status : "",
              gender: filters.gender === "string" ? filters.gender : "",
            },
            info: response.info,
            results: response.results
          }} />

        </div>
      </div>
    </main>
  );
}


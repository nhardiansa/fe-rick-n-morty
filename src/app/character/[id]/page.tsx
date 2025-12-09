import DetailPage from "@/components/DetailPage"

export async function generateStaticParams() {
  // Mengambil daftar karakter atau ID karakter terlebih dahulu
  const res = await fetch('https://rickandmortyapi.com/api/character');
  const data = await res.json();

  // Ambil semua ID karakter yang ada
  return data.results.map((character: { id: string }) => ({
    id: character.id.toString(),
  }));
}

export default function CharacterPage() {
  return (
    <DetailPage />
  )
}

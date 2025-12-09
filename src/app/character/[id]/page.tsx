import DetailPage from "@/components/DetailPage"

export async function generateStaticParams() {
  // Mengambil daftar karakter atau ID karakter terlebih dahulu
  const res = await fetch('https://rickandmortyapi.com/api/character');
  const data = await res.json();

  const pages = []

  // generate all url with page number
  for (let i = 1; i <= data.info.pages; i++) {
    pages.push(`https://rickandmortyapi.com/api/character?page=${i}`)
  }

  // do Promise All to fetch All characters
  const response = await Promise.all(pages.map((page) => fetch(page).then((res) => res.json().then((data) => data.results))))
  const allCharacters = response.flat()
  const allCharactersId = allCharacters.map((character) => character.id)


  // Ambil semua ID karakter yang ada
  return allCharactersId.map((id) => ({
    id: id.toString(),
  }));
}

export default function CharacterPage() {
  return (
    <DetailPage />
  )
}

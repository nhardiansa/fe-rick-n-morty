import CharacterDetail from "@/components/char-details"
import { getCharacterDetail, getEpisodes } from "@/lib/request"
import { Suspense } from "react"

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function CharacterPage({ params }: Props) {
  const { id } = await params
  const response = await getCharacterDetail(id)
  const episodes = await getEpisodes(response.result.episode, 1)

  const lastPage = Math.ceil((response.result.episode.length || 0) / 20)

  console.log(episodes);


  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={<div className="text-center py-12">Loading character details...</div>}>
        <CharacterDetail characterId={id} data={response.result} eps={episodes.result || []} lastPage={lastPage} />
      </Suspense>
    </main>
  )
}

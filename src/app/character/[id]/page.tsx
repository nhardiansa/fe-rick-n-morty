import CharacterDetail from "@/components/char-details"
import { Suspense } from "react"

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function CharacterPage({ params }: Props) {
  const { id } = await params

  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={<div className="text-center py-12">Loading character details...</div>}>
        <CharacterDetail characterId={id} />
      </Suspense>
    </main>
  )
}

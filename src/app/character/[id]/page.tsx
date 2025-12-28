import EpisodeList from "@/components/EpisodeList"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCharacterDetail, getEpisodes } from "@/lib/request"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const runtime = 'edge';
interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function CharacterPage({ params }: Props) {
  const { id } = await params

  // get Character Details
  const response = await getCharacterDetail(id)
  const character = response.result

  // Get List Episodes
  const episodes = await getEpisodes(response.result.episode, 1)

  // Get Last Page
  const lastPage = Math.ceil((response.result.episode.length || 0) / 20)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Alive":
        return "bg-green-500/20 text-green-400"
      case "Dead":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }


  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6 text-primary hover:text-accent hover:bg-card">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Characters
          </Button>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Character Image and Basic Info */}
          <div className=" md:col-span-1 lg:col-span-1">
            <Card className="border-border overflow-hidden sticky top-24">
              <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image
                    src={character.image || "/placeholder.svg"}
                    alt={character.name}
                    className="w-full h-full object-cover"
                    width={800}
                    height={800}
                  />
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">{character.name}</h1>
                    <p className="text-muted-foreground">{character.species}</p>
                  </div>

                  <div className="space-y-2">
                    <Badge className={`${getStatusColor(character.status)} border-0 w-full justify-center`}>
                      {character.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Information */}
          <div className="md:col-span-2 space-y-6">
            {/* Character Details */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Character Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Species</label>
                    <p className="text-foreground mt-1">{character.species}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Gender</label>
                    <p className="text-foreground mt-1">{character.gender}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Type</label>
                    <p className="text-foreground mt-1">{character.type || "Unknown"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <p className="text-foreground mt-1">{character.status}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Info */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Current Location</label>
                  <p className="text-foreground mt-1">{character.location.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Origin</label>
                  <p className="text-foreground mt-1">{character.origin.name}</p>
                </div>
              </CardContent>
            </Card>

            {/* Episodes */}
            <EpisodeList characterDetails={character} eps={episodes?.result?.length ? episodes.result : []} lastPage={lastPage} />
          </div>
        </div>
      </div>
    </main>
  )
}

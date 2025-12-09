"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import { getCharacterDetail, getEpisodes } from "@/lib/request"

export interface CharacterDetails {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
}

export interface Episode {
  id: number;
  name: string;
  episode: string;
  air_date: string;
}



export default function CharacterDetail({ characterId, data, eps, lastPage }: { characterId: string, data: CharacterDetails, eps: Episode[], lastPage: number }) {
  // const [character, setCharacter] = useState<CharacterDetails | null>(null)
  const character = data
  const [episodes, setEpisodes] = useState<Episode[]>([
    ...eps
  ])
  const [episodePage, setEpisodePage] = useState(1)
  const [lastEpisodePage, setLastEpisodePage] = useState(0)
  const [loading, setLoading] = useState(false)

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

  const fetchMoreEpisodes = async () => {
    if (episodePage >= lastPage) return

    setLoading(true)
    const nextPage = episodePage + 1
    try {

      const newEpisodes = await getEpisodes(character!.episode, nextPage)

      console.log(newEpisodes.result?.length);


      if (newEpisodes.status && newEpisodes.result) {
        setEpisodes((prevEpisodes) => [...prevEpisodes, ...newEpisodes.result!])
        setEpisodePage(nextPage)
      }

    } catch (error) {
      console.error("Error fetching more episodes:", error);

      alert("Failed to load more episodes. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  if (!character) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">Character not found.</p>
          <Link href="/">
            <Button variant="outline" className="mt-4 bg-transparent">
              Back to Characters
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/">
        <Button variant="ghost" className="mb-6 text-primary hover:text-accent hover:bg-card">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Characters
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Character Image and Basic Info */}
        <div className="lg:col-span-1">
          <Card className="border-border overflow-hidden sticky top-24">
            <CardContent className="p-0">
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={character.image || "/placeholder.svg"}
                  alt={character.name}
                  className="w-full h-full object-cover"
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
        <div className="lg:col-span-2 space-y-6">
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
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Episodes ({character.episode.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {episodes.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {episodes.map((episode) => (
                    <div
                      key={episode.id}
                      className="p-3 bg-muted rounded-lg border border-border hover:border-accent transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{episode.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{episode.episode}</p>
                        </div>
                        <p className="text-xs text-muted-foreground whitespace-nowrap">{episode.air_date}</p>
                      </div>
                    </div>
                  ))}

                  {/* Button to show more episodes */}
                  {(episodePage < lastPage) && (
                    <div className="text-center mt-4">
                      <Button
                        variant="default"
                        onClick={fetchMoreEpisodes}
                      >
                        {loading ? "Loading..." : "Load More Episodes"}
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">No episodes available.</p>
              )}
              {/* {character.episode.length > 20 && (
                <p className="text-sm text-muted-foreground mt-4">+{character.episode.length - 20} more episodes...</p>
              )} */}



            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

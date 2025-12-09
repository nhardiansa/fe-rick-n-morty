"use client"

import { CharacterDetails, Episode, getCharacterDetail, getEpisodes } from '@/lib/request'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import Image from 'next/image'
import { Badge } from './ui/badge'
import EpisodeList from './EpisodeList'

function DetailPage() {
  const params = useParams()
  const router = useRouter()

  const [character, setCharacter] = useState<CharacterDetails>({
    name: "",
    status: "",
    species: null,
    type: null,
    gender: null,
    episode: [],
    origin: { name: "", url: "" },
    location: { name: "", url: "" },
    image: "",
    id: 0
  })
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const getCharacterDetailData = async (id: string) => {
    const response = await getCharacterDetail(id)
    return response.result
  }


  const fetchAllData = async (id: string) => {

    try {

      const characterData = await getCharacterDetailData(id)
      const episodesResult = await getEpisodes(characterData.episode, 1)
      setCharacter(characterData)
      setEpisodes(episodesResult.result || [])
      // setLastPage(Math.ceil((character.episode.length || 0) / 20))
    } catch (error) {
      console.error("Error fetching character details:", error);
    }

  }

  useEffect(() => {
    // get id from url first
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    if (!id) {
      router.push("/");
      return
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAllData(id)
  }, [])

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
                  {
                    character.image === "" ? (
                      <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    ) : (
                      <Image
                        src={character.image}
                        alt={character.name}
                        className="w-full h-full object-cover"
                        width={800}
                        height={800}
                      />
                    )
                  }
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    {
                      !character.name && (
                        <div className="h-7 bg-muted animate-pulse w-full rounded-md"></div>
                      )
                    }
                    <h1 className="text-2xl font-bold text-foreground mb-2">{character.name}</h1>

                    {
                      !character.species && (
                        <div className="h-3 bg-muted animate-pulse w-full rounded-md"></div>
                      )
                    }
                    <p className="text-muted-foreground">{character.species}</p>
                  </div>

                  <div className="space-y-2">
                    {
                      !character.status ? (
                        <div className="h-3 bg-muted animate-pulse w-full rounded-md"></div>
                      ) : (
                        <Badge className={`${getStatusColor(character.status)} border-0 w-full justify-center`}>
                          {character.status}
                        </Badge>
                      )
                    }
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

                    {
                      (!character.species && character.species !== "") && (
                        <div className="h-5 bg-muted animate-pulse w-[40%] rounded-md"></div>
                      )
                    }
                    <p className="text-foreground mt-1">{character.species}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Gender</label>
                    {
                      (!character.gender && character.gender !== "") && (
                        <div className="h-5 bg-muted animate-pulse w-[40%] rounded-md"></div>
                      )
                    }
                    <p className="text-foreground mt-1">{character.gender}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Type</label>

                    {
                      (!character.type && character.type !== "") ? (
                        <div className="h-5 bg-muted animate-pulse w-[40%] rounded-md"></div>
                      ) : (
                        <p className="text-foreground mt-1">{character.type || "Unknown"}</p>
                      )
                    }
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>

                    {
                      (!character.status && character.status !== "") && (
                        <div className="h-5 bg-muted animate-pulse w-[40%] rounded-md"></div>
                      )
                    }
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
                  {
                    !character.location.name ? (
                      <div className="h-6 bg-muted animate-pulse w-[35%] rounded-md"></div>
                    ) : (
                      <p className="text-foreground mt-1">{character.location.name}</p>
                    )
                  }
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Origin</label>

                  {
                    !character.origin.name ? (
                      <div className="h-6 bg-muted animate-pulse w-[35%] rounded-md"></div>
                    ) : (
                      <p className="text-foreground mt-1">{character.origin.name}</p>
                    )
                  }
                </div>
              </CardContent>
            </Card>

            {/* Episodes */}
            <EpisodeList character={character} episodes={episodes} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default DetailPage

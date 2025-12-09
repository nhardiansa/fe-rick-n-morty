"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { FilterSection } from "./FilterSection"
import { useCharactersStore } from "@/lib/store/characters"
import { Button } from "./ui/button"
import { fetchCharacters } from "@/lib/request"
import { CharacterCard } from "./CharacterCard"

export default function CharacterGrid() {
  // const [characters, setCharacters] = useState<Character[]>([])
  const { characters, info, addNewCharacters, setInfo, setCharacters, filters } = useCharactersStore((state) => state)

  const [loading, setLoading] = useState(false)

  const loadMoreHandler = async () => {
    console.log(info.next);

    if (info.next) {
      // get all query params from next page URL
      const url = new URL(info.next)
      const params: Record<string, string> = {}
      url.searchParams.forEach((value, key) => {
        params[key] = value
      })

      console.log(params);

      try {
        const response = await fetchCharacters({
          page: parseInt(params.page),
          name: params.name || filters.name || "",
          status: params.status || filters.status || "",
          gender: params.gender || filters.gender || "",
        })

        // add new characters
        addNewCharacters(response.results)

        // set new info
        setInfo(response.info)

      } catch (error) {
        console.error("Failed to fetch characters:", error)
      }

    }
  }

  const getCharacters = async () => {
    try {
      const response = await fetchCharacters()

      setInfo(response.info)
      setCharacters(response.results)
    } catch (error) {
      console.error("Failed to fetch characters:", error)
    }
  }

  useEffect(() => {
    getCharacters()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⚡</div>
          <p className="text-muted-foreground">Loading the multiverse...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FilterSection />

        {/* Results Count */}
        {
          characters.length > 0 && (

            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Showing {info.count} characters</h3>
            </div>
          )
        }

        {/* Characters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {characters.map((character) => (
            <Link key={character.id} href={`/character/${character.id}`} className="group">
              {/* <Card className="h-full overflow-hidden border-border hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden bg-muted aspect-square">
                    <img
                      src={character.image || "/placeholder.svg"}
                      alt={character.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                        {character.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{character.species}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className={`${getStatusColor(character.status)} border-0`}>
                        {character.status}
                      </Badge>
                      <Badge variant="outline" className="border-border text-muted-foreground">
                        {character.gender}
                      </Badge>
                    </div>

                    <p className="text-xs text-muted-foreground pt-2">Appears in {character.episode.length} episodes</p>
                  </div>
                </CardContent>
              </Card> */}
              <CharacterCard character={character} />
            </Link>
          ))}
        </div>

        {
          characters.length === 0 && (
            <div className="mt-8 text-center text-muted-foreground">
              No characters found.
            </div>
          )
        }

        {/* Button to load more */}
        {
          info.next && (
            <div className="mt-8 text-center">
              <Button variant="outline" onClick={() => loadMoreHandler()} disabled={loading}>
                Load More
              </Button>
            </div>
          )
        }
      </div>
    </div>
  )
}





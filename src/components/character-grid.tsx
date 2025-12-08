"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FilterSection } from "./FilterSection"
import { Character, useCharactersStore } from "@/lib/store/characters"

export default function CharacterGrid() {
  // const [characters, setCharacters] = useState<Character[]>([])
  const characters = useCharactersStore((state) => state.characters)
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

  const uniqueSpecies = [...new Set(characters.map((c) => c.species))].filter(Boolean)
  const uniqueGenders = [...new Set(characters.map((c) => c.gender))].filter(Boolean)

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
        {/* <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Showing {filteredCharacters.length} characters</h3>
        </div> */}

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

        {/* {filteredCharacters.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No characters found matching your filters.</p>
          </div>
        )} */}
      </div>
    </div>
  )
}

const CharacterCard = ({ character }: { character: Character }) => {
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
    <Card className="h-full overflow-hidden border-border hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 cursor-pointer">
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
    </Card>
  )
}



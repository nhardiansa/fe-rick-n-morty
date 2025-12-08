"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "./ui/input"

interface Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  image: string
  episode: string[]
}

export default function CharacterGrid() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>("All Status")
  const [speciesFilter, setSpeciesFilter] = useState<string>("All Species")
  const [genderFilter, setGenderFilter] = useState<string>("All Gender")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true)
        let allCharacters: Character[] = []
        let page = 1
        let hasMore = true

        while (hasMore) {
          const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
          const data = await response.json()

          if (data.results) {
            allCharacters = [...allCharacters, ...data.results]
            page += 1
            hasMore = data.info.next !== null
          } else {
            hasMore = false
          }
        }

        setCharacters(allCharacters)
        setFilteredCharacters(allCharacters)
      } catch (error) {
        console.error("Error fetching characters:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCharacters()
  }, [])

  useEffect(() => {
    let filtered = characters

    if (searchQuery) {
      filtered = filtered.filter((char) => char.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    if (statusFilter !== "All Status") {
      filtered = filtered.filter((char) => char.status === statusFilter)
    }

    if (speciesFilter !== "All Species") {
      filtered = filtered.filter((char) => char.species === speciesFilter)
    }

    if (genderFilter !== "All Gender") {
      filtered = filtered.filter((char) => char.gender === genderFilter)
    }

    setFilteredCharacters(filtered)
  }, [searchQuery, statusFilter, speciesFilter, genderFilter, characters])

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
        {/* Filters Section */}
        <div className="mb-8 bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Filters</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">

            {/* Search Input */}
            <div className="col-span-6">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Search</label>
              <input
                type="text"
                placeholder="Character name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-input border-border text-foreground w-full">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Status">All Status</SelectItem>
                  <SelectItem value="Alive">Alive</SelectItem>
                  <SelectItem value="Dead">Dead</SelectItem>
                  <SelectItem value="unknown">Unknown</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Species</label>
              <Select value={speciesFilter} onValueChange={setSpeciesFilter}>
                <SelectTrigger className="bg-input border-border text-foreground w-full">
                  <SelectValue placeholder="All Species" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Species">All Species</SelectItem>
                  {uniqueSpecies.map((species) => (
                    <SelectItem key={species} value={species}>
                      {species}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Gender</label>
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger className="bg-input border-border text-foreground w-full">
                  <SelectValue placeholder="All Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Gender">All Gender</SelectItem>
                  {uniqueGenders.map((gender) => (
                    <SelectItem key={gender} value={gender}>
                      {gender}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Showing {filteredCharacters.length} characters</h3>
        </div>

        {/* Characters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCharacters.map((character) => (
            <Link key={character.id} href={`/character/${character.id}`} className="group">
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
            </Link>
          ))}
        </div>

        {filteredCharacters.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No characters found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}

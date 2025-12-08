import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { fetchCharacters } from "@/lib/request"
import { useCharactersStore } from "@/lib/store/characters"

export const FilterSection = () => {

  const characters = useCharactersStore((state) => state.characters)

  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("All Status")
  const [speciesFilter, setSpeciesFilter] = useState<string>("All Species")
  const [genderFilter, setGenderFilter] = useState<string>("All Gender")

  const uniqueSpecies = [...new Set(characters.map((c) => c.species))].filter(Boolean)
  const uniqueGenders = [...new Set(characters.map((c) => c.gender))].filter(Boolean)

  return (
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

        <div className="col-span-6 sm:col-span-1 lg:col-span-2">
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

        <div className="col-span-6 sm:col-span-1 lg:col-span-2">
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

        <div className="col-span-6 sm:col-span-1 lg:col-span-2">
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
  )
}

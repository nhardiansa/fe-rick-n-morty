"use client"

import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useCharactersStore } from "@/lib/store/characters"
import { Button } from "./ui/button"
import { fetchCharacters } from "@/lib/request"

export const FilterSection = () => {

  const { characters, setCharacters, setFilter, filters, setInfo } = useCharactersStore((state) => state)

  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("All Status")
  const [genderFilter, setGenderFilter] = useState<string>("All Gender")

  const [loading, setLoading] = useState(false)

  const filterHandler = () => {
    const params: Record<string, string> = {}

    params.name = searchQuery

    if (statusFilter) {
      params.status = statusFilter

      if (statusFilter === "All Status") {
        params.status = ""
      }
    }

    if (genderFilter) {
      params.gender = genderFilter

      if (genderFilter === "All Gender") {
        params.gender = ""
      }
    }

    // Update the store's info with the new filters
    setFilter({
      ...filters,
      ...params,
    })
  }


  const getFilteredCharacters = async () => {

    try {
      setLoading(true)
      const charactersResponse = await fetchCharacters({
        name: filters.name || "",
        status: filters.status || "",
        gender: filters.gender || "",
      })

      setInfo(charactersResponse.info)
      setCharacters(charactersResponse.results)

    } catch (error) {
      console.error("Failed to fetch characters:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getFilteredCharacters()
  }, [filters])

  const resetFilters = () => {
    setSearchQuery("")
    setStatusFilter("All Status")
    setGenderFilter("All Gender")
    setFilter({
      gender: undefined,
      name: "",
      status: undefined,
    })
  }



  return (
    <div className="mb-8 bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4 text-foreground">Filters</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">

        {/* Search Input */}
        <div className="col-span-6 sm:col-span-2 lg:col-span-2">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Search</label>
          <input
            type="text"
            placeholder="Character name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-[4.9px] bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground"
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
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Gender</label>
          <Select value={genderFilter} onValueChange={setGenderFilter}>
            <SelectTrigger className="bg-input border-border text-foreground w-full">
              <SelectValue placeholder="All Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Gender">All Gender</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Genderless">Genderless</SelectItem>
              <SelectItem value="unknown">Unknown</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button to apply filters */}
        <div className="col-span-6">
          <Button variant="default" onClick={filterHandler} className="w-full">
            {
              loading ? "Applying..." : "Apply Filters"
            }
          </Button>
        </div>

        {
          /* Reset Button to clear filters */
        }
        {
          (filters.name || filters.status || filters.gender) && (
            <div className="col-span-6">
              <Button variant="outline" onClick={() => resetFilters()} className="w-full bg-red-600 text-white hover:bg-red-700">
                Reset Filters
              </Button>
            </div>
          )
        }
      </div>
    </div>
  )
}

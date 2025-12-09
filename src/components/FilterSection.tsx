"use client"

import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { CharactersFilter, useCharactersStore } from "@/lib/store/characters"
import { Button } from "./ui/button"
import { fetchCharacters } from "@/lib/request"
import { useRouter } from "next/navigation"

export const FilterSection = ({ defaultFilters }: { defaultFilters?: CharactersFilter }) => {

  const router = useRouter()

  const { setCharacters, setFilter, filters, setInfo } = useCharactersStore((state) => state)

  const [searchQuery, setSearchQuery] = useState(defaultFilters?.name || "")
  const [statusFilter, setStatusFilter] = useState<string>(defaultFilters?.status || "All Status")
  const [genderFilter, setGenderFilter] = useState<string>(defaultFilters?.gender || "All Gender")

  const [loading, setLoading] = useState(false)


  const getFilteredCharacters = async (filter: CharactersFilter) => {

    try {
      setLoading(true)
      const charactersResponse = await fetchCharacters({
        name: filter.name,
        status: filter.status,
        gender: filter.gender,
      })

      setInfo(charactersResponse.info)
      setCharacters(charactersResponse.results)

    } catch (error) {
      console.error("Failed to fetch characters:", error)
    } finally {
      setLoading(false)
    }
  }

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

    const displayParams: Record<string, string> = {}

    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== "") {
        displayParams[key] = value;
      }
    }

    console.log('asdasdasd', displayParams, params);

    // Update url to same params
    const queryString = new URLSearchParams(displayParams).toString()
    router.push(`/?${queryString}`)

    getFilteredCharacters({
      name: params.name || "",
      status: params.status || "",
      gender: params.gender || "",
    })
  }

  const resetFilters = () => {
    setSearchQuery("")
    setStatusFilter("All Status")
    setGenderFilter("All Gender")
    setFilter({
      gender: undefined,
      name: "",
      status: undefined,
    })

    getFilteredCharacters({
      name: "",
      status: "",
      gender: "",
    })
  }

  useEffect(() => {
    if (defaultFilters?.name || defaultFilters?.status || defaultFilters?.gender) {
      setFilter({
        ...defaultFilters
      })
    }
  }, [])



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
              loading ? "Loading..." : "Search"
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

export const FilterSectionLoading = () => {
  return (
    <div className="mb-8 bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4 text-foreground">Filters</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="col-span-6 sm:col-span-2 lg:col-span-2">
          <div className="h-4 bg-muted animate-pulse rounded-full mb-2"></div>
          <div className="h-9 rounded-md bg-muted animate-pulse"></div>
        </div>
        <div className="col-span-6 sm:col-span-2 lg:col-span-2">
          <div className="h-4 bg-muted animate-pulse rounded-full mb-2"></div>
          <div className="h-9 rounded-md bg-muted animate-pulse"></div>
        </div>
        <div className="col-span-6 sm:col-span-2 lg:col-span-2">
          <div className="h-4 bg-muted animate-pulse rounded-full mb-2"></div>
          <div className="h-9 rounded-md bg-muted animate-pulse"></div>
        </div>
        <div className="col-span-6">
          <div className="h-9 rounded-md bg-muted animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

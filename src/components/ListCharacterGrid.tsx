"use client"

import Link from "next/link"
import { CharacterCard } from "./CharacterCard"
import { useEffect, useState } from "react"
import { fetchCharacters } from "@/lib/request"
import { useCharactersStore } from "@/lib/store/characters"
import { Button } from "./ui/button"

export const ListCharacterGrid = () => {
  const { characters, info, addNewCharacters, setInfo, setCharacters, filters } = useCharactersStore((state) => state)

  const [loading, setLoading] = useState(false)

  const loadMoreHandler = async () => {

    setLoading(true)

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
      } finally {
        setLoading(false)
      }

    }
  }

  const getCharacters = async () => {
    try {
      setLoading(true)
      const response = await fetchCharacters()

      setInfo(response.info)
      setCharacters(response.results)
    } catch (error) {
      console.error("Failed to fetch characters:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCharacters()
  }, [])

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {characters.map((character) => (
          <Link key={character.id} href={`/character/${character.id}`} className="group">
            <CharacterCard character={character} />
          </Link>
        ))}
      </div>

      {
        ((characters.length === 0) && !loading) && (
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
              {loading ? "Loading..." : "Load More"}
            </Button>
          </div>
        )
      }
    </>
  )
}

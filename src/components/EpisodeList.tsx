"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { getEpisodes } from '@/lib/request'
import { Button } from './ui/button'
import { CharacterDetails, Episode } from '../lib/request'

interface EpisodeList {
  totalEpisodes: number
}

function EpisodeList({ characterDetails, eps, lastPage }: { characterDetails: CharacterDetails, eps: Episode[], lastPage: number }) {

  const character = characterDetails
  const [episodes, setEpisodes] = useState<Episode[]>([
    ...eps
  ])
  const [episodePage, setEpisodePage] = useState(1)
  const [loading, setLoading] = useState(false)

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

  return (
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
  )
}

export default EpisodeList

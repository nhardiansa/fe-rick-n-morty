"use client"

import { useCharactersStore } from "@/lib/store/characters"

function ResultCount({ isLoading }: { isLoading?: boolean }) {

  const { info } = useCharactersStore((state) => state)

  if (isLoading || !info.count) {
    return (
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Loading...</h3>
      </div>
    )
  }

  return (
    <div className="mb-6 flex items-center justify-between">
      <h3 className="text-lg font-semibold text-foreground">Showing {info.count} characters</h3>
    </div>

  )
}

export default ResultCount

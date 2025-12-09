"use client"

import { useCharactersStore } from "@/lib/store/characters"

function ResultCount() {

  const { info } = useCharactersStore((state) => state)

  if (!info || info.count === 0) {
    return (
      <></>
    )
  }

  return (
    <div className="mb-6 flex items-center justify-between">
      <h3 className="text-lg font-semibold text-foreground">Showing {info.count} characters</h3>
    </div>

  )
}

export default ResultCount

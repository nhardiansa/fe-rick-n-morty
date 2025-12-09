import { Character } from "@/lib/store/characters"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"

export const CharacterCard = ({ character }: { character: Character }) => {
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

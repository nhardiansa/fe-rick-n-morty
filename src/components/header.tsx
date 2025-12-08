import Link from "next/link"

export default function Header() {

  return (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Rick & Morty
              </div>
            </Link>
            <div className="text-sm text-muted-foreground">Characters Universe Explorer</div>
          </div>
        </div>
      </div>
    </header>
  )
}

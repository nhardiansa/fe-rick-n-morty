import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Shimmer for Character Image and Basic Info */}

          <div className=" md:col-span-1 lg:col-span-1">
            <Card className="border-border overflow-hidden sticky top-24">
              <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <div className="w-full h-full bg-muted animate-pulse"></div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground mb-2 animate-pulse"></h1>
                    <p className="text-muted-foreground animate-pulse"></p>
                  </div>

                  <div className="space-y-2">
                    <Badge className="border-0 w-full justify-center animate-pulse"></Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Shimmer for Character Details */}

          <div className="md:col-span-2 space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Character Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Species</label>
                    <p className="text-foreground mt-1 animate-pulse"></p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Gender</label>
                    <p className="text-foreground mt-1 animate-pulse"></p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Type</label>
                    <p className="text-foreground mt-1 animate-pulse"></p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <p className="text-foreground mt-1 animate-pulse"></p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Info */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Current Location</label>
                  <p className="text-foreground mt-1 animate-pulse"></p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Origin</label>
                  <p className="text-foreground mt-1 animate-pulse"></p>
                </div>
              </CardContent>
            </Card>

            {/* Episodes */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Episodes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-foreground mt-1 animate-pulse"></p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

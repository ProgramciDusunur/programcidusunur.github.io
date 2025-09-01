import { Card, CardContent } from "@/components/ui/card"
import { Brain, Zap, Trophy, Users } from "lucide-react"

export function ChessEngineStats() {
  return (
    <section className="border-y bg-muted/50 py-12">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-none bg-transparent shadow-none">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <Brain className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-3xl font-bold">3200+</h3>
              <p className="text-sm text-muted-foreground">ELO Derecesi</p>
            </CardContent>
          </Card>
          <Card className="border-none bg-transparent shadow-none">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <Zap className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-3xl font-bold">10M+</h3>
              <p className="text-sm text-muted-foreground">Pozisyon/Saniye</p>
            </CardContent>
          </Card>
          <Card className="border-none bg-transparent shadow-none">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <Trophy className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-3xl font-bold">50+</h3>
              <p className="text-sm text-muted-foreground">Turnuva Zaferi</p>
            </CardContent>
          </Card>
          <Card className="border-none bg-transparent shadow-none">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <Users className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-3xl font-bold">1M+</h3>
              <p className="text-sm text-muted-foreground">Aktif Kullanıcı</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

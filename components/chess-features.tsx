import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cpu, BookOpen, BarChart, Lightbulb, Compass, Clock } from "lucide-react"

export function ChessFeatures() {
  return (
    <section className="py-20" id="features">
      <div className="container">
        <div className="mx-auto mb-16 max-w-[800px] text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Rakipsiz Satranç Motoru Özellikleri
          </h2>
          <p className="text-muted-foreground md:text-lg">
            ChessMaster AI, hem profesyonel oyuncular hem de satranç tutkunları için tasarlanmış en gelişmiş özelliklere
            sahiptir.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <Cpu className="h-6 w-6 text-primary" />
              <CardTitle className="mt-2">Güçlü Yapay Zeka</CardTitle>
              <CardDescription>En son derin öğrenme teknolojileri ile geliştirilmiş motor</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Milyonlarca oyun üzerinde eğitilmiş, 3200+ ELO gücünde yapay zeka motoru ile rakiplerinizi alt edin.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <CardTitle className="mt-2">Kapsamlı Açılış Kitaplığı</CardTitle>
              <CardDescription>Milyonlarca açılış varyantı ile stratejik avantaj</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Dünya şampiyonlarının oyunlarından derlenmiş, sürekli güncellenen açılış kitaplığı ile oyunlarınızı
                güçlendirin.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <BarChart className="h-6 w-6 text-primary" />
              <CardTitle className="mt-2">Gelişmiş Analiz</CardTitle>
              <CardDescription>Oyunlarınızı derinlemesine analiz edin</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Her hamlenin detaylı analizi, alternatif hamleler ve pozisyon değerlendirmeleri ile oyununuzu
                geliştirin.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Lightbulb className="h-6 w-6 text-primary" />
              <CardTitle className="mt-2">Akıllı Öğrenme Sistemi</CardTitle>
              <CardDescription>Oyun tarzınıza göre özelleşen antrenman</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Oyun tarzınızı analiz ederek zayıf yönlerinizi tespit eden ve özel antrenman programları sunan akıllı
                öğrenme sistemi.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Compass className="h-6 w-6 text-primary" />
              <CardTitle className="mt-2">Oyun Sonu Tabloları</CardTitle>
              <CardDescription>Mükemmel oyun sonu stratejileri</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                7 taşlı oyun sonu tablolarıyla mükemmel oyun sonu stratejileri geliştirin ve kazanma şansınızı artırın.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Clock className="h-6 w-6 text-primary" />
              <CardTitle className="mt-2">Zaman Yönetimi</CardTitle>
              <CardDescription>Akıllı zaman yönetimi algoritması</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Turnuva koşullarına göre otomatik olarak ayarlanan zaman yönetimi algoritması ile kritik pozisyonlarda
                doğru kararlar alın.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

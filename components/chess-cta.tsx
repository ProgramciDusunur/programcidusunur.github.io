import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export function ChessCTA() {
  return (
    <section className="py-20" id="pricing">
      <div className="container">
        <div className="mx-auto mb-16 max-w-[800px] text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Satranç Gücünüzü Keşfedin</h2>
          <p className="text-muted-foreground md:text-lg">
            İhtiyaçlarınıza uygun planı seçin ve satranç yolculuğunuzu bir üst seviyeye taşıyın.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-muted/60">
            <CardHeader>
              <CardTitle>Başlangıç</CardTitle>
              <CardDescription>Satranç yolculuğuna yeni başlayanlar için</CardDescription>
              <div className="mt-4 text-4xl font-bold">Ücretsiz</div>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Temel analiz özellikleri</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Sınırlı açılış kitaplığı</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Günlük 5 detaylı analiz</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Topluluk desteği</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                Ücretsiz Başla
              </Button>
            </CardFooter>
          </Card>
          <Card className="border-primary/50 shadow-md">
            <CardHeader className="bg-primary/5">
              <div className="mb-2 w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                En Popüler
              </div>
              <CardTitle>Profesyonel</CardTitle>
              <CardDescription>Ciddi satranç oyuncuları için</CardDescription>
              <div className="mt-4 text-4xl font-bold">
                ₺199<span className="text-sm font-normal text-muted-foreground">/ay</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Tam analiz özellikleri</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Kapsamlı açılış kitaplığı</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Sınırsız detaylı analiz</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Kişiselleştirilmiş antrenman</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Öncelikli destek</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Şimdi Başla</Button>
            </CardFooter>
          </Card>
          <Card className="border-muted/60">
            <CardHeader>
              <CardTitle>Büyük Usta</CardTitle>
              <CardDescription>Profesyonel oyuncular ve antrenörler için</CardDescription>
              <div className="mt-4 text-4xl font-bold">
                ₺499<span className="text-sm font-normal text-muted-foreground">/ay</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Tüm Profesyonel özellikleri</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Özel açılış hazırlığı</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Rakip analizi ve hazırlık</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">7 taşlı oyun sonu tabloları</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">VIP destek</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">Çoklu cihaz desteği</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                Şimdi Başla
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star } from "lucide-react"

export function ChessTestimonials() {
  return (
    <section className="bg-muted/50 py-20" id="testimonials">
      <div className="container">
        <div className="mx-auto mb-16 max-w-[800px] text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Satranç Dünyasından Yorumlar
          </h2>
          <p className="text-muted-foreground md:text-lg">
            Dünya çapında satranç ustaları ve profesyonel oyuncular ChessMaster AI hakkında ne diyor?
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-none bg-background shadow-md">
            <CardContent className="p-6 pt-8">
              <div className="flex gap-1 text-yellow-500">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
              <blockquote className="mt-4">
                <p className="text-muted-foreground">
                  "ChessMaster AI, şu ana kadar kullandığım en güçlü satranç motoru. Analiz yetenekleri ve açılış
                  kitaplığı ile oyunumu bir üst seviyeye taşıdı."
                </p>
              </blockquote>
            </CardContent>
            <CardFooter className="px-6 pb-6 pt-0">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
                  <Image src="/placeholder.svg?height=40&width=40" alt="Profil resmi" width={40} height={40} />
                </div>
                <div>
                  <p className="text-sm font-medium">Ahmet Yılmaz</p>
                  <p className="text-xs text-muted-foreground">Uluslararası Usta</p>
                </div>
              </div>
            </CardFooter>
          </Card>
          <Card className="border-none bg-background shadow-md">
            <CardContent className="p-6 pt-8">
              <div className="flex gap-1 text-yellow-500">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
              <blockquote className="mt-4">
                <p className="text-muted-foreground">
                  "Turnuvalara hazırlanırken vazgeçilmez yardımcım. Özellikle oyun sonu analizleri ve öğrenme sistemi
                  ile kendimi sürekli geliştiriyorum."
                </p>
              </blockquote>
            </CardContent>
            <CardFooter className="px-6 pb-6 pt-0">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
                  <Image src="/placeholder.svg?height=40&width=40" alt="Profil resmi" width={40} height={40} />
                </div>
                <div>
                  <p className="text-sm font-medium">Zeynep Kaya</p>
                  <p className="text-xs text-muted-foreground">Büyük Usta</p>
                </div>
              </div>
            </CardFooter>
          </Card>
          <Card className="border-none bg-background shadow-md">
            <CardContent className="p-6 pt-8">
              <div className="flex gap-1 text-yellow-500">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
              <blockquote className="mt-4">
                <p className="text-muted-foreground">
                  "Satranç antrenörü olarak öğrencilerime ChessMaster AI'yı öneriyorum. Kullanıcı dostu arayüzü ve
                  detaylı analizleri ile öğrenme sürecini hızlandırıyor."
                </p>
              </blockquote>
            </CardContent>
            <CardFooter className="px-6 pb-6 pt-0">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
                  <Image src="/placeholder.svg?height=40&width=40" alt="Profil resmi" width={40} height={40} />
                </div>
                <div>
                  <p className="text-sm font-medium">Mehmet Demir</p>
                  <p className="text-xs text-muted-foreground">FIDE Antrenörü</p>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

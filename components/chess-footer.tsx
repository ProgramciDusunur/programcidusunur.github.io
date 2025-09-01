import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CastleIcon as ChessKnight, Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react"

export function ChessFooter() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ChessKnight className="h-6 w-6" />
              <span className="text-lg font-bold">ChessMaster AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              En gelişmiş yapay zeka teknolojileri ile donatılmış, profesyonel oyuncular ve satranç tutkunları için
              tasarlanmış güçlü bir satranç motoru.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Ürün</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Özellikler
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Fiyatlandırma
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  İndirmeler
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Güncellemeler
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Yol Haritası
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Kaynaklar</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Dokümantasyon
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Eğitimler
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Forum
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Destek
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Bültenimize Abone Olun</h3>
            <p className="text-sm text-muted-foreground">
              En son güncellemeler, özellikler ve satranç ipuçları için abone olun.
            </p>
            <div className="flex gap-2">
              <Input type="email" placeholder="E-posta adresiniz" className="max-w-[240px]" />
              <Button type="submit" size="sm">
                <Mail className="mr-2 h-4 w-4" />
                Abone Ol
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} ChessMaster AI. Tüm hakları saklıdır.
            </p>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <Link href="#" className="hover:text-foreground">
                Gizlilik Politikası
              </Link>
              <Link href="#" className="hover:text-foreground">
                Kullanım Şartları
              </Link>
              <Link href="#" className="hover:text-foreground">
                Çerez Politikası
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

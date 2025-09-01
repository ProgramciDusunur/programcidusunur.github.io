import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { CastleIcon as ChessKnight } from "lucide-react"

export function ChessHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <ChessKnight className="h-8 w-8" />
          <span className="text-xl font-bold">ChessMaster AI</span>
        </Link>
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="#features" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Özellikler</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Teknoloji</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="#"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">Yapay Zeka Teknolojisi</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          En son yapay zeka teknolojileri ile geliştirilmiş satranç motoru
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <Link href="#" legacyBehavior passHref>
                      <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Derin Öğrenme</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Milyonlarca oyun üzerinde eğitilmiş derin öğrenme modelleri
                        </p>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" legacyBehavior passHref>
                      <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Açılış Kitaplığı</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Kapsamlı açılış kitaplığı ile stratejik avantaj
                        </p>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" legacyBehavior passHref>
                      <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Oyun Sonu Tabloları</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Mükemmel oyun sonu stratejileri için gelişmiş tablolar
                        </p>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#testimonials" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Referanslar</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#pricing" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Fiyatlandırma</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden md:flex">
            Giriş Yap
          </Button>
          <Button>Ücretsiz Dene</Button>
        </div>
      </div>
    </header>
  )
}

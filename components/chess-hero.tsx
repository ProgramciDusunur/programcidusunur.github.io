"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, Play } from "lucide-react"

export function ChessHero() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted py-20 md:py-32">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=800')] bg-repeat opacity-5"></div>
      <div className="container relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Satranç Dünyasının <span className="text-primary">Yeni Gücü</span>
              </h1>
              <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl">
                ChessMaster AI, en gelişmiş yapay zeka teknolojileri ile donatılmış, profesyonel oyuncular ve satranç
                tutkunları için tasarlanmış güçlü bir satranç motorudur.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="gap-2">
                <Download className="h-5 w-5" />
                Şimdi İndir
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Play className="h-5 w-5" />
                Demo İzle
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>3200+ ELO Gücü</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span>Dünya Şampiyonlarını Yendi</span>
              </div>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            {isClient && (
              <div className="relative aspect-square w-full max-w-[500px] overflow-hidden rounded-xl border bg-background shadow-xl">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="Satranç tahtası görseli"
                  width={500}
                  height={500}
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

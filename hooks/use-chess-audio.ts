"use client"

import { useCallback, useRef, useEffect } from "react"

interface ChessAudioOptions {
  enabled: boolean
  volume: number
}

export function useChessAudio(options: ChessAudioOptions = { enabled: true, volume: 0.5 }) {
  const audioContextRef = useRef<AudioContext | null>(null)
  const audioBuffersRef = useRef<Map<string, AudioBuffer>>(new Map())
  const isInitializedRef = useRef(false)

  // Initialize audio context and load sounds
  const initializeAudio = useCallback(async () => {
    if (isInitializedRef.current || !options.enabled) return

    try {
      // Create audio context
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()

      // Generate audio buffers for different chess sounds
      const sounds = {
        move: generateMoveSound,
        capture: generateCaptureSound,
        check: generateCheckSound,
        checkmate: generateCheckmateSound,
        castling: generateCastlingSound,
        promotion: generatePromotionSound,
        gameStart: generateGameStartSound,
        gameEnd: generateGameEndSound,
        illegal: generateIllegalMoveSound,
        tick: generateTickSound,
      }

      // Generate and store audio buffers
      for (const [soundName, generator] of Object.entries(sounds)) {
        const buffer = await generator(audioContextRef.current!)
        audioBuffersRef.current.set(soundName, buffer)
      }

      isInitializedRef.current = true
    } catch (error) {
      console.warn("Failed to initialize chess audio:", error)
    }
  }, [options.enabled])

  // Play a specific sound
  const playSound = useCallback(
    (soundName: string, volume: number = options.volume) => {
      if (!options.enabled || !audioContextRef.current || !isInitializedRef.current) return

      const buffer = audioBuffersRef.current.get(soundName)
      if (!buffer) return

      try {
        const source = audioContextRef.current.createBufferSource()
        const gainNode = audioContextRef.current.createGain()

        source.buffer = buffer
        gainNode.gain.value = Math.max(0, Math.min(1, volume))

        source.connect(gainNode)
        gainNode.connect(audioContextRef.current.destination)

        source.start()
      } catch (error) {
        console.warn("Failed to play chess sound:", error)
      }
    },
    [options.enabled, options.volume],
  )

  // Specific sound functions
  const playMove = useCallback(() => playSound("move"), [playSound])
  const playCapture = useCallback(() => playSound("capture"), [playSound])
  const playCheck = useCallback(() => playSound("check"), [playSound])
  const playCheckmate = useCallback(() => playSound("checkmate"), [playSound])
  const playCastling = useCallback(() => playSound("castling"), [playSound])
  const playPromotion = useCallback(() => playSound("promotion"), [playSound])
  const playGameStart = useCallback(() => playSound("gameStart"), [playSound])
  const playGameEnd = useCallback(() => playSound("gameEnd"), [playSound])
  const playIllegalMove = useCallback(() => playSound("illegal"), [playSound])
  const playTick = useCallback(() => playSound("tick", 0.3), [playSound])

  // Initialize on first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      initializeAudio()
      document.removeEventListener("click", handleFirstInteraction)
      document.removeEventListener("keydown", handleFirstInteraction)
    }

    document.addEventListener("click", handleFirstInteraction)
    document.addEventListener("keydown", handleFirstInteraction)

    return () => {
      document.removeEventListener("click", handleFirstInteraction)
      document.removeEventListener("keydown", handleFirstInteraction)
    }
  }, [initializeAudio])

  return {
    playMove,
    playCapture,
    playCheck,
    playCheckmate,
    playCastling,
    playPromotion,
    playGameStart,
    playGameEnd,
    playIllegalMove,
    playTick,
    initializeAudio,
  }
}

// Sound generation functions using Web Audio API
async function generateMoveSound(audioContext: AudioContext): Promise<AudioBuffer> {
  const sampleRate = audioContext.sampleRate
  const duration = 0.15
  const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < buffer.length; i++) {
    const t = i / sampleRate
    // Soft click sound
    const envelope = Math.exp(-t * 8)
    const frequency = 800 + Math.sin(t * 50) * 100
    data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.3
  }

  return buffer
}

async function generateCaptureSound(audioContext: AudioContext): Promise<AudioBuffer> {
  const sampleRate = audioContext.sampleRate
  const duration = 0.2
  const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < buffer.length; i++) {
    const t = i / sampleRate
    // More pronounced sound for captures
    const envelope = Math.exp(-t * 6)
    const frequency = 600 + Math.sin(t * 30) * 200
    const noise = (Math.random() - 0.5) * 0.1
    data[i] = (Math.sin(2 * Math.PI * frequency * t) + noise) * envelope * 0.4
  }

  return buffer
}

async function generateCheckSound(audioContext: AudioContext): Promise<AudioBuffer> {
  const sampleRate = audioContext.sampleRate
  const duration = 0.3
  const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < buffer.length; i++) {
    const t = i / sampleRate
    // Alert sound for check
    const envelope = Math.exp(-t * 4) * (1 + Math.sin(t * 20) * 0.3)
    const frequency = 1000 + Math.sin(t * 15) * 300
    data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.5
  }

  return buffer
}

async function generateCheckmateSound(audioContext: AudioContext): Promise<AudioBuffer> {
  const sampleRate = audioContext.sampleRate
  const duration = 0.8
  const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < buffer.length; i++) {
    const t = i / sampleRate
    // Dramatic sound for checkmate
    const envelope = Math.exp(-t * 2) * (1 + Math.sin(t * 8) * 0.5)
    const frequency = 400 + Math.sin(t * 5) * 200 + Math.sin(t * 12) * 100
    data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.6
  }

  return buffer
}

async function generateCastlingSound(audioContext: AudioContext): Promise<AudioBuffer> {
  const sampleRate = audioContext.sampleRate
  const duration = 0.25
  const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < buffer.length; i++) {
    const t = i / sampleRate
    // Double click sound for castling
    const envelope = Math.exp(-t * 7) * (1 + Math.sin(t * 40) * 0.8)
    const frequency = 700 + Math.sin(t * 25) * 150
    data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.35
  }

  return buffer
}

async function generatePromotionSound(audioContext: AudioContext): Promise<AudioBuffer> {
  const sampleRate = audioContext.sampleRate
  const duration = 0.4
  const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < buffer.length; i++) {
    const t = i / sampleRate
    // Rising sound for promotion
    const envelope = Math.exp(-t * 3) * (1 + Math.sin(t * 10) * 0.4)
    const frequency = 500 + t * 800 + Math.sin(t * 20) * 100
    data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.45
  }

  return buffer
}

async function generateGameStartSound(audioContext: AudioContext): Promise<AudioBuffer> {
  const sampleRate = audioContext.sampleRate
  const duration = 0.5
  const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < buffer.length; i++) {
    const t = i / sampleRate
    // Welcoming sound for game start
    const envelope = Math.exp(-t * 2.5) * (1 + Math.sin(t * 6) * 0.3)
    const frequency = 440 + Math.sin(t * 4) * 220
    data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.4
  }

  return buffer
}

async function generateGameEndSound(audioContext: AudioContext): Promise<AudioBuffer> {
  const sampleRate = audioContext.sampleRate
  const duration = 0.6
  const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < buffer.length; i++) {
    const t = i / sampleRate
    // Concluding sound for game end
    const envelope = Math.exp(-t * 2) * (1 + Math.sin(t * 3) * 0.4)
    const frequency = 330 + Math.sin(t * 2) * 110 - t * 100
    data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.5
  }

  return buffer
}

async function generateIllegalMoveSound(audioContext: AudioContext): Promise<AudioBuffer> {
  const sampleRate = audioContext.sampleRate
  const duration = 0.2
  const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < buffer.length; i++) {
    const t = i / sampleRate
    // Error sound for illegal moves
    const envelope = Math.exp(-t * 10)
    const frequency = 200 + Math.sin(t * 100) * 50
    const noise = (Math.random() - 0.5) * 0.3
    data[i] = (Math.sin(2 * Math.PI * frequency * t) + noise) * envelope * 0.3
  }

  return buffer
}

async function generateTickSound(audioContext: AudioContext): Promise<AudioBuffer> {
  const sampleRate = audioContext.sampleRate
  const duration = 0.05
  const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < buffer.length; i++) {
    const t = i / sampleRate
    // Subtle tick for clock
    const envelope = Math.exp(-t * 20)
    const frequency = 1200
    data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.2
  }

  return buffer
}

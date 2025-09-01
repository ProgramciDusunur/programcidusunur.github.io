"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, RotateCcw, Play, SkipForward, Settings, Clock, Award, Copy, Save } from "lucide-react"
import { ChessIcon } from "@/components/chess-icon"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Chess } from "chess.js"
import { Chessboard } from "react-chessboard"

export default function PlayPage() {
  // Chess game state
  const [game, setGame] = useState(new Chess())
  const [boardOrientation, setBoardOrientation] = useState("white")
  const [selectedMoveIndex, setSelectedMoveIndex] = useState(-1)

  // Mobile UI state
  const [activeTab, setActiveTab] = useState("moves")

  // Principal variation state (for engine's best line)
  const [pvGame, setPvGame] = useState(new Chess())
  const [principalVariation, setPrincipalVariation] = useState([
    "e4",
    "e5",
    "Nf3",
    "Nc6",
    "Bb5",
    "a6",
    "Ba4",
    "Nf6",
    "O-O",
    "Be7",
    "Re1",
    "b5",
    "Bb3",
    "O-O",
  ])

  // Mock analysis variations
  const [analysisVariations, setAnalysisVariations] = useState([
    {
      moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O"],
      evaluation: "+0.32",
      depth: 24,
      isMainLine: true,
    },
    {
      moves: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5", "c3", "Nf6", "d3"],
      evaluation: "+0.28",
      depth: 22,
      isMainLine: false,
    },
    {
      moves: ["e4", "e5", "Nf3", "Nc6", "d4", "exd4", "Nxd4", "Nf6", "Nxc6", "bxc6"],
      evaluation: "+0.21",
      depth: 20,
      isMainLine: false,
    },
  ])

  // Get move history directly from game
  const moveHistory = game.history({ verbose: true })

  // Update PV board when principal variation changes
  useEffect(() => {
    if (principalVariation.length > 0) {
      const newPvGame = new Chess(game.fen())
      try {
        principalVariation.forEach((move) => {
          newPvGame.move(move)
        })
        setPvGame(newPvGame)
      } catch (e) {
        setPvGame(new Chess(game.fen()))
      }
    }
  }, [principalVariation, game])

  // Function to make a move
  function makeAMove(move) {
    const gameCopy = new Chess(game.fen())
    try {
      const result = gameCopy.move(move)
      if (result) {
        setGame(gameCopy)
        setSelectedMoveIndex(-1)
        return true
      }
    } catch (e) {
      return false
    }
    return false
  }

  // Function to handle piece drop
  function onDrop(sourceSquare, targetSquare) {
    const move = {
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    }
    return makeAMove(move)
  }

  // Function to reset the game
  function resetGame() {
    setGame(new Chess())
    setSelectedMoveIndex(-1)
  }

  // Function to flip the board
  function flipBoard() {
    setBoardOrientation(boardOrientation === "white" ? "black" : "white")
  }

  // Function to handle move click
  function handleMoveClick(index) {
    setSelectedMoveIndex(index)
  }

  // Function to get position for display
  function getDisplayPosition() {
    if (selectedMoveIndex === -1) {
      return game.fen()
    }

    const tempGame = new Chess()
    for (let i = 0; i <= selectedMoveIndex; i++) {
      if (i < moveHistory.length) {
        tempGame.move(moveHistory[i])
      }
    }
    return tempGame.fen()
  }

  // Function to group moves by full move pairs (white and black)
  function groupMovesByPairs(moves) {
    const groupedMoves = []
    for (let i = 0; i < moves.length; i += 2) {
      const whiteMove = moves[i]
      const blackMove = i + 1 < moves.length ? moves[i + 1] : null
      groupedMoves.push({
        moveNumber: Math.floor(i / 2) + 1,
        white: whiteMove,
        black: blackMove,
        whiteIndex: i,
        blackIndex: i + 1 < moves.length ? i + 1 : -1,
      })
    }
    return groupedMoves
  }

  // Function to copy PGN
  function copyPGN() {
    const pgn = game.pgn()
    navigator.clipboard
      .writeText(pgn)
      .then(() => {
        alert("PGN copied to clipboard")
      })
      .catch((err) => {
        console.error("Failed to copy PGN: ", err)
      })
  }

  // Mock function to get principal variation
  function getMockPrincipalVariation() {
    const variations = [
      ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O"],
      ["d4", "Nf6", "c4", "e6", "Nc3", "Bb4", "e3", "O-O"],
      ["c4", "e5", "Nc3", "Nf6", "Nf3", "Nc6", "g3", "d5", "cxd5"],
    ]
    return variations[Math.floor(Math.random() * variations.length)]
  }

  // Function to update principal variation
  function updatePrincipalVariation() {
    setPrincipalVariation(getMockPrincipalVariation())
  }

  // Simulate engine analysis every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      updatePrincipalVariation()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Group moves for display
  const groupedMoves = groupMovesByPairs(moveHistory)

  return (
    <div className="flex min-h-screen flex-col bg-[#0d1117]">
      <Header />

      {/* Mobile-optimized back navigation */}
      <div className="container mt-2 lg:mt-4 px-4">
        <Link
          href="/potential"
          className="inline-flex items-center gap-1 text-xs sm:text-sm text-[#8b949e] hover:text-[#58a6ff] transition-colors py-2"
        >
          <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          Back to Potential
        </Link>
      </div>

      <main className="flex-1 container py-4 lg:py-8 px-4">
        <div className="mx-auto max-w-6xl">
          {/* Mobile-optimized title */}
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-[#e6edf3] mb-3 sm:mb-6 text-center">
            Play with Potential
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-[#8b949e] mb-4 sm:mb-8 text-center max-w-3xl mx-auto px-2">
            Test Potential chess engine directly in your browser using WebAssembly technology. Play against one of the
            strongest open-source chess engines or analyze your games.
          </p>

          {/* Mobile layout - shows on screens smaller than lg */}
          <div className="lg:hidden space-y-4">
            {/* Main chess board - mobile */}
            <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
              <CardHeader className="pb-2 px-3 sm:px-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <ChessIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#58a6ff]" />
                    <CardTitle className="text-sm sm:text-base md:text-lg text-[#e6edf3]">Potential Chess</CardTitle>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 sm:h-8 sm:w-8 text-[#8b949e]"
                      onClick={resetGame}
                      title="Reset Board"
                    >
                      <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 sm:h-8 sm:w-8 text-[#8b949e]"
                      onClick={() => {
                        const gameCopy = new Chess(game.fen())
                        gameCopy.undo()
                        setGame(gameCopy)
                      }}
                      title="Undo Move"
                    >
                      <SkipForward className="h-3 w-3 sm:h-4 sm:w-4 transform rotate-180" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 sm:h-8 sm:w-8 text-[#8b949e]"
                      onClick={flipBoard}
                      title="Flip Board"
                    >
                      <Play className="h-3 w-3 sm:h-4 sm:w-4 transform rotate-90" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 sm:h-8 sm:w-8 text-[#8b949e]"
                      title="Settings"
                    >
                      <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                {/* Responsive chessboard container */}
                <div className="w-full max-w-[min(100vw-2rem,600px)] mx-auto">
                  <div className="aspect-square w-full">
                    <Chessboard
                      id="PlayVsPotentialMobile"
                      position={getDisplayPosition()}
                      onPieceDrop={onDrop}
                      customBoardStyle={{
                        borderRadius: "4px",
                        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
                      }}
                      customDarkSquareStyle={{ backgroundColor: "#769656" }}
                      customLightSquareStyle={{ backgroundColor: "#eeeed2" }}
                      boardOrientation={boardOrientation}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between text-xs text-[#8b949e] px-3 sm:px-6">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>White: 5:00</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Black: 5:00</span>
                </div>
              </CardFooter>
            </Card>

            {/* Mobile-optimized tabbed interface */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-[#161b22] border border-[#30363d]">
                <TabsTrigger
                  value="moves"
                  className="text-xs data-[state=active]:bg-[#0d1117] data-[state=active]:text-[#e6edf3] text-[#8b949e]"
                >
                  Moves
                </TabsTrigger>
                <TabsTrigger
                  value="analysis"
                  className="text-xs data-[state=active]:bg-[#0d1117] data-[state=active]:text-[#e6edf3] text-[#8b949e]"
                >
                  Analysis
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="text-xs data-[state=active]:bg-[#0d1117] data-[state=active]:text-[#e6edf3] text-[#8b949e]"
                >
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* Move History Tab */}
              <TabsContent value="moves" className="mt-4">
                <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
                  <CardHeader className="pb-2 border-b border-[#30363d] px-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm text-[#e6edf3]">Move History</CardTitle>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-[#8b949e]"
                          title="Copy PGN"
                          onClick={copyPGN}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-[#8b949e]" title="Save Game">
                          <Save className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="max-h-[300px] overflow-y-auto bg-[#161b22]">
                      {moveHistory.length === 0 ? (
                        <div className="flex items-center justify-center h-32 text-xs text-[#8b949e] p-4">
                          <div className="text-center">
                            <div className="mb-2">No moves played yet</div>
                            <div className="text-[10px] text-[#6e7681]">Make your first move to begin</div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-3 space-y-2">
                          {groupedMoves.map((moveGroup) => (
                            <div
                              key={moveGroup.moveNumber}
                              className="border border-[#21262d] rounded-md bg-[#0d1117] hover:bg-[#21262d] transition-colors"
                            >
                              <div className="px-3 py-1 border-b border-[#21262d] bg-[#161b22]">
                                <span className="text-xs font-medium text-[#8b949e]">Move {moveGroup.moveNumber}</span>
                              </div>
                              <div className="grid grid-cols-2 divide-x divide-[#21262d]">
                                <div
                                  className={`
                                    p-2 cursor-pointer transition-all duration-150
                                    ${
                                      selectedMoveIndex === moveGroup.whiteIndex
                                        ? "bg-[#1f6feb] text-white"
                                        : "text-[#e6edf3] hover:bg-[#30363d]"
                                    }
                                  `}
                                  onClick={() => handleMoveClick(moveGroup.whiteIndex)}
                                >
                                  <div className="text-[10px] text-[#8b949e] mb-1">White</div>
                                  <div className="text-sm font-medium">
                                    {moveGroup.moveNumber}. {moveGroup.white?.san || ""}
                                  </div>
                                </div>
                                <div
                                  className={`
                                    p-2 transition-all duration-150
                                    ${
                                      moveGroup.black
                                        ? `cursor-pointer ${
                                            selectedMoveIndex === moveGroup.blackIndex
                                              ? "bg-[#1f6feb] text-white"
                                              : "text-[#e6edf3] hover:bg-[#30363d]"
                                          }`
                                        : "text-[#6e7681] cursor-default"
                                    }
                                  `}
                                  onClick={() => moveGroup.black && handleMoveClick(moveGroup.blackIndex)}
                                >
                                  <div className="text-[10px] text-[#8b949e] mb-1">Black</div>
                                  <div className="text-sm font-medium">
                                    {moveGroup.black ? `${moveGroup.moveNumber}... ${moveGroup.black.san}` : "..."}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analysis Tab */}
              <TabsContent value="analysis" className="mt-4">
                <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
                  <CardHeader className="pb-2 px-3">
                    <CardTitle className="text-sm text-[#e6edf3]">Engine Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="px-3">
                    <div className="space-y-3">
                      {/* Engine evaluation bar */}
                      <div className="border border-[#30363d] rounded-md bg-[#161b22] p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-[#c9d1d9] font-medium">Engine Evaluation</span>
                          <span className="text-xs text-[#58a6ff]">+0.32</span>
                        </div>
                        <div className="h-2 bg-[#0d1117] rounded-full overflow-hidden">
                          <div className="h-full bg-[#58a6ff] w-[53%]"></div>
                        </div>
                        <div className="flex justify-between text-xs text-[#8b949e] mt-1">
                          <span>Black</span>
                          <span>White</span>
                        </div>
                      </div>

                      {/* Principal variations - mobile optimized */}
                      <div className="border border-[#30363d] rounded-md bg-[#161b22] p-3">
                        <div className="text-xs text-[#c9d1d9] font-medium mb-2">Principal Variations</div>
                        <div className="space-y-2 text-xs">
                          {analysisVariations.slice(0, 2).map((variation, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex justify-between items-center">
                                <span
                                  className={variation.isMainLine ? "text-[#58a6ff] font-medium" : "text-[#c9d1d9]"}
                                >
                                  {variation.isMainLine ? "Main:" : `Var ${index}:`}
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className={variation.isMainLine ? "text-[#58a6ff]" : "text-[#8b949e]"}>
                                    {variation.evaluation}
                                  </span>
                                  <span className="text-[#8b949e] text-[10px]">d{variation.depth}</span>
                                </div>
                              </div>
                              <div className="pl-2 border-l-2 border-[#30363d]">
                                <div className="flex flex-wrap gap-1">
                                  {variation.moves.slice(0, 6).map((move, moveIndex) => (
                                    <span
                                      key={moveIndex}
                                      className={`
                                        text-[10px]
                                        ${variation.isMainLine ? "text-[#58a6ff]" : "text-[#c9d1d9]"}
                                      `}
                                    >
                                      {moveIndex % 2 === 0 && moveIndex > 0
                                        ? `${Math.floor(moveIndex / 2) + 1}.`
                                        : moveIndex === 0
                                          ? "1."
                                          : ""}
                                      {move}
                                    </span>
                                  ))}
                                  {variation.moves.length > 6 && (
                                    <span className="text-[10px] text-[#6e7681]">...</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Engine stats - mobile layout */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="border border-[#30363d] rounded-md bg-[#161b22] p-3">
                          <div className="text-xs text-[#c9d1d9] font-medium mb-2">Engine Stats</div>
                          <div className="space-y-1 text-xs text-[#8b949e]">
                            <div className="flex justify-between">
                              <span>Depth:</span>
                              <span>24</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Nodes:</span>
                              <span>15.4M</span>
                            </div>
                            <div className="flex justify-between">
                              <span>NPS:</span>
                              <span>2.3M</span>
                            </div>
                          </div>
                        </div>

                        <div className="border border-[#30363d] rounded-md bg-[#161b22] p-3">
                          <div className="text-xs text-[#c9d1d9] font-medium mb-2 text-center">Principal Line</div>
                          <div className="flex justify-center">
                            <div className="w-20 h-20">
                              <Chessboard
                                id="PVBoardMobile"
                                position={pvGame.fen()}
                                customBoardStyle={{
                                  borderRadius: "4px",
                                }}
                                customDarkSquareStyle={{ backgroundColor: "#769656" }}
                                customLightSquareStyle={{ backgroundColor: "#eeeed2" }}
                                boardOrientation={boardOrientation}
                                arePiecesDraggable={false}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="mt-4">
                <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
                  <CardHeader className="pb-2 px-3">
                    <CardTitle className="text-sm text-[#e6edf3]">Game Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="px-3">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="difficulty" className="text-[#e6edf3] mb-2 block text-sm">
                          Difficulty Level
                        </Label>
                        <Select>
                          <SelectTrigger className="border-[#30363d] bg-[#161b22] text-[#c9d1d9] h-9">
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent className="border-[#30363d] bg-[#161b22] text-[#c9d1d9]">
                            <SelectItem value="beginner">Beginner (1200 ELO)</SelectItem>
                            <SelectItem value="intermediate">Intermediate (1800 ELO)</SelectItem>
                            <SelectItem value="advanced">Advanced (2400 ELO)</SelectItem>
                            <SelectItem value="master">Master (2800+ ELO)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="color" className="text-[#e6edf3] mb-2 block text-sm">
                          Play as
                        </Label>
                        <Select>
                          <SelectTrigger className="border-[#30363d] bg-[#161b22] text-[#c9d1d9] h-9">
                            <SelectValue placeholder="Select color" />
                          </SelectTrigger>
                          <SelectContent className="border-[#30363d] bg-[#161b22] text-[#c9d1d9]">
                            <SelectItem value="white">White</SelectItem>
                            <SelectItem value="black">Black</SelectItem>
                            <SelectItem value="random">Random</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="time" className="text-[#e6edf3] mb-2 block text-sm">
                          Thinking Time (seconds)
                        </Label>
                        <Slider defaultValue={[5]} max={30} step={1} className="my-4" />
                        <div className="text-xs text-[#8b949e] flex justify-between">
                          <span>Faster</span>
                          <span>Stronger</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="hints" className="text-[#e6edf3] text-sm">
                          Show Hints
                        </Label>
                        <Switch id="hints" />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="analysis" className="text-[#e6edf3] text-sm">
                          Live Analysis
                        </Label>
                        <Switch id="analysis" />
                      </div>

                      <Button className="w-full gap-2 bg-[#238636] text-white hover:bg-[#2ea043] mt-4 h-9">
                        <Play className="h-4 w-4" />
                        Start New Game
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Desktop layout - original design restored, shows on lg screens and up */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6">
            {/* Main chess board - takes 3/4 of the width on large screens */}
            <div className="lg:col-span-3">
              <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <ChessIcon className="h-5 w-5 text-[#58a6ff]" />
                      <CardTitle className="text-base sm:text-lg text-[#e6edf3]">Potential Chess</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-[#8b949e]"
                        onClick={resetGame}
                        title="Reset Board"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-[#8b949e]"
                        onClick={() => {
                          const gameCopy = new Chess(game.fen())
                          gameCopy.undo()
                          setGame(gameCopy)
                        }}
                        title="Undo Move"
                      >
                        <SkipForward className="h-4 w-4 transform rotate-180" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-[#8b949e]"
                        onClick={flipBoard}
                        title="Flip Board"
                      >
                        <Play className="h-4 w-4 transform rotate-90" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-[#8b949e]" title="Settings">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square w-full max-w-[600px] mx-auto">
                    <Chessboard
                      id="PlayVsPotentialDesktop"
                      position={getDisplayPosition()}
                      onPieceDrop={onDrop}
                      customBoardStyle={{
                        borderRadius: "4px",
                        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
                      }}
                      customDarkSquareStyle={{ backgroundColor: "#769656" }}
                      customLightSquareStyle={{ backgroundColor: "#eeeed2" }}
                      boardOrientation={boardOrientation}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between text-xs text-[#8b949e]">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>White: 5:00</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Black: 5:00</span>
                  </div>
                </CardFooter>
              </Card>
            </div>

            {/* Move history - takes 1/4 of the width on large screens - ORIGINAL DESIGN */}
            <div className="lg:col-span-1">
              <Card className="border-[#30363d] bg-[#0d1117] shadow-md h-full">
                <CardHeader className="pb-2 border-b border-[#30363d]">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm text-[#e6edf3]">Move History</CardTitle>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-[#8b949e]"
                        title="Copy PGN"
                        onClick={copyPGN}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-[#8b949e]" title="Save Game">
                        <Save className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div
                    className="overflow-y-auto h-[calc(100vh-400px)] min-h-[400px] bg-[#161b22] border-t-2 border-[#30363d]"
                    style={{
                      scrollbarWidth: "thin",
                      scrollbarColor: "#30363d #161b22",
                    }}
                  >
                    {moveHistory.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-xs text-[#8b949e] p-4">
                        <div className="text-center">
                          <div className="mb-2">No moves played yet</div>
                          <div className="text-[10px] text-[#6e7681]">Make your first move to begin</div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3">
                        {/* Each move pair gets its own distinct element - ORIGINAL DESIGN */}
                        {groupedMoves.map((moveGroup) => (
                          <div
                            key={moveGroup.moveNumber}
                            className="mb-2 border border-[#21262d] rounded-md bg-[#0d1117] hover:bg-[#21262d] transition-colors"
                          >
                            {/* Move number row */}
                            <div className="px-3 py-1 border-b border-[#21262d] bg-[#161b22]">
                              <span className="text-xs font-medium text-[#8b949e]">Move {moveGroup.moveNumber}</span>
                            </div>

                            {/* White and Black moves side by side */}
                            <div className="grid grid-cols-2 divide-x divide-[#21262d]">
                              {/* White move */}
                              <div
                                className={`
                                  p-3 cursor-pointer transition-all duration-150
                                  ${
                                    selectedMoveIndex === moveGroup.whiteIndex
                                      ? "bg-[#1f6feb] text-white"
                                      : "text-[#e6edf3] hover:bg-[#30363d]"
                                  }
                                `}
                                onClick={() => handleMoveClick(moveGroup.whiteIndex)}
                                title={`White move ${moveGroup.whiteIndex + 1}: ${moveGroup.white?.san}`}
                              >
                                <div className="text-xs text-[#8b949e] mb-1">White</div>
                                <div className="text-sm font-medium">
                                  {moveGroup.moveNumber}. {moveGroup.white?.san || ""}
                                </div>
                              </div>

                              {/* Black move */}
                              <div
                                className={`
                                  p-3 transition-all duration-150
                                  ${
                                    moveGroup.black
                                      ? `cursor-pointer ${
                                          selectedMoveIndex === moveGroup.blackIndex
                                            ? "bg-[#1f6feb] text-white"
                                            : "text-[#e6edf3] hover:bg-[#30363d]"
                                        }`
                                      : "text-[#6e7681] cursor-default"
                                  }
                                `}
                                onClick={() => moveGroup.black && handleMoveClick(moveGroup.blackIndex)}
                                title={
                                  moveGroup.black
                                    ? `Black move ${moveGroup.blackIndex + 1}: ${moveGroup.black.san}`
                                    : "Waiting for black move"
                                }
                              >
                                <div className="text-xs text-[#8b949e] mb-1">Black</div>
                                <div className="text-sm font-medium">
                                  {moveGroup.black ? `${moveGroup.moveNumber}... ${moveGroup.black.san}` : "..."}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Analysis and settings section - ORIGINAL DESKTOP DESIGN */}
          <div className="hidden lg:block mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Analysis panel */}
              <div className="lg:col-span-2">
                <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base sm:text-lg text-[#e6edf3]">Engine Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border border-[#30363d] rounded-md bg-[#161b22] p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-[#c9d1d9] font-medium">Engine Evaluation</span>
                          <span className="text-xs text-[#58a6ff]">+0.32</span>
                        </div>
                        <div className="h-2 bg-[#0d1117] rounded-full overflow-hidden">
                          <div className="h-full bg-[#58a6ff] w-[53%]"></div>
                        </div>
                        <div className="flex justify-between text-xs text-[#8b949e] mt-1">
                          <span>Black</span>
                          <span>White</span>
                        </div>
                      </div>

                      <div className="border border-[#30363d] rounded-md bg-[#161b22] p-3">
                        <div className="text-xs text-[#c9d1d9] font-medium mb-2">Principal Variations</div>
                        <div className="space-y-3 text-xs">
                          {analysisVariations.map((variation, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex justify-between items-center">
                                <span
                                  className={variation.isMainLine ? "text-[#58a6ff] font-medium" : "text-[#c9d1d9]"}
                                >
                                  {variation.isMainLine ? "Main line:" : `Variation ${index}:`}
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className={variation.isMainLine ? "text-[#58a6ff]" : "text-[#8b949e]"}>
                                    {variation.evaluation}
                                  </span>
                                  <span className="text-[#8b949e] text-[10px]">depth {variation.depth}</span>
                                </div>
                              </div>
                              <div className="pl-2 border-l-2 border-[#30363d]">
                                <div className="flex flex-wrap gap-1">
                                  {variation.moves.map((move, moveIndex) => (
                                    <span
                                      key={moveIndex}
                                      className={`
                                        ${moveIndex === 0 ? "ml-0" : ""}
                                        ${moveIndex % 2 === 0 && moveIndex > 0 ? "ml-1" : ""}
                                        ${variation.isMainLine ? "text-[#58a6ff]" : "text-[#c9d1d9]"}
                                        hover:underline cursor-pointer
                                      `}
                                    >
                                      {moveIndex % 2 === 0 && moveIndex > 0
                                        ? `${Math.floor(moveIndex / 2) + 1}.`
                                        : moveIndex === 0
                                          ? "1."
                                          : ""}
                                      {move}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-[#30363d] rounded-md bg-[#161b22] p-3">
                          <div className="text-xs text-[#c9d1d9] font-medium mb-2">Engine Stats</div>
                          <div className="grid grid-cols-2 gap-2 text-xs text-[#8b949e]">
                            <div>Depth:</div>
                            <div className="text-right">24</div>
                            <div>Nodes:</div>
                            <div className="text-right">15.4M</div>
                            <div>NPS:</div>
                            <div className="text-right">2.3M</div>
                            <div>Time:</div>
                            <div className="text-right">6.7s</div>
                          </div>
                        </div>

                        <div className="border border-[#30363d] rounded-md bg-[#161b22] p-3">
                          <div className="text-xs text-[#c9d1d9] font-medium mb-2 text-center">Principal Line</div>
                          <div className="flex flex-col items-center">
                            <div className="w-[120px] h-[120px]">
                              <Chessboard
                                id="PVBoardDesktop"
                                position={pvGame.fen()}
                                customBoardStyle={{
                                  borderRadius: "4px",
                                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
                                }}
                                customDarkSquareStyle={{ backgroundColor: "#769656" }}
                                customLightSquareStyle={{ backgroundColor: "#eeeed2" }}
                                boardOrientation={boardOrientation}
                                arePiecesDraggable={false}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Settings panel */}
              <div className="lg:col-span-1">
                <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base sm:text-lg text-[#e6edf3]">Game Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="difficulty" className="text-[#e6edf3] mb-2 block">
                          Difficulty Level
                        </Label>
                        <Select>
                          <SelectTrigger className="border-[#30363d] bg-[#161b22] text-[#c9d1d9]">
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent className="border-[#30363d] bg-[#161b22] text-[#c9d1d9]">
                            <SelectItem value="beginner">Beginner (1200 ELO)</SelectItem>
                            <SelectItem value="intermediate">Intermediate (1800 ELO)</SelectItem>
                            <SelectItem value="advanced">Advanced (2400 ELO)</SelectItem>
                            <SelectItem value="master">Master (2800+ ELO)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="color" className="text-[#e6edf3] mb-2 block">
                          Play as
                        </Label>
                        <Select>
                          <SelectTrigger className="border-[#30363d] bg-[#161b22] text-[#c9d1d9]">
                            <SelectValue placeholder="Select color" />
                          </SelectTrigger>
                          <SelectContent className="border-[#30363d] bg-[#161b22] text-[#c9d1d9]">
                            <SelectItem value="white">White</SelectItem>
                            <SelectItem value="black">Black</SelectItem>
                            <SelectItem value="random">Random</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="time" className="text-[#e6edf3] mb-2 block">
                          Thinking Time (seconds)
                        </Label>
                        <Slider defaultValue={[5]} max={30} step={1} className="my-4" />
                        <div className="text-xs text-[#8b949e] flex justify-between">
                          <span>Faster</span>
                          <span>Stronger</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="hints" className="text-[#e6edf3]">
                          Show Hints
                        </Label>
                        <Switch id="hints" />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="analysis" className="text-[#e6edf3]">
                          Live Analysis
                        </Label>
                        <Switch id="analysis" />
                      </div>

                      <Button className="w-full gap-2 bg-[#238636] text-white hover:bg-[#2ea043] mt-4">
                        <Play className="h-4 w-4" />
                        Start New Game
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* About section - responsive */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
              <CardHeader className="px-3 sm:px-6">
                <CardTitle className="text-sm sm:text-base md:text-lg text-[#e6edf3]">
                  About WebAssembly Version
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <p className="text-xs sm:text-sm text-[#8b949e]">
                  This is a WebAssembly port of the Potential chess engine, allowing you to play against or analyze with
                  Potential directly in your browser without any installation. The WASM version maintains most of the
                  strength of the native version while being accessible on any device with a modern web browser.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
              <CardHeader className="px-3 sm:px-6">
                <CardTitle className="text-sm sm:text-base md:text-lg text-[#e6edf3]">Performance</CardTitle>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <p className="text-xs sm:text-sm text-[#8b949e] mb-4">
                  The WebAssembly version of Potential is approximately 80-90% as strong as the native version, with an
                  estimated rating of 2800+ ELO at maximum strength. Performance may vary based on your device and
                  browser.
                </p>
                <div className="flex items-center gap-4 text-xs text-[#8b949e]">
                  <div className="flex items-center gap-1">
                    <Award className="h-3 w-3 sm:h-4 sm:w-4 text-[#58a6ff]" />
                    <span>2800+ ELO</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-[#58a6ff]" />
                    <span>Fast Analysis</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

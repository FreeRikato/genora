"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Settings, CircleCheck } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { SettingsModal } from "@/components/settings-modal"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background relative overflow-hidden">
        {/* Background gradient elements */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 left-1/3 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>

        {isLoggedIn ? <EditorScreen setIsLoggedIn={setIsLoggedIn} /> : <AuthScreen setIsLoggedIn={setIsLoggedIn} />}
      </div>
  )
}

function AuthScreen({ setIsLoggedIn }: { setIsLoggedIn: (value: boolean) => void }) {

  return (
    <div className="container relative flex flex-col items-center justify-center min-h-screen px-4">
      <ThemeToggle />

      <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader className="space-y-2 items-center text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-2">
            <span className="text-2xl font-bold text-white">G</span>
          </div>
          <CardTitle className="text-2xl">Welcome to Genora</CardTitle>
          <CardDescription className="text-muted-foreground">
            Transform your images with AI-powered prompts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full flex items-center justify-center gap-2 bg-background hover:bg-background/80"
            variant="outline"
            onClick={() => setIsLoggedIn(true)}
          >
            <FcGoogle className="h-5 w-5" />
            <span>Continue with Google</span>
          </Button>
          <Button
            className="w-full flex items-center justify-center gap-2"
            variant="outline"
            onClick={() => setIsLoggedIn(true)}
          >
            <Github className="h-5 w-5" />
            <span>Continue with GitHub</span>
          </Button>
        </CardContent>
      </Card>

      <div className="absolute bottom-4 text-center text-sm text-muted-foreground">
        <a href="#" className="hover:text-primary transition-colors">
          Privacy Policy
        </a>
        <span className="mx-2">•</span>
        <a href="#" className="hover:text-primary transition-colors">
          Terms
        </a>
      </div>
    </div>
  )
}

function EditorScreen({ setIsLoggedIn }: { setIsLoggedIn: (value: boolean) => void }) {
  const [selectedVersion, setSelectedVersion] = useState(1)
  const [prompt, setPrompt] = useState("")
  const [imageCount, setImageCount] = useState(5)
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Settings Modal */}
      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} onSignOut={() => setIsLoggedIn(false)} />

      {/* Left sidebar */}
      <div className="w-20 md:w-64 border-r border-border/50 bg-card/30 backdrop-blur-sm flex flex-col">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <span className="text-sm font-bold text-white">G</span>
            </div>
            <span className="font-semibold hidden md:block">Genora</span>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSettingsOpen(true)}>
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          <p className="text-xs text-muted-foreground px-2 py-1 hidden md:block">History</p>
          {Array.from({ length: 8 }).map((_, i) => (
            <button
              key={i}
              className={`w-full aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                i + 1 === selectedVersion
                  ? "border-pink-500/70 shadow-[0_0_10px_rgba(236,72,153,0.3)]"
                  : "border-transparent"
              }`}
              onClick={() => setSelectedVersion(i + 1)}
            >
              <div className="w-full h-full bg-gradient-to-br from-purple-800/40 to-pink-700/40 flex items-center justify-center">
                <span className="text-xs text-white/70">v{i + 1}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-14 border-b border-border/50 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSettingsOpen(true)}>
              <Settings className="h-5 w-5" />
            </Button>
            <h2 className="font-medium">Editing: Version {selectedVersion}</h2>
          </div>
          <ThemeToggle />
        </div>

        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* Main editor area */}
          <div className="flex-1 flex flex-col p-4 overflow-hidden">
            <div className="flex-1 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden flex items-center justify-center mb-4">
              <div className="w-full max-w-2xl aspect-square bg-gradient-to-br from-purple-800/40 to-pink-700/40 flex items-center justify-center">
                <span className="text-muted-foreground">Preview Area</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <textarea
                  className="w-full h-24 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm p-3 resize-none focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                  placeholder="Describe how you want to transform this image..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Images:</span>
                  <select
                    className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-md text-sm p-1"
                    value={imageCount}
                    onChange={(e) => setImageCount(Number(e.target.value))}
                  >
                    {[5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
                <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700">
                  Generate Edits
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Undo
                  </Button>
                  <Button variant="outline" size="sm">
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="h-64 md:h-auto md:w-72 border-t md:border-t-0 md:border-l border-border/50 bg-card/30 backdrop-blur-sm overflow-y-auto p-4">
            <h3 className="font-medium mb-3">Generated Images</h3>
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: imageCount }).map((_, i) => (
                <div key={i} className="rounded-lg overflow-hidden border border-border/50 bg-card/50">
                  <div className="aspect-square bg-gradient-to-br from-purple-800/20 to-pink-700/20 flex items-center justify-center">
                    <span className="text-xs text-white/50">Image {i + 1}</span>
                  </div>
                  <div className="p-2 flex justify-between">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <CircleCheck className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                      </svg>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


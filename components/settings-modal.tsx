"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface SettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSignOut: () => void
}

export function SettingsModal({ open, onOpenChange, onSignOut }: SettingsModalProps) {
  const [apiKey, setApiKey] = useState("")
  const [customInstructions, setCustomInstructions] = useState("")

  const handleSave = () => {
    // Here you would save the settings to your backend or local storage
    console.log("Saving settings:", { apiKey, customInstructions })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card/90 backdrop-blur-sm border-border/50">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Configure your Genora experience and API settings.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input
              id="api-key"
              type="password"
              placeholder="Enter your API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-background/50"
            />
            <p className="text-xs text-muted-foreground">
              Your API key is stored securely and used for image generation.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="custom-instructions">Custom Instructions</Label>
            <Textarea
              id="custom-instructions"
              placeholder="Add custom instructions to personalize the model's behavior..."
              value={customInstructions}
              onChange={(e) => setCustomInstructions(e.target.value)}
              className="min-h-[100px] bg-background/50"
            />
            <p className="text-xs text-muted-foreground">These instructions will be applied to all your generations.</p>
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => onSignOut()} className="sm:mr-auto">
            Sign Out
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


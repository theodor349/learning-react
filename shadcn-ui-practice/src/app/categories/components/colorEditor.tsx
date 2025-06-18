"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

interface ColorEditorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialColor: string
  onSave: (color: string) => void
}

// Define color types
type ColorShade = {
  hex: string;
  name: string;
}

type ColorFamily = {
  name: string;
  shades: ColorShade[];
}

export function ColorEditor({
  open,
  onOpenChange,
  initialColor,
  onSave,
}: ColorEditorProps) {
  const [selectedColor, setSelectedColor] = React.useState(initialColor)
  const [selectedFamily, setSelectedFamily] = React.useState<ColorFamily | null>(null)

  // Predefined color palette with 9 primary colors and their shades
  const colorFamilies: ColorFamily[] = [
    {
      name: "Red",
      shades: [
        { hex: "#FF8C8C", name: "Light" },
        { hex: "#FF3B3B", name: "Normal" },
        { hex: "#D60000", name: "Dark" },
      ]
    },
    {
      name: "Orange",
      shades: [
        { hex: "#FFBF80", name: "Light" },
        { hex: "#FF8C00", name: "Normal" },
        { hex: "#FF4500", name: "Dark" },
      ]
    },
    {
      name: "Yellow",
      shades: [
        { hex: "#FFFACD", name: "Light" },
        { hex: "#FFD700", name: "Normal" },
        { hex: "#DAA520", name: "Dark" },
      ]
    },
    {
      name: "Green",
      shades: [
        { hex: "#8AFF8A", name: "Light" },
        { hex: "#32CD32", name: "Normal" },
        { hex: "#009900", name: "Dark" },
      ]
    },
    {
      name: "Teal",
      shades: [
        { hex: "#80CBC4", name: "Light" },
        { hex: "#00BFA5", name: "Normal" },
        { hex: "#00897B", name: "Dark" },
      ]
    },
    {
      name: "Blue",
      shades: [
        { hex: "#A3D9FF", name: "Light" },
        { hex: "#1E90FF", name: "Normal" },
        { hex: "#0000CC", name: "Dark" },
      ]
    },
    {
      name: "Purple",
      shades: [
        { hex: "#DDA0DD", name: "Light" },
        { hex: "#9932CC", name: "Normal" },
        { hex: "#6A0DAD", name: "Dark" },
      ]
    },
    {
      name: "Pink",
      shades: [
        { hex: "#FFB6C1", name: "Light" },
        { hex: "#FF69B4", name: "Normal" },
        { hex: "#C71585", name: "Dark" },
      ]
    },
    {
      name: "Grey",
      shades: [
        { hex: "#E0E0E0", name: "Light" },
        { hex: "#A9A9A9", name: "Normal" },
        { hex: "#595959", name: "Dark" },
      ]
    }
  ]

  React.useEffect(() => {
    setSelectedColor(initialColor)
    // Reset selected family when dialog opens/closes
    setSelectedFamily(null)
  }, [initialColor, open])

  const handleColorFamilySelect = (family: ColorFamily) => {
    setSelectedFamily(family)
  }

  const handleShadeSelect = (shade: ColorShade) => {
    setSelectedColor(shade.hex)
    onSave(selectedColor)
  }

  const handleBack = () => {
    setSelectedFamily(null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>
            {selectedFamily ? `Choose a ${selectedFamily.name} Shade` : "Choose a Color"}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {selectedFamily ? (
            // Show shades of the selected color family
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center gap-4">
                {selectedFamily.shades.map((shade) => (
                  <button
                    key={shade.hex}
                    type="button"
                    onClick={() => handleShadeSelect(shade)}
                    className={`
                      w-full h-24 rounded-md transition-all duration-200 flex flex-col items-center justify-center hover:scale-105 border border-primary/50
                    `}
                    style={{ 
                      backgroundColor: shade.hex,
                      color: isLightColor(shade.hex) ? '#000000' : '#FFFFFF'
                    }}
                    aria-label={`Select ${selectedFamily.name} ${shade.name}`}
                  >
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // Show primary colors
            <div className="grid grid-cols-3 gap-4">
              {colorFamilies.map((family) => (
                <button
                  key={family.name}
                  type="button"
                  onClick={() => handleColorFamilySelect(family)}
                  className={`
                      w-full h-24 rounded-md transition-all duration-200 flex flex-col items-center justify-center hover:scale-105 border border-primary/50
                    `}                  style={{ backgroundColor: family.shades[1].hex }}
                  aria-label={`Select ${family.name} colors`}
                >
                </button>
              ))}
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          {selectedFamily ?
            (<Button
              variant="outline"
              onClick={handleBack}
            >
              Back to Colors
            </Button>)
            :
            (<Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>)
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Helper function to determine if a color is light
function isLightColor(color: string): boolean {
  // Remove the leading # if it exists
  const hex = color.replace('#', '');

  // Parse the hex values
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Calculate the brightness (using the formula from W3C)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return true if the color is light, false if it's dark
  return brightness > 128;
}

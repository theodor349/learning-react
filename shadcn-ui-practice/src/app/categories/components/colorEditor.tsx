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
  baseHex: string;
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
      baseHex: "#FF0000",
      shades: [
        { hex: "#FFCCCB", name: "Light" },
        { hex: "#FF0000", name: "Normal" },
        { hex: "#B22222", name: "Dark" },
        { hex: "#8B0000", name: "Very Dark" }
      ]
    },
    {
      name: "Blue",
      baseHex: "#0000FF",
      shades: [
        { hex: "#ADD8E6", name: "Light" },
        { hex: "#0000FF", name: "Normal" },
        { hex: "#00008B", name: "Dark" },
        { hex: "#191970", name: "Very Dark" }
      ]
    },
    {
      name: "Green",
      baseHex: "#008000",
      shades: [
        { hex: "#90EE90", name: "Light" },
        { hex: "#008000", name: "Normal" },
        { hex: "#006400", name: "Dark" },
        { hex: "#004000", name: "Very Dark" }
      ]
    },
    {
      name: "Orange",
      baseHex: "#FFA500",
      shades: [
        { hex: "#FFD580", name: "Light" },
        { hex: "#FFA500", name: "Normal" },
        { hex: "#FF8C00", name: "Dark" },
        { hex: "#D2691E", name: "Very Dark" }
      ]
    },
    {
      name: "Purple",
      baseHex: "#800080",
      shades: [
        { hex: "#D8BFD8", name: "Light" },
        { hex: "#800080", name: "Normal" },
        { hex: "#4B0082", name: "Dark" },
        { hex: "#2E0854", name: "Very Dark" }
      ]
    },
    {
      name: "Yellow",
      baseHex: "#FFFF00",
      shades: [
        { hex: "#FFFACD", name: "Light" },
        { hex: "#FFFF00", name: "Normal" },
        { hex: "#FFD700", name: "Dark" },
        { hex: "#B8860B", name: "Very Dark" }
      ]
    },
    {
      name: "Pink",
      baseHex: "#FFC0CB",
      shades: [
        { hex: "#FFE4E1", name: "Light" },
        { hex: "#FFC0CB", name: "Normal" },
        { hex: "#FF69B4", name: "Dark" },
        { hex: "#C71585", name: "Very Dark" }
      ]
    },
    {
      name: "Brown",
      baseHex: "#A52A2A",
      shades: [
        { hex: "#DEB887", name: "Light" },
        { hex: "#A52A2A", name: "Normal" },
        { hex: "#8B4513", name: "Dark" },
        { hex: "#5C3317", name: "Very Dark" }
      ]
    },
    {
      name: "Grey",
      baseHex: "#808080",
      shades: [
        { hex: "#D3D3D3", name: "Light" },
        { hex: "#808080", name: "Normal" },
        { hex: "#696969", name: "Dark" },
        { hex: "#000000", name: "Black" }
      ]
    }
  ]

  React.useEffect(() => {
    setSelectedColor(initialColor)
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
              <div className="grid grid-cols-2 gap-4">
                {selectedFamily.shades.map((shade) => (
                  <button
                    key={shade.hex}
                    type="button"
                    onClick={() => handleShadeSelect(shade)}
                    className={`
                      w-full h-24 rounded-md transition-all duration-200 flex flex-col items-center justify-center hover:scale-105
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
                      w-full h-24 rounded-md transition-all duration-200 flex flex-col items-center justify-center hover:scale-105
                    `}                  style={{ backgroundColor: family.baseHex }}
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

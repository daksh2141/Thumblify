import type React from 'react';
import { CpuIcon, ImageIcon, PenToolIcon, SquareIcon,  SparkleIcon, ChevronDownIcon } from "lucide-react"
import type { ThumbnailStyle } from "../assets/assets"


const StyleSelector = ({value, onChange, isOpen , setIsOpen} : 
{value: ThumbnailStyle | null, onChange: (style: ThumbnailStyle) => void, isOpen: boolean, setIsOpen: (isOpen: boolean) => void}
) => {

    const styleDescriptions: Record<ThumbnailStyle, string> = {
        "Realistic": "A highly detailed and lifelike representation.",
        "Photorealistic": "An image that closely resembles a real photograph.",
        "Minimalist": "A clean and simple design with minimal elements.",
        "Illustrated": "Hand-drawn, artistic , creative.",
        "Tech/Futuristic": "Modern, Sleek, tech-inspired."
    }
    const styleIcons: Record<ThumbnailStyle, React.ReactNode> = {
        "Realistic": <SparkleIcon className="h-4 w-4"/>,
        "Photorealistic": <ImageIcon className="h-4 w-4"/>,
        "Minimalist": <SquareIcon className="h-4 w-4"/>,
        "Illustrated": <PenToolIcon className="h-4 w-4"/>,
        "Tech/Futuristic": <CpuIcon className="h-4 w-4"/>
    }
  return (
    <div className="relative space-y-3 dark">
        <label className="block text-sm font-medium text-zinc-200">Thumbnail Style</label>

        <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md border border-white/10 bg-zinc-800 px-4 py-2 text-left text-white focus:outline-none focus:ring-2 focus:ring-pink-600">
        
            <div className="space-y-1">
                <div className="flex items-center gap-2 font-medium ">
                    {styleIcons[value as ThumbnailStyle]}
                    <span>{value}</span>
                </div>
                <p className="text-xs text-zinc-400">{styleDescriptions[value as ThumbnailStyle]}</p>
            </div>
        <ChevronDownIcon className={["h-5 w-5 text-zinc-400 transition-transform", isOpen && "rotate-180"].join(" ")}/>
        </button>
      
        {isOpen && (
            <div className="absolute z-10 mt-1 w-full bg-zinc-800 dark:bg-zinc-700 border border-zinc-700 dark:border-zinc-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
                <ul className="py-1">
                    {Object.entries(styleIcons).map(([style, icon]) => (
                        <li key={style}>
                            <button
                                type="button"
                                onClick={() => {
                                    onChange(style as ThumbnailStyle);
                                    setIsOpen(false);
                                }}
                                className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-zinc-700 dark:hover:bg-zinc-600"
                            >
                                {icon}
                                <span>{style}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
  )
}

export default StyleSelector

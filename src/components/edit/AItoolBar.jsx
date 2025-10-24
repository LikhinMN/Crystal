"use client";
import { useState } from "react";
import { useFileAIStore } from "@/store/useFileAIStore";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
    Image as ImageIcon, 
    Wand2, 
    Palette, 
    Crop, 
    RefreshCw,
    Sparkles,
    Zap,
    ImageOff,
    Layers,
    CircleDashed
} from "lucide-react";

const aiTransformations = [
    {
        id: "removebg",
        name: "Remove Background",
        icon: <ImageOff className="h-5 w-5" />,
        param: "e-bgremove",
        description: "Remove the background from an image",
        variant: "outline"
    },
    {
        id: "enhance",
        name: "Enhance Image",
        icon: <Sparkles className="h-5 w-5" />,
        param: "e-enhance",
        description: "Automatically enhance image quality",
        variant: "outline"
    },
    {
        id: "grayscale",
        name: "Grayscale",
        icon: <Palette className="h-5 w-5" />,
        param: "e-grayscale",
        description: "Convert image to grayscale",
        variant: "outline"
    },
    {
        id: "upscale",
        name: "Upscale",
        icon: <Layers className="h-5 w-5" />,
        param: "e-upscale",
        description: "Increase image resolution",
        variant: "outline"
    },
    {
        id: "smartcrop",
        name: "Smart Crop",
        icon: <Crop className="h-5 w-5" />,
        param: "fo-auto",
        description: "Focus on the most important part",
        variant: "outline"
    },
    {
        id: "reset",
        name: "Reset",
        icon: <RefreshCw className="h-5 w-5" />,
        param: "",
        description: "Reset all transformations",
        variant: "destructive"
    },
];

export default function AIToolbar() {
    const [isLoading, setIsLoading] = useState(null);
    const uploadedFile = useFileAIStore((s) => s.uploadedFile);
    const isTransforming = useFileAIStore((s) => s.isTransforming);
    const setActiveTransformation = useFileAIStore((s) => s.setActiveTransformation);
    const setTransformedImageUrl = useFileAIStore((s) => s.setTransformedImageUrl);

    const handleClick = async (tool) => {
        if (!uploadedFile || isTransforming) return;
        
        setIsLoading(tool.id);
        
        try {
            setActiveTransformation(tool.param);
            setTransformedImageUrl(null);
        } catch (error) {
            console.error(`Error applying ${tool.name}:`, error);
        } finally {
            setTimeout(() => setIsLoading(null), 500);
        }
    };

    return (
        <div className="fixed left-6 top-1/2 transform -translate-y-1/2 bg-card border border-border shadow-lg rounded-xl p-2 z-50">
            <TooltipProvider>
                <div className="flex flex-col gap-2">
                    {aiTransformations.map((tool) => (
                        <Tooltip key={tool.id}>
                            <TooltipTrigger asChild>
                                <Button
                                    variant={tool.variant}
                                    size="icon"
                                    className={`w-10 h-10 ${
                                        isLoading === tool.id ? 'animate-pulse' : ''
                                    }`}
                                    onClick={() => handleClick(tool)}
                                    disabled={!uploadedFile || isTransforming}
                                >
                                    {isLoading === tool.id ? (
                                        <CircleDashed className="h-4 w-4 animate-spin" />
                                    ) : (
                                        tool.icon
                                    )}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="max-w-[200px]">
                                <div className="space-y-1">
                                    <p className="font-semibold">{tool.name}</p>
                                    <p className="text-xs text-muted-foreground">{tool.description}</p>
                                    {!uploadedFile && (
                                        <p className="text-xs text-yellow-500 mt-1">Upload an image first</p>
                                    )}
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </div>
            </TooltipProvider>
        </div>
    );
}

"use client";
import {Image} from "@imagekit/next";
import {useMemo} from "react";
import {useFileAIStore} from "@/store/useFileAIStore";
import {Card, CardContent} from "@/components/ui/card";
import {Image as ImageIcon, Loader2} from "lucide-react";

export default function ImageViewer() {
    const uploadedFile = useFileAIStore((s) => s.uploadedFile);
    const activeTransformation = useFileAIStore((s) => s.activeTransformation);
    const transformedImageUrl = useFileAIStore((s) => s.transformedImageUrl);
    const isTransforming = useFileAIStore((s) => s.isTransforming);

    const src = transformedImageUrl || uploadedFile?.url || null;

    const transformations = useMemo(() => {
        if (!activeTransformation) return [];
        return [{raw: activeTransformation}];
    }, [activeTransformation]);

    if (!uploadedFile) {
        return (<Card
                className=" dark w-full max-w-2xl mx-auto border-dashed border-2 border-border flex flex-col items-center justify-center">
                <CardContent className="text-center p-8">
                    <div
                        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#00C9A7]/10 mb-4">
                        <ImageIcon className="h-8 w-8 text-[#00C9A7]"/>
                    </div>
                    <h3 className="text-lg font-medium mb-2">No image selected</h3>
                    <p className="text-sm text-muted-foreground">
                        Upload an image to start editing
                    </p>
                </CardContent>
            </Card>);
    }

    return (<div
            className="relative w-full max-w-2xl mx-auto aspect-square rounded-lg overflow-hidden bg-card border border-border shadow-sm">
            {isTransforming && (<div className="absolute inset-0 z-20 bg-black/50 flex items-center justify-center">
                    <div className="text-white text-center p-6 rounded-lg bg-black/70">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-3 text-[#00C9A7]"/>
                        <p className="font-medium">Applying transformation...</p>
                        <p className="text-sm text-muted-foreground mt-1">This may take a few seconds</p>
                    </div>
                </div>)}

            {src ? (<Image
                    src={src}
                    alt="Preview"
                    width={800}
                    height={800}
                    transformation={transformations}
                    className="object-contain w-full h-full"
                    loading="lazy"
                />) : (
                <div className="h-full w-full bg-muted/30 flex flex-col items-center justify-center p-8 text-center">
                    <ImageIcon className="h-12 w-12 text-muted-foreground/40 mb-3"/>
                    <p className="text-muted-foreground">Preview unavailable</p>
                    <p className="text-sm text-muted-foreground mt-1">Try applying a different transformation</p>
                </div>)}

            {activeTransformation && !isTransforming && (<div
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full">
                    {activeTransformation.includes('bgremove') && 'Background Removed'}
                    {activeTransformation.includes('grayscale') && 'Grayscale Applied'}
                    {activeTransformation.includes('upscale') && 'Image Upscaled'}
                    {activeTransformation.includes('fo-auto') && 'Smart Crop Applied'}
                    {activeTransformation.includes('e-enhance') && 'Image Enhanced'}
                </div>)}
        </div>);
}

"use client";
import { useRef } from "react";
import { upload } from "@imagekit/next";
import AIToolbar from "./AItoolBar";
import ImageViewer from "./ImageViewer";
import { useFileAIStore } from "@/store/useFileAIStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ArrowUp, Image as ImageIcon, Zap } from "lucide-react";
import {Badge} from "@/components/ui/badge";

export default function ImageKitAITransformation() {
    const fileRef = useRef(null);
    const setUploadedFile = useFileAIStore((s) => s.setUploadedFile);
    const setProgress = useFileAIStore((s) => s.setProgress);
    const setIsUploading = useFileAIStore((s) => s.setIsUploading);
    const progress = useFileAIStore((s) => s.progress);
    const isUploading = useFileAIStore((s) => s.isUploading);

    const authenticator = async () => {
        const res = await fetch("/api/upload-auth");
        if (!res.ok) throw new Error("Authentication failed");
        return res.json();
    };

    const handleUpload = async () => {
        const file = fileRef.current?.files?.[0];
        if (!file) {
            alert("Please select an image file first");
            return;
        }

        setIsUploading(true);

        try {
            const auth = await authenticator();
            const resp = await upload({
                file,
                fileName: `img_${Date.now()}_${file.name}`,
                token: auth.token,
                signature: auth.signature,
                expire: auth.expire,
                publicKey: auth.publicKey,
                onProgress: (e) => {
                    const p = Math.round((e.loaded / e.total) * 100);
                    setProgress(p);
                },
            });

            setUploadedFile({
                url: resp.url,
                fileId: resp.fileId,
                name: resp.name || file.name,
                size: file.size,
                type: "image",
            });
        } catch (err) {
            console.error("Upload failed:", err);
            alert(`Upload failed: ${err.message || 'Unknown error'}`);
        } finally {
            setIsUploading(false);
            if (progress === 100) {
                setTimeout(() => setProgress(0), 1000);
            }
        }
    };

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="text-center mb-12">
                <Badge variant="outline" className="border-border mb-4">
                    <Zap className="w-3.5 h-3.5 mr-1.5" />
                    <span className="text-sm">Transform images with a single click</span>
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                    image editing made easy
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Upload an image and let our AI analyze its content in detail.
                </p>
            </div>
            <Card className="border-border overflow-hidden">

                <CardContent className="p-6">
                    <div className="mb-8">
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-8 text-center">
                            <div className="bg-[#00C9A7]/10 p-4 rounded-full mb-4">
                                <ImageIcon className="h-8 w-8 text-[#00C9A7]" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">Upload an image to get started</h3>
                            <p className="text-muted-foreground text-sm mb-6">
                                Supports JPG, PNG, WebP up to 10MB
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 items-center">
                                <div className="relative w-full max-w-xs">
                                    <Input 
                                        ref={fileRef} 
                                        type="file" 
                                        accept="image/*" 
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={handleUpload}
                                        disabled={isUploading}
                                    />
                                    <Button 
                                        variant="outline" 
                                        className="w-full"
                                        disabled={isUploading}
                                    >
                                        <ArrowUp className="mr-2 h-4 w-4" />
                                        Select Image
                                    </Button>
                                </div>
                                
                                {isUploading && (
                                    <div className="w-full max-w-xs space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Uploading...</span>
                                            <span>{progress}%</span>
                                        </div>
                                        <Progress value={progress} className="h-2" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <ImageViewer />
                    </div>
                </CardContent>
            </Card>

            <AIToolbar />
        </div>
    );
}

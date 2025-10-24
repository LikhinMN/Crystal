"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, Download, Wand2, Image as ImageIcon } from 'lucide-react';

export default function TextToImagePage() {
    const [prompt, setPrompt] = useState('');
    const [negativePrompt, setNegativePrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [generatedImage, setGeneratedImage] = useState(null);
    const [error, setError] = useState('');
    const [settings, setSettings] = useState({
        steps: 30,
        guidanceScale: 7.5,
    });

    const generateImage = async () => {
        if (!prompt.trim()) {
            setError('Please enter a prompt');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/generate-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: prompt,
                    negative_prompt: negativePrompt,
                    num_inference_steps: settings.steps,
                    guidance_scale: settings.guidanceScale,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setGeneratedImage(data.image);
            } else {
                setError(data.error || 'Failed to generate image');
            }
        } catch (err) {
            console.error('Error generating image:', err);
            setError('An error occurred while generating the image');
        } finally {
            setLoading(false);
        }
    };

    const downloadImage = () => {
        if (!generatedImage) return;
        
        const link = document.createElement('a');
        link.href = generatedImage;
        link.download = `generated-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="relative min-h-screen bg-background text-foreground dark">
            <div className="absolute inset-0 bg-gradient-to-b from-[#00C9A7]/10 via-background/50 to-background/95"></div>
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#00C9A7]/20 rounded-full filter blur-3xl -z-10"></div>
            <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#00A389]/20 rounded-full filter blur-3xl -z-10"></div>
            <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#00FFD1]/10 rounded-full filter blur-3xl -z-10"></div>

            <div className="container mx-auto px-4 z-10 py-24 max-w-5xl">
                <div className="text-center mb-12">
                    <Badge variant="outline" className="border-border mb-4">
                        <Wand2 className="w-3.5 h-3.5 mr-1.5" />
                        <span className="text-sm">Transform text into stunning visuals</span>
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                        Text to Image Generator
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Describe your vision and let AI bring it to life with stunning visuals.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Side - Controls */}
                    <div className="lg:col-span-1">
                        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Wand2 className="h-5 w-5 text-[#00C9A7]" />
                                    Generation Settings
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="prompt">Prompt</Label>
                                    <Textarea
                                        id="prompt"
                                        placeholder="A beautiful sunset over mountains, digital art"
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        className="min-h-[120px]"
                                        disabled={loading}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="negative-prompt">Negative Prompt (Optional)</Label>
                                    <Input
                                        id="negative-prompt"
                                        placeholder="blurry, low quality, distorted"
                                        value={negativePrompt}
                                        onChange={(e) => setNegativePrompt(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>

                                <div className="space-y-3 pt-2">
                                    <div className="flex justify-between items-center">
                                        <Label>Inference Steps: <span className="font-mono">{settings.steps}</span></Label>
                                        <span className="text-xs text-muted-foreground">Quality</span>
                                    </div>
                                    <Slider
                                        value={[settings.steps]}
                                        onValueChange={(value) => setSettings({ ...settings, steps: value[0] })}
                                        min={10}
                                        max={50}
                                        step={1}
                                        disabled={loading}
                                    />
                                    <p className="text-xs text-muted-foreground">Higher values = better quality but slower generation</p>
                                </div>

                                <div className="space-y-3 pt-2">
                                    <div className="flex justify-between items-center">
                                        <Label>Guidance Scale: <span className="font-mono">{settings.guidanceScale}</span></Label>
                                        <span className="text-xs text-muted-foreground">Creativity</span>
                                    </div>
                                    <Slider
                                        value={[settings.guidanceScale]}
                                        onValueChange={(value) => setSettings({ ...settings, guidanceScale: value[0] })}
                                        min={1}
                                        max={15}
                                        step={0.5}
                                        disabled={loading}
                                    />
                                    <p className="text-xs text-muted-foreground">Higher values = more aligned with prompt</p>
                                </div>

                                <Button 
                                    onClick={generateImage} 
                                    className="w-full mt-4 bg-[#00C9A7] hover:bg-[#00A389] text-white transition-colors"
                                    disabled={loading || !prompt.trim()}
                                    size="lg"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="mr-2 h-4 w-4" />
                                            Generate Image
                                        </>
                                    )}
                                </Button>

                                {error && (
                                    <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-md">
                                        {error}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Side - Preview */}
                    <div className="lg:col-span-2">
                        <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50">
                            <CardHeader className="border-b border-border/50">
                                <CardTitle className="flex items-center gap-2">
                                    <ImageIcon className="h-5 w-5 text-[#00C9A7]" />
                                    Generated Image
                                </CardTitle>
                                <CardDescription>
                                    {generatedImage 
                                        ? 'Your AI-generated masterpiece' 
                                        : 'Your creation will appear here'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="w-full aspect-square rounded-lg bg-muted/20 border border-dashed border-border/50 flex items-center justify-center">
                                    {loading ? (
                                        <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
                                            <Loader2 className="h-12 w-12 text-[#00C9A7] animate-spin" />
                                            <div>
                                                <p className="font-medium">Creating your image</p>
                                                <p className="text-sm text-muted-foreground">This may take a moment...</p>
                                            </div>
                                        </div>
                                    ) : generatedImage ? (
                                        <div className="relative w-full h-full group">
                                            <img 
                                                src={generatedImage} 
                                                alt="Generated from prompt" 
                                                className="w-full h-full object-contain rounded-lg"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                                <Button 
                                                    variant="default"
                                                    size="sm"
                                                    onClick={downloadImage}
                                                    className="ml-auto bg-[#00C9A7] hover:bg-[#00A389] text-white"
                                                >
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Download
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center p-8">
                                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#00C9A7]/10 mb-4">
                                                <ImageIcon className="h-8 w-8 text-[#00C9A7]" />
                                            </div>
                                            <h3 className="text-lg font-medium mb-2">No image generated yet</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Enter a prompt and click "Generate Image" to create something amazing!
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
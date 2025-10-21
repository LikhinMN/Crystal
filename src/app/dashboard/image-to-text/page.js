'use client';
import { useState, useRef, useEffect } from 'react';
import { Loader2, Upload, X, Image as ImageIcon, Zap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import mermaid from 'mermaid';
import 'highlight.js/styles/atom-one-dark.css';
export default function ImageAnalyzer() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [analysis, setAnalysis] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);
    const analysisRef = useRef(null);
    useEffect(() => {
        if (analysis && analysisRef.current) {
            analysisRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        // Initialize Mermaid for diagrams
        mermaid.init(undefined, document.querySelectorAll('.mermaid'));
    }, [analysis]);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            validateAndSetImage(file);
        }
    };

    const validateAndSetImage = (file) => {
        setError('');
        setAnalysis('');

        if (!file.type.startsWith('image/')) {
            setError('Please select a valid image file (JPEG, PNG, WebP)');
            return false;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError('Image is too large. Maximum size is 5MB.');
            return false;
        }

        setImage(file);

        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);

        return true;
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) validateAndSetImage(file);
    };

    const analyzeImage = async () => {
        if (!image) {
            setError('Please select an image first');
            return;
        }

        setLoading(true);
        setError('');
        setAnalysis('');

        try {
            const formData = new FormData();
            formData.append('image', image);

            const response = await fetch('/api/summarise', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log(data)

            if (!response.ok) throw new Error(data.error || 'Failed to analyze image');

            setAnalysis(data.markdown || data.analysis || '');
        } catch (err) {
            console.error('Analysis error:', err);
            setError(err.message || 'An error occurred while analyzing the image.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="relative min-h-screen bg-background text-foreground dark">
            <div className="absolute inset-0 bg-gradient-to-b from-[#00C9A7]/10 via-background/50 to-background/95 "></div>
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#00C9A7]/20 rounded-full filter blur-3xl "></div>
            <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#00A389]/20 rounded-full filter blur-3xl "></div>
            <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#00FFD1]/10 rounded-full filter blur-3xl "></div>

            <div className="container mx-auto px-4 z-10 py-24 max-w-4xl">
                <div className="text-center mb-12">
                    <Badge variant="outline" className="border-border mb-4">
                        <Zap className="w-3.5 h-3.5 mr-1.5" />
                        <span className="text-sm">Transform images into detailed insights</span>
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                        image analyzer
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Upload an image and let our AI analyze its content in detail.
                    </p>
                </div>

                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardHeader>
                        <CardTitle className="text-center">Upload Your Image</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div
                            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                                dragActive 
                                    ? 'border-[#00C9A7] bg-[#00C9A7]/5' 
                                    : 'border-border hover:border-[#00C9A7]/50'
                            }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                className="hidden"
                            />

                            {!preview ? (
                                <div className="space-y-3">
                                    <div className="flex justify-center">
                                        <Upload className="h-12 w-12 text-muted-foreground/50 mx-auto" />
                                    </div>
                                    <p className="text-lg font-medium">Drag & drop an image here</p>
                                    <p className="text-sm text-muted-foreground">or click to browse files (max 5MB)</p>
                                    <p className="text-xs text-muted-foreground/60 mt-1">Supports: JPG, PNG, WebP</p>
                                </div>
                            ) : (
                                <div className="relative">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            reset();
                                        }}
                                        className="absolute -top-3 -right-3 bg-card rounded-full p-1.5 shadow-lg hover:bg-accent transition-colors"
                                        aria-label="Remove image"
                                    >
                                        <X className="h-4 w-4 text-muted-foreground" />
                                    </button>
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="max-h-80 max-w-full mx-auto rounded-lg object-contain shadow-sm"
                                    />
                                </div>
                            )}
                        </div>

                        {error && (
                            <div className="mt-4 p-4 bg-destructive/10 border border-destructive/50 text-destructive-foreground rounded-lg">
                                <p>{error}</p>
                            </div>
                        )}

                        <div className="flex justify-center  mt-6">
                            <Button
                                onClick={analyzeImage}
                                disabled={!image || loading}
                                className="bg-[#00C9A7] hover:bg-[#00A389] text-white transition-colors w-full"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                                        Analyzing...
                                    </>
                                ) : (
                                    'Analyze Image'
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {analysis && (
                    <div ref={analysisRef} className="mt-12">
                        <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
                            <CardHeader className="bg-muted/10 border-b border-border/50">
                                <CardTitle className="flex items-center gap-2">
                                    <ImageIcon className="h-5 w-5 text-[#00C9A7]" />
                                    Analysis Results
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="prose prose-slate max-w-none p-6 dark:prose-invert prose-headings:font-semibold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base prose-p:text-foreground/90 prose-p:leading-relaxed">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeHighlight]}
                                        components={{
                                            h1: ({node, ...props}) => <h1 className="text-2xl font-semibold mt-8 mb-4 text-foreground" {...props} />,
                                            h2: ({node, ...props}) => <h2 className="text-xl font-semibold mt-8 mb-3 pb-2 border-b border-border/50 text-foreground" {...props} />,
                                            h3: ({node, ...props}) => <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground" {...props} />,
                                            p: ({node, ...props}) => <p className="text-foreground/90 leading-relaxed mb-4" {...props} />,
                                            code({node, inline, className, children, ...props}) {
                                                if (inline) {
                                                    return <code className="px-1.5 py-0.5 bg-muted rounded text-sm font-mono" {...props}>{children}</code>;
                                                }
                                                return (
                                                    <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto my-4 border border-border/50">
                                                        <code className={`${className} text-sm`} {...props}>
                                                            {children}
                                                        </code>
                                                    </pre>
                                                );
                                            },
                                            a({node, ...props}) {
                                                return <a className="text-[#00C9A7] hover:underline font-medium" target="_blank" rel="noopener noreferrer" {...props} />;
                                            },
                                            table({node, ...props}) {
                                                return (
                                                    <div className="overflow-x-auto my-4 border border-border/50 rounded-lg">
                                                        <table className="min-w-full divide-y divide-border" {...props} />
                                                    </div>
                                                );
                                            },
                                            th({node, ...props}) {
                                                return <th className="px-4 py-3 text-left text-sm font-medium bg-muted/50 text-foreground" {...props} />;
                                            },
                                            td({node, ...props}) {
                                                return <td className="px-4 py-3 text-sm border-t border-border/50 text-foreground/90" {...props} />;
                                            },
                                            blockquote({node, ...props}) {
                                                return <blockquote className="border-l-4 border-[#00C9A7] pl-4 py-2 my-4 text-foreground/80 italic bg-muted/30 rounded-r" {...props} />;
                                            },
                                            img({node, ...props}) {
                                                return <img className="my-4 rounded-lg border border-border/50 max-w-full h-auto" {...props} />;
                                            },
                                            ul({node, ...props}) {
                                                return <ul className="list-disc pl-6 my-4 space-y-1" {...props} />;
                                            },
                                            ol({node, ...props}) {
                                                return <ol className="list-decimal pl-6 my-4 space-y-1" {...props} />;
                                            },
                                            li({node, ...props}) {
                                                return <li className="my-1 pl-1" {...props} />;
                                            }
                                        }}
                                    >
                                        {analysis}
                                    </ReactMarkdown>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}

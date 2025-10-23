"use client";

import { useState } from "react";
import { extractTextFromImage } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileText, Loader2, Image as ImageIcon } from "lucide-react";

export default function ImageToText() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [extractedText, setExtractedText] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function handleFileChange(e) {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setExtractedText("");
            setError(null);
        }
    }

    async function handleExtractText() {
        if (!selectedFile) return;

        setLoading(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append("image", selectedFile);
            
            const text = await extractTextFromImage(formData);
            setExtractedText(text);
        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to extract text from image");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
            <h1 className="text-3xl font-bold flex items-center gap-2">
                <FileText className="text-green-400" /> Image → Text Extractor
            </h1>

            <div className="w-full max-w-2xl">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-600">
                    <label htmlFor="image-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed border-gray-500 rounded-lg hover:border-green-400 transition-colors">
                            <Upload className="w-12 h-12 text-gray-400" />
                            <p className="text-gray-400">Click to upload an image</p>
                            <Input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                    </label>

                    {previewUrl && (
                        <div className="mt-6">
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-full max-h-96 object-contain rounded-lg border border-gray-600"
                            />
                            <Button
                                onClick={handleExtractText}
                                disabled={loading}
                                className="w-full mt-4 bg-green-600 hover:bg-green-700 py-3 rounded-xl"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin mr-2" />
                                        Extracting Text...
                                    </>
                                ) : (
                                    <>
                                        <FileText className="mr-2" />
                                        Extract Text
                                    </>
                                )}
                            </Button>
                        </div>
                    )}
                </div>

                {error && (
                    <div className="mt-6 p-4 bg-red-900/50 border border-red-600 rounded-lg text-red-200">
                        {error}
                    </div>
                )}

                {extractedText && (
                    <div className="mt-6 bg-gray-800 rounded-xl p-6 border border-gray-600">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <FileText className="text-green-400" />
                            Extracted Text
                        </h2>
                        <div className="bg-gray-900 p-4 rounded-lg text-gray-200 whitespace-pre-wrap">
                            {extractedText}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

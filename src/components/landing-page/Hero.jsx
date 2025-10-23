"use client"
import {Card, CardContent} from "@/components/ui/card";
import React from "react";
import {Badge} from "@/components/ui/badge";
import {ArrowRight, Zap} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Hero () {
    return <section className = "relative pt-32 pb-24 px-6 overflow-hidden">
        <div className = "absolute inset-0 bg-gradient-to-b from-[#00C9A7]/10 via-background/50 to-background/95"></div>
        <div className = "absolute top-20 left-10 w-72 h-72 bg-[#00C9A7]/20 rounded-full filter blur-3xl"></div>
        <div className = "absolute bottom-0 right-10 w-96 h-96 bg-[#00A389]/20 rounded-full filter blur-3xl"></div>
        <div className = "absolute top-1/3 right-1/4 w-64 h-64 bg-[#00FFD1]/10 rounded-full filter blur-3xl"></div>

        <div className = "max-w-4xl mx-auto relative z-10">
            <div className = "text-center space-y-8">
                <Badge
                    variant = "outline"
                    className = "border-border">
                    <Zap className = "w-3.5 h-3.5 mr-1.5" />
                    <span className = "text-sm">Turn words into stunning visuals.</span>
                </Badge>

                <div className = "space-y-6">
                    <h1 className = "text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                        Transform Ideas Into Reality
                    </h1>

                    <p className = "text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        All-in-one AI platform for image generation, intelligent summarization, and creative
                        automation. Build faster, dream bigger.
                    </p>
                </div>

                <div className = "flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button
                        size = "lg"
                        className = "bg-[#00C9A7] hover:bg-[#00A389] text-white h-12 px-8">
                        <Link href = '/auth/signin'>
                            Get Started
                        </Link>
                        <ArrowRight className = "ml-2 w-4 h-4" />
                    </Button>

                </div>

                <div className = "pt-8">
                    <Card className = "border-border mt-12">
                        <CardContent className = "p-8">
                            {/*todo: add dashboard preview */}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </section>
}
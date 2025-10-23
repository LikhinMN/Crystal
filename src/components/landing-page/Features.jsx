"use client"
import React from "react";
import {features} from "@/constants";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export default function Features () {
    return <section
        id = "features"
        className = "py-24 px-6 bg-muted/30">
        <div className = "max-w-6xl mx-auto">
            <div className = "text-center mb-16 space-y-4">
                <h2 className = "text-3xl md:text-4xl lg:text-5xl font-bold">Powerful Features</h2>
                <p className = "text-lg text-muted-foreground max-w-2xl mx-auto">
                    Everything you need to supercharge your AI workflow
                </p>
            </div>

            <div className = "grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map(( feature, i ) => (<Card
                    key = {i}
                    className = "border-border">
                    <CardHeader className = "space-y-4">
                        <div className = "w-12 h-12 bg-[#00C9A7]/10 rounded-lg flex items-center justify-center">
                            <feature.icon className = "w-6 h-6" />
                        </div>
                        <CardTitle className = "text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className = "text-sm leading-relaxed">
                            {feature.desc}
                        </CardDescription>
                    </CardContent>
                </Card>))}
            </div>
        </div>
    </section>
}
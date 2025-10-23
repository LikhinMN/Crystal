"use client"
import React from "react";
import {Card,CardContent,} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
export default function CTA(  ){
    return <section className = "py-24 px-6">
        <div className = "max-w-4xl mx-auto">
            <Card className = "border-0 bg-[#00C9A7] text-white">
                <CardContent className = "text-center p-12 md:p-16 space-y-6">
                    <h2 className = "text-3xl md:text-4xl lg:text-5xl font-bold">
                        Ready to Transform Your Workflow?
                    </h2>
                    <p className = "text-lg text-white/90 max-w-2xl mx-auto">
                        Join thousands of creators and developers building the future with AI
                    </p>
                    <Button
                        size = "lg"
                        className = "bg-white text-[#00A389] hover:bg-gray-100 h-12 px-8 mt-4">
                        <Link href='/auth/signin'>
                            Start Free Today
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    </section>
}
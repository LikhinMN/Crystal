"use client"
import React from "react";
import {steps} from "@/constants";
export default function HowItWorks(  ){
    return <section className = "py-24 px-6">
        <div className = "max-w-5xl mx-auto">
            <div className = "text-center mb-16 space-y-4">
                <h2 className = "text-3xl md:text-4xl lg:text-5xl font-bold">How It Works</h2>
                <p className = "text-lg text-muted-foreground">
                    Get started with simple steps
                </p>
            </div>

            <div className = "flex justify-center">
                <div className = "grid md:grid-cols-3 gap-10 md:gap-8 max-w-6xl w-full px-4 md:px-0">
                    {steps.map(( step, i ) => (<div
                        key = {i}
                        className = "flex flex-col items-center text-center space-y-5">
                        <div className = "flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-full">
                            <span className = "text-xl md:text-2xl font-semibold text-primary">{step.num}</span>
                        </div>
                        <div className = "space-y-2">
                            <h3 className = "text-lg md:text-xl font-semibold text-foreground">{step.title}</h3>
                            <p className = "text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                                {step.desc}
                            </p>
                        </div>
                    </div>))}
                </div>
            </div>
        </div>
    </section>
}
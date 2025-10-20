"use client"
import React, {useEffect, useState} from 'react';
import {ArrowRight, Menu, X, Zap} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion";
import {faqs, features, steps} from "@/constants";
import Link from 'next/link'

export default function LandingPage () {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (<div className = "dark bg-background text-foreground min-h-screen">
        <nav className = {`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-md border-b' : 'bg-transparent'}`}>
            <div className = "max-w-6xl mx-auto px-6 lg:px-8">
                <div className = "flex justify-between items-center h-20">
                    <div className = "flex items-center gap-3">
                        <span className = "text-xl font-bold">Crystal</span>
                    </div>

                    <div className = "hidden md:flex items-center gap-8">
                        <Link
                            href = "#features"
                            className = "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Features
                        </Link>
                        <Link
                            href = "#faq"
                            className = "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            FAQ
                        </Link>
                        <Button className = "bg-[#00C9A7] hover:bg-[#00A389] text-white">
                            <Link href = '/auth/signin'>
                                Get Started
                            </Link>
                        </Button>
                    </div>

                    <Button
                        variant = "ghost"
                        size = "icon"
                        className = "md:hidden"
                        onClick = {() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className = "w-5 h-5" /> : <Menu className = "w-5 h-5" />}
                    </Button>
                </div>
            </div>

            {mobileMenuOpen && (<div className = "md:hidden bg-card/95 backdrop-blur-lg border-t">
                <div className = "px-6 py-6 space-y-4">
                    <Link
                        href = "#features"
                        className = "block py-2 text-muted-foreground hover:text-foreground transition-colors"
                        onClick = {() => setMobileMenuOpen(false)}
                    >
                        Features
                    </Link>
                    <Link
                        href = "#faq"
                        className = "block py-2 text-muted-foreground hover:text-foreground transition-colors"
                        onClick = {() => setMobileMenuOpen(false)}
                    >
                        FAQ
                    </Link>
                    <Button
                        className = "w-full bg-[#00C9A7] hover:bg-[#00A389] text-white"
                        onClick = {() => setMobileMenuOpen(false)}
                    >
                        Get Started
                    </Button>
                </div>
            </div>)}
        </nav>
        <section className = "relative pt-32 pb-24 px-6 overflow-hidden">
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

        <section
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

        <section className = "py-24 px-6">
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

        <section
            id = "faq"
            className = "py-24 px-6 bg-muted/30">
            <div className = "max-w-3xl mx-auto">
                <div className = "text-center mb-16 space-y-4">
                    <h2 className = "text-3xl md:text-4xl lg:text-5xl font-bold">Frequently Asked Questions</h2>
                </div>

                <Accordion
                    type = "single"
                    collapsible
                    className = "space-y-4">
                    {faqs.map(( faq, i ) => (<AccordionItem
                        key = {i}
                        value = {`item-${i}`}
                        className = "border border-border rounded-lg px-6">
                        <AccordionTrigger className = "text-base font-semibold hover:no-underline py-5">
                            {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className = "text-sm text-muted-foreground pb-5 leading-relaxed">
                            {faq.a}
                        </AccordionContent>
                    </AccordionItem>))}
                </Accordion>
            </div>
        </section>
        <section className = "py-24 px-6">
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

        <footer className = "border-t py-8 px-6">
            <div className = "max-w-2xl mx-auto text-center">
                <p className = "text-sm text-muted-foreground">
                    © 2025 Crystal. All rights reserved.
                </p>
            </div>
        </footer>
    </div>);
}
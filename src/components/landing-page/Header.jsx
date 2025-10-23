"use client"
import {Button} from "@/components/ui/button";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {Menu, X} from "lucide-react";

export default function Header () {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
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
        </nav>);
}
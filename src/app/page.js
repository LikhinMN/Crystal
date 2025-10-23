import Header from '@/components/landing-page/Header'
import Hero from "@/components/landing-page/Hero";
import Features from "@/components/landing-page/Features";
import HowItWorks from "@/components/landing-page/HowItWorks";
import FAQ from "@/components/landing-page/FAQ";
import CTA from "@/components/landing-page/CTA";
import Footer from "@/components/landing-page/Footer";

export default function LandingPage () {
    return (<div className = "dark bg-background text-foreground min-h-screen">
        <Header />
        <Hero />
        <Features />
        <HowItWorks />
        <FAQ />
        <CTA />
        <Footer />
    </div>);
}
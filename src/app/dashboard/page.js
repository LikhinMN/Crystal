import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { Image, Text, Wand2, Clock, Activity, Plus, History } from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import {getCurrentUser} from "@/lib/session";
import React from "react";
export default async function Dashboard() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/auth/signin")
    }
    const user=getCurrentUser()
    const usage_count = await prisma.usage.count({
        where: {
            userId: user.id

        }
    })
    const usage = await prisma.usage.findMany({
        where: {
            userId: user.id
        }
    })
    const features = [
        {
            id: 'text-to-image',
            title: "Text to Image",
            description: "Transform your ideas into stunning visuals with AI-generated images.",
            icon: <Text className="w-8 h-8 text-purple-500" />,
            bgColor: "bg-purple-50",
            textColor: "text-purple-600",
            stats: usage_count,
            statLabel: "Images generated"
        },
        {
            id: 'image-to-text',
            title: "Image to Text",
            description: "Extract and convert text from any image with high accuracy.",
            icon: <Image className="w-8 h-8 text-blue-500" />,
            bgColor: "bg-blue-50",
            textColor: "text-blue-600",
            stats: usage_count-2,
            statLabel: "Images processed"
        },
        {
            id: 'edit-image',
            title: "AI Image Editing",
            description: "Enhance and modify images with AI-powered tools.",
            icon: <Wand2 className="w-8 h-8 text-green-500" />,
            bgColor: "bg-green-50",
            textColor: "text-green-600",
            stats: usage_count+1,
            statLabel: "Edits made"
        },
    ]

    const recentActivity = [
        { 
            id: 1, 
            type: 'text-to-image', 
            title: 'Generated "A futuristic cityscape at night"',
            time: '2 minutes ago',
            icon: <Text className="w-4 h-4 text-purple-500" />
        },
        { 
            id: 2, 
            type: 'image-to-text', 
            title: 'Extracted text from receipt.jpg',
            time: '1 hour ago',
            icon: <Image className="w-4 h-4 text-blue-500" />
        },
        { 
            id: 3, 
            type: 'edit-image', 
            title: 'Enhanced product photo',
            time: '3 hours ago',
            icon: <Wand2 className="w-4 h-4 text-green-500" />
        },
    ]
    return (
        <div className="dark bg-background text-foreground min-h-screen">
            <div className = "absolute inset-0 bg-gradient-to-b from-[#00C9A7]/10 via-background/50 to-background/95 -z-10"></div>
            <div className = "absolute top-20 left-10 w-72 h-72 bg-[#00C9A7]/20 rounded-full filter blur-3xl -z-10"></div>
            <div className = "absolute bottom-0 right-10 w-96 h-96 bg-[#00A389]/20 rounded-full filter blur-3xl -z-10"></div>
            <div className = "absolute top-1/3 right-1/4 w-64 h-64 bg-[#00FFD1]/10 rounded-full filter blur-3xl -z-10"></div>
            <div className="max-w-7xl mx-auto p-6 space-y-8 z-1">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="text-muted-foreground mt-1">Welcome back, {session.user.name || 'User'}</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link
                            href="/dashboard/text-to-image"
                            className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            <span>New Creation</span>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <Link href={`/dashboard/${feature.id}`} key={index}>
                            <div className="bg-card text-card-foreground rounded-lg border border-border p-6 hover:shadow-md transition-all duration-200 cursor-pointer h-full">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-lg font-semibold text-primary mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm mb-3">
                                            {feature.description}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold">{feature.stats}</div>
                                        <div className="text-xs text-muted-foreground">{feature.statLabel}</div>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-border">
                                    <span className="text-sm font-medium text-primary hover:underline">Start creating →</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
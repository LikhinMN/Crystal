import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { Image, Text, Wand2, Clock, Activity, BarChart, Plus, History } from "lucide-react"
import Link from "next/link"
export default async function Dashboard() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/auth/signin")
    }

    const features = [
        {
            id: 'text-to-image',
            title: "Text to Image",
            description: "Transform your ideas into stunning visuals with AI-generated images.",
            icon: <Text className="w-8 h-8 text-purple-500" />,
            bgColor: "bg-purple-50",
            textColor: "text-purple-600",
            stats: "1.2K+",
            statLabel: "Images generated"
        },
        {
            id: 'image-to-text',
            title: "Image to Text",
            description: "Extract and convert text from any image with high accuracy.",
            icon: <Image className="w-8 h-8 text-blue-500" />,
            bgColor: "bg-blue-50",
            textColor: "text-blue-600",
            stats: "850+",
            statLabel: "Images processed"
        },
        {
            id: 'edit-image',
            title: "AI Image Editing",
            description: "Enhance and modify images with AI-powered tools.",
            icon: <Wand2 className="w-8 h-8 text-green-500" />,
            bgColor: "bg-green-50",
            textColor: "text-green-600",
            stats: "620+",
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
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-gray-500 mt-1">Welcome back, {session.user.name || 'User'}</p>
                    </div>
                    <div className="flex space-x-3
                    ">
                        <Link href="/dashboard/text-to-image" className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                            <Plus className="w-4 h-4" />
                            <span>New Creation</span>
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <Link href={`/dashboard/${feature.id}`} key={index}>
                            <div className={`${feature.bgColor} rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer h-full`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                                            {feature.icon}
                                        </div>
                                        <h3 className={`text-lg font-semibold ${feature.textColor} mb-2`}>
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-3">
                                            {feature.description}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-gray-900">{feature.stats}</div>
                                        <div className="text-xs text-gray-500">{feature.statLabel}</div>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-white/20">
                                    <span className="text-sm font-medium text-gray-700 hover:underline">Start creating →</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Activity */}
                    <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                <Activity className="w-5 h-5 mr-2 text-gray-500" />
                                Recent Activity
                            </h2>
                            <Link href="/dashboard/activity" className="text-sm text-blue-600 hover:underline">View all</Link>
                        </div>
                        <div className="space-y-4">
                            {recentActivity.map((activity) => (
                                <div key={activity.id} className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                    <div className="p-2 rounded-lg bg-gray-50 mr-3">
                                        {activity.icon}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                                        <div className="flex items-center text-xs text-gray-500 mt-1">
                                            <Clock className="w-3 h-3 mr-1" />
                                            {activity.time}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link href="/dashboard/text-to-image" className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                                <Plus className="w-4 h-4 mr-2 text-purple-500" />
                                <span>New Text to Image</span>
                            </Link>
                            <Link href="/dashboard/image-to-text" className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                                <Image className="w-4 h-4 mr-2 text-blue-500" />
                                <span>Extract Text from Image</span>
                            </Link>
                            <Link href="/dashboard/edit-image" className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                                <Wand2 className="w-4 h-4 mr-2 text-green-500" />
                                <span>Edit Image with AI</span>
                            </Link>
                            <Link href="/dashboard/history" className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                                <History className="w-4 h-4 mr-2 text-gray-500" />
                                <span>View History</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
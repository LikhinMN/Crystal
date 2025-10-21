import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { Image, Text, Wand2, BrainCircuit } from "lucide-react"
export default async function Dashboard() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/auth/signin")
    }

    const features = [
        {
            title: "Image to Text",
            description: "Extract text from images with high accuracy using AI-powered OCR technology.",
            icon: <Image className="w-8 h-8 text-blue-500" />,
            bgColor: "bg-blue-50",
            textColor: "text-blue-600"
        },
        {
            title: "Text to Image",
            description: "Generate stunning images from text descriptions with our advanced AI models.",
            icon: <Text className="w-8 h-8 text-purple-500" />,
            bgColor: "bg-purple-50",
            textColor: "text-purple-600"
        },
        {
            title: "AI Image Editing",
            description: "Enhance, modify, and transform your images with AI-powered editing tools.",
            icon: <Wand2 className="w-8 h-8 text-green-500" />,
            bgColor: "bg-green-50",
            textColor: "text-green-600"
        },
        {
            title: "Real-time Intelligence",
            description: "Get instant insights and analytics with our real-time processing engine.",
            icon: <BrainCircuit className="w-8 h-8 text-orange-500" />,
            bgColor: "bg-orange-50",
            textColor: "text-orange-600"
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`${feature.bgColor} rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer`}
                        >
                            <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                                {feature.icon}
                            </div>
                            <h3 className={`text-lg font-semibold ${feature.textColor} mb-2`}>
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-sm">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
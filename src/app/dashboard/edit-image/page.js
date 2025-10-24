// app/page.jsx
import ImageKitAITransformation from "@/components/edit/ImageKitAITransformation";
import React from "react";

export default function Page() {

    return <div className="dark bg-background text-foreground">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00C9A7]/10 via-background/50 to-background/95"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00C9A7]/20 rounded-full filter blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#00A389]/20 rounded-full filter blur-3xl -z-10"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#00FFD1]/10 rounded-full filter blur-3xl -z-10"></div>
        <ImageKitAITransformation />;
    </div>
}

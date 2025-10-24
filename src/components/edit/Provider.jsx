"use client";
import {ImageKitProvider} from "@imagekit/next";

export default function Providers({children}) {
    const authenticator = async () => {
        try {
            const res = await fetch("/api/upload-auth");
            if (!res.ok) {
                throw new Error('Failed to authenticate with ImageKit');
            }
            return await res.json();
        } catch (error) {
            console.error('Authentication error:', error);
            throw error;
        }
    };

    return (<div className="bg-background text-foreground dark">
        <ImageKitProvider
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
            publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}
            authenticator={authenticator}
        >
            {children}
        </ImageKitProvider>
    </div>);
}

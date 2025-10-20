"use client"

import { signIn } from "next-auth/react"
import { useSearchParams, useRouter } from "next/navigation"
import React, { useState } from "react"

export default function SignIn() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
    const error = searchParams.get("error")

    const [isLoading, setIsLoading] = useState(false)
    const [signInError, setSignInError] = useState(error || null)

    const handleSignIn = async () => {
        try {
            setIsLoading(true)
            setSignInError(null)

            const result = await signIn("google", {
                callbackUrl: callbackUrl,
                redirect: false,
            })

            if (result?.error) {
                setSignInError(result.error)
                setIsLoading(false)
            } else if (result?.ok) {
                router.push(callbackUrl)
            }
        } catch (error) {
            console.error("Sign in error:", error)
            setSignInError("An unexpected error occurred. Please try again.")
            setIsLoading(false)
        }
    }

    return (
        <section className="flex min-h-screen items-center justify-center bg-background dark p-4">
            <div className="absolute inset-0 bg-gradient-to-b from-[#00C9A7]/10 via-background/50 to-background/95"></div>
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#00C9A7]/20 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#00A389]/20 rounded-full filter blur-3xl"></div>
            <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#00FFD1]/10 rounded-full filter blur-3xl"></div>

            <div className="w-full max-w-md space-y-8 rounded-lg bg-primary/10 p-8 shadow-lg dark z-10">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-primary">
                        Welcome <span className="text-[#00A389]">Crystal</span>
                    </h1>
                    <p className="mt-2 text-gray-300">Sign in to your google account</p>
                </div>

                {signInError && (
                    <div className="rounded-lg bg-red-500/10 border border-red-500/50 p-4">
                        <p className="text-sm text-red-400 text-center">
                            {signInError === "OAuthSignin" && "Error connecting to Google. Please try again."}
                            {signInError === "OAuthCallback" && "Error during sign in. Please try again."}
                            {signInError === "Callback" && "Error during callback. Please try again."}
                            {signInError === "AccessDenied" && "Access was denied. Please try again."}
                            {!["OAuthSignin", "OAuthCallback", "Callback", "AccessDenied"].includes(signInError) && signInError}
                        </p>
                    </div>
                )}

                <div className="mt-8">
                    <button
                        onClick={handleSignIn}
                        disabled={isLoading}
                        className="flex w-full items-center justify-center gap-3 rounded-lg px-4 py-3 text-primary shadow transition border border-primary hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Signing in...</span>
                            </>
                        ) : (
                            <>
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                <span>Sign in with Google</span>
                            </>
                        )}
                    </button>
                </div>

                <p className="text-xs text-gray-400 text-center mt-4">
                    By signing in, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </section>
    )
}
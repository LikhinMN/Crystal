import {getUploadAuthParams} from "@imagekit/next/server";

export async function GET() {
    // Here you can verify if the user is authenticated (JWT, session, etc.)
    const {token, expire, signature} = getUploadAuthParams({
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY, publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    });

    return Response.json({
        token, expire, signature, publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    });
}

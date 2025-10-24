import { NextResponse } from 'next/server';
import { getUploadAuthParams } from '@imagekit/next/server';
export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');
        const fileName = formData.get('fileName');

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // Get auth params first
        const { token, expire, signature } = getUploadAuthParams({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
            publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
        });
        if (!authResponse.ok) {
            throw new Error('Failed to get upload auth');
        }
        const authData = await authResponse.json();

        // Prepare form data for ImageKit
        const imageKitFormData = new FormData();
        imageKitFormData.append('file', file, fileName || file.name);
        imageKitFormData.append('fileName', fileName || file.name);
        imageKitFormData.append('publicKey', authData.publicKey);
        imageKitFormData.append('signature', authData.signature);
        imageKitFormData.append('expire', authData.expire);
        imageKitFormData.append('token', authData.token);

        const uploadUrl = `${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}/api/v1/files/upload`;
        const uploadResponse = await fetch(uploadUrl, {
            method: 'POST',
            body: imageKitFormData,
            // Don't set content-type header, let the browser set it with boundary
        });

        if (!uploadResponse.ok) {
            const errorText = await uploadResponse.text();
            console.error('ImageKit upload error:', errorText);
            return NextResponse.json(
                { error: 'Upload to ImageKit failed', details: errorText },
                { status: uploadResponse.status }
            );
        }

        const result = await uploadResponse.json();
        return NextResponse.json(result);

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Upload failed', details: error.message },
            { status: 500 }
        );
    }
}
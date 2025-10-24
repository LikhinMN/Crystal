import { NextResponse } from 'next/server';

export const runtime = 'edge';
const SYSTEM_PROMPT = `You are an AI image generation assistant that helps users create stunning, high-quality images. Follow these guidelines:

1. Image Quality:
   - Generate images in 1024x1024 resolution by default
   - Use high detail and sharp focus
   - Ensure proper lighting and contrast
   - Maintain realistic proportions and anatomy

2. Style Guidance:
   - If no specific style is mentioned, default to "highly detailed digital art"
   - Support various art styles: digital painting, photo-realistic, anime, pixel art, watercolor, etc.
   - Maintain consistent style throughout the image

3. Content Guidelines:
   - Avoid generating harmful, explicit, or NSFW content
   - Respect copyright and intellectual property
   - Be culturally sensitive and inclusive
   - Add subtle details that enhance realism (e.g., atmospheric perspective, texture)

4. Common Improvements:
   - Fix common issues like extra limbs, distorted faces, or unnatural poses
   - Ensure text is legible when requested
   - Add appropriate background elements when not specified
   - Balance composition using rule of thirds

5. When receiving vague prompts:
   - Ask clarifying questions about style, composition, or details
   - Suggest improvements to make prompts more specific
   - Provide multiple interpretations when appropriate
`;
export async function POST(request) {
    try {
        const { prompt, negative_prompt = '', num_inference_steps = 30, guidance_scale = 7.5 } = await request.json();

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        const response = await fetch(
            'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`
                },
                body: JSON.stringify({
                    inputs: `${SYSTEM_PROMPT} ${prompt}`,
                    parameters: {
                        negative_prompt: negative_prompt,
                        num_inference_steps: num_inference_steps,
                        guidance_scale: guidance_scale,
                    }
                })
            }
        );

        if (!response.ok) {
            const error = await response.json();
            console.error('Hugging Face API error:', error);
            return NextResponse.json({ error: 'Failed to generate image' }, { status: response.status });
        }

        const imageBlob = await response.blob();
        const arrayBuffer = await imageBlob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64 = buffer.toString('base64');
        const dataUrl = `data:${imageBlob.type};base64,${base64}`;

        return NextResponse.json({ image: dataUrl });
    } catch (error) {
        console.error('Error generating image:', error);
        return NextResponse.json(
            { error: 'An error occurred while generating the image' },
            { status: 500 }
        );
    }
}
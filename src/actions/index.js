"use server"
export default async function handler(req, res) {
    const { prompt } = req.body;

    try {
        const response = await fetch('https://api-inference.huggingface.co/models/Qwen/Qwen-Image', {
            method: 'POST',
            headers: {
                Authorization: `Bearer YOUR_HUGGINGFACE_API_KEY`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inputs: prompt }),
        });

        const blob = await response.blob();
        const buffer = await blob.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');

        res.status(200).json({ image: base64 });
    } catch (error) {
        res.status(500).json({ error: 'Image generation failed' });
    }
}
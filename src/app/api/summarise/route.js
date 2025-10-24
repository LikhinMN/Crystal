import { GoogleGenerativeAI } from '@google/generative-ai';
import {getCurrentUser} from "@/lib/session";
import {prisma} from "@/lib/prisma";

export async function POST(request) {
    try {
        const formData = await request.formData();
        const user = await getCurrentUser();
        const image = formData.get('image');

        if (!image) return Response.json({ error: 'No image provided' }, { status: 400 });

        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const bytes = await image.arrayBuffer();
        const base64Image = Buffer.from(bytes).toString('base64');

        const imagePart = { inlineData: { data: base64Image, mimeType: image.type } };

        const prompt = `
You are an advanced AI assistant specialized in analyzing and summarizing visual content. 
Your task is to process the provided image and generate a **complete Markdown document**.

## Output Requirements
- Must be in **valid Markdown only**.
- Use headings (#, ##, ###) for sections.
- Use bullet points (-) for lists.
- Bold important terms using **.
- Include the following sections:
  1. [Image Type]: Brief description
  2. [Summary]: Detailed summary
  3. [Key Points]: Bullet points of major insights
  4. [Additional Context]: Any observations or notes
- If the image is a diagram, optionally include a Mermaid diagram code block.

Analyze the image carefully and return the Markdown document only, without extra explanations.
`;

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const markdown = await response.text();
        const usage = await prisma.usage.create({
            data: {
                filename:Date.now() + '.png',
                user: { connect: { id: user.id } },
            },
        });

        return Response.json({ success: true, markdown });

    } catch (err) {
        return Response.json({ error: err.message || 'An error occurred while processing the image' }, { status: 500 });
    }
}

export const config = {
    api: { bodyParser: false, responseLimit: '5mb' },
};

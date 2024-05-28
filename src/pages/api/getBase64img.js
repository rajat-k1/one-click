// import fs from 'fs';
// import path from 'path';
import fetch from 'node-fetch';
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '50mb' // Set desired value here
        },
        responseLimit: '10mb'
    }
}


export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const data = JSON.parse(req.body);
    const imageUrl = 'http://localhost:3000' + data.url;
    if (!imageUrl) {
        return res.status(400).json({ message: `Bad Request: Image URL is required ${data}` });
    }

    try {
        // Fetch the image from the URL
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch the image');
        }

        // Read the response as a buffer
        const imageBuffer = await response.buffer();

        // Convert the image buffer to a Base64 string
        const base64Image = imageBuffer.toString('base64');

        // Create the Base64 data URL
        // const base64DataUrl = `data:${mimeType};base64,${base64Image}`;

        // Return the Base64 data URL
        return res.status(200).json({ base64img: base64Image });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Internal Server Error ${error}` });
    }
}

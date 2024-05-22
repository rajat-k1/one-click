// pages/api/upload.js

import { BlobServiceClient } from '@azure/storage-blob';
import {v4 as uuidv4} from 'uuid';

let uuid = uuidv4();
let blobName;
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '50mb' // Set desired value here
        }
    }
}

export default async function handler(req, res) {

    if (req.method !== 'POST') {

    return res.status(405).end();

    }




    // Get your connection string from env variables or other secure sources

    const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;




    // Create the BlobServiceClient object which will be used to create a container client

    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);




    // Get a reference to a container

    const containerName = 'user-uploads';

    const containerClient = blobServiceClient.getContainerClient(containerName);

    const { fileType, base64String } = JSON.parse(req.body);


    const fileExtension = fileType.split('/')[1];       
    // Create a blob (file) name
    blobName = `${Date.now()}.${fileExtension}`;

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);



    // Upload data to the blob
    // const imageBuffer = Buffer.from(req.body, 'base64');
    const fileBuffer = Buffer.from(base64String, 'base64');
    const data = req.body; // Assuming you're sending the data as a buffer or string

    const uploadBlobResponse = await blockBlobClient.uploadData(fileBuffer, { blobHTTPHeaders: { blobContentType: fileType } });

    // res.status(200).send(`Upload block blob ${blobName} successfully: ${uploadBlobResponse.requestId}`);
    res.status(200).json({ fileName: blobName, uploadBlobResponse: uploadBlobResponse, message: 'SENT' });
    // return new Response('Working');
}


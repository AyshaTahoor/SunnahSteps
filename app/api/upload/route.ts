import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/utils/api';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return errorResponse('No file provided', 400);
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64File = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload to Cloudinary
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = 'ml_default'; // Cloudinary default preset

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file: base64File,
          upload_preset: uploadPreset,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return errorResponse('Upload failed', 500);
    }

    return successResponse({
      url: data.secure_url,
      publicId: data.public_id,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return errorResponse(error instanceof Error ? error.message : 'Upload failed', 500);
  }
}
'use client';

import Image from 'next/image';
import { CldUploadButton, CldUploadWidgetResults } from 'next-cloudinary';
import { CldImage } from 'next-cloudinary';
import { useState } from 'react';

export type UploadResult = {
  info: {
    public_id: string;
  };
  event: 'success';
};

export default function Home() {
  const [imageId, setImageId] = useState('');
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="font-bold text-4xl">Home</h1>
    </main>
  );
}

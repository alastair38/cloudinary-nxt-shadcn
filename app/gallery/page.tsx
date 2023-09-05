'use client';

import { Button } from '@/components/ui/button';
import { CldUploadButton, CldUploadWidgetResults } from 'next-cloudinary';
import { CldImage } from 'next-cloudinary';
import { useState } from 'react';

function Gallery() {
  const [imageId, setImageId] = useState('');
  return (
    <section className="space-y-12">
      <h1 className="font-bold text-5xl">Gallery</h1>

      <Button asChild>
        <div className="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>

          <CldUploadButton
            onUpload={(result: CldUploadWidgetResults) => {
              setImageId(result.info?.public_id);
            }}
            uploadPreset="ht9gl0ey"
          />
        </div>
      </Button>
      {imageId && (
        <CldImage
          width="400"
          height="600"
          src={imageId}
          sizes="25vw"
          alt="Description of my image"
        />
      )}
    </section>
  );
}

export default Gallery;

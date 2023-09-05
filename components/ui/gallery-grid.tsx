'use client';

import { ImageGrid } from '@/components/ui/image-grid';
import { SearchResult } from 'app/gallery/page';
import { CloudinaryImage } from '@/components/ui/cloudinaryImage';

export default function GalleryGrid({ images }: { images: SearchResult[] }) {
  return (
    <ImageGrid
      images={images}
      getImage={(imagedata: SearchResult) => {
        return (
          <CloudinaryImage
            key={imagedata.public_id}
            imagedata={imagedata}
            width="400"
            height="300"
            alt="an image of something"
          />
        );
      }}
    />
  );
}

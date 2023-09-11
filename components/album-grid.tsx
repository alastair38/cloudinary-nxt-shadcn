'use client';

import { ImageGrid } from '@/components/image-grid';
import { SearchResult } from '@/app/gallery/page';
import { CloudinaryImage } from './cloudinaryImage';

export default function AlbumGrid({ images }: { images: SearchResult[] }) {
  return images.map(imagedata => (
    <CloudinaryImage
      className="object-cover w-full h-full"
      key={imagedata.public_id}
      imagedata={imagedata}
      width={imagedata.width}
      height={imagedata.height}
      alt={imagedata.context?.alt ? imagedata.context.alt : ''}
      sizes="100vw"
    />
  ));
}

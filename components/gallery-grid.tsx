'use client';

import { ImageGrid } from '@/components/image-grid';
import { SearchResult } from 'app/gallery/page';
import { CloudinaryImage } from '@/components/cloudinaryImage';
import { SelectTags } from './select-tags';

export default function GalleryGrid({
  images,
  tags,
}: {
  images: SearchResult[];
  tags: [];
}) {
  return images.map(imagedata => (
    <div key={imagedata.public_id} className="relative">
      <CloudinaryImage
        className="object-cover w-full h-full"
        imagedata={imagedata}
        width={imagedata.width}
        height={imagedata.height}
        alt={imagedata.context?.alt ? imagedata.context.alt : ''}
        sizes="100vw"
      />
      <SelectTags
        allTags={tags}
        tags={imagedata.tags}
        imageID={imagedata.public_id}
      />
    </div>
  ));
}

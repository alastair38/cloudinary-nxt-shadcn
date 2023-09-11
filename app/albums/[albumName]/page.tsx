import cloudinary from 'cloudinary';

import { SearchResult } from '@/app/gallery/page';
import { ForceRefresh } from '@/components/force-refresh';
import AlbumGrid from '@/components/album-grid';

export default async function GalleryPage({
  params: { albumName },
}: {
  params: {
    albumName: string;
  };
}) {
  const results = (await cloudinary.v2.search
    .expression(`resource_type:image AND tags=${albumName}`)
    .sort_by('created_at', 'desc')
    .with_field('context')
    .with_field('tags')
    .max_results(30)
    .execute()) as { resources: SearchResult[] };

  return (
    <section>
      <ForceRefresh />

      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Album {albumName}</h1>
        </div>
        <div className="grid grid-cols-fit gap-4">
          <AlbumGrid images={results.resources} />
        </div>
      </div>
    </section>
  );
}

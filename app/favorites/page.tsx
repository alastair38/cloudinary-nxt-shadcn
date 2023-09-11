import { ForceRefresh } from '@/components/force-refresh';
import GalleryGrid from '@/components/gallery-grid';

import cloudinary from 'cloudinary';

export type SearchResult = {
  public_id: string;
  width: number;
  height: number;
  tags: string[];
  context: {
    alt: string;
  };
};

export default async function FavoritesPage() {
  const results = (await cloudinary.v2.search
    .expression(`resource_type:image AND tags=favorite`)
    .sort_by('created_at', 'desc')
    .with_field('context')
    .with_field('tags')
    .max_results(5)
    .execute()) as { resources: SearchResult[] };

  // console.log(results.resources[0]);

  return (
    <section>
      <ForceRefresh />
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Favorites</h1>
        </div>
        <div className="grid grid-cols-fit gap-4">
          <GalleryGrid images={results.resources} tags={[]} />
        </div>
      </div>
    </section>
  );
}

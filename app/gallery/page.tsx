import GalleryGrid from '@/components/gallery-grid';
import UploadButton from '@/components/uploadButton';
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

export default async function Gallery() {
  const results = (await cloudinary.v2.search
    .expression(`resource_type:image`)
    .sort_by('created_at', 'desc')
    .with_field('context')
    .with_field('tags')
    .max_results(15)
    .execute()) as { resources: SearchResult[] };

  const { tags } = await cloudinary.v2.api.tags();

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Gallery</h1>
          <UploadButton tags={tags} />
        </div>

        <div className="grid grid-cols-fit gap-6 mb-6">
          <GalleryGrid images={results.resources} tags={tags} />
        </div>
      </div>
    </section>
  );
}

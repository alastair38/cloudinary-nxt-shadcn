import { CloudinaryImage } from '@/components/ui/cloudinaryImage';
import GalleryGrid from '@/components/ui/gallery-grid';
import UploadButton from '@/components/ui/uploadButton';
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
    .max_results(5)
    .execute()) as { resources: SearchResult[] };

  // console.log(results.resources[0]);

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Gallery</h1>
          <UploadButton />
        </div>

        <GalleryGrid images={results.resources} />
      </div>
    </section>
  );
}

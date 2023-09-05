import CloudinaryImage from '@/components/ui/cloudinaryImage';
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

  console.log(results.resources[0]);

  return (
    <section className="space-y-12 p-12">
      <h1 className="font-bold text-5xl">Gallery</h1>

      <UploadButton />

      <div className="grid grid-cols-3 gap-4">
        {results.resources.map(result => (
          <CloudinaryImage
            key={result.public_id}
            src={result.public_id}
            height={result.height}
            width={result.width}
            alt={result.context?.alt}
          />
        ))}
      </div>
    </section>
  );
}

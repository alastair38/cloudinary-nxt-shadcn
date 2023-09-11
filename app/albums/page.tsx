import { AlbumCard } from '@/components/album-card';
import cloudinary from 'cloudinary';

export type Folder = string;

export default async function AlbumsPage() {
  const { folders } = (await cloudinary.v2.api.root_folders()) as {
    folders: Folder[];
  };

  const { tags } = await cloudinary.v2.api.tags();

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Albums</h1>
        </div>

        {/* <div className="grid grid-cols-3 gap-4">
          {tags.map((tag: any) => (
            <AlbumCard key={tag} folder={tag} />
          ))}
        </div> */}

        <div className="grid grid-cols-3 gap-4">
          {tags.map((folder: Folder, i: any) => (
            <AlbumCard key={`tag-${i}`} folder={folder} />
          ))}
        </div>
      </div>
    </section>
  );
}

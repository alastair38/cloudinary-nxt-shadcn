'use server';

import { SearchResult } from '@/app/gallery/page';
import cloudinary from 'cloudinary';
import { revalidatePath } from 'next/cache';

export async function addImageToAlbum(image: SearchResult, tag: string) {
  // await cloudinary.v2.api.create_folder(album);

  await cloudinary.v2.api.update(image.public_id, { tags: tag });

  // let parts = image.public_id.split('/');
  // if (parts.length > 1) {
  //   parts = parts.slice(1);
  // }
  // const publicId = parts.join('/');

  // await cloudinary.v2.uploader.rename(image.public_id, `${album}/${publicId}`);
}

export async function updateTags(formData: {
  get(arg0: string): unknown;
  getAll: (arg0: string) => any;
}) {
  const data = formData.getAll('tags');
  const publicID: any = formData.get('publicID');

  // console.log(data.toString());
  // console.log(publicID);

  try {
    await cloudinary.v2.api.update(publicID, { tags: data.toString() });
    revalidatePath('/gallery');
    return { message: 'Your tags were updated 🎉', success: true };
  } catch (e) {
    return {
      message:
        'There was a problem updating your tags. Please try again later.',
      success: false,
    };
  }
}

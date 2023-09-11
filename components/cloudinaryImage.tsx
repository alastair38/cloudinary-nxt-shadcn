'use client';

import { Heart } from '@/components/icons/heart';
import { CldImage, CldImageProps } from 'next-cloudinary';
import { useEffect, useState, useTransition } from 'react';
import { FullHeart } from '@/components/icons/full-heart';
import { SearchResult } from '@/app/gallery/page';
import { setAsFavoriteAction } from '@/app/gallery/actions';
import { ImageMenu } from './image-menu';
import { AddToAlbumDialog } from './add-to-album-dialog';
import { SelectTags } from './select-tags';

export function CloudinaryImage(
  props: {
    imagedata: SearchResult;

    onUnheart?: (unheartedResource: SearchResult) => void;
  } & Omit<CldImageProps, 'src'>
) {
  const [transition, startTransition] = useTransition();

  const { imagedata, onUnheart } = props;

  const [isFavorited, setIsFavorited] = useState(
    imagedata?.tags.includes('favorite')
  );

  return (
    <div className="h-full">
      <CldImage {...props} src={imagedata.public_id} />
      {/* {isFavorited ? (
        <FullHeart
          onClick={() => {
            onUnheart?.(imagedata);
            setIsFavorited(false);
            startTransition(() => {
              setAsFavoriteAction(imagedata.public_id, false);
            });
          }}
          className="absolute top-2 left-2 hover:text-white text-red-500 cursor-pointer"
        />
      ) : (
        <Heart
          onClick={() => {
            setIsFavorited(true);
            startTransition(() => {
              setAsFavoriteAction(imagedata.public_id, true);
            });
          }}
          className="absolute top-2 left-2 hover:text-red-500 cursor-pointer"
        />
      )} */}

      {/* <ImageMenu image={imagedata} /> */}

      {/* <AddToAlbumDialog image={imagedata} onClose={() => console.log('hi')} /> */}
    </div>
  );
}

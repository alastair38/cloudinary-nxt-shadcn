'use client';

import { Button } from '@/components/ui/button';
import { CldUploadButton, CldUploadWidgetResults } from 'next-cloudinary';
import { useRouter } from 'next/navigation';

// const presets = ['nature', 'video', 'eager'];
// const getMyUploadPresets = (cb: (arg0: string[]) => any) => cb(presets);

export default function UploadButton({ tags }: { tags: any[] }) {
  const getMyTags = (cb: (arg0: string[]) => any, prefix: string) =>
    cb(
      prefix ? tags.filter((t: string | string[]) => !t.indexOf(prefix)) : tags
    ); // callback function to get tags for upload button options
  const router = useRouter();
  return (
    <Button asChild>
      <div className="flex gap-2 items-center">
        <CldUploadButton
          onClose={() => {
            router.refresh();
          }}
          uploadPreset="ht9gl0ey"
          options={{
            sources: ['local', 'google_drive', 'dropbox', 'unsplash'],
            getTags: getMyTags,
            // getUploadPresets: getMyUploadPresets,
            maxFiles: 5,
            theme: 'minimal',
            showAdvancedOptions: true,
          }}
        >
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            Upload
          </div>
        </CldUploadButton>
      </div>
    </Button>
  );
}

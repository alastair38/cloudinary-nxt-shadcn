import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Folder } from 'app/albums/page';
import Link from 'next/link';

export function AlbumCard({ folder }: { folder: Folder }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{folder}</CardTitle>
        <CardDescription>All your {folder} images</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild>
          <Link href={`/albums/${folder}`}>View Album</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
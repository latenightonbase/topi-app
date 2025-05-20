
/* eslint-disable @typescript-eslint/no-explicit-any */

import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');
pb.autoCancellation(false);

const COLLECTION_NAME = 'topi_stories';

export async function submitTopiStory({ name, intro, image }: { name: string; intro: string; image: File }) {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('intro', intro);
  formData.append('image', image);

  const record = await pb.collection(COLLECTION_NAME).create(formData);
  return record;
}

export async function getAllTopiStories() {
    try {
      return await pb.collection(COLLECTION_NAME).getFullList({
        sort: '-created',
        requestKey: `topi-${Date.now()}`, // Still keep this
      });
    } catch (err: any) {
      console.error('Error fetching stories:', err);
      return []; // Return empty to prevent crash
    }
  }
  

export function formatStoryRecords(records: any[]) {
  return records.map((record) => ({
    id: record.id,
    name: record.name,
    intro: record.intro,
    imageUrl: pb.files.getUrl(record, record.image),
    created: record.created,
  }));
}

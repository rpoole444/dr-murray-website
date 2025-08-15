import rawVideos from '@/content/media/videos.json';
import rawAudio from '@/content/media/audio.json';
import rawPhotos from '@/content/media/photos.json';
import MediaTabs from '@/components/MediaTabs';
import type { Video, Track, Photo } from '@/types/media';

export const metadata = {
  title: 'Media',
  description: 'Selected videos, audio, and photos.',
};

export default function MediaPage() {
  // Cast JSON to typed arrays (TS sees JSON imports as {} otherwise)
  const videos = rawVideos as unknown as Video[];
  const audio = rawAudio as unknown as Track[];
  const photos = rawPhotos as unknown as Photo[];

  return (
    <main className="py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Media</h1>
      <MediaTabs videos={videos} audio={audio} photos={photos} />
    </main>
  );
}

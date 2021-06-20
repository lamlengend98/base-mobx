import { useContext } from 'react';
import { VideoViewContext } from '@/tools/video-view/context';

export function useVideoView() {
  const payload = useContext(VideoViewContext);
  if (!payload) {
    throw new Error('useVideoView must be use within ImageVideoProvider.');
  }
  return payload;
}

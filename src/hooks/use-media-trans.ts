import { useContext } from 'react';
import { MediaTransferContext } from '@/tools/media-trans/context';

export const useMediaTransfer = () => {
  const payload = useContext(MediaTransferContext);
  if (!payload) {
    throw new Error(
      'useMediaTransfer must be use within MediaTransferContextProvider.',
    );
  }
  return payload;
};

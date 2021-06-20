import { useContext } from 'react';
import { CometChatContext } from '@/tools/comet-chat/context';

export const useCometChat = () => {
  const payload = useContext(CometChatContext);
  if (!payload) {
    throw new Error('useCometChat must be use within CometChatProvider.');
  }

  return payload;
};

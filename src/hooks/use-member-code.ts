import { useContext } from 'react';
import { MemberCodeContext } from '@/tools/confirm-member-code/context';

export const useMemberCode = () => {
  const payload = useContext(MemberCodeContext);
  if (!payload) {
    throw new Error('useMemberCode must be use within MemberCodeProvider.');
  }
  return payload;
};

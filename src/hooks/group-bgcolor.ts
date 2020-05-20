import { useContext } from 'react';
import { GroupContext } from '../contexts/GroupContext';

const bgcolors = ['#E5F5FD', '#EBF3E7', '#ECE8F6', '#FDF7E3'];

export function useGroupBgcolor(): string {
  const context = useContext(GroupContext);
  context.index += 1;
  return bgcolors[context.index % bgcolors.length];
}

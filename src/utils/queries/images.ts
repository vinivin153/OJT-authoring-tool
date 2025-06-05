import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getImageList } from 'utils/apis/imageApi';

export const images = createQueryKeys('images', {
  imageList: () => ({
    queryKey: ['imageList'] as const,
    queryFn: getImageList,
  }),
});

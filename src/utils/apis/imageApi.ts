import type { ImageListProps } from 'types/imageType';
import { client } from './axiosInstance';

export const getImageList = async () => {
  const response = await client.get<ImageListProps>('editor/image/T1');
  return response.data;
};

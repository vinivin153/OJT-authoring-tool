export type ImageProps = {
  imageId: string;
  imageDivisionCode: string;
  width: string;
  height: string;
  extension: string;
  spriteFrameCount: string;
  size: string;
  reference: string;
  tags: string;
};

export type ImageListProps = {
  list: ImageProps[];
};

export type ImageCardProps = Pick<
  ImageProps,
  'imageId' | 'width' | 'height' | 'size' | 'tags'
> & {
  isSelected?: boolean;
};

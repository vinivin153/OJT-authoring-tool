import { useQuery } from '@tanstack/react-query';
import { VirtuosoGrid } from 'react-virtuoso';
import { images } from 'utils/queries/images';
import ImageCard from './ImageCard';
import useCanvasStore from 'store/useCanvasStore';
import type { ImageProps } from 'fabric';

const gridComponents = {
  List: (
    props: React.HTMLAttributes<HTMLDivElement> & {
      ref?: React.Ref<HTMLDivElement>;
    }
  ) => {
    const { children, ref, ...rest } = props;
    return (
      <div ref={ref} {...rest} className="grid grid-cols-4 gap-2 p-4">
        {children}
      </div>
    );
  },
  Item: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props}>{children}</div>
  ),
};

function ImageList() {
  const { data, isError, isPending } = useQuery({
    ...images.imageList(),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });

  const { selectedImageSet, setSelectedImageSet } = useCanvasStore(
    (state) => state
  );

  const handleImageCardClick = (imageId: string) => {
    const newSelectedImageSet = new Set(selectedImageSet);
    if (newSelectedImageSet.has(imageId)) {
      newSelectedImageSet.delete(imageId);
    } else {
      newSelectedImageSet.add(imageId);
    }
    setSelectedImageSet(newSelectedImageSet);
  };

  const ItemContent = (index: number) => {
    const item = data?.list[index];
    if (!item) return null;

    const { imageId, width, height, size, tags } = item;

    return (
      <ImageCard
        imageId={imageId}
        width={width}
        height={height}
        size={size}
        tags={tags}
        isSelected={selectedImageSet.has(imageId)}
        onClick={handleImageCardClick}
      />
    );
  };

  if (isPending) return <div>Loading..</div>;
  if (isError) return <div>Error loading images.</div>;

  return (
    <div className="w-full h-full">
      {/* 가상화된 그리드 */}
      <VirtuosoGrid
        style={{ height: '100%' }}
        totalCount={data.list.length}
        components={gridComponents}
        itemContent={ItemContent}
        overscan={8}
      />

      {/* 이미지 추가 버튼 */}
      <div className="absolute bottom-4 right-6">
        <button
          type="button"
          aria-label="이미지 추가하기 버튼"
          className="p-4 text-blue-500 hover:text-blue-700 font-semibold bg-white rounded-lg shadow-md"
          onClick={() => console.log('이미지 추가하기')}
        >
          이미지 추가하기
        </button>
      </div>
    </div>
  );
}

export default ImageList;

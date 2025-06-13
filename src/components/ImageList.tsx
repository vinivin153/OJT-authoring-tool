import { useQuery } from '@tanstack/react-query';
import { VirtuosoGrid } from 'react-virtuoso';
import { images } from 'utils/queries/images';
import ImageCard from './ImageCard';
import useCanvasStore from 'store/useCanvasStore';
import useModalStore from 'store/useModalStore';
import { FabricImage, loadSVGFromURL, util } from 'fabric';
import NormalButton from './buttons/NormalButton';
import Loading from './Loading';
import { useEffect, useState } from 'react';

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
  const [showLoading, setShowLoading] = useState(true);
  const { data, isError, isPending } = useQuery({
    ...images.imageList(),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });

  const { canvas, selectedImageSet, setSelectedImageSet } = useCanvasStore();
  const closeModal = useModalStore((state) => state.closeModal);

  useEffect(() => {
    if (data) {
      setShowLoading(false);
    } else {
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 250);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleImageCardClick = (imageId: string) => {
    const newSelectedImageSet = new Set(selectedImageSet);
    if (newSelectedImageSet.has(imageId)) {
      newSelectedImageSet.delete(imageId);
    } else {
      newSelectedImageSet.add(imageId);
    }
    setSelectedImageSet(newSelectedImageSet);
  };

  const handleImageAddClick = async () => {
    if (!canvas) return;

    for (const imageId of selectedImageSet) {
      const imageUrl = `${import.meta.env.VITE_API_BASE_URL}/images/T1/${imageId}.svg`;

      const img = await loadSVGFromURL(imageUrl);
      const svg = util.groupSVGElements(img.objects as FabricImage[], {
        left: 100,
        top: 100,
        scaleX: 0.5,
        scaleY: 0.5,
      });
      svg.set({
        uid: new Date().getTime().toString(),
      });
      canvas.add(svg);
    }

    canvas.requestRenderAll();
    setSelectedImageSet(new Set());
    closeModal();
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

  if (isPending || showLoading) return <Loading />;
  if (isError) return <div>Error loading images.</div>;

  return (
    <div className="w-full h-full">
      {/* 가상화된 그리드 */}
      <VirtuosoGrid
        style={{ height: '100%' }}
        totalCount={data.list?.length || 0}
        components={gridComponents}
        itemContent={ItemContent}
        overscan={8}
      />

      {/* 이미지 추가 버튼 */}
      <div className="absolute bottom-4 right-6">
        <NormalButton
          size="medium"
          text="이미지 추가하기"
          onClick={handleImageAddClick}
        />
      </div>
    </div>
  );
}

export default ImageList;

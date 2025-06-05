import clsx from 'clsx';
import type { ImageCardProps } from 'types/imageType';
import { parseTags } from 'utils/parseTags';

function ImageCard({
  imageId,
  width,
  height,
  size,
  tags,
  isSelected,
  onClick,
}: ImageCardProps) {
  const tagList = parseTags(tags);
  return (
    <div
      className={clsx(
        'image-card',
        'relative bg-white rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-gray-300/50 hover:-translate-y-1 min-h-[300px] mt-1 border-3 border-transparent',
        {
          'bg-blue-100': isSelected,
          'border border-blue-200!': isSelected,
          'border-3': isSelected,
        }
      )}
      onClick={() => onClick(imageId)}
    >
      {/* 이미지 정보 */}
      <div className="flex flex-col image-size absolute top-2 left-2 text-[#666666] text-xs">
        <span className=" px-1">
          {width} x {height}
        </span>
        <span className="px-1">{size}</span>
      </div>

      {/* SVG 태그 표시 */}
      <div className="absolute top-3 right-3">
        <span className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded">
          svg
        </span>
      </div>

      {/* 이미지 */}
      <div className="image flex items-center justify-center rounded-lg mb-4 h-48 overflow-hidden">
        <img
          src={`${import.meta.env.VITE_API_BASE_URL}/images/T1/${imageId}.svg`}
          alt={imageId}
          className="w-full h-full object-fill"
        />
      </div>

      {/* 태그 */}
      <div className="flex flex-wrap gap-0.5">
        {tagList.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ImageCard;

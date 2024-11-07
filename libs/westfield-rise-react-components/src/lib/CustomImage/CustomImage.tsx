import Image, { StaticImageData } from "next/image";
import { contentfulLoader } from "@delicious-simplicity/next-image-contentful-loader";
import { useState } from "react";

declare const VALID_LOADING_VALUES: readonly ["lazy", "eager", undefined];
declare type LoadingValue = typeof VALID_LOADING_VALUES[number];

export const CustomImage = ({
  src,
  width,
  height,
  alt,
  id,
  children = null,
  className = "",
  priority = false,
  sizes = undefined,
  fill = undefined,
  loading = 'lazy',
  useMap,
  coords,
  handleAreaClick
}: {
  src: string | StaticImageData;
  width?: number | undefined;
  height?: number | undefined;
  alt: string;
  id?: string;
  children?: React.ReactNode;
  className?: string;
  priority?: boolean;
  sizes?: string | undefined;
  fill?: boolean | undefined;
  loading?: LoadingValue;
  coords?: any[]
  useMap?: string;
  handleAreaClick?: (e: any) => void;
}) => {
  return (
    <>
      <Image
        loader={(props) => contentfulLoader(props, { fit: "pad", q: 75, fm: "webp" })}
        src={src}
        alt={alt}
        id={id}
        width={width}
        height={height}
        className={className}
        priority={priority}
        sizes={sizes}
        fill={fill}
        loading={loading}
        useMap={`#${useMap}`}
      />
      {coords && <map name={useMap}>
        {coords.map((coord, index) => (
          <area
            key={index}
            shape='circle'
            coords={`${coord.x},${coord.y},${coord.radius}`}
            href=""
            onClick={(e) => {e.preventDefault(); handleAreaClick && handleAreaClick(coord.index)}}
            alt={coord.regionName}
          />
        ))}
      </map>}
    </>
  );
};
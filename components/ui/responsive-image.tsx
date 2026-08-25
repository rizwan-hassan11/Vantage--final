import Image, { type ImageProps } from "next/image";

type ResponsiveImageProps = Omit<ImageProps, "src"> & {
  src: ImageProps["src"];
  mobileSrc?: string;
};

/** Lets the browser select the lightweight phone asset before downloading. */
export function ResponsiveImage({
  src,
  mobileSrc,
  alt,
  ...props
}: ResponsiveImageProps) {
  if (!mobileSrc) return <Image src={src} alt={alt} {...props} />;

  return (
    <picture style={{ display: "contents" }}>
      <source media="(max-width: 767px)" srcSet={encodeURI(mobileSrc)} />
      <Image src={src} alt={alt} {...props} />
    </picture>
  );
}

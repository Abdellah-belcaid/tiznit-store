import JarArt from "./JarArt";
import type { JarArtSpec } from "../data/products";

interface Props {
  src?: string;
  art?: JarArtSpec;
  alt: string;
  className?: string;
  imgClassName?: string;
}

// Photo when we have one, illustrated packaging otherwise.
export default function ProductImage({ src, art, alt, className = "", imgClassName = "" }: Props) {
  if (src) {
    return (
      <div className={`overflow-hidden bg-cream-200 ${className}`}>
        <img src={src} alt={alt} loading="lazy" className={`size-full object-cover ${imgClassName}`} />
      </div>
    );
  }
  return (
    <div
      className={`grid place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_35%,var(--color-honey-200),var(--color-cream-200)_70%)] ${className}`}
    >
      <JarArt {...art} className={`h-[78%] w-auto drop-shadow-xl ${imgClassName}`} />
    </div>
  );
}

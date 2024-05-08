"use client";

import { useState } from "react";
import Image from "next/image";

export default function NextImage({ src, alt, priority, className }) {
  const [isError, setIsError] = useState(false);

  const handleError = () => setIsError(true);
  return (
    <>
      {isError ? null : (
        <Image
          src={src}
          fill
          priority={priority ? true : false}
          alt={alt ?? "alt description"}
          sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px"
          className={className ?? ""}
          onError={handleError}
        />
      )}
    </>
  );
}

import React from "react";

interface IPseudoImageFallbackProps {
  alt: string;
  label?: string;
}

export default function PseudoImageFallback({
  alt,
  label,
}: IPseudoImageFallbackProps) {
  return (
    <span className="u-VisuallyHidden" role="img" aria-label={label ?? alt}>
      {alt}
    </span>
  );
}

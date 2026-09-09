"use client";

import Image from "next/image";

interface CertificateCardProps {
  id: number;
  title: string;
  issuer: string;
  date: string;
  thumbnail: string;
  onClick: () => void;
}

export function CertificateCard({
  title,
  issuer,
  date,
  thumbnail,
  onClick,
}: Readonly<CertificateCardProps>) {
  return (
    <button
      type="button"
      className="certificate-item group w-full text-left rounded-xl transition-all duration-200 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      onClick={onClick}
    >
      <div className="relative h-48 rounded-xl overflow-hidden border border-border/80 bg-card/60 transition-[border-color,box-shadow,transform] duration-200 ease-out group-hover:border-primary/50 group-hover:shadow-lg group-hover:-translate-y-0.5">
        <Image
          src={thumbnail || "/placeholder.svg?height=192&width=240"}
          alt=""
          fill
          sizes="240px"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3.5 transition-opacity duration-200 ease-out md:items-center md:justify-center md:bg-black/60 md:p-4 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
          <p className="text-white text-xs font-mono font-medium transition-transform duration-200 ease-out md:text-center md:translate-y-2 md:group-hover:translate-y-0 line-clamp-3">
            {title}
          </p>
        </div>
      </div>
      <p className="mt-2 font-mono text-xs text-center text-muted-foreground truncate transition-colors duration-150 ease-out group-hover:text-foreground">
        {issuer} • {date}
      </p>
    </button>
  );
}

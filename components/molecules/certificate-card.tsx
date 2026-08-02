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
      className="certificate-item group w-full text-left rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      onClick={onClick}
    >
      <div className="relative h-48 rounded-lg overflow-hidden border group-hover:border-primary transition-colors">
        <Image
          src={thumbnail || "/placeholder.svg?height=192&width=240"}
          alt=""
          fill
          sizes="240px"
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 to-transparent p-3 transition-colors md:items-center md:justify-center md:bg-black/50 md:p-4 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
          <p className="text-white text-sm font-medium md:text-center">{title}</p>
        </div>
      </div>
      <p className="mt-2 text-sm text-center text-muted-foreground truncate">
        {issuer} • {date}
      </p>
    </button>
  );
}

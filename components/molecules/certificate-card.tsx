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
      className="certificate-item w-full text-left"
      onClick={onClick}
    >
      <div className="relative h-48 rounded-lg overflow-hidden border hover:border-primary transition-colors">
        <Image
          src={thumbnail || "/placeholder.svg?height=192&width=240"}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <p className="text-white text-center p-4 text-sm font-medium">
            {title}
          </p>
        </div>
      </div>
      <p className="mt-2 text-sm text-center text-muted-foreground truncate">
        {issuer} • {date}
      </p>
    </button>
  );
}

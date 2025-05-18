"use client";

import type React from "react";

interface TouchCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function TouchCard({ children, className, onClick }: Readonly<TouchCardProps>) {
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}

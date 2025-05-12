"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface TouchCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function TouchCard({ children, className, onClick }: Readonly<TouchCardProps>) {
  const { isMobile, isTouchDevice } = useMobile();
  const [isPressed, setIsPressed] = useState(false);

  if (!isMobile || !isTouchDevice) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className, "touch-card relative overflow-hidden")}
      whileTap={{ scale: 0.98 }}
      onTapStart={() => setIsPressed(true)}
      onTap={() => {
        setIsPressed(false);
        if (onClick) onClick();
      }}
      onTapCancel={() => setIsPressed(false)}
    >
      {isPressed && (
        <motion.div
          className="absolute inset-0 bg-primary/10 pointer-events-none z-10"
          initial={{ opacity: 0.5, scale: 0 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{ duration: 0.5 }}
        />
      )}
      {children}
    </motion.div>
  );
}

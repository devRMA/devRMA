"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id?: string;
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function SectionHeading({
  id,
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
}: Readonly<SectionHeadingProps>) {
  return (
    <div className={cn("text-center mb-12", className)}>
      <motion.h2
        id={id}
        className={cn("text-3xl font-bold mb-4", titleClassName)}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          className={cn("text-muted-foreground max-w-2xl mx-auto", descriptionClassName)}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

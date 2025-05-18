"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function SectionHeading({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
}: Readonly<SectionHeadingProps>) {
  return (
    <div className={cn("text-center mb-12", className)}>
      <motion.h2
        className={cn("text-3xl font-bold mb-4", titleClassName)}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          className={cn("text-muted-foreground max-w-2xl mx-auto", descriptionClassName)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

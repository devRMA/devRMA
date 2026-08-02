"use client";

import { MotionConfig } from "framer-motion";
import type React from "react";

export function MotionProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

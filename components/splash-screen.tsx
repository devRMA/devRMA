"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <div className="text-4xl md:text-5xl font-bold text-primary">
                dev<span className="text-foreground">RMA</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="h-1 bg-primary rounded-full"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-4 text-sm text-muted-foreground"
            >
              Full Stack Developer
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { motion } from "framer-motion";

export const PageWrapper = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className={className}
    >
        {children}
    </motion.div>
);

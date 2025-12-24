'use client';

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  variant?: "cyan" | "green" | "gold";
}

export function SectionHeading({ title, subtitle, align = "center", className, variant = "cyan" }: SectionHeadingProps) {
  const alignClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  const variantClass = {
    cyan: "text-primary border-primary",
    green: "text-secondary border-secondary",
    gold: "text-accent border-accent",
  };

  return (
    <div className={cn("flex flex-col mb-12", alignClass[align], className)}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={cn("text-4xl md:text-5xl lg:text-6xl font-black mb-4 uppercase", variantClass[variant])}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl font-light tracking-wide"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: "100px" }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className={cn("h-1 mt-6", variantClass[variant].replace("text-", "bg-"))} 
      />
    </div>
  );
}

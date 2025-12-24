'use client';

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { motion } from "framer-motion";

interface CyberButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "outline";
  glow?: boolean;
}

export const CyberButton = forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ className, variant = "primary", glow = false, children, ...props }, ref) => {
    
    const baseStyles = "relative px-8 py-4 font-display font-bold uppercase tracking-wider clip-path-slant transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-white hover:text-black border-2 border-transparent",
      secondary: "bg-secondary text-secondary-foreground hover:bg-white hover:text-black border-2 border-transparent",
      accent: "bg-accent text-accent-foreground hover:bg-white hover:text-black border-2 border-transparent",
      outline: "bg-transparent text-primary border-2 border-primary hover:bg-primary/10",
    };

    const glowStyle = glow ? "shadow-[0_0_20px_rgba(0,255,255,0.5)] hover:shadow-[0_0_30px_rgba(0,255,255,0.8)]" : "";

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(baseStyles, variants[variant], glowStyle, className)}
        {...(props as any)}
      >
        <span className="relative z-10">{children}</span>
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-2 h-2 bg-white opacity-50" />
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-white opacity-50" />
      </motion.button>
    );
  }
);

CyberButton.displayName = "CyberButton";

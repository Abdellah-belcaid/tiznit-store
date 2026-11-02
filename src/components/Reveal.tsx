import type { ReactNode } from "react";
import { motion } from "motion/react";

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li";
}

export default function Reveal({ children, delay = 0, className = "", as = "div" }: Props) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}

import React from "react";
import { motion } from "framer-motion";

const TECH_STACKS = [
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Next.js",
  "PostgreSQL",
  "Docker",
  "GraphQL",
  "Framer Motion",
  "REST API",
];

const InfiniteMarquee = ({ items = TECH_STACKS, speed = 20 }) => {
  return (
    <div className="relative w-full overflow-hidden bg-gray-900/50 border-y border-gray-800 py-4 my-12 backdrop-blur-sm select-none">
      {/* Gradient Mask ซ้าย-ขวา เพื่อให้ปลายข้อความค่อยๆ จางดูนุ่มนวล */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white dark:from-gray-950 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white dark:from-gray-950 to-transparent" />

      {/* Container สำหรับสไลด์ */}
      <div className="flex w-max">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: speed,
            repeat: Infinity,
          }}
          className="flex gap-8 items-center pr-8"
        >
          {/* ทำการวนซ้ำ Array 2 รอบเพื่อให้สไลด์วนลูปได้ต่อเนื่อง Seamless ไม่สะดุด */}
          {[...items, ...items].map((tech, index) => (
            <div key={index} className="flex items-center gap-8">
              <span className="text-sm md:text-base font-mono font-semibold text-gray-400 dark:text-gray-300 uppercase tracking-wider hover:text-purple-400 transition-colors">
                {tech}
              </span>
              <span className="text-purple-500/50 text-xs">◆</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default InfiniteMarquee;

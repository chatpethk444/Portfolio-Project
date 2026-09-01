import { motion } from "framer-motion";

export default function TypewriterText({ text, delay = 0, speed = 0.03, className = "" }) {
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: speed, delayChildren: delay } },
      }}
      className={className}
    >
      {Array.from(text).map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

import { motion } from "framer-motion";

export default function Marquee({ items = [], speed = 20 }) {
  const content = items.length ? items : ["React", "FastAPI", "Supabase", "Docker", "REST API"];
  return (
    <div className="my-12 w-full overflow-hidden border-y border-gray-200 py-4 dark:border-gray-800">
      <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: speed, ease: "linear", repeat: Infinity }} className="flex w-max gap-8">
        {[...content, ...content].map((item, index) => (
          <span key={`${item}-${index}`} className="font-mono text-sm text-gray-500 dark:text-gray-400">{item}</span>
        ))}
      </motion.div>
    </div>
  );
}

import { motion } from "framer-motion";
import TypewriterText from "./TypewriterText";

export default function DeveloperTerminal() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.6 }}
      whileHover={{ scale: 1.01, y: -3 }}
      className="relative min-w-0 overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 p-4 font-mono text-[10px] text-gray-100 shadow-2xl sm:min-h-[340px] sm:p-6 sm:text-sm"
    >
      <div className="terminal-scan pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative z-10">
        <div className="mb-3 flex items-center gap-2 border-b border-gray-800 pb-3 sm:mb-4">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-red-500/80 sm:h-3 sm:w-3" />
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-yellow-500/80 sm:h-3 sm:w-3" />
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-green-500/80 sm:h-3 sm:w-3" />
          <span className="ml-1 truncate text-gray-500 sm:ml-2">profile.ts</span>
          <span className="ml-auto text-[9px] text-emerald-500/70 sm:text-[10px]">● ONLINE</span>
        </div>
        <div className="space-y-2 overflow-x-auto leading-relaxed whitespace-nowrap">
          <p className="text-gray-500"><TypewriterText text="// Developer Profile" delay={0.2} /></p>
          <p><TypewriterText text="const " className="text-purple-400" delay={0.5} /><TypewriterText text="developer " className="text-yellow-300" delay={0.7} /><TypewriterText text="= {" delay={0.9} /></p>
          <p className="pl-3 sm:pl-4"><TypewriterText text="name: " className="text-blue-400" delay={1.1} /><TypewriterText text="'Chatpeth Karisuk'," className="text-green-300" delay={1.3} /></p>
          <p className="pl-3 sm:pl-4"><TypewriterText text="location: " className="text-blue-400" delay={1.6} /><TypewriterText text="'Bangkok, Thailand'," className="text-green-300" delay={1.8} /></p>

          <p className="pl-3 sm:pl-4"><TypewriterText text="role: " className="text-blue-400" delay={2.1} /><TypewriterText text="'Software Tester / QA / Full-Stack Development'," className="text-green-300" delay={2.3} /></p>
          <p className="pl-3 sm:pl-4"><TypewriterText text="email: " className="text-blue-400" delay={2.1} /><TypewriterText text="'chatpethkarisuk@gmail.com'," className="text-green-300" delay={2.3} /></p>
          <p className="pl-3 sm:pl-4"><TypewriterText text="phone: " className="text-blue-400" delay={2.1} /><TypewriterText text="'091-021-6010'," className="text-green-300" delay={2.3} /></p>

          <p><TypewriterText text="};" delay={2.6} /></p>
          <p className="flex gap-1 pt-2 text-emerald-400"><span>❯ ready_to_build()</span><span className="inline-block h-3 w-1.5 animate-pulse bg-emerald-400 sm:h-4 sm:w-2" /></p>
        </div>
      </div>
    </motion.div>
  );
}

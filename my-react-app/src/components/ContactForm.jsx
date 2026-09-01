import { useState } from "react";
import { motion } from "framer-motion";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

export default function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setStatus("error");
      setErrorMessage("Contact form is not configured.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");
    const formData = new FormData(event.currentTarget);
    formData.append("access_key", accessKey);

    try {
      const response = await fetch(WEB3FORMS_URL, { method: "POST", body: formData });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Submission failed.");
      event.currentTarget.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message || "Unable to send your message. Please try again.");
    }
  }

  const fieldClass = "mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition-all duration-200 focus:-translate-y-0.5 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-gray-700 dark:bg-gray-950";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6 }}
      className="mx-auto mt-8 w-full max-w-xl rounded-2xl border border-gray-200 bg-white/80 p-4 text-left shadow-2xl shadow-black/5 backdrop-blur sm:mt-10 sm:rounded-3xl sm:p-8 dark:border-gray-800 dark:bg-gray-900/60"
    >
      <h3 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">Get in Touch</h3>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input type="checkbox" name="botcheck" className="hidden" tabIndex="-1" autoComplete="off" />
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">NAME<input type="text" name="name" required placeholder="John Doe" className={fieldClass} /></label>
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">EMAIL<input type="email" name="email" required placeholder="john@example.com" className={fieldClass} /></label>
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">MESSAGE<textarea name="message" required rows="5" placeholder="Tell me about your project..." className={`${fieldClass} resize-none`} /></label>
        <motion.button
          whileHover={{ y: -2, boxShadow: "0 12px 30px rgba(16, 185, 129, 0.18)" }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white transition-opacity disabled:opacity-50"
        >
          {status === "submitting" ? "Sending..." : status === "success" ? "✓ Message Sent" : "Send Message →"}
        </motion.button>
        {status === "success" && <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="text-center text-xs text-emerald-500">Thanks! Your message has been sent successfully.</motion.p>}
        {status === "error" && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-xs text-red-500">{errorMessage}</motion.p>}
      </form>
    </motion.div>
  );
}

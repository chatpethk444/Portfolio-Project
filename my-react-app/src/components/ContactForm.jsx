import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactForm = () => {
  const [status, setStatus] = useState("idle"); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.target);

    // ลงทะเบียนรับ Access Key ฟรีได้ที่ https://web3forms.com
    formData.append("access_key", "2ea60d4f-c11f-4c63-a278-c2fcd1733516");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        e.target.reset();
        setTimeout(() => setStatus("idle"), 5000); // รีเซ็ตสถานะปุ่มหลังผ่านไป 5 วินาที
      } else {
        setStatus("error");
        setErrorMessage(result.message || "เกิดข้อผิดพลาดในการส่งข้อความ");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง",
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl mx-auto mt-12 p-8 rounded-3xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 backdrop-blur-sm text-left"
    >
      <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
        Get in Touch
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        มีโปรเจกต์ที่ต้องการปรึกษา หรือต้องการร่วมงานกัน?
        ส่งข้อความหาผมได้เลยครับ
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot Spam Protection (ซ่อนไว้สำหรับดักจับ Bot) */}
        <input
          type="checkbox"
          name="botcheck"
          className="hidden"
          style={{ display: "none" }}
        />

        <div>
          <label className="block text-xs font-semibold mb-2 text-gray-700 dark:text-gray-300">
            NAME
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold mb-2 text-gray-700 dark:text-gray-300">
            EMAIL
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="john@example.com"
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold mb-2 text-gray-700 dark:text-gray-300">
            MESSAGE
          </label>
          <textarea
            name="message"
            required
            rows="4"
            placeholder="Tell me about your project..."
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all text-sm resize-none"
          ></textarea>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={status === "submitting"}
          className="w-full py-3.5 px-6 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {status === "submitting" ? (
            <>
              <span className="w-4 h-4 border-2 border-white dark:border-gray-900 border-t-transparent rounded-full animate-spin"></span>
              Sending...
            </>
          ) : status === "success" ? (
            "✓ Message Sent Successfully!"
          ) : (
            "Send Message"
          )}
        </motion.button>

        {status === "error" && (
          <p className="text-xs text-red-500 mt-2 text-center">
            {errorMessage}
          </p>
        )}
      </form>
    </motion.div>
  );
};

export default ContactForm;

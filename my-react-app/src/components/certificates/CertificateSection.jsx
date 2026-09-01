import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { HiAcademicCap, HiX } from "react-icons/hi";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";

function CertificateImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return <div className={`flex items-center justify-center bg-gray-100 text-gray-400 dark:bg-gray-950 ${className}`}><div className="text-center"><HiAcademicCap className="mx-auto h-10 w-10 opacity-60" /><p className="mt-2 text-xs">Image unavailable</p></div></div>;
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={className} />;
}

export default function CertificateSection({ certificates, loading, error }) {
  const [selected, setSelected] = useState(null);

  useBodyScrollLock(Boolean(selected));

  useEffect(() => {
    if (!selected) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setSelected(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  return (
    <>
      <section id="certificates" className="border-t border-gray-200 bg-white/60 px-4 py-14 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/20 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.6 }} className="mb-8 text-center sm:mb-10">
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"><HiAcademicCap className="h-6 w-6" /></div>
            <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">Certificates</h2>
            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400" />
          </motion.div>

          {loading && <p className="py-10 text-center text-gray-500">Loading certificates...</p>}
          {error && <p className="py-10 text-center text-red-500">{error}</p>}
          {!loading && !error && certificates.length === 0 && <p className="py-10 text-center text-gray-500">No certificates available yet.</p>}

          {!loading && !error && certificates.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {certificates.map((certificate) => (
                <motion.button type="button" key={certificate.id ?? certificate.name} variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }} whileHover={{ y: -8 }} whileTap={{ scale: 0.985 }} onClick={() => setSelected(certificate)} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-sm transition-all hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-500/10 dark:border-gray-800 dark:bg-gray-900">
                  <div className="relative aspect-[1.45/1] overflow-hidden bg-gray-100 dark:bg-gray-950">
                    <CertificateImage src={certificate.img_url} alt={certificate.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="text-base font-bold text-gray-900 transition-colors group-hover:text-emerald-600 sm:text-lg dark:text-white dark:group-hover:text-emerald-400">{certificate.name}</h3>
                    {certificate.description && <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{certificate.description}</p>}
                    <p className="mt-4 text-xs font-semibold text-emerald-600 dark:text-emerald-400">Click to view certificate →</p>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selected && (
              <motion.div
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-3 backdrop-blur-md sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <button className="absolute inset-0" aria-label="Close certificate" onClick={() => setSelected(null)} />
                <motion.article
                  role="dialog"
                  aria-modal="true"
                  aria-label={selected.name}
                  initial={{ opacity: 0, scale: 0.94, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 24 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900"
                >
                  <button type="button" onClick={() => setSelected(null)} className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition-transform hover:rotate-90" aria-label="Close">
                    <HiX className="h-5 w-5" />
                  </button>
                  <div className="max-h-[68vh] bg-gray-950">
                    <CertificateImage src={selected.img_url} alt={selected.name} className="h-full max-h-[68vh] w-full object-contain" />
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selected.name}</h3>
                    {selected.description && <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">{selected.description}</p>}
                  </div>
                </motion.article>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

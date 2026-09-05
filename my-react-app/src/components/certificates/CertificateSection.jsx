import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { HiAcademicCap, HiX, HiArrowsExpand } from "react-icons/hi";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";

function CertificateImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return <div className={`flex items-center justify-center bg-gray-100 text-gray-400 dark:bg-gray-950 ${className}`}><div className="text-center"><HiAcademicCap className="mx-auto h-10 w-10 opacity-60" /><p className="mt-2 text-xs">Image unavailable</p></div></div>;
  }
  return <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} className={className} />;
}

export default function CertificateSection({ certificates, loading, error }) {
  const [selected, setSelected] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);

  useBodyScrollLock(Boolean(selected));

  useEffect(() => {
    if (!selected) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        if (fullScreen) setFullScreen(false);
        else setSelected(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected, fullScreen]);

  useEffect(() => {
    if (!selected) setFullScreen(false);
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
                <motion.button type="button" key={certificate.id ?? certificate.name} variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }} whileHover={{ y: -8 }} whileTap={{ scale: 0.985 }} onClick={() => setSelected(certificate)} className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-sm transition-all hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-500/10 dark:border-gray-800 dark:bg-gray-900">
                  <div className="relative aspect-[1.45/1] overflow-hidden bg-gray-100 dark:bg-gray-950">
                    <CertificateImage src={certificate.img_url} alt={certificate.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
                      <span className="translate-y-2 rounded-full bg-black/55 px-3 py-2 text-xs font-semibold text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">Click to view full size</span>
                    </div>
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

      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {selected && !fullScreen && (
            <motion.div
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-3 backdrop-blur-md sm:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button type="button" className="absolute inset-0 cursor-default" aria-label="Close certificate" onClick={() => setSelected(null)} />
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
                <motion.button type="button" onClick={() => setSelected(null)} whileHover={{ rotate: 90, scale: 1.08 }} whileTap={{ scale: 0.9 }} className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/55 text-white backdrop-blur" aria-label="Close">
                  <HiX className="h-5 w-5" />
                </motion.button>
                <motion.button type="button" onClick={() => setFullScreen(true)} whileHover={{ scale: 1.01 }} className="group relative block w-full cursor-pointer bg-gray-950 p-2 sm:p-4" aria-label="View certificate full screen">
                  <CertificateImage src={selected.img_url} alt={selected.name} className="h-[55vh] w-full object-contain sm:h-[68vh]" />
                  <span className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/65 px-4 py-2 text-xs font-semibold text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                    <HiArrowsExpand className="h-4 w-4" /> View full screen
                  </span>
                </motion.button>
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selected.name}</h3>
                  {selected.description && <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">{selected.description}</p>}
                </div>
              </motion.article>
            </motion.div>
          )}

          {selected && fullScreen && (
            <motion.div
              className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 p-2 sm:p-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFullScreen(false)}
            >
              <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }} transition={{ type: "spring", stiffness: 260, damping: 24 }} className="relative flex h-full w-full items-center justify-center">
                <CertificateImage src={selected.img_url} alt={selected.name} className="max-h-full max-w-full object-contain" />
                <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-xs text-white backdrop-blur sm:bottom-5">Click anywhere or press Esc to close</span>
              </motion.div>
              <button type="button" onClick={(event) => { event.stopPropagation(); setFullScreen(false); }} className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 sm:right-5 sm:top-5" aria-label="Close full screen">
                <HiX className="h-5 w-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

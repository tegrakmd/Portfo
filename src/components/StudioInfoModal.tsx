import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { StudioModalPage } from './Header';

interface StudioInfoModalProps {
  page: StudioModalPage;
  onClose: () => void;
}

const PAGE_CONTENT: Record<
  Exclude<StudioModalPage, null>,
  {
    title: string;
    subtitle: string;
    paragraphs: string[];
    items?: { label: string; meta: string }[];
  }
> = {
  info: {
    title: 'Info',
    subtitle: 'Independent creative agency — Paris',
    paragraphs: [
      'Chromakey is an independent creative agency working across CGI, art direction, visual identity, motion design, and digital experiences.',
      'Partnering with cultural institutions, fashion houses, architectural practices, and progressive brands, we build cohesive visual systems where light, material, and code operate as one discipline.',
    ],
    items: [
      { label: 'Art Direction & Film', meta: 'Campaigns · Spatial · Editorial' },
      { label: 'CGI & 3D Direction', meta: 'Lookdev · Procedural · Stills & Motion' },
      { label: 'Digital Design & Develop', meta: 'Flagships · Interactive Archives' },
      { label: 'Visual Identity', meta: 'Brand Systems · Monographs · Packaging' },
    ],
  },
  journal: {
    title: 'Journal',
    subtitle: 'Notes, research & studio dispatches',
    paragraphs: [
      'Ongoing observations from our Paris studio on real-time rendering, tactile digital surfaces, and contemporary visual culture.',
    ],
    items: [
      { label: 'Material Behaviour in Digital Space', meta: 'October 2026 · Essay' },
      { label: 'Exhibition Notes: Cité Forme Residency', meta: 'September 2026 · Dispatch' },
      { label: 'Caustics & Glass Studies for Élan Paris', meta: 'August 2026 · Process' },
    ],
  },
  archive: {
    title: 'Archive',
    subtitle: 'Experimental studies & R&D — 2023–2026',
    paragraphs: [
      'Selected procedural tests, lighting studies, and unpublished prototypes from the Chromakey lab.',
    ],
    items: [
      { label: 'Study 044 — Liquid Chrome Concave Optics', meta: '2026 · Shader R&D' },
      { label: 'Study 039 — Botanical Fluid Suspension', meta: '2026 · Simulation' },
      { label: 'Study 031 — Brutalist Concrete Daylight', meta: '2025 · Architectural CGI' },
      { label: 'Study 024 — Monochromatic Rally Telemetry', meta: '2025 · Film & Web' },
    ],
  },
  contact: {
    title: 'Contact',
    subtitle: 'Do you have a proposal? Let’s discuss it.',
    paragraphs: [
      'Available for commissions, creative direction, CGI systems, and digital flagships worldwide from our studio in Paris.',
    ],
    items: [
      { label: 'New Business & Proposals', meta: 'Hello@chromakey.com' },
      { label: 'Studio Location', meta: 'Rue de Turenne, 75003 Paris, France' },
      { label: 'Social Channels', meta: 'Instagram · Are.na · Behance' },
    ],
  },
  privacy: {
    title: 'Privacy policy',
    subtitle: 'Effective October 2026 — Chromakey Studio SAS',
    paragraphs: [
      'Chromakey respects your privacy. We do not sell personal data or deploy cross-site advertising trackers.',
      'Project inquiries sent to Hello@chromakey.com are used solely to respond to studio proposals and collaborations in accordance with French and European GDPR regulations.',
    ],
  },
  license: {
    title: 'License',
    subtitle: 'Intellectual property & usage rights',
    paragraphs: [
      'All visual works, CGI sequences, photography, and typographic compositions showcased in this portfolio remain the intellectual property of Chromakey ©26 and respective commissioning clients.',
      'Reproduction or redistribution without written studio consent is prohibited.',
    ],
  },
};

export const StudioInfoModal: React.FC<StudioInfoModalProps> = ({
  page,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {page && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs"
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={PAGE_CONTENT[page].title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-20px)] max-w-[680px] bg-white text-black rounded-[12px] p-[24px] md:p-[32px] shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 mb-[24px]">
              <div>
                <h2 className="text-[32px] leading-[34px] tracking-[-1.4px] font-normal text-black m-0">
                  {PAGE_CONTENT[page].title}
                </h2>
                <p className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-[#9c9c9c] mt-[6px] mb-0">
                  {PAGE_CONTENT[page].subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="h-[28.2px] px-[10px] rounded-[5px] bg-[#f5f5f5] hover:bg-black text-black hover:text-white transition-colors duration-150 cursor-pointer text-[14px] whitespace-nowrap shrink-0 border-0"
              >
                Close
              </button>
            </div>

            <div className="flex flex-col gap-[12px]">
              {PAGE_CONTENT[page].paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className="text-[14px] leading-[20px] tracking-[-0.14px] text-[#303030] m-0"
                >
                  {p}
                </p>
              ))}
            </div>

            {PAGE_CONTENT[page].items && (
              <div className="mt-[24px] border-t border-black/10 pt-[12px] flex flex-col gap-[6px]">
                {PAGE_CONTENT[page].items!.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-[4px] border-b border-black/5 last:border-b-0"
                  >
                    <span className="text-[14px] text-black">{item.label}</span>
                    <span className="text-[14px] text-[#9c9c9c]">{item.meta}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

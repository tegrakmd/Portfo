import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChromeEmblemCanvas } from './ChromeEmblemCanvas';
import { ActivePage, getHeaderPageLabel } from '../utils/worksLogic';

export type StudioModalPage =
  | 'info'
  | 'journal'
  | 'archive'
  | 'contact'
  | 'privacy'
  | 'license'
  | null;

interface HeaderProps {
  activePage: ActivePage;
  isNavOpen: boolean;
  onToggleNav: () => void;
  onCloseNav: () => void;
  onNavigateIndex: () => void;
  onNavigateWorks: () => void;
  onNavigateInfo: () => void;
  onNavigateContact: () => void;
  onOpenStudioPage: (page: Exclude<StudioModalPage, null>) => void;
  formattedDate: string;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  isNavOpen,
  onToggleNav,
  onCloseNav,
  onNavigateIndex,
  onNavigateWorks,
  onNavigateInfo,
  onNavigateContact,
  onOpenStudioPage,
  formattedDate,
}) => {
  const isDarkTheme = activePage === 'index' || activePage === 'contact';

  const pageLabel = getHeaderPageLabel(activePage);

  const navItems: {
    label: string;
    action: () => void;
  }[] = [
    {
      label: 'Index',
      action: () => {
        onNavigateIndex();
        onCloseNav();
      },
    },
    {
      label: 'Works',
      action: () => {
        onNavigateWorks();
        onCloseNav();
      },
    },
    {
      label: 'Info',
      action: () => {
        onNavigateInfo();
        onCloseNav();
      },
    },
    {
      label: 'Journal',
      action: () => {
        onCloseNav();
        onOpenStudioPage('journal');
      },
    },
    {
      label: 'Archive',
      action: () => {
        onCloseNav();
        onOpenStudioPage('archive');
      },
    },
    {
      label: 'Contact',
      action: () => {
        onNavigateContact();
        onCloseNav();
      },
    },
  ];

  // Exact Chromakey header pill theme:
  // - Index (/) & Contact (/contact): dark frosted rgba(0, 0, 0, 0.2) with white text, inverting to white pill + black text on hover
  // - Works (/works): light frosted rgba(245, 245, 245, 0.6) with black text, inverting to black pill + white text on hover
  const staticPillClass = isDarkTheme
    ? 'bg-[rgba(0,0,0,0.2)] text-white'
    : 'bg-[rgba(245,245,245,0.6)] text-black';

  const interactivePillClass = isDarkTheme
    ? 'bg-[rgba(0,0,0,0.2)] text-white hover:bg-white hover:text-black'
    : 'bg-[rgba(245,245,245,0.6)] text-black hover:bg-black hover:text-white';

  const navButtonClass = isNavOpen
    ? isDarkTheme
      ? 'bg-white text-black'
      : 'bg-black text-white'
    : interactivePillClass;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-[15px] py-[10px] md:p-[10px] pointer-events-none">
        {/* Desktop 4-column top bar matching Chromakey exact 353.5px x 4 + 2px gap */}
        <div className="hidden md:grid grid-cols-4 gap-[2px] w-full pointer-events-auto">
          <div
            className={`h-[28.2px] px-[5px] rounded-[5px] backdrop-blur-[40px] flex items-center transition-colors duration-150 ${staticPillClass}`}
          >
            <p className="text-[14px] leading-[18.2px] tracking-[-0.14px] whitespace-nowrap shrink-0 m-0">
              {pageLabel}
            </p>
          </div>

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigateIndex();
              onCloseNav();
            }}
            className={`h-[28.2px] px-[5px] rounded-[5px] backdrop-blur-[40px] transition-colors duration-150 flex items-center whitespace-nowrap shrink-0 no-underline ${interactivePillClass}`}
          >
            <span className="text-[14px] leading-[18.2px] tracking-[-0.14px]">
              Tegrakmd 
            </span>
          </a>

          <a
            href="mailto:Hello@tegrakamanda.com"
            className={`h-[28.2px] px-[5px] rounded-[5px] backdrop-blur-[40px] transition-colors duration-150 flex items-center whitespace-nowrap shrink-0 no-underline ${interactivePillClass}`}
          >
            <span className="text-[14px] leading-[18.2px] tracking-[-0.14px]">
              Hello@Tegrakmd.com
            </span>
          </a>

          <button
            type="button"
            onClick={onToggleNav}
            aria-expanded={isNavOpen}
            aria-label={
              isNavOpen ? 'Hide navigation menu' : 'Open navigation menu'
            }
            className={`h-[28.2px] px-[5px] rounded-[5px] backdrop-blur-[40px] transition-colors duration-150 flex items-center text-left cursor-pointer whitespace-nowrap shrink-0 border-0 ${navButtonClass}`}
          >
            <span className="text-[14px] leading-[18.2px] tracking-[-0.14px]">
              {isNavOpen ? 'Hide' : 'Nav'}
            </span>
          </button>
        </div>

        {/* Mobile 2-column top bar matching Chromakey 15px horizontal inset & 25.6px height */}
        <div className="grid md:hidden grid-cols-2 gap-[2px] w-full pointer-events-auto">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigateIndex();
              onCloseNav();
            }}
            className={`h-[25.6px] px-[5px] rounded-[5px] backdrop-blur-[40px] flex items-center whitespace-nowrap shrink-0 no-underline transition-colors duration-150 ${staticPillClass}`}
          >
            <span className="text-[12px] leading-[15.6px] tracking-[-0.12px]">
              Tegrakmd 
            </span>
          </a>

          <button
            type="button"
            onClick={onToggleNav}
            aria-expanded={isNavOpen}
            aria-label={
              isNavOpen ? 'Hide navigation menu' : 'Open navigation menu'
            }
            className={`h-[25.6px] px-[5px] rounded-[5px] backdrop-blur-[40px] transition-colors duration-150 flex items-center justify-end cursor-pointer whitespace-nowrap shrink-0 border-0 ${
              isNavOpen
                ? isDarkTheme
                  ? 'bg-white text-black'
                  : 'bg-black text-white'
                : staticPillClass
            }`}
          >
            <span className="text-[12px] leading-[15.6px] tracking-[-0.12px]">
              {isNavOpen ? 'Hide' : 'Nav'}
            </span>
          </button>
        </div>
      </header>

      {/* Opened Dark Navigation Panel ("Desk" in Chromakey Framer) */}
      <AnimatePresence>
        {isNavOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={onCloseNav}
              className="fixed inset-0 z-30 bg-transparent"
              aria-hidden="true"
            />
            <motion.nav
              aria-label="Primary Studio Navigation"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-[7px] right-[7px] top-[41px] z-40 bg-black text-white rounded-[8px] p-[10px] pb-[48px] md:pb-[38px] md:h-[614px] flex flex-col justify-between overflow-hidden shadow-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-y-[24px] md:gap-x-[2px] items-start">
                {/* Col 1: Studio bio */}
                <div className="px-[2px] md:pr-[24px]">
                  <p className="max-w-[279px] text-[14px] leading-[18.2px] tracking-[-0.14px] text-white m-0">
                    Chromakey is an independent creative agency working across CGI
                  </p>
                </div>

                {/* Col 2: Navigation links */}
                <div className="flex flex-col gap-[1px]">
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={item.action}
                      className="w-full h-[28.2px] px-[5px] rounded-[5px] flex items-center text-left text-[14px] leading-[18.2px] tracking-[-0.14px] text-white hover:bg-white hover:text-black transition-colors duration-150 cursor-pointer whitespace-nowrap bg-transparent border-0"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Col 3: Proposal & Socials */}
                <div className="flex flex-col gap-[20px] px-[2px]">
                  <div className="flex flex-col gap-[5px]">
                    <p className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-[#9c9c9c] m-0">
                      Do you have a proposal? Let&apos;s discuss it.
                    </p>
                    <a
                      href="mailto:Hello@tegrakmd.com"
                      className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-white underline underline-offset-2 hover:opacity-75 transition-opacity w-fit"
                    >
                      Hello@Tegrakmd.com
                    </a>
                  </div>

                  <div className="flex flex-col gap-[2px]">
                    <a
                      href="https://www.instagram.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-white underline underline-offset-2 hover:opacity-75 transition-opacity w-fit"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://www.are.na/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-white underline underline-offset-2 hover:opacity-75 transition-opacity w-fit"
                    >
                      Are.na
                    </a>
                    <a
                      href="https://www.behance.net/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-white underline underline-offset-2 hover:opacity-75 transition-opacity w-fit"
                    >
                      Behance
                    </a>
                  </div>
                </div>

                {/* Col 4: Date & Location */}
                <div className="flex flex-col gap-[1px] px-[2px]">
                  <p className="font-switzer font-medium text-[14px] leading-[19.6px] tracking-normal text-white m-0">
                    {formattedDate}
                  </p>
                  <p className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-white m-0">
                    France, Paris
                  </p>
                </div>
              </div>

              {/* Center Metallic Chromakey Emblem */}
              <div className="mt-[32px] md:mt-0 flex items-center justify-center w-full">
                <ChromeEmblemCanvas />
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

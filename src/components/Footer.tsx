import React, { useState } from 'react';
import { StudioModalPage } from './Header';

interface FooterProps {
  formattedDate: string;
  onResetWorks: () => void;
  onOpenStudioPage: (page: Exclude<StudioModalPage, null>) => void;
}

export const Footer: React.FC<FooterProps> = ({
  formattedDate,
  onResetWorks,
  onOpenStudioPage,
}) => {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="w-full md:h-[720px] pt-[120px] md:pt-[179px] pb-[20px] px-[20px] bg-white flex flex-col justify-between gap-[96px] md:gap-0">
      {/* Center 630x281 Chromakey Emblem */}
      <div className="w-full flex items-center justify-center">
        {!logoError ? (
          <img
            src="/media/ck-logo.png"
            alt="Chromakey CK Emblem"
            referrerPolicy="no-referrer"
            onError={() => setLogoError(true)}
            className="w-full max-w-[630px] h-auto md:h-[281px] object-contain select-none"
          />
        ) : (
          <svg
            viewBox="0 0 630 281"
            className="w-full max-w-[630px] h-auto md:h-[281px]"
            aria-label="Chromakey CK Emblem"
          >
            <path
              d="M35 28 C145 140, 445 140, 555 28 L555 256 C445 144, 145 144, 35 256 Z"
              fill="#000000"
            />
            <text
              x="570"
              y="22"
              fill="#000000"
              fontSize="18"
              fontWeight="700"
              fontFamily="Raveo Variable, sans-serif"
            >
              CK
            </text>
          </svg>
        )}
      </div>

      {/* Bottom 4-column studio metadata grid aligned to bottom edge */}
      <div
        id="studio-contact"
        className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-[3px] gap-y-[28px] items-end"
      >
        {/* Col 1: Copyright & Descriptor */}
        <div>
          <a
            href="#works"
            onClick={(e) => {
              e.preventDefault();
              onResetWorks();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex flex-col gap-[1px] w-fit text-black no-underline hover:opacity-70 transition-opacity"
          >
            <p className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-black m-0">
              Chromakey ©26
            </p>
            <p className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-black m-0">
              Independent creative agency
            </p>
          </a>
        </div>

        {/* Col 2: Legal Links */}
        <div className="flex flex-col gap-[1px]">
          <button
            type="button"
            onClick={() => onOpenStudioPage('privacy')}
            className="text-left text-[14px] leading-[18.2px] tracking-[-0.14px] text-black underline underline-offset-2 hover:opacity-70 transition-opacity cursor-pointer bg-transparent border-0 p-0 w-fit"
          >
            Privacy policy
          </button>
          <button
            type="button"
            onClick={() => onOpenStudioPage('license')}
            className="text-left text-[14px] leading-[18.2px] tracking-[-0.14px] text-black underline underline-offset-2 hover:opacity-70 transition-opacity cursor-pointer bg-transparent border-0 p-0 w-fit"
          >
            License
          </button>
        </div>

        {/* Col 3: Dynamic Paris Date & Location */}
        <div>
          <a
            href="#works"
            onClick={(e) => {
              e.preventDefault();
              onResetWorks();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex flex-col gap-[1px] w-fit text-black no-underline hover:opacity-70 transition-opacity"
          >
            <p className="font-switzer font-medium text-[14px] leading-[19.6px] tracking-normal text-black m-0">
              {formattedDate}
            </p>
            <p className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-black m-0">
              France, Paris
            </p>
          </a>
        </div>

        {/* Col 4: Proposal CTA & Social Links */}
        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[5px]">
            <p className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-[#9c9c9c] m-0">
              Do you have a proposal? Let&apos;s discuss it.
            </p>
            <a
              href="mailto:Hello@chromakey.com"
              className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-black underline underline-offset-2 hover:opacity-70 transition-opacity w-fit"
            >
              Hello@chromakey.com
            </a>
          </div>

          <div className="flex flex-col gap-[2px]">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-black underline underline-offset-2 hover:opacity-70 transition-opacity w-fit"
            >
              Instagram
            </a>
            <a
              href="https://www.are.na/"
              target="_blank"
              rel="noreferrer"
              className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-black underline underline-offset-2 hover:opacity-70 transition-opacity w-fit"
            >
              Are.na
            </a>
            <a
              href="https://www.behance.net/"
              target="_blank"
              rel="noreferrer"
              className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-black underline underline-offset-2 hover:opacity-70 transition-opacity w-fit"
            >
              Behance
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

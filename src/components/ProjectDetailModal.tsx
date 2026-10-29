import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ProjectCategory, ProjectItem } from '../data/projects';
import { formatTimecode } from '../utils/worksLogic';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  nextProject?: ProjectItem;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
  onSelectCategory: (category: ProjectCategory) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  nextProject,
  onClose,
  onSelectProject,
  onSelectCategory,
}) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(5);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const coverRef = useRef<HTMLDivElement | null>(null);
  const desktopAboutRef = useRef<HTMLDivElement | null>(null);
  const mobileDrawerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!project) return;
    setIsInfoOpen(false);
    setIsPlaying(true);
    setCurrentTime(0);
    setDuration(5);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [project?.slug]);

  useEffect(() => {
    if (isInfoOpen) {
      if (desktopAboutRef.current) desktopAboutRef.current.scrollTop = 0;
      if (mobileDrawerRef.current) mobileDrawerRef.current.scrollTop = 0;
    }
  }, [isInfoOpen]);

  if (!project) return null;

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const handleFullscreen = () => {
    const el = coverRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    }
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !Number.isFinite(v.duration) || v.duration <= 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    v.currentTime = ratio * v.duration;
    setCurrentTime(v.currentTime);
  };

  const progressPercent =
    duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <article
      aria-label={`Project: ${project.title}`}
      className="min-h-screen w-full bg-black text-white font-raveo selection:bg-white selection:text-black"
    >
      {/* Desktop Fixed 4-Column Frosted Top Bar (1440px: 4 x 354.25px, gap 1px) */}
      <nav
        aria-label="Project navigation"
        className="fixed top-[10px] left-[10px] right-[10px] z-40 hidden md:grid md:grid-cols-4 gap-[1px]"
      >
        <div className="h-[28.2px] px-[5px] rounded-[4px] bg-[rgba(0,0,0,0.1)] backdrop-blur-[50px] flex items-center min-w-0">
          <h1 className="m-0 text-[14px] leading-[18.2px] tracking-[-0.14px] font-normal text-white truncate">
            <span className="mr-[4px]">Project:</span>
            <span>{project.title}</span>
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setIsInfoOpen((prev) => !prev)}
          aria-expanded={isInfoOpen}
          className={`h-[28.2px] px-[5px] rounded-[5px] backdrop-blur-[40px] flex items-center text-left text-[14px] leading-[18.2px] tracking-[-0.14px] font-normal transition-colors duration-150 cursor-pointer border-0 whitespace-nowrap ${
            isInfoOpen
              ? 'bg-white text-black'
              : 'bg-[rgba(0,0,0,0.1)] text-white hover:bg-white hover:text-black'
          }`}
        >
          Information
        </button>

        {nextProject ? (
          <button
            type="button"
            onClick={() => onSelectProject(nextProject)}
            className="h-[28.2px] px-[5px] rounded-[5px] bg-[rgba(0,0,0,0.1)] backdrop-blur-[40px] hover:bg-white text-white hover:text-black transition-colors duration-150 flex items-center gap-[10px] text-left text-[14px] leading-[18.2px] tracking-[-0.14px] font-normal cursor-pointer min-w-0 border-0"
          >
            <span className="shrink-0">Next:</span>
            <span className="truncate">{nextProject.title}</span>
          </button>
        ) : (
          <div />
        )}

        <button
          type="button"
          onClick={onClose}
          className="h-[28.2px] px-[5px] rounded-[5px] bg-[rgba(0,0,0,0.1)] backdrop-blur-[40px] hover:bg-white text-white hover:text-black transition-colors duration-150 flex items-center text-left text-[14px] leading-[18.2px] tracking-[-0.14px] font-normal cursor-pointer border-0 whitespace-nowrap"
        >
          Back
        </button>
      </nav>

      {/* Mobile Fixed 3-Row Frosted Top Bar (< 768px) */}
      <nav
        aria-label="Mobile project navigation"
        className="fixed top-[9px] left-[10px] right-[10px] z-40 flex md:hidden flex-col gap-[2px]"
      >
        <div className="h-[25.6px] px-[5px] rounded-[4px] bg-[rgba(0,0,0,0.1)] backdrop-blur-[40px] flex items-center text-[12px] leading-[15.6px] tracking-[-0.12px] text-white min-w-0">
          <span className="mr-[4px] shrink-0">Project:</span>
          <span className="truncate">{project.title}</span>
        </div>

        {nextProject && (
          <button
            type="button"
            onClick={() => onSelectProject(nextProject)}
            className="w-full h-[25.6px] px-[5px] rounded-[4px] bg-[rgba(0,0,0,0.1)] backdrop-blur-[40px] active:bg-white text-white active:text-black transition-colors duration-150 flex items-center gap-[8px] text-[12px] leading-[15.6px] tracking-[-0.12px] text-left cursor-pointer border-0 min-w-0"
          >
            <span className="shrink-0">Next:</span>
            <span className="truncate">{nextProject.title}</span>
          </button>
        )}

        <div className="grid grid-cols-2 gap-[2px]">
          <button
            type="button"
            onClick={() => setIsInfoOpen((prev) => !prev)}
            aria-expanded={isInfoOpen}
            className={`h-[25.6px] px-[5px] rounded-[4px] backdrop-blur-[40px] flex items-center text-left text-[12px] leading-[15.6px] tracking-[-0.12px] transition-colors duration-150 cursor-pointer border-0 ${
              isInfoOpen
                ? 'bg-white text-black'
                : 'bg-[rgba(0,0,0,0.1)] text-white'
            }`}
          >
            Information
          </button>

          <button
            type="button"
            onClick={onClose}
            className="h-[25.6px] px-[5px] rounded-[4px] bg-[rgba(0,0,0,0.1)] backdrop-blur-[40px] active:bg-white text-white active:text-black transition-colors duration-150 flex items-center text-left text-[12px] leading-[15.6px] tracking-[-0.12px] cursor-pointer border-0"
          >
            Back
          </button>
        </div>
      </nav>

      {/* 100vh Hero Cover */}
      <div
        ref={coverRef}
        className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center"
      >
        {project.mediaType === 'video' && project.videoSrc ? (
          <>
            <video
              key={project.videoSrc}
              ref={videoRef}
              src={project.videoSrc}
              poster={project.posterSrc}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              onLoadedMetadata={(e) => {
                if (Number.isFinite(e.currentTarget.duration)) {
                  setDuration(e.currentTarget.duration);
                }
              }}
              onTimeUpdate={(e) => {
                setCurrentTime(e.currentTarget.currentTime);
              }}
              className="w-full h-full object-cover block"
            />

            {/* Left-middle video HUD controls ("Play  0:00 / 0:05  -----  Sound  Full") */}
            <div className="absolute left-[20px] top-1/2 -translate-y-1/2 z-20 flex items-center gap-[16px] text-[13px] leading-[18px] tracking-[-0.13px] text-white">
              <button
                type="button"
                onClick={togglePlay}
                className="hover:opacity-70 transition-opacity cursor-pointer bg-transparent border-0 text-white p-0 whitespace-nowrap"
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>

              <span className="tabular-nums text-white/90 whitespace-nowrap">
                {formatTimecode(currentTime)} / {formatTimecode(duration)}
              </span>

              <div
                role="slider"
                tabIndex={0}
                aria-label="Video playback progress"
                aria-valuemin={0}
                aria-valuemax={Math.round(duration)}
                aria-valuenow={Math.round(currentTime)}
                onClick={handleScrub}
                onKeyDown={(e) => {
                  const v = videoRef.current;
                  if (!v) return;
                  if (e.key === 'ArrowRight') {
                    v.currentTime = Math.min(duration, v.currentTime + 1);
                  }
                  if (e.key === 'ArrowLeft') {
                    v.currentTime = Math.max(0, v.currentTime - 1);
                  }
                }}
                className="w-[100px] md:w-[150px] h-[16px] flex items-center cursor-pointer"
              >
                <div className="w-full h-[1px] bg-white/35 relative">
                  <div
                    className="absolute left-0 top-0 h-[1px] bg-white"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={toggleSound}
                className="hover:opacity-70 transition-opacity cursor-pointer bg-transparent border-0 text-white p-0 whitespace-nowrap"
              >
                {isMuted ? 'Sound' : 'Mute'}
              </button>

              <button
                type="button"
                onClick={handleFullscreen}
                className="hover:opacity-70 transition-opacity cursor-pointer bg-transparent border-0 text-white p-0 whitespace-nowrap"
              >
                Full
              </button>
            </div>
          </>
        ) : (
          <img
            src={project.posterSrc}
            alt={project.title}
            className="w-full h-full object-contain block"
          />
        )}
      </div>

      {/* Below-the-fold Editorial Case Study Gallery */}
      {project.galleryRows.length > 0 && (
        <section
          aria-label={`${project.title} gallery`}
          className="w-full bg-black flex flex-col gap-[1px]"
        >
          {project.galleryRows.map((row, index) => {
            if (row.type === 'plate') {
              return (
                <div
                  key={`${project.slug}-plate-${index}`}
                  className="w-full md:h-[960px] bg-black flex items-center justify-center overflow-hidden"
                >
                  <img
                    src={row.src}
                    alt={`${project.title} study ${index + 1}`}
                    loading="lazy"
                    className="w-full h-auto md:h-full object-contain block"
                  />
                </div>
              );
            }

            if (row.type === 'wide') {
              return (
                <div
                  key={`${project.slug}-wide-${index}`}
                  className="w-full aspect-[16/9] bg-black overflow-hidden"
                >
                  <img
                    src={row.src}
                    alt={`${project.title} frame ${index + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover block"
                  />
                </div>
              );
            }

            return (
              <div
                key={`${project.slug}-pair-${index}`}
                className="w-full grid grid-cols-1 md:grid-cols-2 bg-black"
              >
                <div className="aspect-square w-full bg-black overflow-hidden">
                  <img
                    src={row.leftSrc}
                    alt={`${project.title} detail ${index * 2 + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover block"
                  />
                </div>
                <div className="aspect-square w-full bg-black overflow-hidden">
                  <img
                    src={row.rightSrc}
                    alt={`${project.title} detail ${index * 2 + 2}`}
                    loading="lazy"
                    className="w-full h-full object-cover block"
                  />
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* Frosted Bottom Editorial Information Drawer */}
      <AnimatePresence>
        {isInfoOpen && (
          <>
            {/* Desktop 4-Column Frosted Drawer (x: 7.2, bottom: 10, h: 315) */}
            <motion.aside
              aria-label="Project information"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:block fixed left-[7.2px] right-[7.2px] bottom-[10px] h-[315px] z-40 rounded-[8px] p-[10px] bg-[rgba(0,0,0,0.3)] backdrop-blur-[40px] text-white overflow-hidden"
            >
              <div className="h-full grid grid-cols-4 gap-x-[40px]">
                {/* Col 1: Scrollable Editorial Narrative (About + Process & Outcome) */}
                <div
                  ref={desktopAboutRef}
                  className="h-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex flex-col gap-[20px]"
                >
                  {project.overview.map((paragraph, i) => (
                    <p
                      key={`overview-${i}`}
                      className="m-0 text-[14px] leading-[18.2px] tracking-[-0.14px] font-normal text-white"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {project.processOutcome.map((paragraph, i) => (
                    <p
                      key={`process-${i}`}
                      className="m-0 text-[14px] leading-[18.2px] tracking-[-0.14px] font-normal text-white"
                    >
                      {i === 0 && (
                        <span className="block font-medium text-white">
                          Process &amp; Outcome
                        </span>
                      )}
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Col 2: Transparent Frosted Spacer */}
                <div aria-hidden="true" />

                {/* Col 3: Inline Details (top) + Inline Underlined Credits (bottom) */}
                <div className="h-full flex flex-col justify-between min-w-0">
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-[8px] h-[18.2px] text-[14px] leading-[18.2px] tracking-[-0.14px]">
                      <span className="text-[#9c9c9c] shrink-0">Project:</span>
                      <span className="text-white truncate">{project.title}</span>
                    </div>

                    <div className="flex items-baseline gap-[8px] h-[18.2px] text-[14px] leading-[18.2px] tracking-[-0.14px]">
                      <span className="text-[#9c9c9c] shrink-0">Client:</span>
                      <span className="text-white truncate">{project.brand}</span>
                    </div>

                    <div className="flex items-baseline gap-[8px] h-[18.2px] text-[14px] leading-[18.2px] tracking-[-0.14px]">
                      <span className="text-[#9c9c9c] shrink-0">Industry:</span>
                      <span className="text-white truncate">
                        {project.industry}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-[8px] flex-wrap min-h-[18.2px] text-[14px] leading-[18.2px] tracking-[-0.14px]">
                      <span className="text-[#9c9c9c] shrink-0">Service:</span>
                      {project.roles.map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => onSelectCategory(role)}
                          className="p-0 bg-transparent border-0 text-[14px] leading-[18.2px] tracking-[-0.14px] font-normal text-white hover:underline underline-offset-[2px] cursor-pointer"
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    {project.credits.map((credit) => (
                      <div
                        key={`${credit.role}-${credit.name}`}
                        className="flex items-baseline gap-[8px] h-[19.6px] min-w-0"
                      >
                        <span className="font-switzer font-medium text-[14px] leading-[19.6px] tracking-[0.14px] text-[#9c9c9c] shrink-0">
                          {credit.role}
                        </span>
                        <span className="text-[14px] leading-[18.2px] tracking-[-0.14px] font-normal text-white underline underline-offset-[2px] truncate">
                          {credit.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Col 4: Hide Action */}
                <div className="flex items-start">
                  <button
                    type="button"
                    onClick={() => setIsInfoOpen(false)}
                    className="w-full h-[28.2px] px-[5px] rounded-[5px] bg-transparent hover:bg-white text-white hover:text-black transition-colors duration-150 flex items-center text-left text-[14px] leading-[18.2px] tracking-[-0.14px] font-normal border-0 cursor-pointer"
                  >
                    Hide
                  </button>
                </div>
              </div>
            </motion.aside>

            {/* Mobile Stacked Frosted Drawer (< 768px) */}
            <motion.aside
              ref={mobileDrawerRef}
              aria-label="Mobile project information"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 14 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden fixed left-[10px] right-[10px] top-[98px] bottom-[80px] z-40 rounded-[8px] p-[10px] bg-[rgba(0,0,0,0.45)] backdrop-blur-[40px] text-white overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex flex-col"
            >
              <button
                type="button"
                onClick={() => setIsInfoOpen(false)}
                className="w-full h-[25.6px] px-[5px] rounded-[5px] bg-transparent active:bg-white text-white active:text-black transition-colors duration-150 flex items-center text-left text-[12px] leading-[15.6px] tracking-[-0.12px] font-normal border-0 cursor-pointer shrink-0 mb-[34px]"
              >
                Hide
              </button>

              <div className="flex flex-col mb-[20px]">
                <div className="flex items-baseline gap-[8px] h-[15.6px] text-[12px] leading-[15.6px] tracking-[-0.12px]">
                  <span className="text-[#9c9c9c] shrink-0">Project:</span>
                  <span className="text-white truncate">{project.title}</span>
                </div>
                <div className="flex items-baseline gap-[8px] h-[15.6px] text-[12px] leading-[15.6px] tracking-[-0.12px]">
                  <span className="text-[#9c9c9c] shrink-0">Client:</span>
                  <span className="text-white truncate">{project.brand}</span>
                </div>
                <div className="flex items-baseline gap-[8px] h-[15.6px] text-[12px] leading-[15.6px] tracking-[-0.12px]">
                  <span className="text-[#9c9c9c] shrink-0">Industry:</span>
                  <span className="text-white truncate">{project.industry}</span>
                </div>
                <div className="flex items-baseline gap-[8px] flex-wrap min-h-[15.6px] text-[12px] leading-[15.6px] tracking-[-0.12px]">
                  <span className="text-[#9c9c9c] shrink-0">Service:</span>
                  {project.roles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => onSelectCategory(role)}
                      className="p-0 bg-transparent border-0 text-[12px] leading-[15.6px] tracking-[-0.12px] font-normal text-white underline-offset-[2px] hover:underline cursor-pointer"
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col mb-[36px]">
                {project.credits.map((credit) => (
                  <div
                    key={`mob-${credit.role}-${credit.name}`}
                    className="flex items-baseline gap-[8px] h-[16.8px] min-w-0"
                  >
                    <span className="font-switzer font-medium text-[12px] leading-[16.8px] tracking-[0.12px] text-[#9c9c9c] shrink-0">
                      {credit.role}
                    </span>
                    <span className="text-[12px] leading-[15.6px] tracking-[-0.12px] font-normal text-white underline underline-offset-[2px] truncate">
                      {credit.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-[20px]">
                {project.overview.map((paragraph, i) => (
                  <p
                    key={`mob-overview-${i}`}
                    className="m-0 text-[12px] leading-[15.6px] tracking-[-0.12px] font-normal text-white"
                  >
                    {paragraph}
                  </p>
                ))}

                {project.processOutcome.map((paragraph, i) => (
                  <p
                    key={`mob-process-${i}`}
                    className="m-0 text-[12px] leading-[15.6px] tracking-[-0.12px] font-normal text-white"
                  >
                    {i === 0 && (
                      <span className="block font-medium text-white">
                        Process &amp; Outcome
                      </span>
                    )}
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </article>
  );
};

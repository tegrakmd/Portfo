import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  CategoryFilter,
  ProjectCategory,
  ProjectItem,
} from '../data/projects';
import {
  clampScrollProgress,
  computeIndexSlideStates,
  getActiveIndexSlide,
} from '../utils/worksLogic';

interface IndexShowcaseProps {
  projects: ProjectItem[];
  onOpenProject: (project: ProjectItem) => void;
  onSelectCategory: (category: CategoryFilter) => void;
}

export const IndexShowcase: React.FC<IndexShowcaseProps> = ({
  projects,
  onOpenProject,
  onSelectCategory,
}) => {
  const totalSlides = projects.length;

  const initialProgress = useMemo(() => {
    if (typeof window === 'undefined') return 0;
    return clampScrollProgress(
      window.scrollY,
      window.innerHeight,
      totalSlides
    );
  }, [totalSlides]);

  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(() =>
    getActiveIndexSlide(initialProgress, totalSlides)
  );

  const initialStates = useMemo(
    () => computeIndexSlideStates(initialProgress, totalSlides),
    [initialProgress, totalSlides]
  );

  const revealMediaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const targetProgressRef = useRef<number>(initialProgress);
  const currentProgressRef = useRef<number>(initialProgress);
  const activeIdxRef = useRef<number>(activeSlideIndex);
  const rafIdRef = useRef<number | null>(null);

  // Scroll-driven horizontal curtain wipe (compositor clip-path via refs, zero 60Hz React re-renders)
  useEffect(() => {
    if (typeof window === 'undefined' || totalSlides === 0) return;

    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    const applyProgressToDom = (progress: number) => {
      for (let i = 0; i < totalSlides; i++) {
        const el = revealMediaRefs.current[i];
        if (!el) continue;
        if (i === 0) {
          el.style.clipPath = 'inset(0%)';
        } else {
          const localWipe = Math.max(0, Math.min(1, progress - (i - 1)));
          const rightInset = (1 - localWipe) * 100;
          el.style.clipPath =
            rightInset <= 0.01
              ? 'inset(0%)'
              : `inset(0% ${rightInset.toFixed(3)}% 0% 0%)`;
        }
      }

      const nextActive = getActiveIndexSlide(progress, totalSlides);
      if (nextActive !== activeIdxRef.current) {
        activeIdxRef.current = nextActive;
        setActiveSlideIndex(nextActive);
      }
    };

    const tick = () => {
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const diff = target - current;

      if (reducedMotionQuery.matches || Math.abs(diff) < 0.0008) {
        currentProgressRef.current = target;
        applyProgressToDom(target);
        rafIdRef.current = null;
        return;
      }

      const next = current + diff * 0.24;
      currentProgressRef.current = next;
      applyProgressToDom(next);
      rafIdRef.current = window.requestAnimationFrame(tick);
    };

    const handleScrollOrResize = () => {
      targetProgressRef.current = clampScrollProgress(
        window.scrollY,
        window.innerHeight,
        totalSlides
      );
      if (rafIdRef.current === null) {
        rafIdRef.current = window.requestAnimationFrame(tick);
      }
    };

    // Sync immediately on mount
    handleScrollOrResize();

    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [totalSlides]);

  // Play videos near the active slide and pause distant hidden ones for smooth performance
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (Math.abs(idx - activeSlideIndex) <= 2) {
        if (video.paused) {
          video.play().catch(() => {});
        }
      } else if (!video.paused) {
        video.pause();
      }
    });
  }, [activeSlideIndex]);

  return (
    <section
      aria-label="Featured Works Showcase"
      data-active-slide={activeSlideIndex}
      className="relative w-full bg-black select-none"
      style={{ height: `${totalSlides * 100}vh` }}
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black">
        {projects.map((project, idx) => {
          const isActive = idx === activeSlideIndex;
          const initialClip =
            initialStates[idx]?.clipPath ??
            (idx === 0 ? 'inset(0%)' : 'inset(0% 100% 0% 0%)');

          return (
            <article
              key={project.id}
              aria-hidden={!isActive}
              className={`absolute inset-0 w-full h-full overflow-hidden ${
                isActive ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
              style={{ zIndex: idx + 1 }}
            >
              {/* RevealMedia: clipped left-to-right on scroll */}
              <div
                ref={(el) => {
                  revealMediaRefs.current[idx] = el;
                }}
                className="absolute inset-0 w-full h-full will-change-[clip-path]"
                style={{
                  clipPath: initialClip,
                  backgroundColor: project.accentBg,
                }}
              >
                <img
                  src={project.posterSrc}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  loading={idx <= 2 ? 'eager' : 'lazy'}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {project.mediaType === 'video' && project.videoSrc && (
                  <video
                    ref={(el) => {
                      videoRefs.current[idx] = el;
                    }}
                    src={project.videoSrc}
                    poster={project.posterSrc}
                    autoPlay={idx <= 2}
                    muted
                    loop
                    playsInline
                    preload={idx <= 2 ? 'auto' : 'metadata'}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}

                {/* Exact Chromakey "First" subtle scrim rgba(0, 0, 0, 0.1) */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-black/10 pointer-events-none"
                />
              </div>

              {/* Full-slide interactive project trigger */}
              <button
                type="button"
                tabIndex={isActive ? 0 : -1}
                onClick={() => onOpenProject(project)}
                aria-label={`${project.num} ${project.title} — ${project.brand}`}
                className="absolute inset-0 w-full h-full z-[2] bg-transparent border-0 p-0 cursor-pointer focus-visible:outline-none"
              />

              {/* Centered Cover + RevealText (outside clip-path, matching Chromakey Index) */}
              <div className="relative z-[9] w-full h-full p-[5px] flex items-center justify-center pointer-events-none">
                <div
                  className={`w-full grid grid-cols-2 md:grid-cols-4 gap-x-[3px] gap-y-[20px] transition-opacity duration-350 will-change-[opacity] ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {/* Col 1 (Desktop only): Num */}
                  <div className="hidden md:flex items-center h-[28.2px] p-[5px] border-b border-white">
                    <p className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-white m-0 tabular-nums">
                      {project.num}
                    </p>
                  </div>

                  {/* Col 2 (Mobile Col 1): Project Title ("Client" in Framer) */}
                  <div className="flex items-center h-[25.6px] md:h-[28.2px] px-[5px] py-[3.7px] md:p-[5px] border-b border-white min-w-0">
                    <p className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-white m-0 whitespace-nowrap truncate">
                      {project.title}
                    </p>
                  </div>

                  {/* Col 3 (Mobile Col 2): Services / Disciplines */}
                  <div
                    className={`flex items-center gap-[10px] h-[25.6px] md:h-[28.2px] px-[5px] py-[3.7px] md:p-[5px] border-b border-white min-w-0 ${
                      isActive ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                  >
                    {project.roles.map((role: ProjectCategory) => (
                      <a
                        key={role}
                        href={`/works?category=${encodeURIComponent(role)}`}
                        tabIndex={isActive ? 0 : -1}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onSelectCategory(role);
                        }}
                        className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-white hover:opacity-70 transition-opacity duration-150 no-underline whitespace-nowrap shrink-0"
                      >
                        {role}
                      </a>
                    ))}
                  </div>

                  {/* Col 4 (Desktop only): Industry */}
                  <div className="hidden md:flex items-center h-[28.2px] p-[5px] border-b border-white min-w-0">
                    <p className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-white m-0 whitespace-nowrap truncate">
                      {project.industry}
                    </p>
                  </div>

                  {/* Row 2: Brand Display Heading */}
                  <div className="col-span-2 md:col-span-4 flex items-center p-[4px]">
                    {isActive ? (
                      <h1 className="text-[24px] leading-[24px] tracking-[-0.96px] md:text-[56px] md:leading-[50.4px] md:tracking-[-2.8px] font-normal text-white pb-[5px] m-0">
                        {project.brand}
                      </h1>
                    ) : (
                      <p className="text-[24px] leading-[24px] tracking-[-0.96px] md:text-[56px] md:leading-[50.4px] md:tracking-[-2.8px] font-normal text-white pb-[5px] m-0">
                        {project.brand}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { formatTimecode } from '../utils/worksLogic';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(14.5);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setIsPlaying(true);
    setCurrentTime(0);

    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.muted = false;
      setIsMuted(false);
      v.play().catch(() => {
        // Fallback to muted autoplay if browser autoplay policy requires it
        v.muted = true;
        setIsMuted(true);
        v.play().catch(() => {
          setIsPlaying(false);
        });
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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
    const el = containerRef.current;
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Chromakey Studio Showreel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[60] bg-black text-white overflow-hidden"
        >
          <img
            src="/media/info-showreel.jpg"
            alt="Chromakey Showreel"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <video
            ref={videoRef}
            src="/media/info-showreel.mp4"
            poster="/media/info-showreel.jpg"
            autoPlay
            muted={isMuted}
            loop
            playsInline
            onClick={togglePlay}
            onLoadedMetadata={(e) => {
              if (Number.isFinite(e.currentTarget.duration)) {
                setDuration(e.currentTarget.duration);
              }
            }}
            onTimeUpdate={(e) => {
              setCurrentTime(e.currentTarget.currentTime);
            }}
            className="absolute inset-0 w-full h-full object-cover cursor-pointer"
          />

          <div className="absolute inset-0 bg-black/15 pointer-events-none" />

          {/* Top Hide control aligned with Chromakey showreel Col 4 (x: 1125, y: 25 on 1440x900) */}
          <div className="fixed top-[20px] md:top-[25px] left-0 right-0 z-20 px-[20px] md:px-[10px] grid grid-cols-2 md:grid-cols-4 pointer-events-none">
            <div className="hidden md:block md:col-span-3" />
            <div className="col-span-2 md:col-span-1 flex justify-end md:justify-start md:pl-[48px] pointer-events-auto">
              <button
                type="button"
                onClick={onClose}
                aria-label="Hide showreel"
                className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-white hover:opacity-70 transition-opacity cursor-pointer bg-transparent border-0 p-0 whitespace-nowrap"
              >
                Hide
              </button>
            </div>
          </div>

          {/* Left-middle video HUD controls ("Play  0:00 / 0:14  -----  Sound  Full") */}
          <div className="fixed left-[20px] top-1/2 -translate-y-1/2 z-20 flex items-center gap-[18px] text-[13px] leading-[16px] tracking-[-0.13px] text-white">
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
              aria-label="Showreel playback progress"
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
              className="w-[110px] md:w-[162px] h-[16px] flex items-center cursor-pointer"
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

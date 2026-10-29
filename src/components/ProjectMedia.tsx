import React, { useState } from 'react';
import { ProjectItem } from '../data/projects';

interface ProjectMediaProps {
  project: ProjectItem;
  className?: string;
  autoPlay?: boolean;
}

export const ProjectMedia: React.FC<ProjectMediaProps> = ({
  project,
  className = '',
  autoPlay = true,
}) => {
  const [imgFailed, setImgFailed] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
      style={{ backgroundColor: project.accentBg }}
    >
      {!imgFailed && (
        <img
          src={project.posterSrc}
          alt={`${project.title} — ${project.brand}`}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setImgFailed(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {project.mediaType === 'video' && project.videoSrc && !videoFailed && (
        <video
          src={project.videoSrc}
          poster={project.posterSrc}
          autoPlay={autoPlay}
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setVideoFailed(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {imgFailed && videoFailed && (
        <div className="absolute inset-0 flex items-center justify-center p-6 text-white/70 text-[14px]">
          <span>{project.title}</span>
        </div>
      )}
    </div>
  );
};

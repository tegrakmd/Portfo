import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CategoryFilter, ProjectItem } from '../data/projects';
import { ProjectMedia } from './ProjectMedia';

interface ProjectsListProps {
  projects: ProjectItem[];
  onOpenProject: (project: ProjectItem) => void;
  onSelectCategory: (category: CategoryFilter) => void;
}

export const ProjectsList: React.FC<ProjectsListProps> = ({
  projects,
  onOpenProject,
  onSelectCategory,
}) => {
  const [hoveredProject, setHoveredProject] = useState<ProjectItem | null>(null);

  if (projects.length === 0) {
    return (
      <section className="w-full py-[120px] flex flex-col items-center justify-center gap-3 text-center">
        <p className="text-[14px] text-[#9c9c9c]">No works found in this discipline.</p>
        <button
          type="button"
          onClick={() => onSelectCategory('All')}
          className="h-[28.2px] px-[10px] rounded-[5px] bg-[#f5f5f5] hover:bg-black text-black hover:text-white transition-colors duration-150 cursor-pointer text-[14px]"
        >
          Show All Works
        </button>
      </section>
    );
  }

  return (
    <section aria-label="Selected Works List" className="w-full relative">
      {/* 4-column table header with 3px white breaks between black underlines */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-[3px] mb-[5px]">
        <div className="h-[28px] px-[5px] flex items-center border-b border-black">
          <span className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-black">
            Num
          </span>
        </div>
        <div className="h-[28px] px-[5px] flex items-center border-b border-black">
          <span className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-black">
            Project
          </span>
        </div>
        <div className="hidden md:flex h-[28px] px-[5px] items-center border-b border-black">
          <span className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-black">
            Brand
          </span>
        </div>
        <div className="hidden md:flex h-[28px] px-[5px] items-center border-b border-black">
          <span className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-black">
            Role
          </span>
        </div>
      </div>

      {/* Rows */}
      <div
        className="flex flex-col gap-[1px]"
        onMouseLeave={() => setHoveredProject(null)}
      >
        {projects.map((project) => (
          <a
            key={project.id}
            href={`#works/${project.slug}`}
            onClick={(e) => {
              e.preventDefault();
              onOpenProject(project);
            }}
            onMouseEnter={() => setHoveredProject(project)}
            onFocus={() => setHoveredProject(project)}
            onBlur={() => setHoveredProject(null)}
            className="grid grid-cols-2 md:grid-cols-4 gap-x-[3px] group cursor-pointer no-underline focus-visible:outline-2 focus-visible:outline-black rounded-[5px]"
          >
            <div className="h-[28.2px] px-[5px] rounded-[5px] flex items-center transition-colors duration-150 group-hover:bg-black">
              <span className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-black group-hover:text-white">
                {project.num}
              </span>
            </div>

            <div className="h-[28.2px] px-[5px] rounded-[5px] flex items-center transition-colors duration-150 group-hover:bg-black min-w-0">
              <span className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-black group-hover:text-white truncate">
                {project.title}
              </span>
            </div>

            <div className="hidden md:flex h-[28.2px] px-[5px] rounded-[5px] items-center transition-colors duration-150 group-hover:bg-black min-w-0">
              <span className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-[#9c9c9c] group-hover:text-white truncate">
                {project.brand}
              </span>
            </div>

            <div className="hidden md:flex h-[28.2px] px-[5px] rounded-[5px] items-center gap-[8px] transition-colors duration-150 group-hover:bg-black min-w-0">
              {project.roles.map((role) => (
                <span
                  key={role}
                  className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-[#9c9c9c] group-hover:text-white whitespace-nowrap"
                >
                  {role}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>

      {/* Centered floating media preview on desktop row hover matching Chromakey List view */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            key={hoveredProject.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
            className="hidden lg:block fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[412px] h-[420px] z-20 pointer-events-none overflow-hidden shadow-lg"
          >
            <ProjectMedia project={hoveredProject} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

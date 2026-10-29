import React from 'react';
import {
  CategoryFilter,
  ProjectCategory,
  ProjectItem,
} from '../data/projects';
import { ProjectMedia } from './ProjectMedia';

interface ProjectsGridProps {
  projects: ProjectItem[];
  onOpenProject: (project: ProjectItem) => void;
  onSelectCategory: (category: CategoryFilter) => void;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({
  projects,
  onOpenProject,
  onSelectCategory,
}) => {
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
    <section
      aria-label="Selected Works Grid"
      className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3px]"
    >
      {projects.map((project) => (
        <article
          key={project.id}
          className="relative w-full h-[460px] md:h-[482px] rounded-[16px] overflow-hidden bg-black/10 group"
        >
          {/* Main clickable project link covering the card */}
          <a
            href={`#works/${project.slug}`}
            onClick={(e) => {
              e.preventDefault();
              onOpenProject(project);
            }}
            aria-label={`${project.num} ${project.title} — ${project.roles.join(', ')}`}
            className="block w-full h-full relative focus-visible:outline-2 focus-visible:outline-black"
          >
            <div className="w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
              <ProjectMedia project={project} />
            </div>

            {/* Subtle luminance scrim so white typography stays 100% legible */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300 pointer-events-none"
            />
          </a>

          {/* Exact Chromakey 3-line RevealText overlay: top-aligned on mobile, vertically centered on desktop */}
          <div className="pointer-events-none absolute inset-x-[16px] top-[16px] md:inset-x-[17px] md:top-1/2 md:-translate-y-1/2 md:py-[20px] flex flex-col gap-[3px] z-10">
            <div className="flex items-center pl-[2px]">
              <p className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-white m-0">
                {project.num}
              </p>
            </div>

            <div className="flex items-center justify-end">
              <p className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-white text-right m-0 whitespace-nowrap">
                {project.title}
              </p>
            </div>

            <div className="flex items-center justify-end gap-[8px] pointer-events-auto">
              {project.roles.map((role: ProjectCategory) => (
                <button
                  key={role}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCategory(role);
                  }}
                  aria-label={`Filter by ${role} (${project.title})`}
                  className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-white/65 hover:text-white transition-colors duration-150 cursor-pointer p-0 bg-transparent border-0 whitespace-nowrap"
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

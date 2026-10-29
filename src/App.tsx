/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CategoryFilter,
  PROJECTS,
  ProjectItem,
  ViewMode,
} from './data/projects';
import {
  ActivePage,
  InfoSubPage,
  filterProjectsByCategory,
  findProjectBySlug,
  formatStudioDate,
  getNextProject,
  getProjectRoutePath,
  getRoutePath,
  isInfoSectionPage,
  parseRouteState,
} from './utils/worksLogic';
import { Header, StudioModalPage } from './components/Header';
import { IndexShowcase } from './components/IndexShowcase';
import { ContactPage } from './components/ContactPage';
import { InfoPage } from './components/InfoPage';
import { WorksControls } from './components/WorksControls';
import { ProjectsGrid } from './components/ProjectsGrid';
import { ProjectsList } from './components/ProjectsList';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { StudioInfoModal } from './components/StudioInfoModal';
import { Footer } from './components/Footer';

export default function App() {
  const initial = useMemo(() => {
    if (typeof window === 'undefined') {
      return {
        page: 'index' as ActivePage,
        category: 'All' as CategoryFilter,
        viewMode: 'grid' as ViewMode,
        projectSlug: null,
      };
    }
    return parseRouteState(window.location.pathname, window.location.search);
  }, []);

  const [activePage, setActivePage] = useState<ActivePage>(initial.page);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>(
    initial.category
  );
  const [viewMode, setViewMode] = useState<ViewMode>(initial.viewMode);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    () => findProjectBySlug(PROJECTS, initial.projectSlug)
  );
  const [studioPage, setStudioPage] = useState<StudioModalPage>(null);

  const formattedDate = useMemo(() => formatStudioDate(new Date()), []);

  const filteredProjects = useMemo(
    () => filterProjectsByCategory(PROJECTS, activeCategory),
    [activeCategory]
  );

  const nextProject = useMemo(
    () =>
      selectedProject
        ? getNextProject(PROJECTS, selectedProject.slug)
        : undefined,
    [selectedProject]
  );

  // Sync URL pathname & query parameters cleanly (/works/<slug> when a project is open)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let nextUrl: string;
    if (selectedProject) {
      nextUrl = getProjectRoutePath(selectedProject.slug);
    } else {
      const params = new URLSearchParams();
      if (activePage === 'works') {
        if (activeCategory !== 'All') {
          params.set('category', activeCategory);
        }
        if (viewMode === 'list') {
          params.set('view', 'list');
        }
      }
      const basePath = getRoutePath(activePage);
      const query = params.toString();
      nextUrl = `${basePath}${query ? `?${query}` : ''}`;
    }

    const currentUrl = `${window.location.pathname}${window.location.search}`;
    if (currentUrl !== nextUrl) {
      window.history.pushState(null, '', nextUrl);
    }
  }, [activePage, activeCategory, viewMode, selectedProject]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handlePopState = () => {
      const parsed = parseRouteState(
        window.location.pathname,
        window.location.search
      );
      setActivePage(parsed.page);
      setActiveCategory(parsed.category);
      setViewMode(parsed.viewMode);
      setSelectedProject(findProjectBySlug(PROJECTS, parsed.projectSlug));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Global Escape handler for overlays and modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedProject) {
          setSelectedProject(null);
          window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        } else if (studioPage) {
          setStudioPage(null);
        } else if (isNavOpen) {
          setIsNavOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, studioPage, isNavOpen]);

  const handleOpenProject = useCallback((project: ProjectItem) => {
    setIsNavOpen(false);
    setStudioPage(null);
    setSelectedProject(project);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const handleCloseProject = useCallback(() => {
    setSelectedProject(null);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const handleNavigateIndex = useCallback(() => {
    setActivePage('index');
    setSelectedProject(null);
    setStudioPage(null);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const handleNavigateWorks = useCallback((category: CategoryFilter = 'All') => {
    setActivePage('works');
    setActiveCategory(category);
    setSelectedProject(null);
    setStudioPage(null);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const handleNavigateInfo = useCallback((subPage: InfoSubPage = 'info') => {
    setActivePage(subPage);
    setSelectedProject(null);
    setStudioPage(null);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const handleNavigateContact = useCallback(() => {
    setActivePage('contact');
    setSelectedProject(null);
    setStudioPage(null);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const isDarkPage =
    Boolean(selectedProject) ||
    activePage === 'index' ||
    activePage === 'contact';

  return (
    <div
      className={`min-h-screen font-raveo selection:bg-black selection:text-white ${
        isDarkPage ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      {selectedProject ? (
        <ProjectDetailModal
          project={selectedProject}
          nextProject={nextProject}
          onClose={handleCloseProject}
          onSelectProject={handleOpenProject}
          onSelectCategory={(category) => handleNavigateWorks(category)}
        />
      ) : (
        <>
          <Header
            activePage={activePage}
            isNavOpen={isNavOpen}
            onToggleNav={() => setIsNavOpen((prev) => !prev)}
            onCloseNav={() => setIsNavOpen(false)}
            onNavigateIndex={handleNavigateIndex}
            onNavigateWorks={() => handleNavigateWorks('All')}
            onNavigateInfo={() => handleNavigateInfo('info')}
            onNavigateContact={handleNavigateContact}
            onOpenStudioPage={(page) => setStudioPage(page)}
            formattedDate={formattedDate}
          />

          {activePage === 'index' ? (
            <main className="w-full bg-black">
              <IndexShowcase
                projects={PROJECTS}
                onOpenProject={handleOpenProject}
                onSelectCategory={(category) => handleNavigateWorks(category)}
              />
            </main>
          ) : activePage === 'contact' ? (
            <main className="w-full bg-black">
              <ContactPage />
            </main>
          ) : isInfoSectionPage(activePage) ? (
            <main className="w-full bg-white">
              <InfoPage
                subPage={activePage}
                onSelectSubPage={(sub) => handleNavigateInfo(sub)}
                featuredProjects={PROJECTS}
                onOpenProject={handleOpenProject}
              />
            </main>
          ) : (
            <>
              <main className="w-full px-[10px] pb-[5px] bg-white">
                <WorksControls
                  activeCategory={activeCategory}
                  onSelectCategory={(category) => setActiveCategory(category)}
                  viewMode={viewMode}
                  onSelectViewMode={(mode) => setViewMode(mode)}
                />

                {viewMode === 'grid' ? (
                  <ProjectsGrid
                    projects={filteredProjects}
                    onOpenProject={handleOpenProject}
                    onSelectCategory={(category) => {
                      setActiveCategory(category);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                ) : (
                  <ProjectsList
                    projects={filteredProjects}
                    onOpenProject={handleOpenProject}
                    onSelectCategory={(category) => setActiveCategory(category)}
                  />
                )}
              </main>

              <Footer
                formattedDate={formattedDate}
                onResetWorks={() => handleNavigateWorks('All')}
                onOpenStudioPage={(page) => setStudioPage(page)}
              />
            </>
          )}
        </>
      )}

      <StudioInfoModal page={studioPage} onClose={() => setStudioPage(null)} />
    </div>
  );
}

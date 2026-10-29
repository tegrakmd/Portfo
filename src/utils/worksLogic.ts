import {
  CategoryFilter,
  FILTER_CATEGORIES,
  ProjectItem,
  ViewMode,
} from '../data/projects';

export type InfoSubPage = 'info' | 'approach' | 'service' | 'clients';

export type ActivePage = 'index' | 'works' | 'contact' | InfoSubPage;

export function isInfoSectionPage(page: ActivePage): page is InfoSubPage {
  return (
    page === 'info' ||
    page === 'approach' ||
    page === 'service' ||
    page === 'clients'
  );
}

export function getHeaderPageLabel(page: ActivePage): string {
  switch (page) {
    case 'index':
      return 'Index';
    case 'contact':
      return 'Contact';
    case 'info':
      return 'Info';
    case 'approach':
      return 'Approach';
    case 'service':
      return 'Service';
    case 'clients':
      return 'Clients';
    case 'works':
    default:
      return 'Works';
  }
}

export function getRoutePath(page: ActivePage): string {
  switch (page) {
    case 'works':
      return '/works';
    case 'contact':
      return '/contact';
    case 'info':
      return '/info';
    case 'approach':
      return '/approach';
    case 'service':
      return '/service';
    case 'clients':
      return '/clients';
    case 'index':
    default:
      return '/';
  }
}

export function getProjectRoutePath(slug: string): string {
  return `/works/${slug}`;
}

export function normalizeProjectSlug(slug: string): string {
  return slug
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function findProjectBySlug(
  projects: ProjectItem[],
  slug: string | null | undefined
): ProjectItem | null {
  if (!slug) return null;
  const target = normalizeProjectSlug(slug);
  return (
    projects.find((p) => normalizeProjectSlug(p.slug) === target) || null
  );
}

export const INQUIRY_BUDGET_OPTIONS = ['+ 5K', '+15K', '+50K'] as const;

export interface InquiryFormInput {
  name: string;
  email: string;
  budget: string;
  aboutProject: string;
}

export interface InquiryValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof InquiryFormInput, string>>;
}

export interface IndexSlideState {
  index: number;
  rightInsetPercent: number;
  clipPath: string;
  isActive: boolean;
  pointerEvents: 'auto' | 'none';
}

export function filterProjectsByCategory(
  projects: ProjectItem[],
  category: CategoryFilter
): ProjectItem[] {
  if (category === 'All') {
    return projects;
  }
  return projects.filter((project) => project.roles.includes(category));
}

export function getNextProject(
  projects: ProjectItem[],
  currentSlug: string
): ProjectItem | undefined {
  if (projects.length === 0) return undefined;
  const target = normalizeProjectSlug(currentSlug);
  const idx = projects.findIndex(
    (p) => normalizeProjectSlug(p.slug) === target
  );
  if (idx === -1) return projects[0];
  return projects[(idx + 1) % projects.length];
}

export function formatStudioDate(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function formatTimecode(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0:00';
  }
  const whole = Math.floor(seconds);
  const mins = Math.floor(whole / 60);
  const secs = whole % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function isValidCategory(value: string | null): value is CategoryFilter {
  if (!value) return false;
  return (FILTER_CATEGORIES as string[]).includes(value);
}

export function clampScrollProgress(
  scrollY: number,
  viewportHeight: number,
  totalSlides: number
): number {
  if (totalSlides <= 1 || !Number.isFinite(viewportHeight) || viewportHeight <= 0) {
    return 0;
  }
  const maxIndex = totalSlides - 1;
  const raw = scrollY / viewportHeight;
  if (!Number.isFinite(raw)) return 0;
  return Math.max(0, Math.min(maxIndex, raw));
}

export function getActiveIndexSlide(
  progress: number,
  totalSlides: number
): number {
  if (totalSlides <= 1) return 0;
  const clamped = Math.max(0, Math.min(totalSlides - 1, progress));
  // As soon as the incoming curtain wipe advances past ~12% from the left,
  // cross-fade RevealText to the incoming project (matching Chromakey Framer).
  const active = Math.floor(clamped + 0.88);
  return Math.max(0, Math.min(totalSlides - 1, active));
}

export function computeIndexSlideStates(
  progress: number,
  totalSlides: number
): IndexSlideState[] {
  const activeIdx = getActiveIndexSlide(progress, totalSlides);
  const states: IndexSlideState[] = [];

  for (let i = 0; i < totalSlides; i++) {
    let rightInsetPercent = 0;
    if (i > 0) {
      const localWipe = Math.max(0, Math.min(1, progress - (i - 1)));
      rightInsetPercent = Number(((1 - localWipe) * 100).toFixed(4));
    }

    const clipPath =
      rightInsetPercent <= 0
        ? 'inset(0%)'
        : `inset(0% ${rightInsetPercent}% 0% 0%)`;

    const isActive = i === activeIdx;

    states.push({
      index: i,
      rightInsetPercent,
      clipPath,
      isActive,
      pointerEvents: isActive ? 'auto' : 'none',
    });
  }

  return states;
}

export function validateInquiryForm(
  input: InquiryFormInput
): InquiryValidationResult {
  const errors: Partial<Record<keyof InquiryFormInput, string>> = {};
  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedAbout = input.aboutProject.trim();

  if (!trimmedName) {
    errors.name = 'Please enter your name.';
  }

  if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (
    !input.budget ||
    !(INQUIRY_BUDGET_OPTIONS as readonly string[]).includes(input.budget)
  ) {
    errors.budget = 'Please select an estimated budget.';
  }

  if (!trimmedAbout || trimmedAbout.length < 5) {
    errors.aboutProject = 'Please share a few details about your project.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function parseRouteState(
  pathname: string,
  search: string
): {
  page: ActivePage;
  category: CategoryFilter;
  viewMode: ViewMode;
  projectSlug: string | null;
} {
  const params = new URLSearchParams(search);
  const pageParam = params.get('page');
  const viewParam = params.get('view');
  const catParam = params.get('category');
  const projectParam = params.get('project');

  const normalizedPath =
    pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;

  let infoRoute: InfoSubPage | null = null;
  if (normalizedPath === '/info' || pageParam === 'info') {
    infoRoute = 'info';
  } else if (normalizedPath === '/approach' || pageParam === 'approach') {
    infoRoute = 'approach';
  } else if (normalizedPath === '/service' || pageParam === 'service') {
    infoRoute = 'service';
  } else if (normalizedPath === '/clients' || pageParam === 'clients') {
    infoRoute = 'clients';
  }

  const isContactPath =
    normalizedPath === '/contact' ||
    pathname.startsWith('/contact/') ||
    pageParam === 'contact';

  const isWorksPath =
    pathname.startsWith('/works') ||
    pathname.endsWith('/list') ||
    pathname.includes('/categories/');

  const hasWorksQuery =
    pageParam === 'works' || viewParam === 'list' || isValidCategory(catParam);

  const page: ActivePage = infoRoute
    ? infoRoute
    : isContactPath
      ? 'contact'
      : isWorksPath || hasWorksQuery
        ? 'works'
        : 'index';

  const viewMode: ViewMode =
    pathname.endsWith('/list') || viewParam === 'list' ? 'list' : 'grid';

  let category: CategoryFilter = isValidCategory(catParam) ? catParam : 'All';

  const slugToCategory: Record<string, CategoryFilter> = {
    'art-direction': 'Art Direction',
    'digital-design': 'Digital design',
    develop: 'Develop',
    'visual-identity': 'Visual Identity',
    'cgi-3d': 'CGI & 3D',
    'motion-design': 'Motion Design',
  };

  const catMatch = pathname.match(/\/categories\/([^/]+)/);
  if (catMatch && slugToCategory[catMatch[1]]) {
    category = slugToCategory[catMatch[1]];
  }

  // Also support /works/<slug> direct paths
  let projectSlug: string | null = projectParam || null;
  if (!projectSlug && pathname.startsWith('/works/')) {
    const sub = decodeURIComponent(pathname.slice('/works/'.length)).replace(
      /\/$/,
      ''
    );
    if (sub && sub !== 'list') {
      projectSlug = sub;
    }
  }

  return {
    page,
    category,
    viewMode,
    projectSlug,
  };
}

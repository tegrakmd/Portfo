export type CategoryFilter =
  | 'All'
  | 'Art Direction'
  | 'Digital design'
  | 'Develop'
  | 'Visual Identity'
  | 'CGI & 3D'
  | 'Motion Design';

export type ProjectCategory = Exclude<CategoryFilter, 'All'>;

export type ViewMode = 'grid' | 'list';

export interface ProjectCredit {
  role: string;
  name: string;
}

export type ProjectGalleryRow =
  | { type: 'plate'; src: string }
  | { type: 'wide'; src: string }
  | { type: 'pair'; leftSrc: string; rightSrc: string };

export interface ProjectItem {
  id: string;
  num: string;
  slug: string;
  title: string;
  brand: string;
  industry: string;
  roles: ProjectCategory[];
  mediaType: 'video' | 'image';
  videoSrc?: string;
  posterSrc: string;
  accentBg: string;
  overview: string[];
  processOutcome: string[];
  credits: ProjectCredit[];
  galleryRows: ProjectGalleryRow[];
}

export const FILTER_CATEGORIES: CategoryFilter[] = [
  'All',
  'Art Direction',
  'Digital design',
  'Develop',
  'Visual Identity',
  'CGI & 3D',
  'Motion Design',
];

const CHROMAKEY_PROCESS_OUTCOME: string[] = [
  'The project developed through a long series of tests rather than a single predefined route. We experimented with procedural geometry, custom materials, lighting setups and different types of deformation to understand which combinations created the strongest visual response. Movement was treated as part of the material itself, not simply as animation added at the end.',
  'We paid particular attention to how surfaces reacted to light, how reflections changed during movement and how small shifts in scale or camera position could completely change the character of a scene. Simulation was used selectively, giving certain forms a more natural behavior while keeping enough control to maintain the overall composition and rhythm.',
  'Once the core visual language was established, the system was expanded into a set of reusable scenes, materials and motion setups. This made it possible to produce a wide range of outputs while keeping the same visual consistency across the project.',
];

function createChromakeyOverview(subjectName: string): string[] {
  return [
    `For ${subjectName}, Monoform wanted to create a visual system built around the idea of material, light and movement. The project started from a simple question: how can a digital surface feel physical, tactile and almost familiar while still behaving in ways that would be difficult to reproduce in the real world?`,
    'We developed a series of CGI studies that explored this tension through form, reflection, transparency and motion. Some objects were designed to feel soft and fluid, while others were more architectural and controlled. The visual direction moved between realistic material qualities and more abstract digital behavior, allowing the system to stay flexible without losing its identity.',
    'The goal was not to create one fixed image, but a broader visual language that could work across different outputs. From animated sequences and campaign stills to large-format exhibition content, every asset needed to feel part of the same world while still having enough variation to work independently.',
  ];
}

export const PROJECTS: ProjectItem[] = [
  {
    id: '12',
    num: '12',
    slug: 'new-objects',
    title: 'New Objects',
    brand: 'Onda',
    industry: 'Furniture',
    roles: ['Develop', 'CGI & 3D'],
    mediaType: 'video',
    videoSrc: '/media/p12-new-objects.mp4',
    posterSrc: '/media/p12-new-objects.jpg',
    accentBg: '#1c3545',
    overview: createChromakeyOverview('New Objects'),
    processOutcome: CHROMAKEY_PROCESS_OUTCOME,
    credits: [
      { role: 'Creative Director', name: 'Mila Hart' },
      { role: 'Industrial Designer', name: 'Elias Nord' },
      { role: '3D Artist', name: 'Sofia Ren' },
      { role: 'Motion Designer', name: 'Jon Bell' },
      { role: 'Producer', name: 'Iris Vale' },
    ],
    galleryRows: [
      { type: 'pair', leftSrc: '/media/gal-01.jpg', rightSrc: '/media/gal-02.jpg' },
      { type: 'wide', src: '/media/gal-03.jpg' },
      { type: 'pair', leftSrc: '/media/gal-04.jpg', rightSrc: '/media/gal-05.jpg' },
      { type: 'pair', leftSrc: '/media/gal-06.jpg', rightSrc: '/media/gal-07.jpg' },
      { type: 'wide', src: '/media/gal-08.jpg' },
    ],
  },
  {
    id: '11',
    num: '11',
    slug: 'core-series',
    title: 'Core Series',
    brand: 'Marea Beauty',
    industry: 'Fashion',
    roles: ['Digital design', 'Develop'],
    mediaType: 'image',
    posterSrc: '/media/p11-core-series.jpg',
    accentBg: '#7a5244',
    overview: createChromakeyOverview('New Objects'),
    processOutcome: CHROMAKEY_PROCESS_OUTCOME,
    credits: [
      { role: 'Producer', name: 'Sara Voss' },
      { role: 'Brand Designer', name: 'Jules Keller' },
      { role: 'Creative Director', name: 'Nina Laurent' },
      { role: 'Retoucher', name: 'Leo Morel' },
      { role: 'Photographer', name: 'Mara Chen' },
    ],
    galleryRows: [
      { type: 'plate', src: '/media/gal-09.jpg' },
      { type: 'plate', src: '/media/gal-10.jpg' },
      { type: 'plate', src: '/media/gal-11.jpg' },
      { type: 'plate', src: '/media/gal-04.jpg' },
      { type: 'plate', src: '/media/gal-12.jpg' },
      { type: 'plate', src: '/media/gal-13.jpg' },
    ],
  },
  {
    id: '10',
    num: '10',
    slug: 'black-alloy',
    title: 'Black Alloy',
    brand: 'Étude 03',
    industry: 'Consumer Tech',
    roles: ['Develop', 'Art Direction'],
    mediaType: 'video',
    videoSrc: '/media/p10-black-alloy.mp4',
    posterSrc: '/media/p10-black-alloy.jpg',
    accentBg: '#222222',
    overview: createChromakeyOverview('New Objects'),
    processOutcome: CHROMAKEY_PROCESS_OUTCOME,
    credits: [
      { role: 'Art Director', name: 'Jonas Keller' },
      { role: 'Industrial Designer', name: 'Nora Stein' },
      { role: '3D Artist', name: 'Leon Hart' },
      { role: 'Motion Designer', name: 'Maya Cole' },
      { role: 'Producer', name: 'Elias West' },
    ],
    galleryRows: [
      { type: 'pair', leftSrc: '/media/gal-03.jpg', rightSrc: '/media/gal-14.jpg' },
      { type: 'wide', src: '/media/gal-01.jpg' },
      { type: 'pair', leftSrc: '/media/gal-15.jpg', rightSrc: '/media/gal-16.jpg' },
      { type: 'pair', leftSrc: '/media/gal-11.jpg', rightSrc: '/media/gal-04.jpg' },
      { type: 'wide', src: '/media/gal-06.jpg' },
    ],
  },
  {
    id: '09',
    num: '09',
    slug: 'volume-low',
    title: 'Volume Low',
    brand: 'Veyra',
    industry: 'Design',
    roles: ['Visual Identity', 'Digital design'],
    mediaType: 'image',
    posterSrc: '/media/p09-volume-low.jpg',
    accentBg: '#3a5475',
    overview: createChromakeyOverview('Volume Low'),
    processOutcome: CHROMAKEY_PROCESS_OUTCOME,
    credits: [
      { role: 'Art Director', name: 'Luca Morel' },
      { role: 'Brand Designer', name: 'Maya Chen' },
      { role: '3D Generalist', name: 'Otto Klein' },
      { role: 'Motion Director', name: 'Nora Bell' },
      { role: 'Sound Designer', name: 'Evan Cole' },
    ],
    galleryRows: [
      { type: 'plate', src: '/media/gal-03.jpg' },
      { type: 'plate', src: '/media/gal-14.jpg' },
      { type: 'plate', src: '/media/gal-01.jpg' },
      { type: 'plate', src: '/media/gal-15.jpg' },
      { type: 'plate', src: '/media/gal-16.jpg' },
      { type: 'plate', src: '/media/gal-11.jpg' },
      { type: 'plate', src: '/media/gal-04.jpg' },
      { type: 'plate', src: '/media/gal-06.jpg' },
    ],
  },
  {
    id: '08',
    num: '08',
    slug: 'phase-one',
    title: 'Phase One',
    brand: 'Aeron',
    industry: 'Technology',
    roles: ['CGI & 3D', 'Motion Design'],
    mediaType: 'video',
    videoSrc: '/media/p08-phase-one.mp4',
    posterSrc: '/media/p08-phase-one.jpg',
    accentBg: '#273d2c',
    overview: createChromakeyOverview('Digital Matter'),
    processOutcome: CHROMAKEY_PROCESS_OUTCOME,
    credits: [
      { role: 'Art Director', name: 'Theo Maren' },
      { role: 'Branding Creative Direction', name: 'Noa Keller' },
      { role: 'Motion Director', name: 'Camille Varenne' },
      { role: '3D Generalist', name: 'Leon Weber' },
      { role: 'Motion Designer', name: 'Amara Cole' },
    ],
    galleryRows: [
      { type: 'pair', leftSrc: '/media/gal-01.jpg', rightSrc: '/media/gal-10.jpg' },
      { type: 'pair', leftSrc: '/media/gal-16.jpg', rightSrc: '/media/gal-01.jpg' },
      { type: 'pair', leftSrc: '/media/gal-15.jpg', rightSrc: '/media/gal-04.jpg' },
      { type: 'wide', src: '/media/gal-17.jpg' },
    ],
  },
  {
    id: '07',
    num: '07',
    slug: 'kova',
    title: 'Kova',
    brand: 'Cité Forme',
    industry: 'Beauty',
    roles: ['Art Direction'],
    mediaType: 'video',
    videoSrc: '/media/p07-kova.mp4',
    posterSrc: '/media/p07-kova.jpg',
    accentBg: '#7a3b4e',
    overview: createChromakeyOverview('Kova'),
    processOutcome: CHROMAKEY_PROCESS_OUTCOME,
    credits: [
      { role: 'Creative Director', name: 'Clara Voss' },
      { role: 'Brand Designer', name: 'Milo Arden' },
      { role: 'Photographer', name: 'Lina Park' },
      { role: 'Retoucher', name: 'Theo Grant' },
      { role: 'Producer', name: 'Sara Noël' },
    ],
    galleryRows: [
      { type: 'pair', leftSrc: '/media/gal-16.jpg', rightSrc: '/media/gal-09.jpg' },
      { type: 'wide', src: '/media/gal-03.jpg' },
      { type: 'pair', leftSrc: '/media/gal-12.jpg', rightSrc: '/media/gal-18.jpg' },
    ],
  },
  {
    id: '06',
    num: '06',
    slug: 'mirror-pollen',
    title: 'Mirror Pollen',
    brand: 'Studio Saint-Paul',
    industry: 'Sports',
    roles: ['Motion Design'],
    mediaType: 'video',
    videoSrc: '/media/p06-mirror-pollen.mp4',
    posterSrc: '/media/p06-mirror-pollen.jpg',
    accentBg: '#4d3a24',
    overview: createChromakeyOverview('Mirror Pollen'),
    processOutcome: CHROMAKEY_PROCESS_OUTCOME,
    credits: [
      { role: 'Art Director', name: 'Ava Moreau' },
      { role: 'Creative Technologist', name: 'Leo Fischer' },
      { role: '3D Generalist', name: 'Mina Park' },
      { role: 'Motion Designer', name: 'Owen Vale' },
      { role: 'Producer', name: 'Clara West' },
    ],
    galleryRows: [
      { type: 'pair', leftSrc: '/media/gal-04.jpg', rightSrc: '/media/gal-14.jpg' },
      { type: 'wide', src: '/media/gal-01.jpg' },
      { type: 'pair', leftSrc: '/media/gal-15.jpg', rightSrc: '/media/gal-16.jpg' },
      { type: 'pair', leftSrc: '/media/gal-11.jpg', rightSrc: '/media/gal-04.jpg' },
      { type: 'wide', src: '/media/gal-06.jpg' },
    ],
  },
  {
    id: '05',
    num: '05',
    slug: 'cite-forme',
    title: 'Cité Forme',
    brand: 'Monoform',
    industry: 'Art & Culture',
    roles: ['Visual Identity', 'Develop'],
    mediaType: 'image',
    posterSrc: '/media/p05-cite-forme.jpg',
    accentBg: '#382e29',
    overview: createChromakeyOverview('Cité Forme'),
    processOutcome: CHROMAKEY_PROCESS_OUTCOME,
    credits: [
      { role: 'Creative Director', name: 'Mila Hart' },
      { role: 'Brand Designer', name: 'Jules Keller' },
      { role: 'Lead Developer', name: 'Noah Laurent' },
      { role: 'Photographer', name: 'Soren Lind' },
      { role: 'Producer', name: 'Iris Vale' },
    ],
    galleryRows: [
      { type: 'plate', src: '/media/gal-09.jpg' },
      { type: 'plate', src: '/media/gal-14.jpg' },
      { type: 'plate', src: '/media/gal-11.jpg' },
      { type: 'plate', src: '/media/gal-15.jpg' },
      { type: 'plate', src: '/media/gal-12.jpg' },
      { type: 'plate', src: '/media/gal-13.jpg' },
    ],
  },
  {
    id: '04',
    num: '04',
    slug: 'maison-armand',
    title: 'Maison Armand',
    brand: 'Armand',
    industry: 'Beauty',
    roles: ['Art Direction', 'CGI & 3D'],
    mediaType: 'video',
    videoSrc: '/media/p04-maison-armand.mp4',
    posterSrc: '/media/p04-maison-armand.jpg',
    accentBg: '#5e1717',
    overview: createChromakeyOverview('Mirror Pollen'),
    processOutcome: CHROMAKEY_PROCESS_OUTCOME,
    credits: [
      { role: 'Set Designer', name: 'Mara Lind' },
      { role: 'Producer', name: 'Nina Cole' },
      { role: 'Creative Director', name: 'Elise Laurent' },
      { role: 'Art Director', name: 'Louis Varenne' },
      { role: 'Photographer', name: 'Felix Hart' },
    ],
    galleryRows: [
      { type: 'pair', leftSrc: '/media/gal-13.jpg', rightSrc: '/media/gal-15.jpg' },
      { type: 'wide', src: '/media/gal-14.jpg' },
      { type: 'pair', leftSrc: '/media/gal-09.jpg', rightSrc: '/media/gal-04.jpg' },
      { type: 'pair', leftSrc: '/media/gal-16.jpg', rightSrc: '/media/gal-03.jpg' },
    ],
  },
  {
    id: '03',
    num: '03',
    slug: 'edition-marais',
    title: 'Édition Marais',
    brand: 'Élan Paris',
    industry: 'Fashion',
    roles: ['CGI & 3D', 'Digital design'],
    mediaType: 'video',
    videoSrc: '/media/p03-edition-marais.mp4',
    posterSrc: '/media/p03-edition-marais.jpg',
    accentBg: '#2e2e2e',
    overview: createChromakeyOverview('Édition Marais'),
    processOutcome: CHROMAKEY_PROCESS_OUTCOME,
    credits: [
      { role: '3D Director', name: 'Sofia Ren' },
      { role: 'Digital Designer', name: 'Lucas Meyer' },
      { role: 'Lighting Artist', name: 'Otto Klein' },
      { role: 'Motion Designer', name: 'Maya Cole' },
      { role: 'Producer', name: 'Iris Vale' },
    ],
    galleryRows: [
      { type: 'pair', leftSrc: '/media/gal-04.jpg', rightSrc: '/media/gal-05.jpg' },
      { type: 'wide', src: '/media/gal-08.jpg' },
      { type: 'pair', leftSrc: '/media/gal-06.jpg', rightSrc: '/media/gal-07.jpg' },
      { type: 'pair', leftSrc: '/media/gal-01.jpg', rightSrc: '/media/gal-02.jpg' },
    ],
  },
  {
    id: '02',
    num: '02',
    slug: 'quiet-structures',
    title: 'Quiet Structures',
    brand: 'Meridien',
    industry: 'Art & Culture',
    roles: ['Visual Identity'],
    mediaType: 'video',
    videoSrc: '/media/p02-quiet-structures.mp4',
    posterSrc: '/media/p02-quiet-structures.jpg',
    accentBg: '#36383a',
    overview: createChromakeyOverview('New Objects'),
    processOutcome: CHROMAKEY_PROCESS_OUTCOME,
    credits: [
      { role: 'Creative Director', name: 'Amélie Voss' },
      { role: 'Art Director', name: 'Noah Mercier' },
      { role: 'Architectural Designer', name: 'Sofia Klein' },
      { role: 'CGI Artist', name: 'Milo Park' },
      { role: 'Producer', name: 'Clara Vale' },
    ],
    galleryRows: [
      { type: 'pair', leftSrc: '/media/gal-02.jpg', rightSrc: '/media/gal-14.jpg' },
      { type: 'wide', src: '/media/gal-19.jpg' },
      { type: 'pair', leftSrc: '/media/gal-10.jpg', rightSrc: '/media/gal-01.jpg' },
      { type: 'pair', leftSrc: '/media/gal-20.jpg', rightSrc: '/media/gal-21.jpg' },
      { type: 'wide', src: '/media/gal-22.jpg' },
    ],
  },
  {
    id: '01',
    num: '01',
    slug: 'interval',
    title: 'Interval',
    brand: 'North Assembly',
    industry: 'Architecture',
    roles: ['Motion Design', 'CGI & 3D'],
    mediaType: 'video',
    videoSrc: '/media/p01-interval.mp4',
    posterSrc: '/media/p01-interval.jpg',
    accentBg: '#122923',
    overview: createChromakeyOverview('New Objects'),
    processOutcome: CHROMAKEY_PROCESS_OUTCOME,
    credits: [
      { role: 'Art Director', name: 'Hugo Morel' },
      { role: 'Architectural Designer', name: 'Mina Clarke' },
      { role: '3D Generalist', name: 'Evan Fischer' },
      { role: 'Motion Designer', name: 'Lina Hart' },
      { role: 'Producer', name: 'Otto Vale' },
    ],
    galleryRows: [
      { type: 'pair', leftSrc: '/media/gal-16.jpg', rightSrc: '/media/gal-02.jpg' },
      { type: 'wide', src: '/media/gal-03.jpg' },
      { type: 'pair', leftSrc: '/media/gal-14.jpg', rightSrc: '/media/gal-23.jpg' },
      { type: 'pair', leftSrc: '/media/gal-04.jpg', rightSrc: '/media/gal-10.jpg' },
    ],
  },
];

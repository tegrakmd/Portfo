export const INFO_MANIFESTO =
  'Chromakey is an independent creative agency working across CGI, motion, design and visual direction. We develop image-led projects for brands, culture and digital spaces, combining art direction, 3D, animation and technology into clear visual systems. From campaign films and product imagery to identities, installations and experimental work, each project is shaped through research, collaboration and precise execution. Our practice moves between still and motion, commercial and cultural, physical and digital — always with a focus on strong ideas, crafted detail and a distinct visual language.';

export interface HonorItem {
  award: string;
  count: string;
}

export const INFO_HONORS: HonorItem[] = [
  { award: 'ADC Awards / Motion Design', count: 'X3' },
  { award: 'Awwwards / Studio of the Day', count: 'X5' },
  { award: 'Art Directors Club / CGI', count: 'X10' },
  { award: 'Behance / Motion Featured', count: 'X6' },
  { award: 'CSS Design Awards / Special Kudos', count: 'X8' },
];

export interface TeamMember {
  name: string;
  role: string;
}

export const INFO_TEAM: TeamMember[] = [
  { name: 'Noa Keller', role: 'Founder' },
  { name: 'Leon Weber', role: 'Creative Director' },
  { name: 'Milo Jensen', role: 'Design Director' },
  { name: 'Garrett DeRossett', role: 'Senior 3D Artist' },
];

export const APPROACH_VALUES: string[] = [
  'Collaboration',
  'Creativity',
  'Partnership',
  'Innovation',
  'Transparency',
];

export const APPROACH_STATEMENT =
  'Our approach is built around clarity, exploration and craft. We move from research to visual systems, production and final delivery, keeping each stage connected to the original idea while allowing space for experimentation and change.';

export const APPROACH_IMAGES: { src: string; alt: string }[] = [
  { src: '/media/info-app-1.jpg', alt: 'Sculptural translucent sphere study' },
  { src: '/media/info-app-2.jpg', alt: 'Brushed metallic CRS emblem study' },
  { src: '/media/info-app-3.jpg', alt: 'Minimalist spatial point constellation' },
  { src: '/media/info-app-4.jpg', alt: 'Material lighting exploration' },
  { src: '/media/info-app-5.jpg', alt: 'Abstract geometric composition' },
];

export interface ApproachStage {
  id: 'Research' | 'System' | 'Production' | 'Delivery';
  title: string;
  description: string;
}

export const APPROACH_STAGES: ApproachStage[] = [
  {
    id: 'Research',
    title: 'Research',
    description:
      'We start by shaping the core idea, visual direction and purpose of the project. This stage sets the tone, references and creative framework before production begins.',
  },
  {
    id: 'System',
    title: 'System',
    description:
      'We turn the initial direction into a flexible visual language. Composition, typography, color, motion and 3D elements are developed to work consistently across different formats.',
  },
  {
    id: 'Production',
    title: 'Production',
    description:
      'The system moves into execution through CGI, animation, design and post-production. We refine every detail while keeping the original idea clear throughout the process.',
  },
  {
    id: 'Delivery',
    title: 'Delivery',
    description:
      'Final assets are adapted for each platform and application, from films and campaign imagery to digital experiences, launches and spatial formats.',
  },
];

export const SERVICE_CAPABILITIES: string[] = [
  'Creative Direction',
  'Art Direction',
  'CGI & 3D',
  'Motion Design',
  'Animation',
  'Film & Titles',
  'Product Visualization',
];

export const SERVICE_INDUSTRIES: string[] = [
  'Art Architecture',
  'Technology',
  'Health',
  'Sport',
  'Fashion',
  'Beauty',
  'Sustainability',
];

export interface ClientItem {
  id: string;
  name: string;
  imageSrc: string;
  sector: string;
}

export const CLIENTS_LIST: ClientItem[] = [
  { id: 'monoform', name: 'Monoform', imageSrc: '/media/client-01.jpg', sector: 'Industrial Objects' },
  { id: 'oriel', name: 'Oriel', imageSrc: '/media/client-02.jpg', sector: 'Optical Hardware' },
  { id: 'sora', name: 'Sora', imageSrc: '/media/client-03.jpg', sector: 'Consumer Technology' },
  { id: 'forme-labs', name: 'Forme Labs', imageSrc: '/media/info-app-1.jpg', sector: 'Material Research' },
  { id: 'materia', name: 'Materia', imageSrc: '/media/client-05.jpg', sector: 'Architectural Surfaces' },
  { id: 'kerno', name: 'Kerno', imageSrc: '/media/info-app-2.jpg', sector: 'Acoustic Engineering' },
  { id: 'fold-studio', name: 'Fold Studio', imageSrc: '/media/info-app-3.jpg', sector: 'Spatial Design' },
  { id: 'vanta-house', name: 'Vanta House', imageSrc: '/media/client-08.jpg', sector: 'Luxury Fragrance' },
  { id: 'serein', name: 'Serein', imageSrc: '/media/info-app-4.jpg', sector: 'Botanical Skincare' },
  { id: 'north-assembly', name: 'North Assembly', imageSrc: '/media/client-10.jpg', sector: 'Technical Apparel' },
  { id: 'atelier', name: 'Atelier', imageSrc: '/media/client-11.jpg', sector: 'Contemporary Culture' },
  { id: 'nomae', name: 'Nomae', imageSrc: '/media/client-12.jpg', sector: 'Sculptural Objects' },
  { id: 'parallel-objects', name: 'Parallel Objects', imageSrc: '/media/client-13.jpg', sector: 'Furniture & Lighting' },
  { id: 'lumen-works', name: 'Lumen Works', imageSrc: '/media/client-14.jpg', sector: 'Automotive Concept' },
  { id: 'novae', name: 'Novae', imageSrc: '/media/client-15.jpg', sector: 'Digital Fashion' },
];

export interface PressArticle {
  id: string;
  title: string;
  publication: string;
  date: string;
  summary: string;
}

export const CLIENTS_PRESS: PressArticle[] = [
  {
    id: 'aeron',
    title: 'A New Visual World for Aeron',
    publication: 'It’s Nice That',
    date: 'September 2026',
    summary:
      'An inside look at how Chromakey developed tactile procedural materials and controlled studio lighting to reframe Aeron’s next-generation hardware architecture.',
  },
  {
    id: 'onda-campaign',
    title: 'Inside the Onda Campaign',
    publication: 'Stash Media',
    date: 'August 2026',
    summary:
      'Breaking down the 60fps CGI choreography, fluid simulations, and modular motion toolkit created for Onda’s global seasonal launch.',
  },
  {
    id: 'kova-identity',
    title: 'Kova Unveils a New Identity',
    publication: 'Brand New',
    date: 'July 2026',
    summary:
      'Combining stark typographic precision with custom 3D sculptural forms, Kova’s refreshed visual system bridges physical industrial craft and digital motion.',
  },
  {
    id: 'novae-visuals',
    title: 'Behind the Visuals for Novae',
    publication: 'Motionographer',
    date: 'June 2026',
    summary:
      'Chromakey’s directors discuss translating subtle optical refraction and atmospheric haze into a cohesive film and still-imagery language for Novae.',
  },
  {
    id: 'volta-objects',
    title: 'Volta Objects Launches New Collection',
    publication: 'Wallpaper*',
    date: 'May 2026',
    summary:
      'Photorealistic product visualization and architectural environments crafted in close collaboration with Volta Objects’ industrial design team in Paris.',
  },
  {
    id: 'north-assembly',
    title: 'New Work for North Assembly',
    publication: 'Frame Magazine',
    date: 'April 2026',
    summary:
      'Spatial LED monolith animations and campaign films engineered for North Assembly’s technical outerwear presentation.',
  },
  {
    id: 'neral-landscape',
    title: 'A Digital Landscape for Neral',
    publication: 'Creative Boom',
    date: 'March 2026',
    summary:
      'Exploring synthetic topography, mineral textures, and real-time WebGL look-development built for Neral’s interactive product showcase.',
  },
  {
    id: 'onda-flagship',
    title: 'Onda Opens New Flagship Experience',
    publication: 'Dezeen',
    date: 'February 2026',
    summary:
      'Large-format generative installations and synchronized architectural motion sequences designed for Onda’s flagship space.',
  },
];

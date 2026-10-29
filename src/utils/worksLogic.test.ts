import test from 'node:test';
import assert from 'node:assert/strict';
import { PROJECTS } from '../data/projects';
import {
  clampScrollProgress,
  computeIndexSlideStates,
  filterProjectsByCategory,
  findProjectBySlug,
  formatStudioDate,
  formatTimecode,
  getHeaderPageLabel,
  getNextProject,
  getProjectRoutePath,
  getRoutePath,
  isInfoSectionPage,
  parseRouteState,
  validateInquiryForm,
} from './worksLogic';

test('filterProjectsByCategory returns all 12 projects for All', () => {
  const all = filterProjectsByCategory(PROJECTS, 'All');
  assert.equal(all.length, 12);
  assert.equal(all[0].num, '12');
  assert.equal(all[11].num, '01');
});

test('filterProjectsByCategory accurately filters each Chromakey discipline', () => {
  assert.deepEqual(
    filterProjectsByCategory(PROJECTS, 'Art Direction').map((p) => p.num),
    ['10', '07', '04']
  );
  assert.deepEqual(
    filterProjectsByCategory(PROJECTS, 'Digital design').map((p) => p.num),
    ['11', '09', '03']
  );
  assert.deepEqual(
    filterProjectsByCategory(PROJECTS, 'Develop').map((p) => p.num),
    ['12', '11', '10', '05']
  );
  assert.deepEqual(
    filterProjectsByCategory(PROJECTS, 'Visual Identity').map((p) => p.num),
    ['09', '05', '02']
  );
  assert.deepEqual(
    filterProjectsByCategory(PROJECTS, 'CGI & 3D').map((p) => p.num),
    ['12', '08', '04', '03', '01']
  );
  assert.deepEqual(
    filterProjectsByCategory(PROJECTS, 'Motion Design').map((p) => p.num),
    ['08', '06', '01']
  );
});

test('getNextProject advances sequentially and wraps from 01 back to 12', () => {
  const nextFromFirst = getNextProject(PROJECTS, 'new-objects');
  assert.equal(nextFromFirst?.slug, 'core-series');

  const nextFromLast = getNextProject(PROJECTS, 'interval');
  assert.equal(nextFromLast?.slug, 'new-objects');
});

test('formatStudioDate formats Monday, October 26, 2026 accurately', () => {
  const d = new Date('2026-10-26T12:00:00Z');
  assert.equal(formatStudioDate(d), 'Monday, October 26, 2026');
});

test('formatTimecode formats video seconds cleanly', () => {
  assert.equal(formatTimecode(0), '0:00');
  assert.equal(formatTimecode(5.4), '0:05');
  assert.equal(formatTimecode(65), '1:05');
  assert.equal(formatTimecode(NaN), '0:00');
});

test('parseRouteState defaults root / to index, /works to works, and /contact to contact', () => {
  const home = parseRouteState('/', '');
  assert.equal(home.page, 'index');
  assert.equal(home.category, 'All');
  assert.equal(home.viewMode, 'grid');

  const contact = parseRouteState('/contact', '');
  assert.equal(contact.page, 'contact');

  const contactQuery = parseRouteState('/', '?page=contact');
  assert.equal(contactQuery.page, 'contact');

  const works = parseRouteState('/works', '');
  assert.equal(works.page, 'works');
  assert.equal(works.viewMode, 'grid');

  const s1 = parseRouteState('/works/list', '');
  assert.equal(s1.page, 'works');
  assert.equal(s1.viewMode, 'list');
  assert.equal(s1.category, 'All');

  const s2 = parseRouteState('/categories/art-direction', '');
  assert.equal(s2.page, 'works');
  assert.equal(s2.category, 'Art Direction');
  assert.equal(s2.viewMode, 'grid');

  assert.equal(parseRouteState('/info', '').page, 'info');
  assert.equal(parseRouteState('/info/', '').page, 'info');
  assert.equal(parseRouteState('/', '?page=info').page, 'info');
  assert.equal(parseRouteState('/approach', '').page, 'approach');
  assert.equal(parseRouteState('/service', '').page, 'service');
  assert.equal(parseRouteState('/clients', '').page, 'clients');
});

test('validateInquiryForm rejects invalid inputs and accepts complete briefs', () => {
  const empty = validateInquiryForm({
    name: '   ',
    email: 'not-an-email',
    budget: '',
    aboutProject: 'hi',
  });
  assert.equal(empty.valid, false);
  assert.ok(empty.errors.name);
  assert.ok(empty.errors.email);
  assert.ok(empty.errors.budget);
  assert.ok(empty.errors.aboutProject);

  const valid = validateInquiryForm({
    name: 'Jane Smith',
    email: 'jane@studio.com',
    budget: '+15K',
    aboutProject: 'Full CGI & motion campaign launching in Q1.',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('computeIndexSlideStates matches Chromakey left-to-right clip-path wipe and RevealText states', () => {
  // At scrollY = 0 (progress = 0)
  const p0 = clampScrollProgress(0, 900, 12);
  const s0 = computeIndexSlideStates(p0, 12);
  assert.equal(s0[0].clipPath, 'inset(0%)');
  assert.equal(s0[0].isActive, true);
  assert.equal(s0[1].clipPath, 'inset(0% 100% 0% 0%)');
  assert.equal(s0[1].isActive, false);

  // At scrollY = 450 on 900px viewport (progress = 0.5 -> 50% wipe of slide 1)
  const p450 = clampScrollProgress(450, 900, 12);
  const s450 = computeIndexSlideStates(p450, 12);
  assert.equal(s450[0].clipPath, 'inset(0%)');
  assert.equal(s450[0].isActive, false);
  assert.equal(s450[1].clipPath, 'inset(0% 50% 0% 0%)');
  assert.equal(s450[1].isActive, true);
  assert.equal(s450[2].clipPath, 'inset(0% 100% 0% 0%)');

  // At scrollY = 9900 on 900px viewport (progress = 11 -> final slide 11 active)
  const pEnd = clampScrollProgress(9900, 900, 12);
  const sEnd = computeIndexSlideStates(pEnd, 12);
  assert.equal(sEnd[11].clipPath, 'inset(0%)');
  assert.equal(sEnd[11].isActive, true);
  assert.equal(sEnd[10].isActive, false);
});

test('getHeaderPageLabel, getRoutePath, and isInfoSectionPage match Chromakey Info sub-pages', () => {
  assert.equal(getHeaderPageLabel('info'), 'Info');
  assert.equal(getHeaderPageLabel('approach'), 'Approach');
  assert.equal(getHeaderPageLabel('service'), 'Service');
  assert.equal(getHeaderPageLabel('clients'), 'Clients');
  assert.equal(getHeaderPageLabel('works'), 'Works');
  assert.equal(getHeaderPageLabel('index'), 'Index');
  assert.equal(getHeaderPageLabel('contact'), 'Contact');

  assert.equal(getRoutePath('info'), '/info');
  assert.equal(getRoutePath('approach'), '/approach');
  assert.equal(getRoutePath('service'), '/service');
  assert.equal(getRoutePath('clients'), '/clients');

  assert.equal(isInfoSectionPage('info'), true);
  assert.equal(isInfoSectionPage('approach'), true);
  assert.equal(isInfoSectionPage('service'), true);
  assert.equal(isInfoSectionPage('clients'), true);
  assert.equal(isInfoSectionPage('works'), false);
  assert.equal(isInfoSectionPage('index'), false);
});

test('project detail routes (/works/<slug>) and Volume Low CMS copy/credits/gallery match Chromakey', () => {
  const r1 = parseRouteState('/works/volume-low', '');
  assert.equal(r1.page, 'works');
  assert.equal(r1.projectSlug, 'volume-low');
  assert.equal(getProjectRoutePath('volume-low'), '/works/volume-low');

  const volumeLow = findProjectBySlug(PROJECTS, r1.projectSlug);
  assert.ok(volumeLow);
  assert.equal(volumeLow.title, 'Volume Low');
  assert.equal(volumeLow.brand, 'Veyra');
  assert.equal(volumeLow.industry, 'Design');
  assert.deepEqual(volumeLow.roles, ['Visual Identity', 'Digital design']);
  assert.ok(volumeLow.overview[0].startsWith('For Volume Low, Monoform wanted to create'));
  assert.equal(volumeLow.overview.length, 3);
  assert.equal(volumeLow.processOutcome.length, 3);
  assert.deepEqual(
    volumeLow.credits.map((c) => `${c.role}: ${c.name}`),
    [
      'Art Director: Luca Morel',
      'Brand Designer: Maya Chen',
      '3D Generalist: Otto Klein',
      'Motion Director: Nora Bell',
      'Sound Designer: Evan Cole',
    ]
  );
  assert.equal(volumeLow.galleryRows.length, 8);
  assert.equal(getNextProject(PROJECTS, 'volume-low')?.slug, 'phase-one');

  // Accented URLs resolve cleanly
  const cite = findProjectBySlug(PROJECTS, 'cité-forme');
  assert.equal(cite?.slug, 'cite-forme');

  // Every project has 3 overview paragraphs, 3 processOutcome paragraphs, 5 credits, and non-empty galleryRows
  for (const p of PROJECTS) {
    assert.equal(p.overview.length, 3);
    assert.equal(p.processOutcome.length, 3);
    assert.equal(p.credits.length, 5);
    assert.ok(p.galleryRows.length >= 3);
  }
});

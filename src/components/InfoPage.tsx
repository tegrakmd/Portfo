import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ProjectItem } from '../data/projects';
import {
  APPROACH_IMAGES,
  APPROACH_STAGES,
  APPROACH_STATEMENT,
  APPROACH_VALUES,
  ApproachStage,
  CLIENTS_LIST,
  CLIENTS_PRESS,
  ClientItem,
  INFO_HONORS,
  INFO_MANIFESTO,
  INFO_TEAM,
  PressArticle,
  SERVICE_CAPABILITIES,
  SERVICE_INDUSTRIES,
} from '../data/infoData';
import { InfoSubPage, getRoutePath } from '../utils/worksLogic';
import { ShowreelModal } from './ShowreelModal';

interface InfoPageProps {
  subPage: InfoSubPage;
  onSelectSubPage: (subPage: InfoSubPage) => void;
  featuredProjects: ProjectItem[];
  onOpenProject: (project: ProjectItem) => void;
}

const SUB_NAV_ITEMS: { id: InfoSubPage; label: string }[] = [
  { id: 'info', label: 'Info' },
  { id: 'approach', label: 'Approach' },
  { id: 'service', label: 'Service' },
  { id: 'clients', label: 'Clients' },
];

interface StudioSubNavProps {
  activeSubPage: InfoSubPage;
  onSelectSubPage: (subPage: InfoSubPage) => void;
  isMobile?: boolean;
  mutedInactive?: boolean;
}

const StudioSubNav: React.FC<StudioSubNavProps> = ({
  activeSubPage,
  onSelectSubPage,
  isMobile = false,
  mutedInactive = false,
}) => {
  return (
    <nav
      aria-label="Studio Information Sections"
      className={
        isMobile
          ? 'pt-[96px] flex flex-col gap-[3px] w-full'
          : 'pt-[128px] flex flex-col gap-[1px] w-full'
      }
    >
      {SUB_NAV_ITEMS.map((item) => {
        const isActive = activeSubPage === item.id;
        const inactiveTextClass = mutedInactive ? 'text-[#5c5c5c]' : 'text-black';

        return (
          <a
            key={item.id}
            href={getRoutePath(item.id)}
            aria-current={isActive ? 'page' : undefined}
            onClick={(e) => {
              e.preventDefault();
              onSelectSubPage(item.id);
            }}
            className={`${
              isMobile
                ? 'h-[25.6px] text-[12px] leading-[15.6px] tracking-[-0.12px]'
                : 'h-[28.2px] text-[14px] leading-[18.2px] tracking-[-0.14px]'
            } w-full px-[5px] rounded-[5px] flex items-center no-underline transition-colors duration-150 ${
              isActive
                ? 'bg-[#f5f5f5] text-black'
                : `${inactiveTextClass} hover:bg-black hover:text-white`
            }`}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
};

export const InfoPage: React.FC<InfoPageProps> = ({
  subPage,
  onSelectSubPage,
  featuredProjects,
  onOpenProject,
}) => {
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [activeStage, setActiveStage] =
    useState<ApproachStage['id']>('Research');
  const [hoveredClientId, setHoveredClientId] = useState<string | null>(null);
  const [selectedPress, setSelectedPress] = useState<PressArticle | null>(null);

  const displayedClient: ClientItem =
    CLIENTS_LIST.find((c) => c.id === hoveredClientId) ?? CLIENTS_LIST[0];

  return (
    <div className="w-full bg-white text-black">
      {/* ===================================================================== */}
      {/* SUB-PAGE 1: /info                                                     */}
      {/* ===================================================================== */}
      {subPage === 'info' && (
        <>
          {/* Desktop 1440x900 4-column h-screen layout */}
          <div className="hidden md:grid grid-cols-4 h-screen w-full px-[10px] pb-[10px] bg-white overflow-hidden">
            {/* Col 1: Sub-nav + Bottom Video Reel Card */}
            <div className="w-full h-full flex flex-col justify-between">
              <StudioSubNav
                activeSubPage="info"
                onSelectSubPage={onSelectSubPage}
              />

              <button
                type="button"
                onClick={() => setIsShowreelOpen(true)}
                aria-label="Viwe reel"
                className="w-full h-[445px] rounded-[8px] overflow-hidden relative block p-0 border-0 cursor-pointer text-left group bg-[#1a1a1a]"
              >
                <img
                  src="/media/info-reel-preview.jpg"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <video
                  src="/media/info-reel-preview.mp4"
                  poster="/media/info-reel-preview.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-[20px] flex items-center justify-between pointer-events-none">
                  <span className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-white">
                    Viwe reel
                  </span>
                  <svg
                    width="10"
                    height="12"
                    viewBox="0 0 10 12"
                    fill="none"
                    aria-hidden="true"
                    className="shrink-0"
                  >
                    <path d="M1 1L9 6L1 11V1Z" fill="#FFFFFF" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Cols 2–3: Upward-drifting 56px Manifesto Marquee */}
            <section
              aria-label="Studio Manifesto"
              className="col-span-2 h-screen overflow-hidden px-[3px]"
            >
              <div className="mt-[-965px] animate-manifesto-marquee flex flex-col">
                <h1 className="text-[56px] font-normal leading-[50.4px] tracking-[-2.8px] text-black m-0 pb-[5px]">
                  {INFO_MANIFESTO}
                </h1>
                <p
                  aria-hidden="true"
                  className="text-[56px] font-normal leading-[50.4px] tracking-[-2.8px] text-black m-0 pb-[5px]"
                >
                  {INFO_MANIFESTO}
                </p>
                <p
                  aria-hidden="true"
                  className="text-[56px] font-normal leading-[50.4px] tracking-[-2.8px] text-black m-0 pb-[5px]"
                >
                  {INFO_MANIFESTO}
                </p>
              </div>
            </section>

            {/* Col 4: Bottom Honors & Team */}
            <div className="w-full h-full flex flex-col justify-end">
              <div className="h-[445px] flex flex-col justify-between">
                <div className="flex flex-col gap-[10px]">
                  <p className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-black m-0">
                    Honors
                  </p>
                  <div className="flex flex-col">
                    {INFO_HONORS.map((item) => (
                      <div
                        key={item.award}
                        className="flex items-center justify-between text-[14px] leading-[18.2px] tracking-[-0.14px] text-black"
                      >
                        <span>{item.award}</span>
                        <span>{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-[10px]">
                  <p className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-black m-0">
                    Team
                  </p>
                  <div className="flex flex-col">
                    {INFO_TEAM.map((member) => (
                      <div
                        key={member.name}
                        className="flex items-center justify-between text-[14px] leading-[18.2px] tracking-[-0.14px] text-black"
                      >
                        <span>{member.name}</span>
                        <span>{member.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile 390px single-column scrollable layout matching Chromakey /info */}
          <div className="md:hidden flex flex-col gap-[32px] px-[10px] pb-[10px] bg-white">
            <StudioSubNav
              activeSubPage="info"
              onSelectSubPage={onSelectSubPage}
              isMobile
            />

            <section className="px-[3px]">
              <h1 className="text-[24px] font-normal leading-[24px] tracking-[-0.96px] text-black m-0 pb-[5px]">
                {INFO_MANIFESTO}
              </h1>
            </section>

            <button
              type="button"
              onClick={() => setIsShowreelOpen(true)}
              aria-label="Viwe reel"
              className="w-full h-[400px] rounded-[8px] overflow-hidden relative block p-0 border-0 cursor-pointer text-left bg-[#1a1a1a]"
            >
              <img
                src="/media/info-reel-preview.jpg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <video
                src="/media/info-reel-preview.mp4"
                poster="/media/info-reel-preview.jpg"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-[20px] flex items-center justify-between pointer-events-none">
                <span className="text-[12px] leading-[15.6px] tracking-[-0.12px] text-white">
                  Viwe reel
                </span>
                <svg
                  width="9"
                  height="11"
                  viewBox="0 0 10 12"
                  fill="none"
                  aria-hidden="true"
                  className="shrink-0"
                >
                  <path d="M1 1L9 6L1 11V1Z" fill="#FFFFFF" />
                </svg>
              </div>
            </button>

            <div className="flex flex-col gap-[32px]">
              <div className="flex flex-col gap-[10px]">
                <p className="text-[12px] leading-[15.6px] tracking-[-0.12px] text-black m-0">
                  Honors
                </p>
                <div className="flex flex-col">
                  {INFO_HONORS.map((item) => (
                    <div
                      key={item.award}
                      className="flex items-center justify-between text-[12px] leading-[15.6px] tracking-[-0.12px] text-black"
                    >
                      <span>{item.award}</span>
                      <span>{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-[10px]">
                <p className="text-[12px] leading-[15.6px] tracking-[-0.12px] text-black m-0">
                  Team
                </p>
                <div className="flex flex-col">
                  {INFO_TEAM.map((member) => (
                    <div
                      key={member.name}
                      className="flex items-center justify-between text-[12px] leading-[15.6px] tracking-[-0.12px] text-black"
                    >
                      <span>{member.name}</span>
                      <span>{member.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ===================================================================== */}
      {/* SUB-PAGE 2: /approach                                                 */}
      {/* ===================================================================== */}
      {subPage === 'approach' && (
        <>
          {/* Desktop 1440x900 4-column h-screen layout */}
          <div className="hidden md:grid grid-cols-4 gap-x-[5px] h-screen w-full px-[10px] bg-white overflow-hidden">
            {/* Col 1: Sub-nav + Values at y=450 */}
            <div className="flex flex-col justify-between h-full">
              <div className="w-[355px] max-w-full">
                <StudioSubNav
                  activeSubPage="approach"
                  onSelectSubPage={onSelectSubPage}
                />
              </div>

              <div className="h-[450px] pb-[10px]">
                <div className="flex flex-col gap-[10px]">
                  <p className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-black m-0">
                    Values
                  </p>
                  <div className="flex flex-col">
                    {APPROACH_VALUES.map((val) => (
                      <p
                        key={val}
                        className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-black m-0"
                      >
                        {val}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Col 2: Corporate statements at y=450 */}
            <div className="flex flex-col justify-end h-full">
              <div className="h-[450px] pb-[10px]">
                <div className="flex flex-col gap-[10px]">
                  <p className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-black m-0">
                    Corporate statements
                  </p>
                  <p className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-black m-0">
                    {APPROACH_STATEMENT}
                  </p>
                </div>
              </div>
            </div>

            {/* Col 3: Continuous upward vertical image stream */}
            <div className="h-screen overflow-hidden">
              <div className="mt-[-125px] animate-approach-marquee flex flex-col">
                {[...APPROACH_IMAGES, ...APPROACH_IMAGES].map((img, idx) => (
                  <div key={`${img.src}-${idx}`} className="pb-[3px] shrink-0">
                    <img
                      src={img.src}
                      alt={idx < APPROACH_IMAGES.length ? img.alt : ''}
                      aria-hidden={idx >= APPROACH_IMAGES.length}
                      className="w-full h-[398.3px] rounded-[8px] object-cover block"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Col 4: Interactive 4-stage Accordion at y=450 */}
            <div className="flex flex-col justify-end h-full">
              <div className="h-[450px] pb-[10px]">
                <div className="flex flex-col">
                  {APPROACH_STAGES.map((stage) => {
                    const isOpen = activeStage === stage.id;
                    return isOpen ? (
                      <div
                        key={stage.id}
                        className="border-t border-black pt-[8.9px] pb-[10px] px-[2px]"
                      >
                        <button
                          type="button"
                          aria-expanded={true}
                          onClick={() => setActiveStage(stage.id)}
                          className="w-full text-left text-[14px] leading-[18.2px] tracking-[-0.14px] text-black bg-transparent border-0 p-0 cursor-pointer"
                        >
                          {stage.title}
                        </button>
                        <p className="mt-[61.7px] max-w-[312.5px] text-[14px] leading-[18.2px] tracking-[-0.14px] text-black m-0">
                          {stage.description}
                        </p>
                      </div>
                    ) : (
                      <div
                        key={stage.id}
                        className="border-t border-[#ececec] h-[36px] flex items-center px-[2px]"
                      >
                        <button
                          type="button"
                          aria-expanded={false}
                          onClick={() => setActiveStage(stage.id)}
                          className="w-full h-full flex items-center text-left text-[14px] leading-[18.2px] tracking-[-0.14px] text-[#9c9c9c] hover:text-black transition-colors duration-150 bg-transparent border-0 p-0 cursor-pointer"
                        >
                          {stage.title}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile 390px Approach layout */}
          <div className="md:hidden flex flex-col gap-[32px] px-[10px] pb-[24px] bg-white">
            <StudioSubNav
              activeSubPage="approach"
              onSelectSubPage={onSelectSubPage}
              isMobile
            />

            <div className="flex flex-col gap-[10px]">
              <p className="text-[12px] leading-[15.6px] tracking-[-0.12px] text-black m-0">
                Corporate statements
              </p>
              <p className="text-[12px] leading-[15.6px] tracking-[-0.12px] text-black m-0">
                {APPROACH_STATEMENT}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-[4px]">
              {APPROACH_IMAGES.slice(0, 2).map((img) => (
                <img
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-[210px] rounded-[8px] object-cover block"
                />
              ))}
            </div>

            <div className="flex flex-col">
              {APPROACH_STAGES.map((stage) => {
                const isOpen = activeStage === stage.id;
                return isOpen ? (
                  <div
                    key={stage.id}
                    className="border-t border-black pt-[8px] pb-[12px]"
                  >
                    <button
                      type="button"
                      aria-expanded={true}
                      onClick={() => setActiveStage(stage.id)}
                      className="w-full text-left text-[12px] leading-[15.6px] tracking-[-0.12px] text-black bg-transparent border-0 p-0 cursor-pointer"
                    >
                      {stage.title}
                    </button>
                    <p className="mt-[24px] text-[12px] leading-[15.6px] tracking-[-0.12px] text-black m-0">
                      {stage.description}
                    </p>
                  </div>
                ) : (
                  <div
                    key={stage.id}
                    className="border-t border-[#ececec] h-[34px] flex items-center"
                  >
                    <button
                      type="button"
                      aria-expanded={false}
                      onClick={() => setActiveStage(stage.id)}
                      className="w-full h-full flex items-center text-left text-[12px] leading-[15.6px] tracking-[-0.12px] text-[#9c9c9c] bg-transparent border-0 p-0 cursor-pointer"
                    >
                      {stage.title}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-[10px]">
              <p className="text-[12px] leading-[15.6px] tracking-[-0.12px] text-black m-0">
                Values
              </p>
              <div className="flex flex-col">
                {APPROACH_VALUES.map((val) => (
                  <p
                    key={val}
                    className="text-[12px] leading-[15.6px] tracking-[-0.12px] text-black m-0"
                  >
                    {val}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ===================================================================== */}
      {/* SUB-PAGE 3: /service                                                  */}
      {/* ===================================================================== */}
      {subPage === 'service' && (
        <>
          {/* Desktop 1440x900 Service layout */}
          <div className="hidden md:flex flex-col justify-between h-screen w-full px-[10px] pb-[10px] bg-white overflow-hidden">
            <div className="w-[355px]">
              <StudioSubNav
                activeSubPage="service"
                onSelectSubPage={onSelectSubPage}
              />
            </div>

            <div className="h-[440px] grid grid-cols-[minmax(0,340px)_minmax(0,340px)_minmax(0,1fr)] gap-x-[20px] w-full">
              {/* Capabilities */}
              <div className="flex flex-col gap-[10px]">
                <p className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-black m-0">
                  Capabilities
                </p>
                <div className="flex flex-col">
                  {SERVICE_CAPABILITIES.map((cap) => (
                    <p
                      key={cap}
                      className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-black m-0"
                    >
                      {cap}
                    </p>
                  ))}
                </div>
              </div>

              {/* Industries */}
              <div className="flex flex-col gap-[10px]">
                <p className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-black m-0">
                  Industries
                </p>
                <div className="flex flex-col">
                  {SERVICE_INDUSTRIES.map((ind) => (
                    <p
                      key={ind}
                      className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-black m-0"
                    >
                      {ind}
                    </p>
                  ))}
                </div>
              </div>

              {/* Check our results (2 interactive project cards) */}
              <div className="flex flex-col gap-[10px] min-w-0">
                <p className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-black m-0">
                  Check our results
                </p>
                <div className="grid grid-cols-2 gap-[3px] flex-1 min-h-0">
                  {featuredProjects.slice(0, 2).map((proj) => (
                    <button
                      key={proj.id}
                      type="button"
                      onClick={() => onOpenProject(proj)}
                      aria-label={`Open project ${proj.num} ${proj.title}`}
                      className="relative w-full h-[411.8px] rounded-[16px] overflow-hidden block p-0 border-0 cursor-pointer text-left group bg-[#141414]"
                    >
                      <img
                        src={proj.posterSrc}
                        alt={proj.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      {proj.mediaType === 'video' && proj.videoSrc && (
                        <video
                          src={proj.videoSrc}
                          poster={proj.posterSrc}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                      <div className="absolute inset-x-[13.5px] top-1/2 -translate-y-1/2 py-[20px] flex flex-col gap-[3px] text-white pointer-events-none">
                        <div className="px-[2px] text-[14px] leading-[18.2px] tracking-[-0.14px]">
                          {proj.num}
                        </div>
                        <div className="text-right text-[14px] leading-[18.2px] tracking-[-0.14px]">
                          {proj.title}
                        </div>
                        <div className="flex items-center justify-end gap-[8px] text-[14px] leading-[18.2px] tracking-[-0.14px] text-white/80">
                          {proj.roles.map((r) => (
                            <span key={r}>{r}</span>
                          ))}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile 390px Service layout */}
          <div className="md:hidden flex flex-col gap-[32px] px-[10px] pb-[24px] bg-white">
            <StudioSubNav
              activeSubPage="service"
              onSelectSubPage={onSelectSubPage}
              isMobile
            />

            <div className="grid grid-cols-2 gap-[16px]">
              <div className="flex flex-col gap-[10px]">
                <p className="text-[12px] leading-[15.6px] tracking-[-0.12px] text-black m-0">
                  Capabilities
                </p>
                <div className="flex flex-col">
                  {SERVICE_CAPABILITIES.map((cap) => (
                    <p
                      key={cap}
                      className="text-[12px] leading-[15.6px] tracking-[-0.12px] text-black m-0"
                    >
                      {cap}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-[10px]">
                <p className="text-[12px] leading-[15.6px] tracking-[-0.12px] text-black m-0">
                  Industries
                </p>
                <div className="flex flex-col">
                  {SERVICE_INDUSTRIES.map((ind) => (
                    <p
                      key={ind}
                      className="text-[12px] leading-[15.6px] tracking-[-0.12px] text-black m-0"
                    >
                      {ind}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[10px]">
              <p className="text-[12px] leading-[15.6px] tracking-[-0.12px] text-black m-0">
                Check our results
              </p>
              <div className="flex flex-col gap-[6px]">
                {featuredProjects.slice(0, 2).map((proj) => (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => onOpenProject(proj)}
                    aria-label={`Open project ${proj.num} ${proj.title}`}
                    className="relative w-full h-[300px] rounded-[14px] overflow-hidden block p-0 border-0 cursor-pointer text-left bg-[#141414]"
                  >
                    <img
                      src={proj.posterSrc}
                      alt={proj.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {proj.mediaType === 'video' && proj.videoSrc && (
                      <video
                        src={proj.videoSrc}
                        poster={proj.posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                    <div className="absolute inset-x-[14px] top-1/2 -translate-y-1/2 flex flex-col gap-[2px] text-white pointer-events-none">
                      <div className="text-[12px] leading-[15.6px]">
                        {proj.num}
                      </div>
                      <div className="text-right text-[12px] leading-[15.6px]">
                        {proj.title}
                      </div>
                      <div className="flex items-center justify-end gap-[6px] text-[12px] leading-[15.6px] text-white/80">
                        {proj.roles.map((r) => (
                          <span key={r}>{r}</span>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ===================================================================== */}
      {/* SUB-PAGE 4: /clients                                                  */}
      {/* ===================================================================== */}
      {subPage === 'clients' && (
        <>
          {/* Desktop 1440x900 4-column Clients layout */}
          <div className="hidden md:grid grid-cols-4 h-screen w-full px-[10px] pb-[10px] bg-white overflow-hidden">
            {/* Col 1: Sub-nav + Press list at y=445 */}
            <div className="w-full h-full flex flex-col justify-between">
              <StudioSubNav
                activeSubPage="clients"
                onSelectSubPage={onSelectSubPage}
                mutedInactive
              />

              <div className="h-[445px] flex flex-col justify-start">
                <div className="flex flex-col gap-[10px]">
                  <p className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-black m-0">
                    Press
                  </p>
                  <div className="flex flex-col gap-[1px]">
                    {CLIENTS_PRESS.map((article) => (
                      <button
                        key={article.id}
                        type="button"
                        onClick={() => setSelectedPress(article)}
                        className="w-full h-[28.2px] px-[5px] rounded-[5px] flex items-center text-left text-[14px] leading-[18.2px] tracking-[-0.14px] text-[#b3b3b3] hover:bg-black hover:text-white transition-colors duration-150 cursor-pointer bg-transparent border-0 whitespace-nowrap truncate"
                      >
                        {article.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Cols 2–3: 56px Interactive Client Roster */}
            <div className="col-span-2 h-screen overflow-hidden">
              <div className="mt-[-10px] flex flex-col items-start">
                {[...CLIENTS_LIST, CLIENTS_LIST[0], CLIENTS_LIST[1]].map(
                  (client, idx) => {
                    const isDuplicate = idx >= CLIENTS_LIST.length;
                    const isHighlighted = hoveredClientId === client.id;

                    if (isDuplicate) {
                      return (
                        <div
                          key={`${client.id}-dup-${idx}`}
                          aria-hidden="true"
                          onMouseEnter={() => setHoveredClientId(client.id)}
                          className={`text-[56px] font-normal leading-[50.4px] tracking-[-2.8px] pb-[5px] transition-colors duration-150 cursor-pointer select-none ${
                            isHighlighted
                              ? 'text-black'
                              : 'text-[#cfcfcf] hover:text-black'
                          }`}
                        >
                          {client.name}
                        </div>
                      );
                    }

                    return (
                      <button
                        key={client.id}
                        type="button"
                        onMouseEnter={() => setHoveredClientId(client.id)}
                        onFocus={() => setHoveredClientId(client.id)}
                        onClick={() => setHoveredClientId(client.id)}
                        className={`text-left text-[56px] font-normal leading-[50.4px] tracking-[-2.8px] pb-[5px] transition-colors duration-150 cursor-pointer bg-transparent border-0 p-0 ${
                          isHighlighted
                            ? 'text-black'
                            : 'text-[#cfcfcf] hover:text-black'
                        }`}
                      >
                        {client.name}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Col 4: 355x445 Right Cover Showcase */}
            <div className="w-full h-full flex flex-col justify-end">
              <div className="w-full h-[445px] rounded-[8px] overflow-hidden relative bg-[#f5f5f5]">
                {CLIENTS_LIST.map((client) => (
                  <img
                    key={client.id}
                    src={client.imageSrc}
                    alt={`${client.name} — ${client.sector}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                      displayedClient.id === client.id
                        ? 'opacity-100 z-10'
                        : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile 390px Clients layout */}
          <div className="md:hidden flex flex-col gap-[32px] px-[10px] pb-[24px] bg-white">
            <StudioSubNav
              activeSubPage="clients"
              onSelectSubPage={onSelectSubPage}
              isMobile
              mutedInactive
            />

            <div className="w-full h-[300px] rounded-[8px] overflow-hidden relative bg-[#f5f5f5]">
              <img
                src={displayedClient.imageSrc}
                alt={`${displayedClient.name} — ${displayedClient.sector}`}
                className="w-full h-full object-cover block"
              />
            </div>

            <div className="flex flex-col items-start">
              {CLIENTS_LIST.map((client) => {
                const isHighlighted = displayedClient.id === client.id;
                return (
                  <button
                    key={client.id}
                    type="button"
                    onClick={() => setHoveredClientId(client.id)}
                    className={`text-left text-[28px] font-normal leading-[27px] tracking-[-1.2px] pb-[4px] transition-colors duration-150 cursor-pointer bg-transparent border-0 p-0 ${
                      isHighlighted ? 'text-black' : 'text-[#cfcfcf]'
                    }`}
                  >
                    {client.name}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-[10px]">
              <p className="text-[12px] leading-[15.6px] tracking-[-0.12px] text-black m-0">
                Press
              </p>
              <div className="flex flex-col gap-[2px]">
                {CLIENTS_PRESS.map((article) => (
                  <button
                    key={article.id}
                    type="button"
                    onClick={() => setSelectedPress(article)}
                    className="w-full h-[25.6px] px-[5px] rounded-[5px] flex items-center text-left text-[12px] leading-[15.6px] tracking-[-0.12px] text-[#8a8a8a] hover:bg-black hover:text-white transition-colors cursor-pointer bg-transparent border-0 truncate"
                  >
                    {article.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Press Feature Reader Modal */}
      <AnimatePresence>
        {selectedPress && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={selectedPress.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setSelectedPress(null)}
            className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-center justify-center p-[16px]"
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[480px] bg-white text-black rounded-[10px] p-[24px] flex flex-col gap-[16px] shadow-2xl"
            >
              <div className="flex items-center justify-between text-[13px] text-[#7a7a7a]">
                <span>
                  {selectedPress.publication} · {selectedPress.date}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedPress(null)}
                  className="text-[13px] text-black hover:opacity-65 cursor-pointer bg-transparent border-0 p-0"
                >
                  Close
                </button>
              </div>
              <h2 className="text-[24px] font-normal leading-[26px] tracking-[-0.96px] text-black m-0">
                {selectedPress.title}
              </h2>
              <p className="text-[14px] leading-[19.6px] tracking-[-0.14px] text-[#333333] m-0">
                {selectedPress.summary}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Showreel Player */}
      <ShowreelModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
      />
    </div>
  );
};

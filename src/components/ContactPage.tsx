import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import {
  INQUIRY_BUDGET_OPTIONS,
  InquiryFormInput,
  validateInquiryForm,
} from '../utils/worksLogic';

interface RoleSpec {
  id: 'mid-creative-producer' | 'sr-cgi-3d-artist';
  title: string;
  location: string;
  summary: string;
  focus: string[];
}

const OPEN_ROLES: RoleSpec[] = [
  {
    id: 'mid-creative-producer',
    title: 'Mid. Creative Producer',
    location: 'Paris · Full-time · Hybrid',
    summary:
      'Lead end-to-end production across CGI, film, and digital commissions—bridging client partnerships, schedules, budgets, and multidisciplinary artists.',
    focus: [
      '3+ years producing motion, CGI, or digital brand campaigns',
      'Scoping briefs, timelines, milestones, and vendor deliveries',
      'Fluent English & French communication from Paris studio',
    ],
  },
  {
    id: 'sr-cgi-3d-artist',
    title: 'Sr. CGI / 3D Artist',
    location: 'Paris · Full-time · On-site / Hybrid',
    summary:
      'Shape look development, lighting, procedural simulations, and tactile material systems for luxury, design, and cultural commissions.',
    focus: [
      'Mastery of Houdini, Cinema 4D, Redshift / Octane, and compositing',
      'Strong photographic eye for light, glass, metal, and cloth',
      'Collaborative R&D mindset across stills and 60fps sequences',
    ],
  },
];

interface SubmittedInquiry extends InquiryFormInput {
  submittedAt: string;
}

export const ContactPage: React.FC = () => {
  const [videoFailed, setVideoFailed] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<RoleSpec | null>(null);

  const [formState, setFormState] = useState<InquiryFormInput>({
    name: '',
    email: '',
    budget: '',
    aboutProject: '',
  });
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof InquiryFormInput, string>>
  >({});
  const [submittedInquiries, setSubmittedInquiries] = useState<
    SubmittedInquiry[]
  >([]);
  const [showInquirySuccess, setShowInquirySuccess] = useState(false);

  // Role application state
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [roleError, setRoleError] = useState<string | null>(null);
  const [appliedRoles, setAppliedRoles] = useState<string[]>([]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isInquiryOpen) setIsInquiryOpen(false);
        if (activeRole) setActiveRole(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isInquiryOpen, activeRole]);

  const handleOpenInquiry = () => {
    setActiveRole(null);
    setShowInquirySuccess(false);
    setFormErrors({});
    setIsInquiryOpen(true);
  };

  const handleOpenRole = (role: RoleSpec) => {
    setIsInquiryOpen(false);
    setRoleError(null);
    setActiveRole(role);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateInquiryForm(formState);
    if (!validation.valid) {
      setFormErrors(validation.errors);
      return;
    }

    setFormErrors({});
    const entry: SubmittedInquiry = {
      name: formState.name.trim(),
      email: formState.email.trim(),
      budget: formState.budget,
      aboutProject: formState.aboutProject.trim(),
      submittedAt: new Date().toISOString(),
    };
    setSubmittedInquiries((prev) => [entry, ...prev]);
    setShowInquirySuccess(true);
    setFormState({
      name: '',
      email: '',
      budget: '',
      aboutProject: '',
    });
  };

  const handleRoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeRole) return;
    if (!applicantName.trim()) {
      setRoleError('Please enter your name.');
      return;
    }
    if (
      !applicantEmail.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(applicantEmail.trim())
    ) {
      setRoleError('Please enter a valid email address.');
      return;
    }
    if (!portfolioUrl.trim()) {
      setRoleError('Please include a link to your portfolio or reel.');
      return;
    }

    setRoleError(null);
    setAppliedRoles((prev) =>
      prev.includes(activeRole.id) ? prev : [...prev, activeRole.id]
    );
    setApplicantName('');
    setApplicantEmail('');
    setPortfolioUrl('');
  };

  // Shared interactive link row classes matching Chromakey Framer:
  // Mobile (< md): Blur-mob dark frosted pill h-[25.6px] p-[5px] rounded-[5px] bg-[rgba(0,0,0,0.2)] backdrop-blur-[40px] text-[12px]
  // Desktop (md:): Primary-desk transparent at rest, h-[28.2px] p-[5px] rounded-[5px] text-[14px], white hover fill + black text
  const contactItemClass =
    'w-full h-[25.6px] md:h-[28.2px] p-[5px] rounded-[5px] bg-[rgba(0,0,0,0.2)] backdrop-blur-[40px] md:bg-transparent md:backdrop-blur-none text-white hover:bg-white hover:text-black transition-colors duration-150 flex items-center justify-between text-left text-[12px] leading-[15.6px] tracking-[-0.12px] md:text-[14px] md:leading-[18.2px] md:tracking-[-0.14px] no-underline cursor-pointer border-0';

  const latestSubmission = submittedInquiries[0];

  return (
    <div className="relative w-full min-h-screen md:min-h-[945px] bg-black text-white overflow-x-hidden">
      {/* Full-bleed atmospheric video + 50px frosted blur overlay */}
      <div
        className="fixed inset-0 z-0 overflow-hidden bg-black pointer-events-none"
        aria-hidden="true"
      >
        {!videoFailed ? (
          <video
            src="/media/contact-bg.mp4"
            poster="/media/contact-bg.jpg"
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoFailed(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src="/media/contact-bg.jpg"
            alt="Chromakey Studio"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)] backdrop-blur-[50px]" />
      </div>

      {/* Main Contact Body matching 1440x900 & 390x844 pixel geometry */}
      <section className="relative z-10 w-full min-h-screen md:min-h-[945px] pt-[40px] px-[10px] pb-[24px] md:pb-[10px] flex flex-col gap-[1px]">
        {/* Top Block: Heading section */}
        <div className="w-full md:min-h-[447px] pt-[98.6px] md:pt-[100px]">
          <div className="flex flex-col gap-[10px]">
            <p className="text-[12px] leading-[15.6px] tracking-[-0.12px] md:text-[14px] md:leading-[18.2px] md:tracking-[-0.14px] font-normal text-white m-0">
              Let’s Work Together
            </p>
            <h1 className="max-w-[1278px] text-[24px] leading-[24px] tracking-[-0.96px] md:text-[56px] md:leading-[50.4px] md:tracking-[-2.8px] pb-[5px] font-normal text-white m-0">
              We collaborate with brands, agencies and creative teams on visual
              projects across motion, CGI, film, design and digital production.
              Share your brief, timeline and goals to get started.
            </h1>
          </div>
        </div>

        {/* Bottom Block: 4-Column Contact section */}
        <div className="w-full md:min-h-[447px] pt-[40px] md:pt-0 grid grid-cols-1 md:grid-cols-4 gap-y-[40px] md:gap-y-0 md:gap-x-[3px] items-start">
          {/* Column 1: Adress (exact spelling from Chromakey reference) */}
          <div className="flex flex-col gap-[10px]">
            <p className="text-[12px] leading-[15.6px] tracking-[-0.12px] md:text-[14px] md:leading-[18.2px] md:tracking-[-0.14px] font-normal text-white m-0">
              Adress
            </p>
            <p className="max-w-[270px] text-[12px] leading-[15.6px] tracking-[-0.12px] md:text-[14px] md:leading-[18.2px] md:tracking-[-0.14px] font-normal text-white m-0">
              Office 99, 22 Avenue Montaigne, 75008 Paris, France
            </p>
          </div>

          {/* Column 2: Get in touch */}
          <div className="flex flex-col gap-[10px]">
            <p className="text-[12px] leading-[15.6px] tracking-[-0.12px] md:text-[14px] md:leading-[18.2px] md:tracking-[-0.14px] font-normal text-white m-0">
              Get in touch
            </p>
            <div className="flex flex-col gap-[1px]">
              <a href="mailto:hello@chromakey.com" className={contactItemClass}>
                <span>hello@chromakey.com</span>
              </a>
              <button
                type="button"
                onClick={handleOpenInquiry}
                aria-expanded={isInquiryOpen}
                className={`${contactItemClass} ${
                  isInquiryOpen ? 'md:bg-white md:text-black' : ''
                }`}
              >
                <span>Send an Inquiry</span>
                {submittedInquiries.length > 0 && (
                  <span className="text-[11px] opacity-70">
                    Sent ({submittedInquiries.length})
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Column 3: Channels */}
          <div className="flex flex-col gap-[10px]">
            <p className="text-[12px] leading-[15.6px] tracking-[-0.12px] md:text-[14px] md:leading-[18.2px] md:tracking-[-0.14px] font-normal text-white m-0">
              Channels
            </p>
            <div className="flex flex-col gap-[3px] md:gap-[2px]">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className={contactItemClass}
              >
                <span>Instagram</span>
              </a>
              <a
                href="https://www.are.na/"
                target="_blank"
                rel="noreferrer"
                className={contactItemClass}
              >
                <span>Are.na</span>
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className={contactItemClass}
              >
                <span>Linkedin</span>
              </a>
            </div>
          </div>

          {/* Column 4: Open Roles */}
          <div className="flex flex-col gap-[10px]">
            <p className="text-[12px] leading-[15.6px] tracking-[-0.12px] md:text-[14px] md:leading-[18.2px] md:tracking-[-0.14px] font-normal text-white m-0">
              Open Roles
            </p>
            <div className="flex flex-col gap-[3px] md:gap-[1px]">
              {OPEN_ROLES.map((role) => {
                const isApplied = appliedRoles.includes(role.id);
                const isSelected = activeRole?.id === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => handleOpenRole(role)}
                    aria-expanded={isSelected}
                    className={`${contactItemClass} ${
                      isSelected ? 'md:bg-white md:text-black' : ''
                    }`}
                  >
                    <span>{role.title}</span>
                    {isApplied && (
                      <span className="text-[11px] opacity-70">Applied</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Column-2 Frosted Inquiry Popover matching Chromakey reference (x: 366, y: 46, w: 353) */}
      <AnimatePresence>
        {isInquiryOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
              onClick={() => setIsInquiryOpen(false)}
              className="fixed inset-0 z-30 bg-transparent"
              aria-hidden="true"
            />
            <div className="fixed top-[44px] md:top-[46px] left-[10px] right-[10px] z-40 pointer-events-none md:grid md:grid-cols-4 md:gap-[2px]">
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="Send an Inquiry"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto md:col-start-2 md:col-span-1 flex flex-col gap-[2px]"
              >
                <button
                  type="button"
                  onClick={() => setIsInquiryOpen(false)}
                  className="w-full h-[28.2px] px-[5px] rounded-[5px] bg-[rgba(0,0,0,0.45)] backdrop-blur-[40px] text-white hover:bg-white hover:text-black transition-colors duration-150 flex items-center text-left text-[14px] leading-[18.2px] tracking-[-0.14px] cursor-pointer border-0"
                >
                  Hide
                </button>

                {showInquirySuccess && latestSubmission ? (
                  <div className="w-full rounded-[5px] bg-[rgba(0,0,0,0.35)] backdrop-blur-[40px] p-[14px] flex flex-col gap-[12px] border border-white/[0.08] shadow-2xl">
                    <div className="flex flex-col gap-[4px]">
                      <p className="text-[14px] leading-[18.2px] tracking-[-0.14px] text-white m-0">
                        Inquiry received
                      </p>
                      <p className="text-[12px] leading-[16px] text-white/70 m-0">
                        Thank you, {latestSubmission.name}. Our Paris producers
                        will reply to {latestSubmission.email} within 24 hours.
                      </p>
                    </div>
                    <div className="rounded-[5px] bg-black/25 p-[10px] flex flex-col gap-[4px] border border-white/[0.06] text-[12px] text-white/80">
                      <div>Budget: {latestSubmission.budget}</div>
                      <div className="line-clamp-3">
                        Brief: {latestSubmission.aboutProject}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowInquirySuccess(false)}
                      className="w-full h-[38px] rounded-[5px] bg-white/[0.06] hover:bg-white text-white hover:text-black border border-white/[0.16] transition-colors duration-150 text-[13px] cursor-pointer"
                    >
                      Send another inquiry
                    </button>
                  </div>
                ) : (
                  <form
                    noValidate
                    onSubmit={handleInquirySubmit}
                    className="w-full rounded-[5px] bg-[rgba(0,0,0,0.32)] backdrop-blur-[40px] p-[10px] flex flex-col gap-[14px] border border-white/[0.06] shadow-2xl"
                  >
                    <div className="grid grid-cols-2 gap-[10px]">
                      <div className="flex flex-col gap-[6px]">
                        <label
                          htmlFor="inquiry-name"
                          className="text-[12px] leading-[15.6px] tracking-[-0.12px] text-white"
                        >
                          Name
                        </label>
                        <input
                          id="inquiry-name"
                          type="text"
                          name="Name"
                          placeholder="Jane Smith"
                          value={formState.name}
                          onChange={(e) => {
                            setFormState((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }));
                            if (formErrors.name) {
                              setFormErrors((prev) => ({
                                ...prev,
                                name: undefined,
                              }));
                            }
                          }}
                          aria-invalid={Boolean(formErrors.name)}
                          className="w-full h-[35px] px-[8px] rounded-[5px] bg-[rgba(0,0,0,0.2)] border border-white/[0.08] focus:border-white/40 outline-none text-[14px] text-white placeholder:text-white/40"
                        />
                      </div>

                      <div className="flex flex-col gap-[6px]">
                        <label
                          htmlFor="inquiry-email"
                          className="text-[12px] leading-[15.6px] tracking-[-0.12px] text-white"
                        >
                          Email
                        </label>
                        <input
                          id="inquiry-email"
                          type="email"
                          name="Email"
                          placeholder="jane@framer.com"
                          value={formState.email}
                          onChange={(e) => {
                            setFormState((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }));
                            if (formErrors.email) {
                              setFormErrors((prev) => ({
                                ...prev,
                                email: undefined,
                              }));
                            }
                          }}
                          aria-invalid={Boolean(formErrors.email)}
                          className="w-full h-[35px] px-[8px] rounded-[5px] bg-[rgba(0,0,0,0.2)] border border-white/[0.08] focus:border-white/40 outline-none text-[14px] text-white placeholder:text-white/40"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-[6px]">
                      <label
                        htmlFor="inquiry-budget"
                        className="text-[12px] leading-[15.6px] tracking-[-0.12px] text-white"
                      >
                        Budget
                      </label>
                      <div className="relative">
                        <select
                          id="inquiry-budget"
                          name="Budget"
                          value={formState.budget}
                          onChange={(e) => {
                            setFormState((prev) => ({
                              ...prev,
                              budget: e.target.value,
                            }));
                            if (formErrors.budget) {
                              setFormErrors((prev) => ({
                                ...prev,
                                budget: undefined,
                              }));
                            }
                          }}
                          aria-invalid={Boolean(formErrors.budget)}
                          className={`w-full h-[35px] px-[8px] pr-[28px] rounded-[5px] bg-[rgba(0,0,0,0.2)] border border-white/[0.08] focus:border-white/40 outline-none text-[14px] appearance-none cursor-pointer ${
                            formState.budget ? 'text-white' : 'text-white/45'
                          }`}
                        >
                          <option value="" disabled className="bg-[#161616]">
                            Select…
                          </option>
                          {INQUIRY_BUDGET_OPTIONS.map((opt) => (
                            <option
                              key={opt}
                              value={opt}
                              className="bg-[#161616] text-white"
                            >
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-[14px] h-[14px] text-white/50 pointer-events-none absolute right-[8px] top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-[6px]">
                      <label
                        htmlFor="inquiry-about"
                        className="text-[12px] leading-[15.6px] tracking-[-0.12px] text-white"
                      >
                        About project
                      </label>
                      <textarea
                        id="inquiry-about"
                        name="AboutProject"
                        placeholder="Share your brief, timeline and goals…"
                        value={formState.aboutProject}
                        onChange={(e) => {
                          setFormState((prev) => ({
                            ...prev,
                            aboutProject: e.target.value,
                          }));
                          if (formErrors.aboutProject) {
                            setFormErrors((prev) => ({
                              ...prev,
                              aboutProject: undefined,
                            }));
                          }
                        }}
                        aria-invalid={Boolean(formErrors.aboutProject)}
                        className="w-full h-[100px] p-[10px] rounded-[5px] bg-[rgba(0,0,0,0.2)] border border-white/[0.08] focus:border-white/40 outline-none text-[14px] text-white placeholder:text-white/40 resize-y"
                      />
                    </div>

                    {Object.keys(formErrors).length > 0 && (
                      <p
                        role="alert"
                        className="text-[12px] leading-[15.6px] text-[#ff9e94] m-0"
                      >
                        {formErrors.name ||
                          formErrors.email ||
                          formErrors.budget ||
                          formErrors.aboutProject}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="w-full h-[40px] rounded-[5px] bg-white/[0.04] hover:bg-white text-white hover:text-black border border-white/[0.16] transition-colors duration-150 text-[14px] leading-[18.2px] tracking-[-0.14px] flex items-center justify-center cursor-pointer"
                    >
                      Submit
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Column-4 Frosted Role Detail & Application Popover */}
      <AnimatePresence>
        {activeRole && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
              onClick={() => setActiveRole(null)}
              className="fixed inset-0 z-30 bg-transparent"
              aria-hidden="true"
            />
            <div className="fixed top-[44px] md:top-[46px] left-[10px] right-[10px] z-40 pointer-events-none md:grid md:grid-cols-4 md:gap-[2px]">
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={activeRole.title}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto md:col-start-4 md:col-span-1 flex flex-col gap-[2px]"
              >
                <button
                  type="button"
                  onClick={() => setActiveRole(null)}
                  className="w-full h-[28.2px] px-[5px] rounded-[5px] bg-[rgba(0,0,0,0.45)] backdrop-blur-[40px] text-white hover:bg-white hover:text-black transition-colors duration-150 flex items-center text-left text-[14px] leading-[18.2px] tracking-[-0.14px] cursor-pointer border-0"
                >
                  Hide
                </button>

                <div className="w-full rounded-[5px] bg-[rgba(0,0,0,0.34)] backdrop-blur-[40px] p-[12px] flex flex-col gap-[12px] border border-white/[0.08] shadow-2xl">
                  <div className="flex flex-col gap-[4px]">
                    <h2 className="text-[16px] leading-[20px] tracking-[-0.32px] font-normal text-white m-0">
                      {activeRole.title}
                    </h2>
                    <p className="text-[12px] leading-[15.6px] text-white/60 m-0">
                      {activeRole.location}
                    </p>
                  </div>

                  <p className="text-[12px] leading-[16.8px] text-white/85 m-0">
                    {activeRole.summary}
                  </p>

                  <ul className="m-0 pl-[14px] flex flex-col gap-[4px] text-[12px] leading-[16px] text-white/75">
                    {activeRole.focus.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  {appliedRoles.includes(activeRole.id) ? (
                    <div className="rounded-[5px] bg-white/[0.08] p-[10px] text-[12px] leading-[16px] text-white">
                      Application received for {activeRole.title}. Our studio
                      team will review your reel and get back to you.
                    </div>
                  ) : (
                    <form
                      noValidate
                      onSubmit={handleRoleSubmit}
                      className="flex flex-col gap-[8px] pt-[6px] border-t border-white/10"
                    >
                      <div className="grid grid-cols-2 gap-[8px]">
                        <input
                          type="text"
                          aria-label="Your name"
                          placeholder="Your name"
                          value={applicantName}
                          onChange={(e) => {
                            setApplicantName(e.target.value);
                            if (roleError) setRoleError(null);
                          }}
                          className="w-full h-[33px] px-[8px] rounded-[5px] bg-[rgba(0,0,0,0.22)] border border-white/[0.08] focus:border-white/40 outline-none text-[13px] text-white placeholder:text-white/40"
                        />
                        <input
                          type="email"
                          aria-label="Your email"
                          placeholder="you@studio.com"
                          value={applicantEmail}
                          onChange={(e) => {
                            setApplicantEmail(e.target.value);
                            if (roleError) setRoleError(null);
                          }}
                          className="w-full h-[33px] px-[8px] rounded-[5px] bg-[rgba(0,0,0,0.22)] border border-white/[0.08] focus:border-white/40 outline-none text-[13px] text-white placeholder:text-white/40"
                        />
                      </div>
                      <input
                        type="url"
                        aria-label="Portfolio or reel URL"
                        placeholder="Portfolio / Reel URL"
                        value={portfolioUrl}
                        onChange={(e) => {
                          setPortfolioUrl(e.target.value);
                          if (roleError) setRoleError(null);
                        }}
                        className="w-full h-[33px] px-[8px] rounded-[5px] bg-[rgba(0,0,0,0.22)] border border-white/[0.08] focus:border-white/40 outline-none text-[13px] text-white placeholder:text-white/40"
                      />
                      {roleError && (
                        <p
                          role="alert"
                          className="text-[12px] text-[#ff9e94] m-0"
                        >
                          {roleError}
                        </p>
                      )}
                      <button
                        type="submit"
                        className="w-full h-[36px] rounded-[5px] bg-white/[0.04] hover:bg-white text-white hover:text-black border border-white/[0.16] transition-colors duration-150 text-[13px] flex items-center justify-center cursor-pointer"
                      >
                        Apply for role
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { User } from 'firebase/auth';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Cpu,
  Download,
  FileSpreadsheet,
  Image as ImageIcon,
  LayoutGrid,
  Maximize2,
  MessageSquareText,
  MonitorPlay,
  Search,
} from 'lucide-react';
import { SLIDES_DATA } from './data/slidesData';
import { SlideCanvas } from './components/SlideCanvas';
import { MvpPrototypeDemo } from './components/MvpPrototypeDemo';
import { GoogleSlidesModal } from './components/GoogleSlidesModal';
import { exportDeckToPptx } from './utils/exportPptx';
import { googleSignIn, initAuth, logout } from './auth/googleAuth';

type WorkspaceMode = 'single' | 'screenshot' | 'grid' | 'prototype';

export default function App() {
  const [activeSlide, setActiveSlide] = useState<number>(1);
  const [viewMode, setViewMode] = useState<WorkspaceMode>('single');
  const [showNotes, setShowNotes] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isExportingPptx, setIsExportingPptx] = useState<boolean>(false);
  const [copiedNote, setCopiedNote] = useState<boolean>(false);
  const [isSlidesModalOpen, setIsSlidesModalOpen] = useState<boolean>(false);

  // Google Workspace Auth state
  const [needsAuth, setNeedsAuth] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      (authedUser, token) => {
        setUser(authedUser);
        setAccessToken(token);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setAccessToken(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setAccessToken(result.accessToken);
        setNeedsAuth(false);
      }
    } catch (err) {
      console.error('Google Sign-In failed:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleLogout = async () => {
    await logout();
    setUser(null);
    setAccessToken(null);
    setNeedsAuth(true);
  };

  const goPrev = useCallback(() => {
    setActiveSlide((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const goNext = useCallback(() => {
    setActiveSlide((prev) => (prev < SLIDES_DATA.length ? prev + 1 : prev));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSlidesModalOpen || viewMode === 'prototype') return;
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, isSlidesModalOpen, viewMode]);

  const handleExportPptx = async () => {
    if (isExportingPptx) return;
    setIsExportingPptx(true);
    try {
      await exportDeckToPptx();
    } catch (err) {
      console.error('PPTX export error:', err);
    } finally {
      setIsExportingPptx(false);
    }
  };

  const handleToggleFullscreen = () => {
    if (!stageRef.current) return;
    if (!document.fullscreenElement) {
      stageRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleCopySpeakerNote = () => {
    const currentSlide = SLIDES_DATA[activeSlide - 1];
    if (!currentSlide) return;
    navigator.clipboard.writeText(currentSlide.speakerNotes).catch(() => {});
    setCopiedNote(true);
    setTimeout(() => setCopiedNote(false), 1800);
  };

  const filteredSlides = SLIDES_DATA.filter((s) =>
    `${s.indexLabel} ${s.title}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentSlideObj = SLIDES_DATA[activeSlide - 1] || SLIDES_DATA[0];

  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-100 flex flex-col">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-slate-800/90 bg-[#0B1220]">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#slide-1"
          onClick={(e) => {
            e.preventDefault();
            setViewMode('single');
            setActiveSlide(1);
          }}
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0"
        >
          FleetEye AI
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a
            href="#slaydlar"
            onClick={(e) => {
              e.preventDefault();
              setViewMode('single');
              setActiveSlide(1);
            }}
            className={`hover:text-[#22D3EE] transition-colors whitespace-nowrap shrink-0 ${
              viewMode !== 'prototype' && activeSlide <= 3 ? 'text-[#22D3EE]' : ''
            }`}
          >
            Slaydlar
          </a>
          <a
            href="#bozor"
            onClick={(e) => {
              e.preventDefault();
              setViewMode('single');
              setActiveSlide(4);
            }}
            className={`hover:text-[#22D3EE] transition-colors whitespace-nowrap shrink-0 ${
              viewMode !== 'prototype' &&
              (activeSlide === 4 || (activeSlide >= 6 && activeSlide <= 8))
                ? 'text-[#22D3EE]'
                : ''
            }`}
          >
            Bozor va Model
          </a>
          <a
            href="#texnologiya"
            onClick={(e) => {
              e.preventDefault();
              setViewMode('single');
              setActiveSlide(5);
            }}
            className={`hover:text-[#22D3EE] transition-colors whitespace-nowrap shrink-0 ${
              viewMode !== 'prototype' && activeSlide === 5 ? 'text-[#22D3EE]' : ''
            }`}
          >
            Texnologiya
          </a>
          <a
            href="#prototip"
            onClick={(e) => {
              e.preventDefault();
              setViewMode('prototype');
            }}
            className={`hover:text-[#22D3EE] transition-colors whitespace-nowrap shrink-0 ${
              viewMode === 'prototype' ? 'text-[#22D3EE]' : ''
            }`}
          >
            MVP Prototip
          </a>
          <a
            href="#google-slides"
            onClick={(e) => {
              e.preventDefault();
              setIsSlidesModalOpen(true);
            }}
            className="hover:text-[#22D3EE] transition-colors whitespace-nowrap shrink-0"
          >
            Google Slides
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleExportPptx}
            disabled={isExportingPptx}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#0B1220] bg-[#22D3EE] rounded-lg hover:bg-[#22D3EE]/90 transition-colors disabled:opacity-60 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExportingPptx ? 'Yuklanmoqda...' : 'PPTX yuklab olish'}</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Container */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-[1600px] w-full mx-auto">
        {/* Left Sidebar: 10-Slide Navigator + Prototype Switch */}
        <aside className="w-full lg:w-72 border-b lg:border-b-0 lg:border-r border-slate-800/90 bg-[#0B1220] p-4 flex flex-col justify-between gap-4 shrink-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-200">UzCombinator Deck</span>
              <span className="font-mono tabular-nums">10 slayd · 16:9</span>
            </div>

            {/* Direct MVP Prototype Button in Sidebar */}
            <button
              type="button"
              onClick={() => setViewMode('prototype')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                viewMode === 'prototype'
                  ? 'bg-[#22D3EE] text-[#0B1220] border-[#22D3EE]'
                  : 'bg-[#111C30] text-[#22D3EE] border-[#22D3EE]/40 hover:bg-[#16243D]'
              }`}
            >
              <span className="flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                MVP Ishchi Prototip (Demo)
              </span>
              <span className="font-mono text-[10px]">JONLI</span>
            </button>

            {/* Slide Search Filter */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Slaydni qidirish..."
                className="w-full bg-[#111C30] border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-[#22D3EE]"
              />
            </div>

            {/* Slide List */}
            <div className="space-y-1 max-h-[320px] lg:max-h-[480px] overflow-y-auto pr-1">
              {filteredSlides.map((s) => {
                const isSelected =
                  activeSlide === s.id && (viewMode === 'single' || viewMode === 'screenshot');
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setActiveSlide(s.id);
                      if (viewMode === 'grid' || viewMode === 'prototype') {
                        setViewMode('single');
                      }
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-xs font-medium transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#16243D] text-[#22D3EE] border border-[#22D3EE]/40'
                        : 'text-slate-300 hover:bg-[#111C30] hover:text-white border border-transparent'
                    }`}
                  >
                    <span className="truncate">
                      <span className="font-mono tabular-nums text-slate-500 mr-2">
                        {s.indexLabel}.
                      </span>
                      {s.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Workspace Google Slides Connection Card */}
          <div className="bg-[#111C30] border border-slate-800 rounded-xl p-3.5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200">Google Slides API</span>
              <span className="font-mono text-[11px] text-[#22D3EE]">
                {needsAuth ? 'Ulanmagan' : 'Faol'}
              </span>
            </div>

            {needsAuth ? (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoggingIn}
                  className="gsi-material-button w-full"
                >
                  <div className="gsi-material-button-state"></div>
                  <div className="gsi-material-button-content-wrapper">
                    <div className="gsi-material-button-icon">
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        style={{ display: 'block' }}
                      >
                        <path
                          fill="#EA4335"
                          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                        ></path>
                        <path
                          fill="#4285F4"
                          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                        ></path>
                        <path
                          fill="#FBBC05"
                          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                        ></path>
                        <path
                          fill="#34A853"
                          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                        ></path>
                        <path fill="none" d="M0 0h48v48H0z"></path>
                      </svg>
                    </div>
                    <span className="gsi-material-button-contents">
                      {isLoggingIn ? 'Ulanmoqda...' : 'Sign in with Google'}
                    </span>
                    <span style={{ display: 'none' }}>Sign in with Google</span>
                  </div>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsSlidesModalOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold bg-[#22D3EE]/15 text-[#22D3EE] border border-[#22D3EE]/40 rounded-lg hover:bg-[#22D3EE]/25 transition-colors whitespace-nowrap cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                Google Slides-ga eksport
              </button>
            )}
          </div>
        </aside>

        {/* Right Main Stage */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col gap-5 min-w-0">
          {/* Workspace Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-[#111C30] border border-slate-800 rounded-xl px-4 py-3">
            {/* Segmented View Switcher */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-[#0B1220] border border-slate-800 rounded-lg">
              <button
                type="button"
                onClick={() => setViewMode('single')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'single'
                    ? 'bg-[#16243D] text-[#22D3EE]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <MonitorPlay className="w-3.5 h-3.5" />
                Interaktiv slayd
              </button>
              <button
                type="button"
                onClick={() => setViewMode('screenshot')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'screenshot'
                    ? 'bg-[#16243D] text-[#22D3EE]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                Asl maket (Skrinshot)
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#16243D] text-[#22D3EE]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                Barcha slaydlar (10)
              </button>
              <button
                type="button"
                onClick={() => setViewMode('prototype')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'prototype'
                    ? 'bg-[#22D3EE] text-[#0B1220] font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                MVP Prototip
              </button>
            </div>

            {/* Slide Controls & Actions */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {(viewMode === 'single' || viewMode === 'screenshot') && (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={goPrev}
                    disabled={activeSlide === 1}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-[#0B1220] border border-slate-800 rounded-lg text-slate-200 hover:border-[#22D3EE] disabled:opacity-40 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Oldingi
                  </button>
                  <span className="px-2.5 text-xs font-mono tabular-nums text-slate-300">
                    {String(activeSlide).padStart(2, '0')} / 10
                  </span>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={activeSlide === SLIDES_DATA.length}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-[#0B1220] border border-slate-800 rounded-lg text-slate-200 hover:border-[#22D3EE] disabled:opacity-40 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Keyingi
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {viewMode !== 'prototype' && (
                <button
                  type="button"
                  onClick={() => setShowNotes((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    showNotes
                      ? 'bg-[#16243D] border-[#22D3EE]/50 text-[#22D3EE]'
                      : 'bg-[#0B1220] border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <MessageSquareText className="w-3.5 h-3.5" />
                  Spiker izohi
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsSlidesModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#0B1220] border border-slate-800 rounded-lg text-slate-200 hover:border-[#22D3EE] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#22D3EE]" />
                Google Slides
              </button>

              {(viewMode === 'single' || viewMode === 'screenshot') && (
                <button
                  type="button"
                  onClick={handleToggleFullscreen}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#0B1220] border border-slate-800 rounded-lg text-slate-200 hover:border-[#22D3EE] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  title="To‘liq ekran"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  To‘liq ekran
                </button>
              )}
            </div>
          </div>

          {/* Main Viewport Content */}
          {viewMode === 'prototype' ? (
            <MvpPrototypeDemo />
          ) : viewMode === 'single' || viewMode === 'screenshot' ? (
            <div className="space-y-5">
              <div
                ref={stageRef}
                className="w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-[#0B1220]"
              >
                <SlideCanvas
                  slideNumber={activeSlide}
                  renderStyle={viewMode === 'screenshot' ? 'screenshot' : 'interactive'}
                  onOpenPrototype={() => setViewMode('prototype')}
                />
              </div>

              {/* Bottom Slide Progress Segments matching uploaded screenshots */}
              <div className="grid grid-cols-10 gap-1.5">
                {SLIDES_DATA.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveSlide(s.id)}
                    aria-label={`Slayd ${s.id}`}
                    className={`h-1.5 rounded-full transition-colors cursor-pointer ${
                      s.id <= activeSlide ? 'bg-[#22D3EE]' : 'bg-slate-800 hover:bg-slate-700'
                    }`}
                  />
                ))}
              </div>

              {/* Speaker Notes Panel (Uzbek) */}
              {showNotes && (
                <div className="bg-[#111C30] border border-slate-800 rounded-xl p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#22D3EE]">
                      <MessageSquareText className="w-4 h-4" />
                      <span>
                        Spiker izohi — Slayd {currentSlideObj.indexLabel}: {currentSlideObj.title}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopySpeakerNote}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {copiedNote ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#22D3EE]" />
                          <span className="text-[#22D3EE]">Nusxalandi</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Matnni nusxalash</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {currentSlideObj.speakerNotes}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {SLIDES_DATA.map((slideItem) => (
                <div
                  key={slideItem.id}
                  className="bg-[#111C30] border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#22D3EE]/60 transition-colors"
                >
                  <div
                    onClick={() => {
                      setActiveSlide(slideItem.id);
                      setViewMode('single');
                    }}
                    className="cursor-pointer"
                  >
                    <SlideCanvas
                      slideNumber={slideItem.id}
                      onOpenPrototype={() => setViewMode('prototype')}
                    />
                  </div>
                  {showNotes && (
                    <div className="p-4 border-t border-slate-800 bg-[#0B1220]/70 space-y-1">
                      <div className="text-xs font-semibold text-[#22D3EE]">
                        {slideItem.indexLabel}. {slideItem.title} — Spiker izohi:
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {slideItem.speakerNotes}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Google Slides Integration Modal */}
      <GoogleSlidesModal
        isOpen={isSlidesModalOpen}
        onClose={() => setIsSlidesModalOpen(false)}
        user={user}
        accessToken={accessToken}
        needsAuth={needsAuth}
        isLoggingIn={isLoggingIn}
        onGoogleLogin={handleGoogleLogin}
        onGoogleLogout={handleGoogleLogout}
      />
    </div>
  );
}

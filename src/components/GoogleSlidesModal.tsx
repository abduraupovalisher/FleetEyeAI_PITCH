import React, { useState } from 'react';
import { User } from 'firebase/auth';
import {
  CheckCircle2,
  ExternalLink,
  FileSpreadsheet,
  Loader2,
  LogOut,
  Search,
  ShieldAlert,
  X,
} from 'lucide-react';
import {
  createGoogleSlidesPitchDeck,
  fetchGoogleSlidesPresentation,
  GoogleSlidesPresentationSummary,
} from '../utils/exportGoogleSlides';

interface GoogleSlidesModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  accessToken: string | null;
  needsAuth: boolean;
  isLoggingIn: boolean;
  onGoogleLogin: () => Promise<void>;
  onGoogleLogout: () => Promise<void>;
}

export const GoogleSlidesModal: React.FC<GoogleSlidesModalProps> = ({
  isOpen,
  onClose,
  user,
  accessToken,
  needsAuth,
  isLoggingIn,
  onGoogleLogin,
  onGoogleLogout,
}) => {
  const [confirmingCreate, setConfirmingCreate] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createdDeck, setCreatedDeck] = useState<GoogleSlidesPresentationSummary | null>(null);
  const [lookupId, setLookupId] = useState('');
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lookedUpDeck, setLookedUpDeck] = useState<GoogleSlidesPresentationSummary | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleConfirmCreateDeck = async () => {
    if (!accessToken) {
      setErrorMessage('Avval Google hisobingiz orqali tizimga kiring.');
      return;
    }

    setIsCreating(true);
    setErrorMessage(null);
    try {
      const result = await createGoogleSlidesPitchDeck(accessToken);
      setCreatedDeck(result);
      setConfirmingCreate(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google Slides yaratishda xatolik.';
      setErrorMessage(msg);
    } finally {
      setIsCreating(false);
    }
  };

  const handleLookupPresentation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken || !lookupId.trim()) return;

    setIsLookingUp(true);
    setErrorMessage(null);
    try {
      const summary = await fetchGoogleSlidesPresentation(accessToken, lookupId);
      setLookedUpDeck(summary);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Taqdimot topilmadi yoki ruxsat yo‘q.';
      setErrorMessage(msg);
    } finally {
      setIsLookingUp(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="google-slides-modal-title"
    >
      <div className="w-full max-w-xl bg-[#111C30] border border-slate-800 rounded-xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <FileSpreadsheet className="w-5 h-5 text-[#22D3EE]" />
            <h2 id="google-slides-modal-title" className="text-base font-bold text-white">
              Google Slides Eksport va Integratsiya
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Authentication Status */}
          {needsAuth || !accessToken ? (
            <div className="bg-[#0B1220] border border-slate-800 rounded-xl p-5 space-y-4">
              <p className="text-sm text-slate-300 leading-relaxed">
                10 slaydli <strong className="text-white">FleetEye AI — UzCombinator</strong>{' '}
                taqdimotini Google Slides hisobingizda yaratish yoki mavjud taqdimotni tekshirish
                uchun Google orqali kiring:
              </p>
              <div>
                <button
                  type="button"
                  onClick={onGoogleLogin}
                  disabled={isLoggingIn}
                  className="gsi-material-button"
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
            </div>
          ) : (
            <div className="space-y-5">
              {/* Signed-in user bar */}
              <div className="flex items-center justify-between bg-[#0B1220] border border-slate-800 rounded-lg px-4 py-3">
                <div className="text-xs text-slate-300 truncate">
                  Ulangan hisob:{' '}
                  <span className="font-semibold text-white">
                    {user?.email || user?.displayName || 'Google Foydalanuvchisi'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onGoogleLogout}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors whitespace-nowrap shrink-0"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Chiqish
                </button>
              </div>

              {/* Mandatory Confirmation Step before creating/mutating Google Slides */}
              {!confirmingCreate ? (
                <div className="bg-[#0B1220] border border-slate-800 rounded-xl p-5 space-y-3">
                  <h3 className="text-sm font-semibold text-white">
                    10 slaydli Google Slides taqdimotini yaratish
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Google Slides hisobingizda yangi{' '}
                    <span className="text-slate-200">
                      &ldquo;FleetEye AI — UzCombinator Pre-Seed Pitch Deck&rdquo;
                    </span>{' '}
                    fayli (10 ta slayd va spiker izohlari bilan) yaratiladi.
                  </p>
                  <button
                    type="button"
                    onClick={() => setConfirmingCreate(true)}
                    className="px-4 py-2 text-xs font-semibold bg-[#22D3EE] text-[#0B1220] rounded-lg hover:bg-[#22D3EE]/90 transition-colors whitespace-nowrap"
                  >
                    Google Slides-da yaratish
                  </button>
                </div>
              ) : (
                <div className="bg-[#16243D] border border-[#F59E0B]/60 rounded-xl p-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white">
                        Amalni tasdiqlang (Google Slides)
                      </h4>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        Google Slides hisobingizda yangi 10 slaydli{' '}
                        <strong>&ldquo;FleetEye AI — UzCombinator Pre-Seed Pitch Deck&rdquo;</strong>{' '}
                        taqdimotini yaratish va barcha slayd matnlarini yozishni tasdiqlaysizmi?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleConfirmCreateDeck}
                      disabled={isCreating}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-[#22D3EE] text-[#0B1220] rounded-lg hover:bg-[#22D3EE]/90 transition-colors disabled:opacity-50 whitespace-nowrap"
                    >
                      {isCreating && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                      {isCreating ? 'Yaratilmoqda...' : 'Tasdiqlash va yaratish'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmingCreate(false)}
                      disabled={isCreating}
                      className="px-4 py-2 text-xs font-medium text-slate-300 bg-[#0B1220] border border-slate-700 rounded-lg hover:text-white transition-colors whitespace-nowrap"
                    >
                      Bekor qilish
                    </button>
                  </div>
                </div>
              )}

              {/* Created Presentation Result */}
              {createdDeck && (
                <div className="bg-[#0B1220] border border-[#22D3EE]/50 rounded-xl p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <CheckCircle2 className="w-5 h-5 text-[#22D3EE] shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-white truncate">
                        {createdDeck.title}
                      </div>
                      <div className="text-[11px] font-mono tabular-nums text-slate-400">
                        {createdDeck.slideCount} ta slayd muvaffaqiyatli yaratildi
                      </div>
                    </div>
                  </div>
                  <a
                    href={createdDeck.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#22D3EE]/15 text-[#22D3EE] border border-[#22D3EE]/40 rounded-lg hover:bg-[#22D3EE]/25 transition-colors whitespace-nowrap shrink-0"
                  >
                    Ochish
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* Read / Inspect Presentation by ID */}
              <form
                onSubmit={handleLookupPresentation}
                className="bg-[#0B1220] border border-slate-800 rounded-xl p-4 space-y-3"
              >
                <label
                  htmlFor="presentation-id-input"
                  className="block text-xs font-medium text-slate-300"
                >
                  Mavjud Google Slides taqdimotini ID orqali tekshirish:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="presentation-id-input"
                    type="text"
                    value={lookupId}
                    onChange={(e) => setLookupId(e.target.value)}
                    placeholder="Masalan: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
                    className="flex-1 bg-[#111C30] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#22D3EE]"
                  />
                  <button
                    type="submit"
                    disabled={isLookingUp || !lookupId.trim()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-slate-800 text-slate-200 rounded-lg hover:bg-slate-700 disabled:opacity-50 transition-colors whitespace-nowrap shrink-0"
                  >
                    {isLookingUp ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Search className="w-3.5 h-3.5" />
                    )}
                    Tekshirish
                  </button>
                </div>
                {lookedUpDeck && (
                  <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-800">
                    <span className="text-slate-300 truncate">
                      {lookedUpDeck.title} ({lookedUpDeck.slideCount} slayd)
                    </span>
                    <a
                      href={lookedUpDeck.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#22D3EE] hover:underline whitespace-nowrap ml-3"
                    >
                      Google Slides-da ko‘rish
                    </a>
                  </div>
                )}
              </form>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 rounded-lg bg-red-950/50 border border-red-800/70 text-xs text-red-200">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

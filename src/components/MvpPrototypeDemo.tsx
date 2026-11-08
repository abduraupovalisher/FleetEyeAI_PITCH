import React, { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  Camera,
  CameraOff,
  CheckCircle2,
  Cpu,
  Eye,
  Phone,
  Radio,
  ShieldAlert,
  Smartphone,
  Truck,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Zap,
} from 'lucide-react';
import { GENERATED_IMAGES } from '../data/slidesData';

type DriverScenario = 'normal' | 'drowsy' | 'phone';

interface DispatchIncident {
  id: string;
  time: string;
  truck: string;
  driver: string;
  route: string;
  type: 'Mikrouyqu (EAR < 0.18)' | 'Smartfonga chalg‘ish (YOLOv8)' | 'Normal holat';
  earValue: string;
  latency: string;
  synced: boolean;
}

const INITIAL_INCIDENTS: DispatchIncident[] = [
  {
    id: 'INC-904',
    time: '14:22:08',
    truck: 'Howo A7 · 01 774 OBA',
    driver: 'R. Karimov',
    route: 'Toshkent — Samarqand (M39)',
    type: 'Mikrouyqu (EAR < 0.18)',
    earValue: '0.14',
    latency: '0.18s',
    synced: true,
  },
  {
    id: 'INC-903',
    time: '13:58:41',
    truck: 'MAN TGX · 30 512 TBA',
    driver: 'S. Rustamov',
    route: 'Qamchiq dovoni (A373)',
    type: 'Smartfonga chalg‘ish (YOLOv8)',
    earValue: '0.29',
    latency: '0.19s',
    synced: true,
  },
  {
    id: 'INC-902',
    time: '12:14:19',
    truck: 'KamAZ 5490 · 80 309 BAA',
    driver: 'A. Xoliqov',
    route: 'Buxoro — Xorazm (Cho‘l hududi)',
    type: 'Mikrouyqu (EAR < 0.18)',
    earValue: '0.15',
    latency: '0.20s',
    synced: false,
  },
];

export const MvpPrototypeDemo: React.FC = () => {
  const [scenario, setScenario] = useState<DriverScenario>('normal');
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [webcamActive, setWebcamActive] = useState<boolean>(false);
  const [webcamError, setWebcamError] = useState<string | null>(null);
  const [incidents, setIncidents] = useState<DispatchIncident[]>(INITIAL_INCIDENTS);
  const [earHistory, setEarHistory] = useState<number[]>([
    0.31, 0.32, 0.3, 0.31, 0.29, 0.31, 0.32, 0.3, 0.31, 0.31, 0.3, 0.32,
  ]);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Trigger 0.2s acoustic beep using Web Audio API when entering drowsy or phone state
  const playAlarmBeep = (freq = 880) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {
      // Audio context blocked or unsupported
    }
  };

  // Update EAR telemetry waveform every 600ms
  useEffect(() => {
    const timer = setInterval(() => {
      setEarHistory((prev) => {
        const base =
          scenario === 'drowsy'
            ? 0.13 + Math.random() * 0.04
            : scenario === 'phone'
            ? 0.24 + Math.random() * 0.04
            : 0.29 + Math.random() * 0.05;
        return [...prev.slice(1), Number(base.toFixed(2))];
      });
    }, 600);
    return () => clearInterval(timer);
  }, [scenario]);

  // Stop webcam on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const toggleWebcam = async () => {
    if (webcamActive) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      setWebcamActive(false);
      return;
    }

    setWebcamError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 360, facingMode: 'user' },
        audio: false,
      });
      streamRef.current = mediaStream;
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setWebcamActive(true);
    } catch {
      setWebcamError(
        'Veb-kameraga ruxsat berilmadi yoki kamera topilmadi — simulyatsiya rejimida ishlamoqda.'
      );
      setWebcamActive(false);
    }
  };

  const handleSelectScenario = (next: DriverScenario) => {
    setScenario(next);
    if (next === 'drowsy' || next === 'phone') {
      playAlarmBeep(next === 'drowsy' ? 920 : 740);
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const newInc: DispatchIncident = {
        id: `INC-${Math.floor(905 + Math.random() * 90)}`,
        time: timeStr,
        truck: 'Howo A7 · 01 774 OBA',
        driver: 'R. Karimov',
        route: isOfflineMode ? 'Buxoro — Xorazm (Offline bufer)' : 'Toshkent — Samarqand (M39)',
        type:
          next === 'drowsy' ? 'Mikrouyqu (EAR < 0.18)' : 'Smartfonga chalg‘ish (YOLOv8)',
        earValue: next === 'drowsy' ? '0.14' : '0.25',
        latency: '0.18s',
        synced: !isOfflineMode,
      };
      setIncidents((prev) => [newInc, ...prev.slice(0, 6)]);
    }
  };

  const syncOfflineBuffer = () => {
    setIsOfflineMode(false);
    setIncidents((prev) => prev.map((inc) => ({ ...inc, synced: true })));
  };

  const currentEar = earHistory[earHistory.length - 1] ?? 0.31;

  return (
    <div className="space-y-6">
      {/* Prototype Top Header & Controls */}
      <div className="bg-[#111C30] border border-slate-800 rounded-xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[#22D3EE] font-semibold">
            <Cpu className="w-4 h-4" />
            <span>FLEETEYE AI — MVP ISHCHI PROTOTIPI (PYTHON · MEDIAPIPE FACEMESH · YOLOV8)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Real vaqtda charchoq (EAR) va smartfonni aniqlash hamda dispetcherlik paneli
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={toggleWebcam}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
              webcamActive
                ? 'bg-rose-950/60 border-rose-500/60 text-rose-200'
                : 'bg-[#0B1220] border-[#22D3EE]/50 text-[#22D3EE] hover:bg-[#16243D]'
            }`}
          >
            {webcamActive ? (
              <>
                <CameraOff className="w-3.5 h-3.5" />
                Kamerani o‘chirish
              </>
            ) : (
              <>
                <Camera className="w-3.5 h-3.5" />
                Jonli veb-kamerani yoqish
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsOfflineMode((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
              isOfflineMode
                ? 'bg-[#2B2118] border-[#F59E0B] text-[#F59E0B]'
                : 'bg-[#0B1220] border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {isOfflineMode ? (
              <>
                <WifiOff className="w-3.5 h-3.5" />
                Offline (Cho‘l/Tog‘ rejimi)
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-[#22D3EE]" />
                Online (LTE sinxron)
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setSoundEnabled((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-[#0B1220] border border-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#22D3EE]" />
                0.2s Signal Yoqilgan
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                Ovoz o‘chirilgan
              </>
            )}
          </button>
        </div>
      </div>

      {webcamError && (
        <div className="bg-[#16243D] border border-[#F59E0B]/50 rounded-xl px-4 py-3 text-xs text-slate-200">
          {webcamError}
        </div>
      )}

      {/* Main Split: Left Edge-AI Camera Feed + Right Telemetry & Dispatcher Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Edge-AI Camera Viewport */}
        <div className="lg:col-span-7 bg-[#111C30] border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between">
          {/* Scenario Trigger Tabs */}
          <div className="p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-[#0B1220]/60">
            <span className="text-xs font-semibold text-slate-300">
              Haydovchi holatini sinash:
            </span>
            <div className="flex items-center gap-1.5 bg-[#0B1220] p-1 rounded-lg border border-slate-800">
              <button
                type="button"
                onClick={() => handleSelectScenario('normal')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  scenario === 'normal'
                    ? 'bg-[#22D3EE] text-[#0B1220]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Normal haydash
              </button>
              <button
                type="button"
                onClick={() => handleSelectScenario('drowsy')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  scenario === 'drowsy'
                    ? 'bg-[#F59E0B] text-[#0B1220]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Ko‘z yumilishi (Mikrouyqu)
              </button>
              <button
                type="button"
                onClick={() => handleSelectScenario('phone')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  scenario === 'phone'
                    ? 'bg-rose-500 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Telefonga qarash (YOLOv8)
              </button>
            </div>
          </div>

          {/* Video / Image Viewport with Interactive SVG Computer Vision Overlay */}
          <div className="relative aspect-video w-full bg-[#060B14] overflow-hidden">
            {webcamActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover scale-x-[-1]"
              />
            ) : (
              <img
                src={GENERATED_IMAGES.faceMesh}
                alt="FleetEye AI Haydovchi Monitoringi"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            )}

            {/* Dynamic Computer Vision Overlay (MediaPipe FaceMesh + YOLOv8 Bounding Boxes) */}
            <svg
              viewBox="0 0 640 360"
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              {/* Eye Aspect Ratio (EAR) Bounding Boxes */}
              <g>
                <rect
                  x="192"
                  y="98"
                  width="44"
                  height="26"
                  fill="none"
                  stroke={scenario === 'drowsy' ? '#F59E0B' : '#22D3EE'}
                  strokeWidth="2"
                />
                <rect
                  x="244"
                  y="100"
                  width="32"
                  height="24"
                  fill="none"
                  stroke={scenario === 'drowsy' ? '#F59E0B' : '#22D3EE'}
                  strokeWidth="2"
                />
                <text
                  x="192"
                  y="91"
                  fill={scenario === 'drowsy' ? '#F59E0B' : '#22D3EE'}
                  fontSize="11"
                  fontWeight="bold"
                  fontFamily="JetBrains Mono, monospace"
                >
                  EAR: {currentEar.toFixed(2)} {scenario === 'drowsy' ? '[MIKROUYQU!]' : '[OCHIQ]'}
                </text>
              </g>

              {/* YOLOv8 Phone Detection Bounding Box when 'phone' scenario active */}
              {scenario === 'phone' && (
                <g>
                  <rect
                    x="365"
                    y="175"
                    width="115"
                    height="135"
                    rx="6"
                    fill="rgba(244, 63, 94, 0.18)"
                    stroke="#F43F5E"
                    strokeWidth="2.5"
                    strokeDasharray="6 3"
                  />
                  <rect x="365" y="153" width="148" height="22" rx="3" fill="#F43F5E" />
                  <text
                    x="372"
                    y="168"
                    fill="#FFFFFF"
                    fontSize="11"
                    fontWeight="bold"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    YOLOv8: TELEFON 96%
                  </text>
                </g>
              )}
            </svg>

            {/* 0.2s Alert Banner inside Cabin Feed */}
            {scenario !== 'normal' && (
              <div className="absolute bottom-4 left-4 right-4 bg-[#0B1220]/95 border-2 border-[#F59E0B] rounded-xl px-4 py-3 flex items-center justify-between gap-4 shadow-2xl">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-[#F59E0B] shrink-0" />
                  <div>
                    <div className="text-xs font-mono font-bold text-[#F59E0B]">
                      0.2 SONIYADA OVOZLI OGOHLANTIRISH ISHGA TUSHDI (85 dB)
                    </div>
                    <div className="text-sm font-bold text-white">
                      {scenario === 'drowsy'
                        ? 'DIQQAT! Haydovchi ko‘zini yumdi (EAR < 0.18 — Mikrouyqu xavfi)'
                        : 'DIQQAT! Haydovchi smartfonga chalg‘idi (YOLOv8 ob’ekt aniqlandi)'}
                    </div>
                  </div>
                </div>
                <span className="font-mono tabular-nums text-xs font-bold text-[#22D3EE] shrink-0">
                  180 ms
                </span>
              </div>
            )}
          </div>

          {/* Real-Time EAR Waveform Strip */}
          <div className="p-4 border-t border-slate-800 bg-[#0B1220] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="text-xs font-mono text-slate-400">
                MediaPipe FaceMesh (468 nuqta) · EAR Metrikasi
              </div>
              <div className="text-sm font-bold text-white font-mono tabular-nums">
                Joriy EAR: <span className="text-[#22D3EE]">{currentEar.toFixed(2)}</span>{' '}
                <span className="text-xs font-normal text-slate-400">
                  (Chegara: 0.20 · NPU tezligi: 32 FPS)
                </span>
              </div>
            </div>

            {/* Sparkline Bars */}
            <div className="flex items-end gap-1.5 h-10">
              {earHistory.map((val, idx) => {
                const heightPct = Math.min(100, Math.max(20, Math.round((val / 0.38) * 100)));
                const isLow = val < 0.2;
                return (
                  <div
                    key={idx}
                    className={`w-2.5 rounded-t transition-all ${
                      isLow ? 'bg-[#F59E0B]' : 'bg-[#22D3EE]'
                    }`}
                    style={{ height: `${heightPct}%` }}
                    title={`EAR: ${val}`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Corporate Dispatcher Platform & Offline Telemetry Queue */}
        <div className="lg:col-span-5 bg-[#111C30] border border-slate-800 rounded-xl p-5 flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#22D3EE]" />
                <h3 className="text-base font-bold text-white">
                  Dispetcherlik nazorati platformasi
                </h3>
              </div>
              <span className="text-xs font-mono tabular-nums text-slate-400">
                B2B SaaS ($10–$15/oy)
              </span>
            </div>

            {/* Active Truck Telemetry Summary */}
            <div className="grid grid-cols-3 gap-2.5 text-xs">
              <div className="bg-[#0B1220] border border-slate-800 rounded-lg p-3">
                <div className="text-slate-400">Mashina</div>
                <div className="font-mono font-bold text-white mt-0.5">Howo A7</div>
              </div>
              <div className="bg-[#0B1220] border border-slate-800 rounded-lg p-3">
                <div className="text-slate-400">Xavf reytingi</div>
                <div
                  className={`font-mono font-bold mt-0.5 ${
                    scenario === 'normal' ? 'text-emerald-400' : 'text-[#F59E0B]'
                  }`}
                >
                  {scenario === 'normal' ? '96 / 100 (A)' : '68 / 100 (Ogoh)'}
                </div>
              </div>
              <div className="bg-[#0B1220] border border-slate-800 rounded-lg p-3">
                <div className="text-slate-400">Video arxiv</div>
                <div className="font-mono font-bold text-[#22D3EE] mt-0.5">30 kunlik</div>
              </div>
            </div>

            {/* Offline Queue Sync Banner */}
            {isOfflineMode && (
              <div className="bg-[#2B2118] border border-[#F59E0B]/60 rounded-lg p-3 flex items-center justify-between gap-2 text-xs">
                <span className="text-amber-200">
                  Offline rejim: hodisalar Edge-NPU xotirasiga yozilmoqda.
                </span>
                <button
                  type="button"
                  onClick={syncOfflineBuffer}
                  className="px-2.5 py-1 bg-[#F59E0B] text-[#0B1220] font-semibold rounded hover:bg-[#F59E0B]/90 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Serverga yuborish
                </button>
              </div>
            )}

            {/* Live Incident Feed */}
            <div className="space-y-2 pt-1">
              <div className="text-xs font-semibold text-slate-400">
                Real vaqtdagi xavfli holatlar jurnali:
              </div>
              <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                {incidents.map((inc) => (
                  <div
                    key={inc.id + inc.time}
                    className="bg-[#0B1220] border border-slate-800 rounded-lg p-3 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-[#F59E0B]">{inc.type}</span>
                      <span className="font-mono tabular-nums text-slate-400">{inc.time}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="font-semibold text-white">{inc.truck}</span>
                      <span className="font-mono tabular-nums text-slate-400">
                        EAR: {inc.earValue} · Signal: {inc.latency}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                      <span>{inc.route}</span>
                      <span
                        className={`font-mono ${
                          inc.synced ? 'text-[#22D3EE]' : 'text-[#F59E0B]'
                        }`}
                      >
                        {inc.synced ? 'Dispetcherga yuborildi' : 'Offline buferda'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-3 flex items-center justify-between text-xs text-slate-400 font-mono tabular-nums">
            <span>Hardware: $60–$80</span>
            <span>·</span>
            <span>Javob vaqti: &lt;0.2s</span>
            <span>·</span>
            <span className="text-[#22D3EE]">Edge-AI NPU</span>
          </div>
        </div>
      </div>
    </div>
  );
};

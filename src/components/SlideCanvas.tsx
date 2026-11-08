import React, { useState } from 'react';
import {
  AlertTriangle,
  Building2,
  Camera,
  CheckCircle2,
  Cloud,
  Cpu,
  Eye,
  FlaskConical,
  Globe,
  GraduationCap,
  Handshake,
  Info,
  Link2,
  MapPin,
  Megaphone,
  Monitor,
  Play,
  Radio,
  Shield,
  ShieldAlert,
  TrendingUp,
  Truck,
  Users,
  Wifi,
  Zap,
} from 'lucide-react';
import { GENERATED_IMAGES, UPLOADED_SLIDE_SCREENSHOTS } from '../data/slidesData';

interface SlideCanvasProps {
  slideNumber: number;
  renderStyle?: 'interactive' | 'screenshot';
  onOpenPrototype?: () => void;
}

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel: string;
  fallbackIcon: React.ReactNode;
}

const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackLabel,
  fallbackIcon,
}) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#111C30] border border-slate-800 text-slate-400 p-6 text-center ${className}`}
      >
        <div className="text-[#22D3EE] mb-2">{fallbackIcon}</div>
        <span className="text-xs font-medium text-slate-300">{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};

export const SlideCanvas: React.FC<SlideCanvasProps> = ({
  slideNumber,
  renderStyle = 'interactive',
  onOpenPrototype,
}) => {
  if (renderStyle === 'screenshot') {
    const screenshotSrc = UPLOADED_SLIDE_SCREENSHOTS[slideNumber];
    return (
      <div className="relative w-full aspect-video bg-[#0B1220] border border-slate-800/90 overflow-hidden flex items-center justify-center">
        <ResilientImage
          src={screenshotSrc}
          alt={`FleetEye AI Slayd ${slideNumber}`}
          className="w-full h-full object-contain bg-[#060A12]"
          fallbackLabel={`Slayd ${slideNumber}`}
          fallbackIcon={<Eye className="w-8 h-8" />}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video bg-[#0B1220] text-slate-100 border border-slate-800/90 overflow-hidden flex flex-col justify-between p-6 sm:p-8 lg:p-10 select-none">
      {/* Main Slide Body */}
      <div className="relative z-10 flex-1 flex flex-col justify-between overflow-hidden">
        {slideNumber === 1 && <Slide1Cover onOpenPrototype={onOpenPrototype} />}
        {slideNumber === 2 && <Slide2Problem />}
        {slideNumber === 3 && <Slide3Solution onOpenPrototype={onOpenPrototype} />}
        {slideNumber === 4 && <Slide4Market />}
        {slideNumber === 5 && <Slide5Technology onOpenPrototype={onOpenPrototype} />}
        {slideNumber === 6 && <Slide6BusinessModel />}
        {slideNumber === 7 && <Slide7Competition />}
        {slideNumber === 8 && <Slide8GoToMarket />}
        {slideNumber === 9 && <Slide9Team />}
        {slideNumber === 10 && <Slide10Investment />}
      </div>

      {/* Bottom-left page badge matching uploaded material */}
      <div className="relative z-10 pt-3 flex items-center justify-between text-xs text-slate-400">
        <div className="inline-flex items-center gap-2 bg-[#162235] border border-slate-700/80 rounded-lg px-3 py-1 font-mono tabular-nums text-white font-semibold">
          <span>{String(slideNumber).padStart(2, '0')}/10</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>FleetEye AI</span>
          <span aria-hidden="true">·</span>
          <span>UzCombinator Pre-Seed</span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   SLIDE 1: COVER
============================================================================ */
const Slide1Cover: React.FC<{ onOpenPrototype?: () => void }> = ({ onOpenPrototype }) => (
  <div className="relative h-full w-full rounded-xl overflow-hidden border border-slate-800/80 flex flex-col justify-between p-6 sm:p-10">
    {/* Background image from uploaded slide 1 with dark gradient scrim */}
    <ResilientImage
      src={UPLOADED_SLIDE_SCREENSHOTS[1]}
      alt="FleetEye AI Cover"
      className="absolute inset-0 w-full h-full object-cover opacity-35"
      fallbackLabel="FleetEye AI"
      fallbackIcon={<Eye className="w-8 h-8" />}
    />
    <div
      aria-hidden="true"
      className="
        absolute inset-0
        bg-gradient-to-r from-[#0B1220] via-[#0B1220]/90 to-[#0B1220]/45
      "
    />

    <div className="relative z-10 my-auto max-w-3xl space-y-5">
      <div className="border-l-2 border-[#22D3EE] pl-4 space-y-1.5">
        <div className="text-xs font-mono tracking-widest text-[#22D3EE] font-bold">
          UZCOMBINATOR · PRE-SEED
        </div>
        <p className="text-sm sm:text-lg text-slate-200 font-medium">
          Tijorat yuk transporti uchun avtonom Edge-AI xavfsizlik va telematika tizimi.
        </p>
      </div>

      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white">
        &ldquo;FleetEye AI&rdquo;
      </h1>

      <p className="text-base sm:text-xl lg:text-2xl text-slate-200 leading-relaxed max-w-2xl">
        Kabinaga o‘rnatiladigan ixcham Edge-AI kamerasi orqali haydovchi charchog‘i va chalg‘ishini
        real vaqtda aniqlash tizimi.
      </p>

      {onOpenPrototype && (
        <div className="pt-2">
          <button
            type="button"
            onClick={onOpenPrototype}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-[#22D3EE] text-[#0B1220] rounded-lg hover:bg-[#22D3EE]/90 transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            MVP Ishchi Prototipni sinab ko‘rish
          </button>
        </div>
      )}
    </div>

    <div className="relative z-10 pt-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-300">
      <span className="font-medium">Asoschilar: Alisher Abduraupov &amp; Zafarjon Nosirov.</span>
      <span className="text-[#F59E0B]" aria-hidden="true">
        ·
      </span>
      <span className="text-slate-400">2026-yil 8-noyabr</span>
      <span className="text-[#F59E0B]" aria-hidden="true">
        ·
      </span>
      <span className="text-[#22D3EE] font-semibold">Toshkent, O‘zbekiston</span>
    </div>
  </div>
);

/* ============================================================================
   SLIDE 2: MUAMMO
============================================================================ */
const Slide2Problem: React.FC = () => (
  <div className="flex flex-col justify-between h-full space-y-4">
    <div>
      <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">Muammo</h2>
      <p className="text-xs sm:text-sm text-slate-400 mt-1">
        Og‘ir yuk transportida haydovchi xatosi — eng katta xavf omili
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-center">
      {/* Left focal anchor */}
      <div className="lg:col-span-5 space-y-3 pr-4">
        <div className="text-6xl sm:text-7xl lg:text-8xl font-extrabold font-mono tabular-nums text-[#22D3EE] tracking-tight">
          40%
        </div>
        <div className="text-lg sm:text-2xl font-bold text-white">
          avariyalar haydovchi xatosi sabab
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Charchoq, mikrouyqu va smartfonga chalg‘ish — yuk mashinalaridagi halokatlarning asosiy
          sababi.
        </p>
      </div>

      {/* Right 3 big-number cards */}
      <div className="lg:col-span-7 lg:border-l lg:border-slate-800 lg:pl-6 flex flex-col gap-3">
        <div className="bg-[#151F30] border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#22D3EE] font-semibold">
            <Truck className="w-3.5 h-3.5" />
            <span>ASOSIY OMIL</span>
          </div>
          <div className="text-2xl sm:text-3xl font-mono tabular-nums font-extrabold text-white">
            40%
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            og‘ir yuk mashinalaridagi avariyalar haydovchi charchog‘i, mikrouyqu va smartfonga
            chalg‘ish sabab
          </p>
        </div>

        <div className="bg-[#151F30] border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#F59E0B] font-semibold">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>MOLIYAVIY ZARAR</span>
          </div>
          <div className="text-2xl sm:text-3xl font-mono tabular-nums font-extrabold text-[#F59E0B]">
            $50,000–$150,000
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            bitta ag‘darilish parkka keltiradigan zarar
          </p>
        </div>

        <div className="bg-[#151F30] border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="flex items-center gap-2 text-[11px] font-mono text-rose-400 font-semibold">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>XAVFSIZLIK BO‘SHLIG‘I</span>
          </div>
          <div className="text-2xl sm:text-3xl font-mono tabular-nums font-extrabold text-rose-400">
            90%+
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            O‘zbekistondagi eski Howo, MAN, KamAZ larda zavod xavfsizlik datchiklari yo‘q
          </p>
        </div>
      </div>
    </div>
  </div>
);

/* ============================================================================
   SLIDE 3: YECHIM
============================================================================ */
const Slide3Solution: React.FC<{ onOpenPrototype?: () => void }> = ({ onOpenPrototype }) => {
  const items = [
    {
      icon: <Camera className="w-4 h-4 text-[#22D3EE]" />,
      title: 'FleetEye AI moduli',
      desc: 'kabinaga o‘rnatiladigan ixcham Edge-AI kamerasi',
    },
    {
      icon: <Zap className="w-4 h-4 text-[#22D3EE]" />,
      title: '0.2 soniyada ogohlantirish',
      desc: 'haydovchi ko‘zini yumsa yoki telefonga qarasa, baland ovozli signal',
    },
    {
      icon: <Globe className="w-4 h-4 text-[#22D3EE]" />,
      title: 'Offline ishlaydi',
      desc: 'internetsiz cho‘l va tog‘ yo‘llarida ham',
    },
    {
      icon: <Shield className="w-4 h-4 text-[#22D3EE]" />,
      title: 'Dispetcherlik nazorati',
      desc: 'xavfli holatlar korporativ platformaga yuboriladi',
    },
  ];

  return (
    <div className="flex flex-col justify-between h-full space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">Yechim</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Kabinaga o‘rnatiladigan Edge-AI kamerasi, 0.2 soniyada ogohlantirish, offline ishlash
            va dispetcherlik nazorati.
          </p>
        </div>
        {onOpenPrototype && (
          <button
            type="button"
            onClick={onOpenPrototype}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#22D3EE]/15 text-[#22D3EE] border border-[#22D3EE]/40 rounded-lg hover:bg-[#22D3EE]/25 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5" />
            Jonli Prototip
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-stretch">
        {/* Left cabin camera showcase matching Slide 3 screenshot */}
        <div className="lg:col-span-6 bg-[#111C30] border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between">
          <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-[#0B1220]">
            <ResilientImage
              src={GENERATED_IMAGES.truckCabin}
              alt="Yuk mashinasi kabinasi va FleetEye AI kamerasi"
              className="w-full h-full object-cover"
              fallbackLabel="FleetEye AI Kamera"
              fallbackIcon={<Camera className="w-8 h-8" />}
            />
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0B1220]/80 border border-[#22D3EE] flex items-center justify-center text-[#22D3EE]">
              <Camera className="w-4 h-4" />
            </div>
          </div>

          <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
            <div className="bg-[#0E293C] border border-[#22D3EE]/30 rounded-lg px-3.5 py-2 flex items-center gap-2 text-xs font-semibold text-white">
              <Wifi className="w-4 h-4 text-[#22D3EE]" />
              <span>Offline ishlaydi</span>
            </div>

            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
              <Monitor className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
              <span>
                <strong className="text-white">Dispetcherlik nazorati:</strong> xavfli holatlar
                korporativ platformaga yuboriladi.
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1 border-t border-slate-800">
              <Cpu className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span>Edge-AI — arzon NPU chiplarda ishlaydigan yengil arxitektura.</span>
            </div>
          </div>
        </div>

        {/* Right 4 stacked solution cards */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-2.5">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#151F30] border border-slate-800 rounded-xl px-4 py-3 flex items-start gap-3.5"
            >
              <div className="p-2 rounded-lg bg-[#0E293C] border border-[#22D3EE]/30 shrink-0 mt-0.5">
                {item.icon}
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   SLIDE 4: BOZOR HAJMI (Funnel diagram + TAM/SAM/SOM cards)
============================================================================ */
const Slide4Market: React.FC = () => (
  <div className="flex flex-col justify-between h-full space-y-4">
    <div>
      <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
        Bozor hajmi
      </h2>
      <p className="text-xs sm:text-sm text-slate-400 mt-1">
        TAM 300,000+ Markaziy Osiyoda, SAM 120,000+ O‘zbekistonda, SOM 3,000 mashina $700,000+
        yillik aylanma.
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-stretch">
      {/* Left Funnel Diagram matching Slide 4 screenshot */}
      <div className="lg:col-span-6 bg-[#111C30] border border-slate-800 rounded-xl p-5 flex flex-col items-center justify-center">
        <svg
          viewBox="0 0 360 230"
          className="w-full max-h-[215px]"
          role="img"
          aria-label="TAM SAM SOM voronkasi"
        >
          {/* TAM Top Trapezoid (Cyan) */}
          <polygon points="30,15 330,15 268,82 92,82" fill="#22D3EE" />
          <text
            x="180"
            y="53"
            textAnchor="middle"
            fill="#0B1220"
            fontSize="14"
            fontWeight="800"
            fontFamily="Inter, sans-serif"
          >
            TAM
          </text>

          {/* SAM Middle Trapezoid (Periwinkle) */}
          <polygon points="96,90 264,90 222,155 138,155" fill="#818CF8" />
          <text
            x="180"
            y="128"
            textAnchor="middle"
            fill="#0B1220"
            fontSize="14"
            fontWeight="800"
            fontFamily="Inter, sans-serif"
          >
            SAM
          </text>

          {/* SOM Bottom Block (Amber) */}
          <rect x="138" y="163" width="84" height="58" rx="3" fill="#F59E0B" />
          <text
            x="180"
            y="197"
            textAnchor="middle"
            fill="#0B1220"
            fontSize="14"
            fontWeight="800"
            fontFamily="Inter, sans-serif"
          >
            SOM
          </text>
        </svg>
      </div>

      {/* Right 3 TAM / SAM / SOM Cards */}
      <div className="lg:col-span-6 flex flex-col justify-between gap-3">
        <div className="bg-[#151F30] border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#22D3EE] font-semibold">
            <Globe className="w-3.5 h-3.5" />
            <span>TAM</span>
          </div>
          <div className="text-2xl sm:text-3xl font-mono tabular-nums font-extrabold text-white">
            300,000+
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            TAM: Markaziy Osiyoda 300,000+ tijorat yuk transporti
          </p>
        </div>

        <div className="bg-[#151F30] border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#22D3EE] font-semibold">
            <MapPin className="w-3.5 h-3.5" />
            <span>SAM</span>
          </div>
          <div className="text-2xl sm:text-3xl font-mono tabular-nums font-extrabold text-white">
            120,000+
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            SAM: O‘zbekistonda 120,000+ faol yuk mashinasi
          </p>
        </div>

        <div className="bg-[#151F30] border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#F59E0B] font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>SOM (2 yillik maqsad)</span>
          </div>
          <div className="text-2xl sm:text-3xl font-mono tabular-nums font-extrabold text-[#F59E0B]">
            3,000 mashina
          </div>
          <p className="text-xs sm:text-sm text-slate-200">
            SOM (2 yillik maqsad): 3,000 mashina ($60 apparat + $15/oy obuna = $700,000+ yillik
            aylanma)
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Info className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span>Maqsad: 2 yil ichida 3,000 mashinaga ulanish</span>
        </div>
      </div>
    </div>
  </div>
);

/* ============================================================================
   SLIDE 5: TEXNOLOGIYA VA MAHSULOT
============================================================================ */
const Slide5Technology: React.FC<{ onOpenPrototype?: () => void }> = ({ onOpenPrototype }) => (
  <div className="flex flex-col justify-between h-full space-y-4">
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Texnologiya va mahsulot
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Yengil Edge-AI arxitektura: real vaqtda charchoq va telefonni aniqlash
        </p>
      </div>
      {onOpenPrototype && (
        <button
          type="button"
          onClick={onOpenPrototype}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-[#22D3EE] text-[#0B1220] rounded-lg hover:bg-[#22D3EE]/90 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          MVP Prototipni ochish
        </button>
      )}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-stretch">
      {/* Left: Tech Stack list + verbatim description */}
      <div className="lg:col-span-7 bg-[#151F30] border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-base font-bold text-white">
            <Cpu className="w-5 h-5 text-[#22D3EE]" />
            <span>Texnologik stack</span>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm text-slate-200 pt-1">
            <div>
              <strong className="text-white">Python</strong> — asosiy dasturlash tili
            </div>
            <div>
              <strong className="text-white">OpenCV</strong> — kompyuter ko‘rish
            </div>
            <div>
              <strong className="text-white">MediaPipe FaceMesh</strong> — EAR metrikasi bilan ko‘z
              yumilishini aniqlash
            </div>
            <div>
              <strong className="text-white">YOLOv8</strong> — ob’ektlarni aniqlash
            </div>
            <div>
              <strong className="text-white">Arzon NPU/Edge chiplar</strong> — yengil arxitektura
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 border-t border-slate-800 pt-3 leading-relaxed">
          Python, OpenCV, MediaPipe FaceMesh (EAR metrikasi bilan ko‘z yumilishini aniqlash),
          YOLOv8; arzon NPU/Edge chiplarda ishlaydigan yengil arxitektura.
        </p>
      </div>

      {/* Right: Edge-AI Camera & FaceMesh visual */}
      <div className="lg:col-span-5 bg-[#151F30] border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-between">
        <div className="relative w-full flex-1 rounded-lg overflow-hidden border border-slate-800 bg-[#0B1220] min-h-[150px]">
          <ResilientImage
            src={GENERATED_IMAGES.faceMesh}
            alt="MediaPipe FaceMesh va Edge-AI kamera"
            className="w-full h-full object-cover"
            fallbackLabel="Edge-AI Kamera va FaceMesh"
            fallbackIcon={<Eye className="w-8 h-8" />}
          />
        </div>
        <span className="text-xs text-slate-400 mt-2">
          Kabinaga o‘rnatiladigan Edge-AI kamera va FaceMesh EAR tahlili
        </span>
      </div>
    </div>

    {/* Bottom MVP Status Bar matching Slide 5 screenshot */}
    <div className="bg-[#151F30] border border-slate-800 rounded-xl px-4 py-3 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>
          <strong>Hozirgi holat:</strong> MVP ishchi prototipi tayyor, real vaqtda charchoq va
          telefonni aniqlaydi.
        </span>
      </div>
      {onOpenPrototype && (
        <button
          type="button"
          onClick={onOpenPrototype}
          className="text-xs font-semibold text-[#22D3EE] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
        >
          Jonli sinov &rarr;
        </button>
      )}
    </div>
  </div>
);

/* ============================================================================
   SLIDE 6: BIZNES MODEL
============================================================================ */
const Slide6BusinessModel: React.FC = () => (
  <div className="flex flex-col justify-between h-full space-y-4">
    <div>
      <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
        Biznes model
      </h2>
      <p className="text-xs sm:text-sm text-slate-400 mt-1">
        Ikki oqimli daromad: apparat sotuvi va B2B SaaS obuna
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 items-stretch">
      {/* Left Card: Hardware */}
      <div className="bg-[#151F30] border-t-2 border-t-[#22D3EE] border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#0E293C] text-[#22D3EE]">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Hardware sotish/lizing
            </h3>
          </div>

          <div className="text-3xl sm:text-5xl font-mono tabular-nums font-extrabold text-white">
            $60–$80
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            Hardware sotish/lizing: har bir mashinaga bir martalik $60–$80
          </p>

          <div className="space-y-2 pt-2 text-xs sm:text-sm text-slate-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#22D3EE] shrink-0" />
              <span>Edge-AI kamera moduli</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#22D3EE] shrink-0" />
              <span>O‘rnatish va sozlash xizmati</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#22D3EE] shrink-0" />
              <span>Lizing imkoniyati mavjud</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-400 border-t border-slate-800 pt-3">
          Bir martalik xarid, uzoq muddatli ulanish
        </div>
      </div>

      {/* Right Card: B2B SaaS */}
      <div className="bg-[#151F30] border-t-2 border-t-[#F59E0B] border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#2B2118] text-[#F59E0B]">
              <Cloud className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">B2B SaaS obuna</h3>
          </div>

          <div className="text-3xl sm:text-5xl font-mono tabular-nums font-extrabold text-white">
            $10–$15
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            B2B SaaS obuna: oyiga $10–$15 har bir mashina uchun (dispetcherlik paneli, xavf
            reytingi, 30 kunlik video saqlash)
          </p>

          <div className="space-y-2 pt-2 text-xs sm:text-sm text-slate-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <span>Dispetcherlik paneli</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <span>Xavf reytingi tizimi</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <span>30 kunlik video saqlash</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-400 border-t border-slate-800 pt-3">
          Doimiy daromad, oylik to‘lov asosida
        </div>
      </div>
    </div>

    <div className="bg-[#151F30] border border-slate-800 rounded-xl px-4 py-2.5 flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
      <TrendingUp className="w-4 h-4 text-[#F59E0B] shrink-0" />
      <span>
        <strong className="text-white">Barqaror daromad modeli:</strong> apparat sotuvi bir
        martalik oqim, SaaS obuna esa takroriy oylik daromad yaratadi.
      </span>
    </div>
  </div>
);

/* ============================================================================
   SLIDE 7: RAQOBAT USTUNLIGI
============================================================================ */
const Slide7Competition: React.FC = () => (
  <div className="flex flex-col justify-between h-full space-y-4">
    <div>
      <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
        Raqobat ustunligi
      </h2>
      <p className="text-xs sm:text-sm text-slate-400 mt-1">
        Narx, offline AI va mahalliy moslashuv — FleetEye AI ni ajratib turadigan omillar
      </p>
    </div>

    <div className="flex-1 flex flex-col justify-center">
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#151F30]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-[#101827] text-xs font-mono text-slate-400">
              <th className="py-3.5 px-5 w-[32%]">YECHIM</th>
              <th className="py-3.5 px-5 w-[20%]">NARX</th>
              <th className="py-3.5 px-5">IMKONIYATLAR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-xs sm:text-base">
            <tr>
              <td className="py-5 px-5 font-bold text-white">Mobileye / xorijiy tizimlar</td>
              <td className="py-5 px-5 font-mono tabular-nums text-slate-200">$1,000+</td>
              <td className="py-5 px-5 text-slate-300">narxi $1,000+, mahalliy servis yo‘q</td>
            </tr>
            <tr>
              <td className="py-5 px-5 font-bold text-white">Wialon / oddiy GPS</td>
              <td className="py-5 px-5 font-mono tabular-nums text-slate-400">—</td>
              <td className="py-5 px-5 text-slate-300">
                faqat joylashuv va yoqilg‘i, kabina ichidagi xavfni ko‘rmaydi
              </td>
            </tr>
            <tr className="bg-[#132D3E] border-t border-[#22D3EE]/50">
              <td className="py-5 px-5 font-extrabold text-[#22D3EE] flex items-center gap-2">
                <Cpu className="w-4 h-4 shrink-0" />
                <span>FleetEye AI</span>
              </td>
              <td className="py-5 px-5 font-mono tabular-nums font-extrabold text-white">
                $60–$80
              </td>
              <td className="py-5 px-5 font-bold text-white">
                10 barobar arzon ($60–$80), offline AI, mahalliy dispetcherlikka moslangan
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="flex items-center gap-2 text-xs text-slate-400">
      <Info className="w-3.5 h-3.5 text-[#22D3EE]" />
      <span>
        FleetEye AI — narx, offline ishlash va mahalliy bozorga moslashuvda aniq ustunlikka ega.
      </span>
    </div>
  </div>
);

/* ============================================================================
   SLIDE 8: BOZORGA CHIQISH REJASI
============================================================================ */
const Slide8GoToMarket: React.FC = () => (
  <div className="flex flex-col justify-between h-full space-y-4">
    <div>
      <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
        Bozorga chiqish rejasi
      </h2>
      <p className="text-xs sm:text-sm text-slate-400 mt-1">
        12 oylik bosqichma-bosqich yo‘l xaritasi: bepul pilotdan yirik korporativ integratsiyagacha
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 flex-1 items-stretch">
      {/* Stage 1 */}
      <div className="bg-[#151F30] border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#0E293C] text-[#22D3EE]">
              <FlaskConical className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-white">Bepul pilot</span>
          </div>
          <div className="text-xs font-mono text-[#22D3EE] font-semibold">1–3 oy</div>
          <div className="text-2xl sm:text-3xl font-mono tabular-nums font-extrabold text-white">
            30–50 <span className="text-sm font-normal text-slate-300">mashina</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed my-3 border-t border-slate-800 pt-3">
          1–3 oy: hammuassis ishlaydigan logistika parkida 30–50 mashinada bepul pilot
        </p>

        <div className="text-[11px] text-slate-400 font-mono">
          Real muhitda sinov · Haydovchi fikri
        </div>
      </div>

      {/* Stage 2 */}
      <div className="bg-[#112233] border border-[#22D3EE]/60 rounded-xl p-5 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#2B2118] text-[#F59E0B]">
              <Megaphone className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-white">B2B sotuv</span>
          </div>
          <div className="text-xs font-mono text-[#F59E0B] font-semibold">4–8 oy</div>
          <div className="text-2xl sm:text-3xl font-mono tabular-nums font-extrabold text-[#F59E0B]">
            300 <span className="text-sm font-normal text-slate-300">mashina</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed my-3 border-t border-slate-800 pt-3">
          4–8 oy: AIRCUZ uyushmasi va Toshkent/Samarqand B2B parklariga to‘g‘ridan-to‘g‘ri sotuv
          (300 mashina)
        </p>

        <div className="text-[11px] text-slate-400 font-mono">Toshkent · Samarqand · AIRCUZ</div>
      </div>

      {/* Stage 3 */}
      <div className="bg-[#151F30] border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-950/60 text-emerald-400">
              <Handshake className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-white">Korporativ integratsiya</span>
          </div>
          <div className="text-xs font-mono text-emerald-400 font-semibold">9–12 oy</div>
          <div className="text-2xl sm:text-3xl font-mono tabular-nums font-extrabold text-emerald-400">
            1,000 <span className="text-sm font-normal text-slate-300">mashina</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed my-3 border-t border-slate-800 pt-3">
          9–12 oy: sug‘urta kompaniyalari va yirik korporativ parklar bilan integratsiya (1,000
          mashina)
        </p>

        <div className="text-[11px] text-slate-400 font-mono">Sug‘urta · Yirik parklar</div>
      </div>
    </div>

    <div className="bg-[#151F30] border border-slate-800 rounded-xl px-4 py-2.5 flex items-center gap-2 text-xs sm:text-sm text-slate-200">
      <TrendingUp className="w-4 h-4 text-[#22D3EE] shrink-0" />
      <span>
        <strong className="text-white">Maqsad:</strong> 12 oyda{' '}
        <strong className="text-white">1,000+ mashina</strong> qamrovi — pilotdan korporativ
        miqyosga o‘tish.
      </span>
    </div>
  </div>
);

/* ============================================================================
   SLIDE 9: JAMOA
============================================================================ */
const Slide9Team: React.FC = () => (
  <div className="flex flex-col justify-between h-full space-y-3.5">
    <div>
      <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">Jamoa</h2>
      <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
        AI va logistika tajribasi birlashtirilgan — mahsulot yetakchiligi va amaliy dispetcherlik
      </p>
    </div>

    <div className="text-sm sm:text-lg font-bold text-white">
      Ikki asoschi, bitta ko‘rinish:{' '}
      <span className="text-[#22D3EE]">Edge-AI</span> va{' '}
      <span className="text-[#F59E0B]">logistika</span> sinergiyasi
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 items-stretch">
      {/* Alisher Abduraupov */}
      <div className="bg-[#151F30] border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
        <div className="flex items-center gap-4 border-b border-slate-800 pb-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#0E293C] border border-[#22D3EE]/30 flex items-center justify-center text-[#22D3EE] shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-xl font-bold text-white">Alisher Abduraupov</h3>
            <div className="text-xs sm:text-sm font-semibold text-[#22D3EE]">CEO / Product</div>
          </div>
        </div>

        <div className="space-y-2 text-xs sm:text-sm text-slate-200 py-2">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-4 h-4 text-[#22D3EE] shrink-0" />
            <span>
              <strong>NewUU</strong> (AI &amp; Robototexnika)
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-4 h-4 text-[#22D3EE] shrink-0" />
            <span>
              <strong>Al-Xorazmiy maktabi</strong>
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <Building2 className="w-4 h-4 text-[#22D3EE] shrink-0" />
            <span>
              <strong>ADM Global, Bosch</strong>
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <TrendingUp className="w-4 h-4 text-[#22D3EE] shrink-0" />
            <span>
              <strong>Euphoria</strong> (B2B Sales)
            </span>
          </div>
        </div>
      </div>

      {/* Zafarjon Nosirov */}
      <div className="bg-[#151F30] border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
        <div className="flex items-center gap-4 border-b border-slate-800 pb-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#0E293C] border border-[#22D3EE]/30 flex items-center justify-center text-[#22D3EE] shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-xl font-bold text-white">Zafarjon Nosirov</h3>
            <div className="text-xs sm:text-sm font-semibold text-[#22D3EE]">
              Co-founder / Domain Expert
            </div>
          </div>
        </div>

        <div className="space-y-2 text-xs sm:text-sm text-slate-200 py-2">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-4 h-4 text-[#22D3EE] shrink-0" />
            <span>
              <strong>NewUU</strong> (AI &amp; Robototexnika)
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <Truck className="w-4 h-4 text-[#22D3EE] shrink-0" />
            <span>
              <strong>amaldagi logistika dispetcheri</strong>
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <Radio className="w-4 h-4 text-[#22D3EE] shrink-0" />
            <span>Kundalik park boshqaruvi va dispetcherlik amaliyoti</span>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-[#151F30] border border-slate-800 rounded-xl px-4 py-2.5 flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
      <Link2 className="w-4 h-4 text-[#22D3EE] shrink-0" />
      <span>
        <strong className="text-white">AI mahsulot tajribasi</strong> (Alisher) +{' '}
        <strong className="text-white">jonli logistika amaliyoti</strong> (Zafarjon) — FleetEye
        AI’ni real muammolardan qurilgan tizimga aylantiradi.
      </span>
    </div>
  </div>
);

/* ============================================================================
   SLIDE 10: INVESTITSIYA VA REJA
============================================================================ */
const Slide10Investment: React.FC = () => {
  // SVG Donut math: r = 56, circumference = 351.86
  const c = 351.86;
  const seg1 = c * 0.43; // 45% minus small gap
  const seg2 = c * 0.28; // 30% minus small gap
  const seg3 = c * 0.23; // 25% minus small gap

  return (
    <div className="flex flex-col justify-between h-full space-y-4">
      <div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Investitsiya va reja
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Pre-seed bosqichida $80,000 (12 oy). Natija: 12 oyda 300+ pullik ulangan mashina va
          $50,000+ ARR.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-stretch">
        {/* Left Card: Donut Chart matching Slide 10 screenshot */}
        <div className="lg:col-span-6 bg-[#151F30] border border-slate-800 rounded-xl p-5 flex flex-col items-center justify-between">
          <div className="relative w-48 h-48 flex items-center justify-center my-auto">
            <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
              {/* 45% Cyan */}
              <circle
                cx="80"
                cy="80"
                r="56"
                fill="transparent"
                stroke="#22D3EE"
                strokeWidth="18"
                strokeDasharray={`${seg1} ${c - seg1}`}
                strokeDashoffset={0}
              />
              {/* 30% Amber */}
              <circle
                cx="80"
                cy="80"
                r="56"
                fill="transparent"
                stroke="#F59E0B"
                strokeWidth="18"
                strokeDasharray={`${seg2} ${c - seg2}`}
                strokeDashoffset={-(c * 0.45)}
              />
              {/* 25% Indigo/Periwinkle */}
              <circle
                cx="80"
                cy="80"
                r="56"
                fill="transparent"
                stroke="#818CF8"
                strokeWidth="18"
                strokeDasharray={`${seg3} ${c - seg3}`}
                strokeDashoffset={-(c * 0.75)}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xs text-slate-400">Pre-Seed</span>
              <span className="text-xl font-mono tabular-nums font-extrabold text-white">
                $80,000
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-300 pt-2">
            <span className="text-[#22D3EE] font-semibold">45% apparat komponentlari</span>
            <span>·</span>
            <span className="text-[#F59E0B] font-semibold">30% R&amp;D/serverlar</span>
            <span>·</span>
            <span className="text-indigo-400 font-semibold">25% B2B pilot va savdo</span>
          </div>
        </div>

        {/* Right Column: $80,000 + 300+ & $50,000+ + Breakdown */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-3.5">
          <div className="bg-[#151F30] border border-slate-800 rounded-xl p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#0E293C] text-[#22D3EE] font-mono font-bold text-lg">
              $
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-mono tabular-nums font-extrabold text-white">
                $80,000
              </div>
              <div className="text-xs text-slate-400">
                Pre-seed bosqichida $80,000 (12 oy).
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div className="bg-[#151F30] border border-slate-800 rounded-xl p-4 space-y-1">
              <Truck className="w-4 h-4 text-[#F59E0B]" />
              <div className="text-2xl sm:text-3xl font-mono tabular-nums font-extrabold text-white">
                300+
              </div>
              <div className="text-xs text-slate-300">12 oyda pullik ulangan mashina</div>
            </div>

            <div className="bg-[#151F30] border border-slate-800 rounded-xl p-4 space-y-1">
              <TrendingUp className="w-4 h-4 text-[#F59E0B]" />
              <div className="text-2xl sm:text-3xl font-mono tabular-nums font-extrabold text-white">
                $50,000+
              </div>
              <div className="text-xs text-slate-300">ARR maqsadi (12 oyda)</div>
            </div>
          </div>

          <div className="bg-[#151F30] border border-slate-800 rounded-xl p-4 space-y-2.5">
            <div className="text-xs text-slate-400 font-medium">Xarajatlar taqsimoti</div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-[#0B1220] border border-slate-800 rounded-lg p-2.5">
                <div className="font-mono tabular-nums font-bold text-[#22D3EE] text-base">45%</div>
                <div className="text-slate-300 mt-0.5">apparat komponentlari</div>
              </div>
              <div className="bg-[#0B1220] border border-slate-800 rounded-lg p-2.5">
                <div className="font-mono tabular-nums font-bold text-[#F59E0B] text-base">30%</div>
                <div className="text-slate-300 mt-0.5">R&amp;D/serverlar</div>
              </div>
              <div className="bg-[#0B1220] border border-slate-800 rounded-lg p-2.5">
                <div className="font-mono tabular-nums font-bold text-indigo-400 text-base">
                  25%
                </div>
                <div className="text-slate-300 mt-0.5">B2B pilot va savdo</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

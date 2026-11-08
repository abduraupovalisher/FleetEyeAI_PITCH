export interface SlideDefinition {
  id: number;
  indexLabel: string;
  navGroup: 'slaydlar' | 'bozor' | 'texnologiya' | 'investitsiya';
  title: string;
  subtitle: string;
  screenshotUrl: string;
  speakerNotes: string;
}

export const GENERATED_IMAGES = {
  truckCabin: '/src/assets/images/truck_cabin_edge_camera_1794156098778.jpg',
  faceMesh: '/src/assets/images/facemesh_eyetracking_hud_1794156100402.jpg',
  avatarAlisher: '/src/assets/images/avatar_alisher_ceo_1794156101247.jpg',
  avatarZafarjon: '/src/assets/images/avatar_zafarjon_cofounder_1794156100973.jpg',
};

export const UPLOADED_SLIDE_SCREENSHOTS: Record<number, string> = {
  1: '/assets/aistudio/Screenshot_2026-11-08_012649_a9973fe8.png',
  2: '/assets/aistudio/Screenshot_2026-11-08_012701_2d4f5cbc.png',
  3: '/assets/aistudio/Screenshot_2026-11-08_012718_b188e15b.png',
  4: '/assets/aistudio/Screenshot_2026-11-08_012734_c7a7ff50.png',
  5: '/assets/aistudio/Screenshot_2026-11-08_012750_3c897be2.png',
  6: '/assets/aistudio/Screenshot_2026-11-08_012805_9d66606b.png',
  7: '/assets/aistudio/Screenshot_2026-11-08_012819_d5bbdd82.png',
  8: '/assets/aistudio/Screenshot_2026-11-08_012833_da0ec3c2.png',
  9: '/assets/aistudio/Screenshot_2026-11-08_012845_1da62068.png',
  10: '/assets/aistudio/Screenshot_2026-11-08_012854_03b853e1.png',
};

export const SLIDES_DATA: SlideDefinition[] = [
  {
    id: 1,
    indexLabel: '01',
    navGroup: 'slaydlar',
    title: 'FleetEye AI',
    subtitle:
      'Kabinaga o‘rnatiladigan ixcham Edge-AI kamerasi orqali haydovchi charchog‘i va chalg‘ishini real vaqtda aniqlash tizimi.',
    screenshotUrl: UPLOADED_SLIDE_SCREENSHOTS[1],
    speakerNotes:
      'Assalomu alaykum, UzCombinator jamoasi! Biz FleetEye AI — tijorat yuk transporti uchun avtonom Edge-AI xavfsizlik va telematika tizimini taqdim etamiz. Loyiha asoschilari: Alisher Abduraupov va Zafarjon Nosirov.',
  },
  {
    id: 2,
    indexLabel: '02',
    navGroup: 'slaydlar',
    title: 'Muammo',
    subtitle: 'Og‘ir yuk transportida haydovchi xatosi — eng katta xavf omili',
    screenshotUrl: UPLOADED_SLIDE_SCREENSHOTS[2],
    speakerNotes:
      'Logistika parklari har yili og‘ir yo‘l-transport hodisalari sabab katta moliyaviy yo‘qotishlarga uchraydi. Avariyalarning 40 foizi haydovchi charchog‘i, mikrouyqu va smartfonga chalg‘ish oqibatida yuz beradi. Bitta ag‘darilish parkka 50 mingdan 150 ming dollargacha zarar keltiradi, O‘zbekistondagi 90 foizdan ortiq eski Howo, MAN va KamAZ mashinalarida esa zavod xavfsizlik datchiklari mavjud emas.',
  },
  {
    id: 3,
    indexLabel: '03',
    navGroup: 'slaydlar',
    title: 'Yechim',
    subtitle:
      'Kabinaga o‘rnatiladigan Edge-AI kamerasi, 0.2 soniyada ogohlantirish, offline ishlash va dispetcherlik nazorati.',
    screenshotUrl: UPLOADED_SLIDE_SCREENSHOTS[3],
    speakerNotes:
      'Bizning yechimimiz — kabinaga o‘rnatiladigan ixcham FleetEye AI moduli. Haydovchi ko‘zini yumsa yoki telefonga qarasa, tizim 0.2 soniyada baland ovozli signal orqali ogohlantiradi. Qurilma internetsiz cho‘l va tog‘ yo‘llarida ham to‘liq offline ishlaydi hamda xavfli holatlarni korporativ dispetcherlik platformasiga yuboradi.',
  },
  {
    id: 4,
    indexLabel: '04',
    navGroup: 'bozor',
    title: 'Bozor hajmi',
    subtitle:
      'TAM 300,000+ Markaziy Osiyoda, SAM 120,000+ O‘zbekistonda, SOM 3,000 mashina $700,000+ yillik aylanma.',
    screenshotUrl: UPLOADED_SLIDE_SCREENSHOTS[4],
    speakerNotes:
      'Markaziy Osiyoda 300 mingdan ortiq tijorat yuk transporti mavjud (TAM). O‘zbekistonda esa 120 mingdan ziyod faol yuk mashinasi harakatlanmoqda (SAM). Yaqin 2 yillik maqsadimiz — 3,000 ta mashinani ulash orqali yillik aylanmani 700 ming dollardan oshirishdir.',
  },
  {
    id: 5,
    indexLabel: '05',
    navGroup: 'texnologiya',
    title: 'Texnologiya va mahsulot',
    subtitle: 'Yengil Edge-AI arxitektura: real vaqtda charchoq va telefonni aniqlash',
    screenshotUrl: UPLOADED_SLIDE_SCREENSHOTS[5],
    speakerNotes:
      'Texnologik stekimiz Python, OpenCV, MediaPipe FaceMesh (EAR metrikasi bilan ko‘z yumilishini aniqlash) va YOLOv8 modellariga asoslangan bo‘lib, arzon NPU/Edge chiplarda yengil ishlaydi. Hozirgi holatda MVP ishchi prototipi tayyor va real vaqtda charchoq hamda telefonni aniqlaydi.',
  },
  {
    id: 6,
    indexLabel: '06',
    navGroup: 'bozor',
    title: 'Biznes model',
    subtitle: 'Ikki oqimli daromad: apparat sotuvi va B2B SaaS obuna',
    screenshotUrl: UPLOADED_SLIDE_SCREENSHOTS[6],
    speakerNotes:
      'Biznes modelimiz ikki oqimli: birinchisi — har bir mashinaga 60–80 dollardan apparat sotish yoki lizingga berish; ikkinchisi — dispetcherlik paneli, xavf reytingi va 30 kunlik video saqlashni o‘z ichiga olgan oyiga 10–15 dollarlik B2B SaaS obuna.',
  },
  {
    id: 7,
    indexLabel: '07',
    navGroup: 'bozor',
    title: 'Raqobat ustunligi',
    subtitle: 'Narx, offline AI va mahalliy moslashuv — FleetEye AI ni ajratib turadigan omillar',
    screenshotUrl: UPLOADED_SLIDE_SCREENSHOTS[7],
    speakerNotes:
      'Mobileye kabi xorijiy tizimlar 1,000 dollardan qimmat va mahalliy servisga ega emas. Wialon va oddiy GPS-trekerlar esa faqat joylashuv va yoqilg‘ini ko‘rsatib, kabina ichidagi xavfni aniqlamaydi. FleetEye AI 10 barobar arzon, offline AI da ishlaydi va mahalliy dispetcherlik jarayonlariga to‘liq moslangan.',
  },
  {
    id: 8,
    indexLabel: '08',
    navGroup: 'bozor',
    title: 'Bozorga chiqish rejasi',
    subtitle:
      '12 oylik bosqichma-bosqich yo‘l xaritasi: bepul pilotdan yirik korporativ integratsiyagacha',
    screenshotUrl: UPLOADED_SLIDE_SCREENSHOTS[8],
    speakerNotes:
      'Bozorga chiqish rejamiz 3 bosqichdan iborat: 1–3 oyda hammuassis ishlaydigan logistika parkida 30–50 mashinada bepul pilot o‘tkazamiz. 4–8 oyda AIRCUZ uyushmasi hamda Toshkent va Samarqand B2B parklariga to‘g‘ridan-to‘g‘ri sotuv orqali 300 mashinaga chiqamiz. 9–12 oyda sug‘urta kompaniyalari va yirik korporativ parklar bilan integratsiya qilib, 1,000 mashinaga yetamiz.',
  },
  {
    id: 9,
    indexLabel: '09',
    navGroup: 'investitsiya',
    title: 'Jamoa',
    subtitle:
      'AI va logistika tajribasi birlashtirilgan — mahsulot yetakchiligi va amaliy dispetcherlik',
    screenshotUrl: UPLOADED_SLIDE_SCREENSHOTS[9],
    speakerNotes:
      'Jamoamiz texnik va sohaviy tajribani birlashtirgan: Alisher Abduraupov (CEO / Product) — NewUU AI & Robototexnika talabasi, Al-Xorazmiy maktabi bitiruvchisi, ADM Global, Bosch va Euphoria B2B Sales tajribasiga ega. Zafarjon Nosirov (Co-founder / Domain Expert) — NewUU AI & Robototexnika talabasi hamda amaldagi logistika dispetcheri.',
  },
  {
    id: 10,
    indexLabel: '10',
    navGroup: 'investitsiya',
    title: 'Investitsiya va reja',
    subtitle:
      'Pre-seed $80,000 (12 oy): 45% apparat, 30% R&D, 25% savdo. Natija: 300+ mashina va $50,000+ ARR.',
    screenshotUrl: UPLOADED_SLIDE_SCREENSHOTS[10],
    speakerNotes:
      'Pre-seed bosqichida 12 oyga 80,000 dollar investitsiya jalb qilmoqdamiz. Mablag‘ning 45 foizi apparat komponentlariga, 30 foizi R&D va serverlarga, 25 foizi esa B2B pilot va savdoga yo‘naltiriladi. Natijada 12 oyda 300 dan ortiq pullik ulangan mashina va 50,000 dollardan yuqori ARR ko‘rsatkichiga erishamiz.',
  },
];

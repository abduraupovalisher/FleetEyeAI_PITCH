import { SLIDES_DATA } from '../data/slidesData';

export interface GoogleSlidesPresentationSummary {
  presentationId: string;
  title: string;
  slideCount: number;
  url: string;
}

interface SlideTextPayload {
  slideId: string;
  heading: string;
  body: string;
  footer: string;
}

const SLIDE_PAYLOADS: SlideTextPayload[] = [
  {
    slideId: 'fleeteye_slide_1',
    heading: '"FleetEye AI"',
    body: 'Tijorat yuk transporti uchun avtonom Edge-AI xavfsizlik va telematika tizimi.\n\nAsoschilar: Alisher Abduraupov & Zafarjon Nosirov.',
    footer: 'UzCombinator Pre-Seed  ·  01 / 10',
  },
  {
    slideId: 'fleeteye_slide_2',
    heading: 'Muammo',
    body: '• 40%: og‘ir yuk mashinalaridagi avariyalar haydovchi charchog‘i, mikrouyqu va smartfonga chalg‘ish sabab\n\n• $50,000–$150,000: bitta ag‘darilish parkka keltiradigan zarar\n\n• 90%+: O‘zbekistondagi eski Howo, MAN, KamAZ larda zavod xavfsizlik datchiklari yo‘q',
    footer: 'FleetEye AI  ·  02 / 10',
  },
  {
    slideId: 'fleeteye_slide_3',
    heading: 'Yechim',
    body: '• FleetEye AI moduli: kabinaga o‘rnatiladigan ixcham Edge-AI kamerasi\n• 0.2 soniyada ogohlantirish: haydovchi ko‘zini yumsa yoki telefonga qarasa, baland ovozli signal\n• Offline ishlaydi: internetsiz cho‘l va tog‘ yo‘llarida ham\n• Dispetcherlik nazorati: xavfli holatlar korporativ platformaga yuboriladi',
    footer: 'FleetEye AI  ·  03 / 10',
  },
  {
    slideId: 'fleeteye_slide_4',
    heading: 'Bozor hajmi',
    body: '• TAM: Markaziy Osiyoda 300,000+ tijorat yuk transporti\n\n• SAM: O‘zbekistonda 120,000+ faol yuk mashinasi\n\n• SOM (2 yillik maqsad): 3,000 mashina ($60 apparat + $15/oy obuna = $700,000+ yillik aylanma)',
    footer: 'FleetEye AI  ·  04 / 10',
  },
  {
    slideId: 'fleeteye_slide_5',
    heading: 'Texnologiya va mahsulot',
    body: 'Python, OpenCV, MediaPipe FaceMesh (EAR metrikasi bilan ko‘z yumilishini aniqlash), YOLOv8; arzon NPU/Edge chiplarda ishlaydigan yengil arxitektura.\n\nHozirgi holat: MVP ishchi prototipi tayyor, real vaqtda charchoq va telefonni aniqlaydi.',
    footer: 'FleetEye AI  ·  05 / 10',
  },
  {
    slideId: 'fleeteye_slide_6',
    heading: 'Biznes model',
    body: '• Hardware sotish/lizing: har bir mashinaga bir martalik $60–$80\n\n• B2B SaaS obuna: oyiga $10–$15 har bir mashina uchun (dispetcherlik paneli, xavf reytingi, 30 kunlik video saqlash)',
    footer: 'FleetEye AI  ·  06 / 10',
  },
  {
    slideId: 'fleeteye_slide_7',
    heading: 'Raqobat ustunligi',
    body: '• Mobileye / xorijiy tizimlar: narxi $1,000+, mahalliy servis yo‘q\n• Wialon / oddiy GPS: faqat joylashuv va yoqilg‘i, kabina ichidagi xavfni ko‘rmaydi\n• FleetEye AI: 10 barobar arzon ($60–$80), offline AI, mahalliy dispetcherlikka moslangan',
    footer: 'FleetEye AI  ·  07 / 10',
  },
  {
    slideId: 'fleeteye_slide_8',
    heading: 'Bozorga chiqish rejasi',
    body: '• 1–3 oy: hammuassis ishlaydigan logistika parkida 30–50 mashinada bepul pilot\n• 4–8 oy: AIRCUZ uyushmasi va Toshkent/Samarqand B2B parklariga to‘g‘ridan-to‘g‘ri sotuv (300 mashina)\n• 9–12 oy: sug‘urta kompaniyalari va yirik korporativ parklar bilan integratsiya (1,000 mashina)',
    footer: 'FleetEye AI  ·  08 / 10',
  },
  {
    slideId: 'fleeteye_slide_9',
    heading: 'Jamoa',
    body: '• Alisher Abduraupov, CEO / Product: NewUU (AI & Robototexnika), Al-Xorazmiy maktabi, ADM Global, Bosch, Euphoria (B2B Sales)\n\n• Zafarjon Nosirov, Co-founder / Domain Expert: NewUU (AI & Robototexnika), amaldagi logistika dispetcheri',
    footer: 'FleetEye AI  ·  09 / 10',
  },
  {
    slideId: 'fleeteye_slide_10',
    heading: 'Investitsiya va reja',
    body: 'Pre-seed bosqichida $80,000 (12 oy).\n\nXarajatlar: 45% apparat komponentlari, 30% R&D/serverlar, 25% B2B pilot va savdo.\n\nNatija: 12 oyda 300+ pullik ulangan mashina va $50,000+ ARR.',
    footer: 'FleetEye AI  ·  10 / 10',
  },
];

export async function createGoogleSlidesPitchDeck(
  accessToken: string
): Promise<GoogleSlidesPresentationSummary> {
  // Step 1: Create new presentation via Google Slides API
  const createRes = await fetch('https://slides.googleapis.com/v1/presentations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'FleetEye AI — UzCombinator Pre-Seed Pitch Deck',
    }),
  });

  if (!createRes.ok) {
    const errBody = await createRes.json().catch(() => ({}));
    throw new Error(
      errBody?.error?.message || `Google Slides yaratishda xatolik (${createRes.status})`
    );
  }

  const createdData = await createRes.json();
  const presentationId: string = createdData.presentationId;
  const defaultSlideId: string | undefined = createdData.slides?.[0]?.objectId;

  // Step 2: Build batchUpdate requests to create 10 dark-navy slides with cyan headings and Uzbek content
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const requests: any[] = [];

  SLIDE_PAYLOADS.forEach((item, index) => {
    const headingId = `${item.slideId}_heading`;
    const bodyId = `${item.slideId}_body`;
    const footerId = `${item.slideId}_footer`;

    requests.push({
      createSlide: {
        objectId: item.slideId,
        insertionIndex: index + 1,
        slideLayoutReference: {
          predefinedLayout: 'BLANK',
        },
      },
    });

    // Dark navy background (#0B1220 -> R: 11/255, G: 18/255, B: 32/255)
    requests.push({
      updatePageProperties: {
        objectId: item.slideId,
        pageProperties: {
          pageBackgroundFill: {
            solidFill: {
              color: {
                rgbColor: {
                  red: 11 / 255,
                  green: 18 / 255,
                  blue: 32 / 255,
                },
              },
            },
          },
        },
        fields: 'pageBackgroundFill',
      },
    });

    // Heading text box
    requests.push({
      createShape: {
        objectId: headingId,
        shapeType: 'TEXT_BOX',
        elementProperties: {
          pageObjectId: item.slideId,
          size: {
            width: { magnitude: 620, unit: 'PT' },
            height: { magnitude: 65, unit: 'PT' },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 45,
            translateY: 38,
            unit: 'PT',
          },
        },
      },
    });

    requests.push({
      insertText: {
        objectId: headingId,
        insertionIndex: 0,
        text: item.heading,
      },
    });

    requests.push({
      updateTextStyle: {
        objectId: headingId,
        style: {
          fontFamily: 'Inter',
          fontSize: { magnitude: index === 0 ? 36 : 28, unit: 'PT' },
          bold: true,
          foregroundColor: {
            opaqueColor: {
              rgbColor: {
                red: 34 / 255,
                green: 211 / 255,
                blue: 238 / 255,
              },
            },
          },
        },
        fields: 'fontFamily,fontSize,bold,foregroundColor',
      },
    });

    // Body text box
    requests.push({
      createShape: {
        objectId: bodyId,
        shapeType: 'TEXT_BOX',
        elementProperties: {
          pageObjectId: item.slideId,
          size: {
            width: { magnitude: 620, unit: 'PT' },
            height: { magnitude: 230, unit: 'PT' },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 45,
            translateY: 115,
            unit: 'PT',
          },
        },
      },
    });

    requests.push({
      insertText: {
        objectId: bodyId,
        insertionIndex: 0,
        text: item.body,
      },
    });

    requests.push({
      updateTextStyle: {
        objectId: bodyId,
        style: {
          fontFamily: 'Inter',
          fontSize: { magnitude: 16, unit: 'PT' },
          foregroundColor: {
            opaqueColor: {
              rgbColor: {
                red: 248 / 255,
                green: 250 / 255,
                blue: 252 / 255,
              },
            },
          },
        },
        fields: 'fontFamily,fontSize,foregroundColor',
      },
    });

    // Footer text box
    requests.push({
      createShape: {
        objectId: footerId,
        shapeType: 'TEXT_BOX',
        elementProperties: {
          pageObjectId: item.slideId,
          size: {
            width: { magnitude: 620, unit: 'PT' },
            height: { magnitude: 30, unit: 'PT' },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 45,
            translateY: 360,
            unit: 'PT',
          },
        },
      },
    });

    requests.push({
      insertText: {
        objectId: footerId,
        insertionIndex: 0,
        text: `${item.footer}   |   Izoh: ${SLIDES_DATA[index].speakerNotes}`,
      },
    });

    requests.push({
      updateTextStyle: {
        objectId: footerId,
        style: {
          fontFamily: 'Inter',
          fontSize: { magnitude: 9, unit: 'PT' },
          foregroundColor: {
            opaqueColor: {
              rgbColor: {
                red: 148 / 255,
                green: 163 / 255,
                blue: 184 / 255,
              },
            },
          },
        },
        fields: 'fontFamily,fontSize,foregroundColor',
      },
    });
  });

  // Remove the initial blank default slide if present
  if (defaultSlideId) {
    requests.push({
      deleteObject: {
        objectId: defaultSlideId,
      },
    });
  }

  const batchRes = await fetch(
    `https://slides.googleapis.com/v1/presentations/${presentationId}:batchUpdate`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requests }),
    }
  );

  if (!batchRes.ok) {
    const errBody = await batchRes.json().catch(() => ({}));
    throw new Error(
      errBody?.error?.message || `Slaydlarni yozishda xatolik (${batchRes.status})`
    );
  }

  return {
    presentationId,
    title: 'FleetEye AI — UzCombinator Pre-Seed Pitch Deck',
    slideCount: 10,
    url: `https://docs.google.com/presentation/d/${presentationId}/edit`,
  };
}

export async function fetchGoogleSlidesPresentation(
  accessToken: string,
  presentationId: string
): Promise<GoogleSlidesPresentationSummary> {
  const res = await fetch(
    `https://slides.googleapis.com/v1/presentations/${encodeURIComponent(presentationId.trim())}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(
      errBody?.error?.message || `Taqdimotni o‘qishda xatolik (${res.status})`
    );
  }

  const data = await res.json();
  return {
    presentationId: data.presentationId,
    title: data.title || 'Google Slides Taqdimoti',
    slideCount: Array.isArray(data.slides) ? data.slides.length : 0,
    url: `https://docs.google.com/presentation/d/${data.presentationId}/edit`,
  };
}

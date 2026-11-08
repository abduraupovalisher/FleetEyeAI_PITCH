import pptxgen from 'pptxgenjs';
import { SLIDES_DATA } from '../data/slidesData';

const COLORS = {
  bg: '0B1220',
  surface: '111C30',
  surfaceAlt: '16243D',
  border: '1E293B',
  cyan: '22D3EE',
  amber: 'F59E0B',
  white: 'F8FAFC',
  muted: '94A3B8',
  slate: '64748B',
};

function addSlideChrome(slide: pptxgen.Slide, pageNum: number, sectionLabel: string) {
  slide.background = { color: COLORS.bg };

  // Top header line & subtle branding
  slide.addText('FleetEye AI  ·  UzCombinator Pre-Seed', {
    x: 0.6,
    y: 0.35,
    w: 5.5,
    h: 0.3,
    fontFace: 'Inter',
    fontSize: 10,
    color: COLORS.muted,
    bold: true,
  });

  slide.addText(sectionLabel, {
    x: 6.5,
    y: 0.35,
    w: 5.5,
    h: 0.3,
    fontFace: 'Inter',
    fontSize: 10,
    color: COLORS.cyan,
    align: 'right',
    bold: true,
  });

  // Footer page number
  slide.addText(`${String(pageNum).padStart(2, '0')} / 10`, {
    x: 11.2,
    y: 6.95,
    w: 1.5,
    h: 0.3,
    fontFace: 'Inter',
    fontSize: 10,
    color: COLORS.muted,
    align: 'right',
  });
}

export async function exportDeckToPptx(): Promise<void> {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5 inches (16:9)
  pres.author = 'Alisher Abduraupov & Zafarjon Nosirov';
  pres.company = 'FleetEye AI';
  pres.subject = 'UzCombinator Pre-Seed Pitch Deck';
  pres.title = 'FleetEye AI — UzCombinator Pitch Deck';

  // SLIDE 1: Cover
  {
    const slide = pres.addSlide();
    addSlideChrome(slide, 1, '01. KIRISH');
    slide.addNotes(SLIDES_DATA[0].speakerNotes);

    slide.addShape(pres.ShapeType.rect, {
      x: 0.6,
      y: 1.2,
      w: 12.13,
      h: 5.3,
      fill: { color: COLORS.surface },
      line: { color: COLORS.border, width: 1 },
    });

    slide.addText('"FleetEye AI"', {
      x: 1.1,
      y: 1.85,
      w: 10.5,
      h: 1.0,
      fontFace: 'Inter',
      fontSize: 46,
      bold: true,
      color: COLORS.cyan,
    });

    slide.addText(
      'Tijorat yuk transporti uchun avtonom Edge-AI xavfsizlik va telematika tizimi.',
      {
        x: 1.1,
        y: 2.95,
        w: 10.2,
        h: 1.3,
        fontFace: 'Inter',
        fontSize: 26,
        bold: true,
        color: COLORS.white,
      }
    );

    slide.addText('Asoschilar: Alisher Abduraupov & Zafarjon Nosirov.', {
      x: 1.1,
      y: 5.3,
      w: 9.0,
      h: 0.5,
      fontFace: 'Inter',
      fontSize: 16,
      color: COLORS.muted,
    });
  }

  // SLIDE 2: Muammo
  {
    const slide = pres.addSlide();
    addSlideChrome(slide, 2, '02. MUAMMO');
    slide.addNotes(SLIDES_DATA[1].speakerNotes);

    slide.addText('Muammo', {
      x: 0.6,
      y: 0.9,
      w: 8.0,
      h: 0.7,
      fontFace: 'Inter',
      fontSize: 32,
      bold: true,
      color: COLORS.white,
    });

    const cards = [
      {
        num: '40%',
        color: COLORS.amber,
        desc: 'og‘ir yuk mashinalaridagi avariyalar haydovchi charchog‘i, mikrouyqu va smartfonga chalg‘ish sabab',
      },
      {
        num: '$50,000–$150,000',
        color: COLORS.amber,
        desc: 'bitta ag‘darilish parkka keltiradigan zarar',
      },
      {
        num: '90%+',
        color: COLORS.cyan,
        desc: 'O‘zbekistondagi eski Howo, MAN, KamAZ larda zavod xavfsizlik datchiklari yo‘q',
      },
    ];

    cards.forEach((c, idx) => {
      const xPos = 0.6 + idx * 4.15;
      slide.addShape(pres.ShapeType.rect, {
        x: xPos,
        y: 1.9,
        w: 3.85,
        h: 4.5,
        fill: { color: COLORS.surface },
        line: { color: COLORS.border, width: 1 },
      });

      slide.addText(c.num, {
        x: xPos + 0.3,
        y: 2.35,
        w: 3.25,
        h: 1.1,
        fontFace: 'Inter',
        fontSize: idx === 1 ? 26 : 42,
        bold: true,
        color: c.color,
      });

      slide.addText(c.desc, {
        x: xPos + 0.3,
        y: 3.7,
        w: 3.25,
        h: 2.2,
        fontFace: 'Inter',
        fontSize: 16,
        color: COLORS.white,
      });
    });
  }

  // SLIDE 3: Yechim
  {
    const slide = pres.addSlide();
    addSlideChrome(slide, 3, '03. YECHIM');
    slide.addNotes(SLIDES_DATA[2].speakerNotes);

    slide.addText('Yechim', {
      x: 0.6,
      y: 0.9,
      w: 8.0,
      h: 0.7,
      fontFace: 'Inter',
      fontSize: 32,
      bold: true,
      color: COLORS.white,
    });

    const items = [
      {
        title: 'FleetEye AI moduli',
        desc: 'kabinaga o‘rnatiladigan ixcham Edge-AI kamerasi',
      },
      {
        title: '0.2 soniyada ogohlantirish',
        desc: 'haydovchi ko‘zini yumsa yoki telefonga qarasa, baland ovozli signal',
      },
      {
        title: 'Offline ishlaydi',
        desc: 'internetsiz cho‘l va tog‘ yo‘llarida ham',
      },
      {
        title: 'Dispetcherlik nazorati',
        desc: 'xavfli holatlar korporativ platformaga yuboriladi',
      },
    ];

    items.forEach((it, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const xPos = 0.6 + col * 6.15;
      const yPos = 1.9 + row * 2.35;

      slide.addShape(pres.ShapeType.rect, {
        x: xPos,
        y: yPos,
        w: 5.95,
        h: 2.05,
        fill: { color: COLORS.surface },
        line: { color: COLORS.border, width: 1 },
      });

      slide.addText(it.title, {
        x: xPos + 0.35,
        y: yPos + 0.3,
        w: 5.25,
        h: 0.5,
        fontFace: 'Inter',
        fontSize: 20,
        bold: true,
        color: COLORS.cyan,
      });

      slide.addText(it.desc, {
        x: xPos + 0.35,
        y: yPos + 0.9,
        w: 5.25,
        h: 0.85,
        fontFace: 'Inter',
        fontSize: 15,
        color: COLORS.white,
      });
    });
  }

  // SLIDE 4: Bozor hajmi
  {
    const slide = pres.addSlide();
    addSlideChrome(slide, 4, '04. BOZOR HAJMI');
    slide.addNotes(SLIDES_DATA[3].speakerNotes);

    slide.addText('Bozor hajmi', {
      x: 0.6,
      y: 0.9,
      w: 8.0,
      h: 0.7,
      fontFace: 'Inter',
      fontSize: 32,
      bold: true,
      color: COLORS.white,
    });

    const tiers = [
      {
        tag: 'TAM',
        text: 'Markaziy Osiyoda 300,000+ tijorat yuk transporti',
        w: 12.13,
        color: COLORS.surface,
        borderColor: COLORS.border,
      },
      {
        tag: 'SAM',
        text: 'O‘zbekistonda 120,000+ faol yuk mashinasi',
        w: 10.5,
        color: COLORS.surfaceAlt,
        borderColor: COLORS.cyan,
      },
      {
        tag: 'SOM (2 yillik maqsad)',
        text: '3,000 mashina ($60 apparat + $15/oy obuna = $700,000+ yillik aylanma)',
        w: 8.9,
        color: COLORS.surface,
        borderColor: COLORS.amber,
      },
    ];

    tiers.forEach((t, idx) => {
      const yPos = 1.9 + idx * 1.6;
      slide.addShape(pres.ShapeType.rect, {
        x: 0.6,
        y: yPos,
        w: t.w,
        h: 1.35,
        fill: { color: t.color },
        line: { color: t.borderColor, width: 1.5 },
      });

      slide.addText(t.tag, {
        x: 0.9,
        y: yPos + 0.2,
        w: 3.5,
        h: 0.4,
        fontFace: 'Inter',
        fontSize: 15,
        bold: true,
        color: idx === 2 ? COLORS.amber : COLORS.cyan,
      });

      slide.addText(t.text, {
        x: 0.9,
        y: yPos + 0.62,
        w: t.w - 0.6,
        h: 0.55,
        fontFace: 'Inter',
        fontSize: 17,
        bold: true,
        color: COLORS.white,
      });
    });
  }

  // SLIDE 5: Texnologiya va mahsulot
  {
    const slide = pres.addSlide();
    addSlideChrome(slide, 5, '05. TEXNOLOGIYA VA MAHSULOT');
    slide.addNotes(SLIDES_DATA[4].speakerNotes);

    slide.addText('Texnologiya va mahsulot', {
      x: 0.6,
      y: 0.9,
      w: 10.0,
      h: 0.7,
      fontFace: 'Inter',
      fontSize: 32,
      bold: true,
      color: COLORS.white,
    });

    slide.addShape(pres.ShapeType.rect, {
      x: 0.6,
      y: 1.9,
      w: 12.13,
      h: 2.3,
      fill: { color: COLORS.surface },
      line: { color: COLORS.border, width: 1 },
    });

    slide.addText('Arxitektura va AI modellar', {
      x: 0.95,
      y: 2.15,
      w: 6.0,
      h: 0.4,
      fontFace: 'Inter',
      fontSize: 15,
      bold: true,
      color: COLORS.cyan,
    });

    slide.addText(
      'Python, OpenCV, MediaPipe FaceMesh (EAR metrikasi bilan ko‘z yumilishini aniqlash), YOLOv8; arzon NPU/Edge chiplarda ishlaydigan yengil arxitektura.',
      {
        x: 0.95,
        y: 2.65,
        w: 11.4,
        h: 1.2,
        fontFace: 'Inter',
        fontSize: 19,
        color: COLORS.white,
      }
    );

    slide.addShape(pres.ShapeType.rect, {
      x: 0.6,
      y: 4.5,
      w: 12.13,
      h: 1.9,
      fill: { color: COLORS.surfaceAlt },
      line: { color: COLORS.cyan, width: 1.5 },
    });

    slide.addText(
      'Hozirgi holat: MVP ishchi prototipi tayyor, real vaqtda charchoq va telefonni aniqlaydi.',
      {
        x: 0.95,
        y: 5.05,
        w: 11.4,
        h: 0.8,
        fontFace: 'Inter',
        fontSize: 21,
        bold: true,
        color: COLORS.white,
      }
    );
  }

  // SLIDE 6: Biznes model
  {
    const slide = pres.addSlide();
    addSlideChrome(slide, 6, '06. BIZNES MODEL');
    slide.addNotes(SLIDES_DATA[5].speakerNotes);

    slide.addText('Biznes model', {
      x: 0.6,
      y: 0.9,
      w: 8.0,
      h: 0.7,
      fontFace: 'Inter',
      fontSize: 32,
      bold: true,
      color: COLORS.white,
    });

    // Card 1
    slide.addShape(pres.ShapeType.rect, {
      x: 0.6,
      y: 1.9,
      w: 5.85,
      h: 4.5,
      fill: { color: COLORS.surface },
      line: { color: COLORS.border, width: 1 },
    });
    slide.addText('Hardware sotish/lizing', {
      x: 1.0,
      y: 2.35,
      w: 5.0,
      h: 0.5,
      fontFace: 'Inter',
      fontSize: 20,
      bold: true,
      color: COLORS.cyan,
    });
    slide.addText('$60–$80', {
      x: 1.0,
      y: 3.1,
      w: 5.0,
      h: 0.9,
      fontFace: 'Inter',
      fontSize: 40,
      bold: true,
      color: COLORS.white,
    });
    slide.addText('har bir mashinaga bir martalik $60–$80', {
      x: 1.0,
      y: 4.2,
      w: 5.0,
      h: 1.2,
      fontFace: 'Inter',
      fontSize: 17,
      color: COLORS.muted,
    });

    // Card 2
    slide.addShape(pres.ShapeType.rect, {
      x: 6.88,
      y: 1.9,
      w: 5.85,
      h: 4.5,
      fill: { color: COLORS.surface },
      line: { color: COLORS.cyan, width: 1.5 },
    });
    slide.addText('B2B SaaS obuna', {
      x: 7.28,
      y: 2.35,
      w: 5.0,
      h: 0.5,
      fontFace: 'Inter',
      fontSize: 20,
      bold: true,
      color: COLORS.cyan,
    });
    slide.addText('$10–$15 / oy', {
      x: 7.28,
      y: 3.1,
      w: 5.0,
      h: 0.9,
      fontFace: 'Inter',
      fontSize: 40,
      bold: true,
      color: COLORS.white,
    });
    slide.addText(
      'oyiga $10–$15 har bir mashina uchun (dispetcherlik paneli, xavf reytingi, 30 kunlik video saqlash)',
      {
        x: 7.28,
        y: 4.2,
        w: 5.0,
        h: 1.5,
        fontFace: 'Inter',
        fontSize: 17,
        color: COLORS.muted,
      }
    );
  }

  // SLIDE 7: Raqobat ustunligi
  {
    const slide = pres.addSlide();
    addSlideChrome(slide, 7, '07. RAQOBAT USTUNLIGI');
    slide.addNotes(SLIDES_DATA[6].speakerNotes);

    slide.addText('Raqobat ustunligi', {
      x: 0.6,
      y: 0.9,
      w: 8.0,
      h: 0.7,
      fontFace: 'Inter',
      fontSize: 32,
      bold: true,
      color: COLORS.white,
    });

    const rows: pptxgen.TableRow[] = [
      [
        {
          text: 'Tizim / Yechim',
          options: { fill: { color: COLORS.surfaceAlt }, color: COLORS.muted, bold: true },
        },
        {
          text: 'Xususiyatlar va narx taqqoslovi',
          options: { fill: { color: COLORS.surfaceAlt }, color: COLORS.muted, bold: true },
        },
      ],
      [
        {
          text: 'Mobileye / xorijiy tizimlar',
          options: { fill: { color: COLORS.surface }, color: COLORS.white, bold: true },
        },
        {
          text: 'narxi $1,000+, mahalliy servis yo‘q',
          options: { fill: { color: COLORS.surface }, color: COLORS.amber },
        },
      ],
      [
        {
          text: 'Wialon / oddiy GPS',
          options: { fill: { color: COLORS.surface }, color: COLORS.white, bold: true },
        },
        {
          text: 'faqat joylashuv va yoqilg‘i, kabina ichidagi xavfni ko‘rmaydi',
          options: { fill: { color: COLORS.surface }, color: COLORS.muted },
        },
      ],
      [
        {
          text: 'FleetEye AI',
          options: { fill: { color: COLORS.surfaceAlt }, color: COLORS.cyan, bold: true },
        },
        {
          text: '10 barobar arzon ($60–$80), offline AI, mahalliy dispetcherlikka moslangan',
          options: { fill: { color: COLORS.surfaceAlt }, color: COLORS.cyan, bold: true },
        },
      ],
    ];

    slide.addTable(rows, {
      x: 0.6,
      y: 2.0,
      w: 12.13,
      colW: [4.2, 7.93],
      rowH: [0.7, 1.15, 1.15, 1.3],
      fontFace: 'Inter',
      fontSize: 17,
      border: { type: 'solid', color: COLORS.border, pt: 1 },
      valign: 'middle',
    });
  }

  // SLIDE 8: Bozorga chiqish rejasi
  {
    const slide = pres.addSlide();
    addSlideChrome(slide, 8, '08. BOZORGA CHIQISH REJASI');
    slide.addNotes(SLIDES_DATA[7].speakerNotes);

    slide.addText('Bozorga chiqish rejasi', {
      x: 0.6,
      y: 0.9,
      w: 9.0,
      h: 0.7,
      fontFace: 'Inter',
      fontSize: 32,
      bold: true,
      color: COLORS.white,
    });

    const stages = [
      {
        period: '1–3 oy',
        desc: 'hammuassis ishlaydigan logistika parkida 30–50 mashinada bepul pilot',
      },
      {
        period: '4–8 oy',
        desc: 'AIRCUZ uyushmasi va Toshkent/Samarqand B2B parklariga to‘g‘ridan-to‘g‘ri sotuv (300 mashina)',
      },
      {
        period: '9–12 oy',
        desc: 'sug‘urta kompaniyalari va yirik korporativ parklar bilan integratsiya (1,000 mashina)',
      },
    ];

    stages.forEach((st, idx) => {
      const xPos = 0.6 + idx * 4.15;
      slide.addShape(pres.ShapeType.rect, {
        x: xPos,
        y: 2.0,
        w: 3.85,
        h: 4.3,
        fill: { color: COLORS.surface },
        line: { color: idx === 2 ? COLORS.cyan : COLORS.border, width: 1.5 },
      });

      slide.addText(st.period, {
        x: xPos + 0.3,
        y: 2.35,
        w: 3.25,
        h: 0.7,
        fontFace: 'Inter',
        fontSize: 28,
        bold: true,
        color: COLORS.cyan,
      });

      slide.addText(st.desc, {
        x: xPos + 0.3,
        y: 3.3,
        w: 3.25,
        h: 2.5,
        fontFace: 'Inter',
        fontSize: 16,
        color: COLORS.white,
      });
    });
  }

  // SLIDE 9: Jamoa
  {
    const slide = pres.addSlide();
    addSlideChrome(slide, 9, '09. JAMOA');
    slide.addNotes(SLIDES_DATA[8].speakerNotes);

    slide.addText('Jamoa', {
      x: 0.6,
      y: 0.9,
      w: 8.0,
      h: 0.7,
      fontFace: 'Inter',
      fontSize: 32,
      bold: true,
      color: COLORS.white,
    });

    // Member 1
    slide.addShape(pres.ShapeType.rect, {
      x: 0.6,
      y: 1.9,
      w: 5.85,
      h: 4.5,
      fill: { color: COLORS.surface },
      line: { color: COLORS.border, width: 1 },
    });
    slide.addText('Alisher Abduraupov', {
      x: 1.0,
      y: 2.35,
      w: 5.0,
      h: 0.55,
      fontFace: 'Inter',
      fontSize: 24,
      bold: true,
      color: COLORS.white,
    });
    slide.addText('CEO / Product', {
      x: 1.0,
      y: 2.95,
      w: 5.0,
      h: 0.4,
      fontFace: 'Inter',
      fontSize: 16,
      bold: true,
      color: COLORS.cyan,
    });
    slide.addText(
      'NewUU (AI & Robototexnika), Al-Xorazmiy maktabi, ADM Global, Bosch, Euphoria (B2B Sales)',
      {
        x: 1.0,
        y: 3.65,
        w: 5.0,
        h: 2.0,
        fontFace: 'Inter',
        fontSize: 16,
        color: COLORS.muted,
      }
    );

    // Member 2
    slide.addShape(pres.ShapeType.rect, {
      x: 6.88,
      y: 1.9,
      w: 5.85,
      h: 4.5,
      fill: { color: COLORS.surface },
      line: { color: COLORS.border, width: 1 },
    });
    slide.addText('Zafarjon Nosirov', {
      x: 7.28,
      y: 2.35,
      w: 5.0,
      h: 0.55,
      fontFace: 'Inter',
      fontSize: 24,
      bold: true,
      color: COLORS.white,
    });
    slide.addText('Co-founder / Domain Expert', {
      x: 7.28,
      y: 2.95,
      w: 5.0,
      h: 0.4,
      fontFace: 'Inter',
      fontSize: 16,
      bold: true,
      color: COLORS.cyan,
    });
    slide.addText('NewUU (AI & Robototexnika), amaldagi logistika dispetcheri', {
      x: 7.28,
      y: 3.65,
      w: 5.0,
      h: 2.0,
      fontFace: 'Inter',
      fontSize: 16,
      color: COLORS.muted,
    });
  }

  // SLIDE 10: Investitsiya va reja
  {
    const slide = pres.addSlide();
    addSlideChrome(slide, 10, '10. INVESTITSIYA VA REJA');
    slide.addNotes(SLIDES_DATA[9].speakerNotes);

    slide.addText('Investitsiya va reja', {
      x: 0.6,
      y: 0.9,
      w: 8.0,
      h: 0.7,
      fontFace: 'Inter',
      fontSize: 32,
      bold: true,
      color: COLORS.white,
    });

    slide.addShape(pres.ShapeType.rect, {
      x: 0.6,
      y: 1.9,
      w: 5.8,
      h: 4.5,
      fill: { color: COLORS.surface },
      line: { color: COLORS.cyan, width: 1.5 },
    });

    slide.addText('Pre-seed bosqichida $80,000 (12 oy).', {
      x: 0.95,
      y: 2.25,
      w: 5.1,
      h: 0.8,
      fontFace: 'Inter',
      fontSize: 24,
      bold: true,
      color: COLORS.cyan,
    });

    slide.addText(
      'Xarajatlar:\n• 45% apparat komponentlari\n• 30% R&D/serverlar\n• 25% B2B pilot va savdo',
      {
        x: 0.95,
        y: 3.2,
        w: 5.1,
        h: 1.7,
        fontFace: 'Inter',
        fontSize: 17,
        color: COLORS.white,
      }
    );

    slide.addText('Natija: 12 oyda 300+ pullik ulangan mashina va $50,000+ ARR.', {
      x: 0.95,
      y: 5.15,
      w: 5.1,
      h: 0.9,
      fontFace: 'Inter',
      fontSize: 17,
      bold: true,
      color: COLORS.amber,
    });

    // Right side visual breakdown bars in PPTX
    slide.addShape(pres.ShapeType.rect, {
      x: 6.75,
      y: 1.9,
      w: 5.98,
      h: 4.5,
      fill: { color: COLORS.surface },
      line: { color: COLORS.border, width: 1 },
    });

    const allocations = [
      { label: '45% apparat komponentlari', pct: 0.45, color: COLORS.cyan },
      { label: '30% R&D/serverlar', pct: 0.3, color: COLORS.amber },
      { label: '25% B2B pilot va savdo', pct: 0.25, color: '38BDF8' },
    ];

    allocations.forEach((item, idx) => {
      const yPos = 2.4 + idx * 1.25;
      slide.addText(item.label, {
        x: 7.1,
        y: yPos,
        w: 5.2,
        h: 0.4,
        fontFace: 'Inter',
        fontSize: 16,
        bold: true,
        color: COLORS.white,
      });
      slide.addShape(pres.ShapeType.rect, {
        x: 7.1,
        y: yPos + 0.48,
        w: 5.2 * item.pct,
        h: 0.32,
        fill: { color: item.color },
      });
    });
  }

  await pres.writeFile({ fileName: 'FleetEye_AI_UzCombinator_Pitch_Deck.pptx' });
}

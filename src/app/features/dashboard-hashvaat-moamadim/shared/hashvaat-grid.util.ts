import {
  MoamadLeHashvaaGrid,
  PratReshimaHashvaa,
  TziyuneiMidotHashvaa
} from '../models/hashvaat-grid.model';
import { NetuneiGrafHashvaa } from '../models/graf-hashvaa.model';
import {
  AmudaTable,
  NetuneiTableHashvaa,
  ShuraTable,
  SugMegamaTable
} from '../models/table-hashvaa.model';
import {
  isKamutLeHashvaaMerukazet,
  ROCHAV_LABEL_AMUDA,
  ROCHAV_MOAMAD
} from '../models/hashvaat-layout.const';
import { MIDOT_HAARCHOT_TEKUFATIYOT } from '../models/hashvaat-midot.const';

/**
 * בניית טבלת ציונים לפי סדר המועמדים הנוכחי.
 * עד 5 מועמדים — עמודות ציון גמישות; מעל 5 — רוחב קבוע.
 */
export function bniyatTableMeMoamadim(
  moamadim: MoamadLeHashvaaGrid[],
  midot: string[],
  getTziyunim: (moamad: MoamadLeHashvaaGrid) => TziyuneiMidotHashvaa
): NetuneiTableHashvaa {
  const kamut = (moamadim || []).length;
  const isMerukaz = isKamutLeHashvaaMerukazet(kamut);
  const amudot: AmudaTable[] = [
    {
      mafteach: 'midda',
      koteret: 'מימד',
      sug: 'text',
      yishur: 'right',
      minWidth: isMerukaz ? '8rem' : ROCHAV_LABEL_AMUDA
    }
  ];

  for (let i = 0; i < kamut; i++) {
    const moamad = moamadim[i];
    amudot.push({
      mafteach: 'moamad_' + String(moamad.id),
      koteret: kitzurShem(moamad.shemMale),
      sug: 'tziyun',
      colorKoteret: moamad.colorLeMoamad,
      hadgeshMaxBaShura: true,
      yishur: 'center',
      minWidth: isMerukaz ? '5rem' : ROCHAV_MOAMAD
    });
  }

  const shurot: ShuraTable[] = midot.map((shemMidda, index) => {
    const shura: ShuraTable = {
      id: index + 1,
      midda: shemMidda
    };
    for (let i = 0; i < (moamadim || []).length; i++) {
      const moamad = moamadim[i];
      const tziyunim = getTziyunim(moamad) || {};
      const erech = tziyunim[shemMidda];
      shura['moamad_' + String(moamad.id)] =
        erech !== undefined && erech !== null ? erech : null;
    }
    return shura;
  });

  return { amudot, shurot };
}

/** בניית נתוני גרף לפי סדר המועמדים */
export function bniyatGrafMeMoamadim(
  moamadim: MoamadLeHashvaaGrid[],
  midot: string[],
  getTziyunim: (moamad: MoamadLeHashvaaGrid) => TziyuneiMidotHashvaa,
  erechMin = 40,
  erechMax = 100
): NetuneiGrafHashvaa {
  return {
    toviyot: midot.slice(),
    sidrot: (moamadim || []).map(moamad => {
      const tziyunim = getTziyunim(moamad) || {};
      return {
        shemMoamad: moamad.shemMale,
        colorLeMoamad: moamad.colorLeMoamad,
        moamadId: moamad.id,
        erachim: midot.map(midda => {
          const erech = tziyunim[midda];
          return erech !== undefined && erech !== null ? erech : 0;
        })
      };
    }),
    erechMin,
    erechMax
  };
}

/**
 * טבלת הערכות תקופתיות כמו בפיגמה:
 * שורה למועמד — מיקום, ציון שנה, בולט לחיוב, מגמה, קישור הערכה.
 */
export function bniyatTableHaarchotTekufatiyot(
  moamadim: MoamadLeHashvaaGrid[],
  shanaNivcheret: number | string
): NetuneiTableHashvaa {
  const shana = String(shanaNivcheret || '2025');
  const reshima = moamadim || [];
  const kamut = reshima.length;

  const amudot: AmudaTable[] = [
    {
      mafteach: 'moamad',
      koteret: 'מועמד',
      sug: 'shem-moamad',
      yishur: 'right',
      minWidth: '8rem'
    },
    {
      mafteach: 'mikom',
      koteret: 'מיקום',
      sug: 'mikom',
      yishur: 'center',
      minWidth: '6.5rem'
    },
    {
      mafteach: 'tziyunShana',
      koteret: shana,
      sug: 'tziyun-shana',
      yishur: 'center',
      minWidth: '4.5rem'
    },
    {
      mafteach: 'bolet',
      koteret: 'בולט לחיוב',
      sug: 'bolet-lechiyuv',
      yishur: 'center',
      minWidth: '7.5rem'
    },
    {
      mafteach: 'megama',
      koteret: 'מגמה',
      sug: 'megama',
      yishur: 'center',
      minWidth: '8.5rem'
    },
    {
      mafteach: 'haarcha',
      koteret: 'הערכה',
      sug: 'peulat-haarcha',
      yishur: 'center',
      minWidth: '4.5rem'
    }
  ];

  const tziyunimLeShana = reshima.map(moamad =>
    getTziyunShana(moamad, shana)
  );
  const midug = bniyatMidug(tziyunimLeShana);

  const shurot: ShuraTable[] = reshima.map((moamad, index) => {
    const tziyun = tziyunimLeShana[index];
    const sugMegama = chishuvMegama(moamad);
    const isBolet =
      moamad.isBoletLechiyuvHaarcha !== undefined
        ? !!moamad.isBoletLechiyuvHaarcha
        : tziyun !== null && (tziyun >= 80 || (tziyun <= 10 && tziyun >= 8));

    return {
      id: moamad.id,
      moamad: {
        tekst: kitzurShemMale(moamad.shemMale),
        color: moamad.colorLeMoamad,
        moamadId: moamad.id
      },
      mikom: {
        mikom: midug[index],
        miKamut: kamut
      },
      tziyunShana: tziyun,
      bolet: {
        isBolet,
        tekst: isBolet ? 'כן' : 'לא'
      },
      megama: {
        sug: sugMegama,
        tekst: getTekstMegama(sugMegama)
      },
      haarcha: { moamadId: moamad.id }
    };
  });

  return { amudot, shurot };
}

function getTziyunShana(
  moamad: MoamadLeHashvaaGrid,
  shana: string
): number | null {
  const tziyunim = (moamad && moamad.tziyuneiHaarchotTekufatiyot) || {};
  const erech = tziyunim[shana];
  return erech !== undefined && erech !== null ? erech : null;
}

/** דירוג לפי ציון השנה — גבוה יותר = מיקום נמוך יותר (1 ראשון) */
function bniyatMidug(tziyunim: Array<number | null>): number[] {
  const sorted = tziyunim
    .map((tziyun, index) => ({ tziyun: tziyun === null ? -1 : tziyun, index }))
    .sort((a, b) => b.tziyun - a.tziyun);

  const midug: number[] = [];
  for (let i = 0; i < sorted.length; i++) {
    midug[sorted[i].index] = i + 1;
  }
  return midug;
}

function chishuvMegama(moamad: MoamadLeHashvaaGrid): SugMegamaTable {
  const tziyunim = (moamad && moamad.tziyuneiHaarchotTekufatiyot) || {};
  const erachim = MIDOT_HAARCHOT_TEKUFATIYOT.map(shana => tziyunim[shana]).filter(
    erech => erech !== undefined && erech !== null
  ) as number[];

  if (erachim.length < 2) {
    return 'yatziv';
  }

  const acharon = erachim[erachim.length - 1];
  const kodem = erachim[erachim.length - 2];
  const hefresh = acharon - kodem;
  // סף דינמי: סולם 0–100 מהשרת מול סולם 1–10
  const saf = acharon > 20 || kodem > 20 ? 3 : 0.5;

  if (hefresh >= saf) {
    return 'aliya';
  }
  if (hefresh <= -saf) {
    return 'yerida';
  }
  return 'yatziv';
}

function getTekstMegama(sug: SugMegamaTable): string {
  if (sug === 'aliya') {
    return 'מגמת עלייה';
  }
  if (sug === 'yerida') {
    return 'מגמת ירידה';
  }
  return 'יציב';
}

/** "סנ\"צ רונן כהן" → "רונן כהן" לתצוגת טבלת הערכות */
function kitzurShemMale(shemMale: string): string {
  if (!shemMale) {
    return '';
  }
  const chalakim = shemMale.trim().split(/\s+/);
  if (chalakim.length >= 3) {
    return chalakim.slice(1).join(' ');
  }
  return shemMale;
}

/** שליפת רשימת רובריקה לפי מפתח */
export function getReshimaMeMoamad(
  moamad: MoamadLeHashvaaGrid,
  mafteach: string
): PratReshimaHashvaa[] {
  if (!moamad || !mafteach) {
    return [];
  }
  const erech = (moamad as any)[mafteach];
  return Array.isArray(erech) ? erech : [];
}

/** קיצור שם לתצוגת כותרת עמודה — "סנ\"צ רונן כהן" → "רונן" */
function kitzurShem(shemMale: string): string {
  if (!shemMale) {
    return '';
  }
  const chalakim = shemMale.trim().split(/\s+/);
  if (chalakim.length >= 2) {
    return chalakim[chalakim.length - 2];
  }
  return shemMale;
}

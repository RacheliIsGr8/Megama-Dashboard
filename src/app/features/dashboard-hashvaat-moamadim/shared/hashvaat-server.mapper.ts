import {
  HaarachotServer,
  MeymadBeHaarachServer,
  ShotrimItemServer,
  TguvatHashvaatMeServer
} from '../models/server-hashvaat.model';
import { MoamadLeHashvaa } from '../models/moamad-le-hashvaa.model';
import {
  MoamadLeHashvaaGrid,
  MiddaTziyunHashvaa,
  MerkazHaarachaHashvaa,
  StatusHashvaa,
  SugRamatTziyun,
  TziyuneiMidotHashvaa
} from '../models/hashvaat-grid.model';

/**
 * מיפוי תשובת שרת → מודלי תצוגה (Heblish).
 * מפתח זיהוי: MisparTikMamada.
 */

export function getMisparTikMamadaMeShotrim(
  item: ShotrimItemServer
): number {
  if (item && item.MisparTikMamada) {
    return item.MisparTikMamada;
  }
  if (item && item.Shoter && item.Shoter.MisparTikMamada) {
    return item.Shoter.MisparTikMamada;
  }
  return 0;
}

/** רשימת מועמדים למסך בחירה מתוך Data.Shotrim */
export function mapShotrimLeMoamadimBechira(
  tguva: TguvatHashvaatMeServer
): MoamadLeHashvaa[] {
  if (!tguva || !tguva.Data || !tguva.Data.Shotrim) {
    return [];
  }

  const darga = tguva.Darga || '';
  return tguva.Data.Shotrim.map(item =>
    mapShotrimItemLeMoamadBechira(item, darga)
  );
}

export function mapShotrimItemLeMoamadBechira(
  item: ShotrimItemServer,
  darga = ''
): MoamadLeHashvaa {
  const shoter = item.Shoter || ({} as any);
  const misparTikMamada = getMisparTikMamadaMeShotrim(item);
  const shem = shoter.Shem || '';
  // שם לתצוגה — Shem מהשרת; Darga נשמר בנפרד (לא מודבק אוטומטית לכל Shotrim)
  const shemMale = shem;

  return {
    id: misparTikMamada,
    misparTikMamada,
    teudatZehut: shoter.TeudatZehut || '',
    shemMale,
    darga: darga || undefined,
    tafkid: item.MoamadLeTafkidBekvu || '',
    machoz: shoter.KodYechida || '',
    misparIshi: shoter.Misparlshi != null ? String(shoter.Misparlshi) : '',
    urlTmuna: item.ShoterImage || '',
    urlHaarachaTkufatit: item.UrlForLasthAarachaTkuf || '',
    harachatAmitim: item.HarachatAmitim,
    harachatKfifim: item.HarachatKfifim,
    melelMerkazHaarachafi: !!item.MelelMerkazHaarachafi
  };
}

/**
 * בניית גריד השוואה מפריט Shotrim + haarachot
 * (מפריט או משורש התשובה כגיבוי).
 */
export function mapShotrimItemLeGrid(
  item: ShotrimItemServer,
  options: {
    darga?: string;
    colorLeMoamad?: string;
    haarachotFallback?: HaarachotServer | null;
    melelSummary?: string | null;
    melelStrong?: string | null;
    melelWeak?: string | null;
    melelMeafyenim?: string | null;
  } = {}
): MoamadLeHashvaaGrid {
  const bechira = mapShotrimItemLeMoamadBechira(item, options.darga || '');
  const haarachot =
    (item.haarachot && item.haarachot) ||
    options.haarachotFallback ||
    null;

  const tziyuneiMeshuvAmitim = bniyatTziyunimMeMidot(
    haarachot && haarachot.NetuneiCurrentHaaracha
  );
  const tziyuneiMeshuvKefifim = bniyatTziyunimMeMidot(
    haarachot && haarachot.MeymadimBeHaarach
  );
  const tziyuneiHaarchotTekufatiyot = bniyatTziyuneiHaarchotMeShanim(
    haarachot
  );

  return {
    id: bechira.misparTikMamada,
    misparTikMamada: bechira.misparTikMamada,
    shemMale: bechira.shemMale,
    gil: 0,
    urlTmuna: bechira.urlTmuna,
    colorLeMoamad: options.colorLeMoamad || '#4f46e5',
    darga: bechira.darga,
    urlHaarachaTkufatit: bechira.urlHaarachaTkufatit,
    pratimIkarim: [
      { shemSadeh: 'תפקיד', erech: bechira.tafkid || '—' },
      { shemSadeh: 'יחידה', erech: bechira.machoz || '—' },
      { shemSadeh: 'גיל', erech: '—' },
      { shemSadeh: 'ותק בארגון', erech: '—' },
      { shemSadeh: 'ותק בדרגה', erech: '—' }
    ],
    pratimNosafim: [
      { shemSadeh: 'מ"א', erech: bechira.misparIshi || '—' },
      { shemSadeh: 'ת.ז', erech: bechira.teudatZehut || '—' },
      { shemSadeh: 'תיק ממ"ד', erech: bechira.misparTikMamada }
    ],
    midot: bniyatMidotMeHaarachot(haarachot),
    merkazim: bniyatMerkazimMeItem(item, options),
    statusim: bniyatStatusimMeItem(item, options),
    haskalaAcademit: [],
    hachsharotMiktzoiyot: [],
    minuyimKodmim: [],
    tziyuneiMeshuvAmitim,
    tziyuneiMeshuvKefifim,
    tziyuneiHaarchotTekufatiyot,
    isBoletLechiyuvHaarcha: isBoletMeTziyunim(tziyuneiHaarchotTekufatiyot)
  };
}

/** מיפוי מערך מימדים → מפת שם→ציון */
export function bniyatTziyunimMeMidot(
  midot: MeymadBeHaarachServer[] | null | undefined
): TziyuneiMidotHashvaa {
  const mapa: TziyuneiMidotHashvaa = {};
  if (!midot || !midot.length) {
    return mapa;
  }
  for (let i = 0; i < midot.length; i++) {
    const midda = midot[i];
    if (!midda || !midda.TeurMeymad) {
      continue;
    }
    mapa[midda.TeurMeymad] =
      midda.Tziyun !== undefined && midda.Tziyun !== null
        ? midda.Tziyun
        : 0;
  }
  return mapa;
}

/**
 * ציוני הערכה תקופתית לפי שנה —
 * ממוצע ציוני המימדים לכל שנה (Prev + Current).
 */
export function bniyatTziyuneiHaarchotMeShanim(
  haarachot: HaarachotServer | null | undefined
): TziyuneiMidotHashvaa {
  const mapa: TziyuneiMidotHashvaa = {};
  if (!haarachot) {
    return mapa;
  }

  const prev = haarachot.NetuneiPrevYearsHaaracha || [];
  for (let i = 0; i < prev.length; i++) {
    const shanaBlock = prev[i];
    if (!shanaBlock || !shanaBlock.Key) {
      continue;
    }
    mapa[String(shanaBlock.Key)] = memutzaTziyunim(shanaBlock.Value);
  }

  const current = haarachot.NetuneiCurrentHaaracha || [];
  if (current.length) {
    const shana =
      current[0].Shana != null ? String(current[0].Shana) : null;
    if (shana) {
      mapa[shana] = memutzaTziyunim(current);
    }
  }

  return mapa;
}

function memutzaTziyunim(
  midot: MeymadBeHaarachServer[] | null | undefined
): number {
  if (!midot || !midot.length) {
    return 0;
  }
  let sum = 0;
  let kamut = 0;
  for (let i = 0; i < midot.length; i++) {
    if (midot[i] && midot[i].Tziyun != null) {
      sum += midot[i].Tziyun;
      kamut++;
    }
  }
  if (!kamut) {
    return 0;
  }
  return Math.round((sum / kamut) * 10) / 10;
}

function bniyatMidotMeHaarachot(
  haarachot: HaarachotServer | null | undefined
): MiddaTziyunHashvaa[] {
  const midotMakor =
    (haarachot &&
      haarachot.NetuneiCurrentHaaracha &&
      haarachot.NetuneiCurrentHaaracha.length
      ? haarachot.NetuneiCurrentHaaracha
      : haarachot && haarachot.MeymadimBeHaarach) || [];

  return midotMakor.slice(0, 3).map(midda => ({
    shem: midda.TeurMeymad,
    erech: midda.Tziyun,
    sugIcon: 'amudot' as const,
    sugRama: ramatTziyun(midda.Tziyun)
  }));
}

function bniyatMerkazimMeItem(
  item: ShotrimItemServer,
  options: {
    melelSummary?: string | null;
    melelMeafyenim?: string | null;
  }
): MerkazHaarachaHashvaa[] {
  if (!item.MelelMerkazHaarachafi) {
    return [];
  }
  return [
    {
      shem: 'מרכז הערכה',
      erech: 0,
      teur:
        options.melelSummary ||
        options.melelMeafyenim ||
        'קיים מילול מרכז הערכה',
      sugRama: 'gavoa'
    }
  ];
}

function bniyatStatusimMeItem(
  item: ShotrimItemServer,
  options: {
    melelStrong?: string | null;
    melelWeak?: string | null;
  }
): StatusHashvaa[] {
  const statusim: StatusHashvaa[] = [];

  if (item.HarachatAmitim) {
    statusim.push({
      tekst: String(item.HarachatAmitim),
      sug: 'hatzlacha'
    });
  }
  if (item.HarachatKfifim) {
    statusim.push({
      tekst: String(item.HarachatKfifim),
      sug: 'hatzlacha'
    });
  }
  if (options.melelStrong) {
    statusim.push({
      tekst: 'חוזקות: ' + options.melelStrong,
      sug: 'hatzlacha',
      isPill: true
    });
  }
  if (options.melelWeak) {
    statusim.push({
      tekst: 'לשיפור: ' + options.melelWeak,
      sug: 'azhara',
      isPill: true
    });
  }
  if (!statusim.length) {
    statusim.push({
      tekst: 'אין הערות משמעת.',
      sug: 'hatzlacha'
    });
  }
  return statusim;
}

function ramatTziyun(tziyun: number): SugRamatTziyun {
  if (tziyun >= 85) {
    return 'gavoa';
  }
  if (tziyun >= 70) {
    return 'beinoni';
  }
  if (tziyun > 0) {
    return 'namuch';
  }
  return 'ragil';
}

function isBoletMeTziyunim(tziyunim: TziyuneiMidotHashvaa): boolean {
  const erachim = Object.keys(tziyunim || {}).map(k => tziyunim[k]);
  if (!erachim.length) {
    return false;
  }
  const acharon = erachim[erachim.length - 1];
  // סולם 0–100 מהשרת, או 1–10 אם יגיע כך
  return acharon >= 80 || (acharon <= 10 && acharon >= 8);
}

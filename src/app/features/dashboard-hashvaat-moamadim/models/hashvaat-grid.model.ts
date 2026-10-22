/** שדה תווית:ערך בתא פרטים */
export interface SadehPratimHashvaa {
  shemSadeh: string;
  erech: string | number;
}

/** רמת צבע לציון / תג */
export type SugRamatTziyun = 'gavoa' | 'beinoni' | 'namuch' | 'ragil' | 'chasum';

/** שורת מדד בציוני מועמד */
export interface MiddaTziyunHashvaa {
  shem: string;
  /** null = מוסתר (••••) */
  erech: number | null;
  sugIcon: 'amudot' | 'magen';
  sugRama?: SugRamatTziyun;
}

/** ציון מרכז הערכה + תיאור */
export interface MerkazHaarachaHashvaa {
  shem: string;
  erech: number;
  teur: string;
  sugRama: SugRamatTziyun;
}

/** סטטוס / התראה בתחתית ציונים */
export interface StatusHashvaa {
  tekst: string;
  sug: 'hatzlacha' | 'azhara' | 'hatraa';
  isPill?: boolean;
}

/** פריט ברשימת רובריקה (השכלה / הכשרות / מינויים) */
export interface PratReshimaHashvaa {
  tekst: string;
  shana?: string | number;
}

/** ציוני מדדים לפרק משוב / הערכות */
export interface TziyuneiMidotHashvaa {
  [shemMidda: string]: number;
}

/** מפתח רשימה באקורדיון עמודות */
export type MafteachReshimaHashvaa =
  | 'haskalaAcademit'
  | 'hachsharotMiktzoiyot'
  | 'minuyimKodmim';

/** מועמד מלא לטבלת ההשוואה + רובריקות */
export interface MoamadLeHashvaaGrid {
  /**
   * מזהה תצוגה — תמיד שווה ל-misparTikMamada מהשרת.
   */
  id: number;
  /** מפתח ייחודי מהשרת — מספר תיק ממ"ד */
  misparTikMamada: number;
  shemMale: string;
  gil: number;
  urlTmuna: string;
  colorLeMoamad: string;
  darga?: string;
  urlHaarachaTkufatit?: string;
  pratimIkarim: SadehPratimHashvaa[];
  pratimNosafim: SadehPratimHashvaa[];
  midot: MiddaTziyunHashvaa[];
  merkazim: MerkazHaarachaHashvaa[];
  statusim: StatusHashvaa[];
  /** רובריקות אקורדיון — רשימות */
  haskalaAcademit: PratReshimaHashvaa[];
  hachsharotMiktzoiyot: PratReshimaHashvaa[];
  minuyimKodmim: PratReshimaHashvaa[];
  /** ציונים למשוב עמיתים / כפיפים / הערכות */
  tziyuneiMeshuvAmitim: TziyuneiMidotHashvaa;
  tziyuneiMeshuvKefifim: TziyuneiMidotHashvaa;
  /** ציוני הערכה תקופתית לפי שנה (סולם 1–10 כמו בפיגמה) */
  tziyuneiHaarchotTekufatiyot: TziyuneiMidotHashvaa;
  /** בולט לחיוב בהערכה תקופתית */
  isBoletLechiyuvHaarcha?: boolean;
}

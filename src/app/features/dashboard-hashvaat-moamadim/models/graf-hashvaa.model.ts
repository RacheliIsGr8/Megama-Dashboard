/** סדרת מועמד בגרף השוואה (קו / עמודות) */
export interface SidratGrafHashvaa {
  shemMoamad: string;
  colorLeMoamad: string;
  moamadId?: string | number;
  /** ציונים לפי סדר התוויות (מימדים) */
  erachim: number[];
}

/** נתוני גרף השוואה משותפים ל-line-chart / column-chart */
export interface NetuneiGrafHashvaa {
  /** תוויות ציר X — שמות מימדים */
  toviyot: string[];
  /** סדרות — מועמד אחד לכל סדרה */
  sidrot: SidratGrafHashvaa[];
  /**
   * צבעים לפי מימד (למשל משוב כפיפים) —
   * כשמוגדר, כל עמודה מקבלת צבע משלה והמקרא מציג מימדים
   */
  colorsLeMidot?: string[];
  /** טווח ציר Y אופציונלי */
  erechMin?: number;
  erechMax?: number;
}

/** פלטת מימדים כמו בפיגמת משוב כפיפים */
export const COLORS_MIDOT_MESHUV_KEFIFIM: string[] = [
  '#4285F4', // 1 כושר ביצוע
  '#00BA7C', // 2 יחסי אנוש
  '#FF9E0F', // 3 מקצועיות
  '#DB4437', // 4 ערכיות
  '#7E3FF2', // 5 שליטה עצמית
  '#EC407A', // 6 כושר פיקוד
  '#00BCD4', // 7 מצטיינים בתפקידים
  '#8BC34A'  // 8 כושר ביצוע בולט
];

export type SugTatzigGraf = 'kav' | 'amudot';

/** סוג תוכן פרק באקורדיון השוואה */
export type SugTochenAccordion =
  | 'tekst'
  | 'hashvaa'
  | 'reshima-amudot';

export interface PerekAccordionHashvaa {
  id?: string | number;
  koteret: string;
  isPatuach?: boolean;
  /** תוכן טקסטואלי פשוט (אופציונלי) */
  tochen?: string;
  /**
   * סוג תוכן הפרק.
   * hashvaa = טבלה+גרף; reshima-amudot = עמודות רשימה לכל מועמד
   */
  sugTochen?: SugTochenAccordion;
  /** האם הפרק מציג אזור השוואה (טבלה + גרף) — תאימות לאחור */
  isEzoreHashvaa?: boolean;
  /**
   * מפתח רשימה במועמד (ל-sugTochen === 'reshima-amudot')
   * למשל haskalaAcademit / hachsharotMiktzoiyot / minuyimKodmim
   */
  mafteachReshima?: string;
}

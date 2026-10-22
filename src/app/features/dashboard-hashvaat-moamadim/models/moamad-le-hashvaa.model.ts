/**
 * מודל תצוגה (Heblish) למועמד במסך בחירה.
 * id === misparTikMamada (מפתח ייחודי מהשרת).
 */

export interface NetuneGrafAmuda {
  shemKategoria: string;
  erech: number;
}

export interface NetuneGrafRochav {
  shemMidda: string;
  erechMin: number;
  erechMax: number;
  erechNochachi: number;
}

export interface PerekAccordion {
  koteret: string;
  tochen: string;
  isPatuach?: boolean;
}

export interface NetuneDataCube {
  shemSadeh: string;
  erech: string | number;
}

export interface MoamadLeHashvaa {
  /**
   * מזהה פנימי לתצוגה / trackBy —
   * תמיד שווה ל-misparTikMamada מהשרת.
   */
  id: number;
  /** מפתח ייחודי מהשרת — מספר תיק ממ"ד */
  misparTikMamada: number;
  teudatZehut: string;
  shemMale: string;
  /** דרגה מהשרת (Darga) — אופציונלי לכותרת */
  darga?: string;
  tafkid: string;
  /** קוד יחידה / מחוז */
  machoz: string;
  misparIshi: string;
  urlTmuna: string;
  colorLeMoamad?: string;
  /** קישור להערכה תקופתית אחרונה */
  urlHaarachaTkufatit?: string;
  harachatAmitim?: string | null;
  harachatKfifim?: string | null;
  melelMerkazHaarachafi?: boolean;
  netuneiGrafAmudot?: NetuneGrafAmuda[];
  netuneiGrafRochav?: NetuneGrafRochav[];
  prakimAccordion?: PerekAccordion[];
  netuneiDataCube?: NetuneDataCube[];
}

export interface SinunMoamadim {
  milatChinush: string;
}

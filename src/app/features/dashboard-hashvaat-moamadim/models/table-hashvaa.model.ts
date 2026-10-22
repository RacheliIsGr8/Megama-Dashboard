/** סוגי תאים נתמכים בטבלה השיתופית */
export type SugTaTable =
  | 'text'
  | 'shem-moamad'
  | 'tziyun'
  | 'mikom'
  | 'tziyun-shana'
  | 'bolet-lechiyuv'
  | 'megama'
  | 'peulat-haarcha';

export type SugMegamaTable = 'aliya' | 'yatziv' | 'yerida';

export type YishurTaTable = 'right' | 'center' | 'left';

/** הגדרת עמודה */
export interface AmudaTable {
  mafteach: string;
  koteret: string;
  sug: SugTaTable;
  /** צבע כותרת (למשל שם מועמד בהשוואת מדדים) */
  colorKoteret?: string;
  /** הדגשת הציון הגבוה ביותר בשורה — לעמודות tziyun */
  hadgeshMaxBaShura?: boolean;
  yishur?: YishurTaTable;
  /** רוחב מינימלי לעמודה (למשל '7rem') — חשוב בעמודות מועמדים דינמיות */
  minWidth?: string;
}

export interface TaShemMoamad {
  tekst: string;
  color?: string;
  moamadId?: string | number;
}

export interface TaMikom {
  mikom: number;
  miKamut: number;
}

export interface TaBoletLechiyuv {
  isBolet: boolean;
  tekst?: string;
}

export interface TaMegama {
  sug: SugMegamaTable;
  tekst?: string;
}

export interface TaPeulatHaarcha {
  moamadId?: string | number;
}

export type ErechTaTable =
  | string
  | number
  | boolean
  | TaShemMoamad
  | TaMikom
  | TaBoletLechiyuv
  | TaMegama
  | TaPeulatHaarcha
  | null
  | undefined;

export interface ShuraTable {
  id?: string | number;
  [mafteach: string]: ErechTaTable;
}

export interface NetuneiTableHashvaa {
  amudot: AmudaTable[];
  shurot: ShuraTable[];
}

/** אירוע לחיצה מתא פעולה / שם מועמד */
export interface IruaLichitzaTable {
  amuda: AmudaTable;
  shura: ShuraTable;
  erech: ErechTaTable;
}

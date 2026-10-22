/**
 * מודלי תשובת שרת להשוואת מועמדים —
 * שמות השדות תואמים 100% ל-JSON מה-API (PascalCase / camelCase כפי שמגיע).
 */

/** מימד בודד בהערכה (ציונים / גרפים) */
export interface MeymadBeHaarachServer {
  BarColor: string;
  KodSugMeymad: number;
  Seder: number;
  Shana: number;
  TeurMeymad: string;
  Tziyun: number;
}

/** ציוני שנה קודמת — Key = שנה כמחרוזת */
export interface NetuneiPrevYearHaarachaServer {
  Key: string;
  Value: MeymadBeHaarachServer[];
}

/** חבילת הערכות / מדדים */
export interface HaarachotServer {
  MeymadimBeHaarach: MeymadBeHaarachServer[];
  NetuneiCurrentHaaracha: MeymadBeHaarachServer[];
  NetuneiPrevYearsHaaracha: NetuneiPrevYearHaarachaServer[];
}

/** פרטי שוטר בסיסיים */
export interface ShoterServer {
  KodYechida: string | null;
  /** איות מהשרת — Misparlshi (לא MisparIshi) */
  Misparlshi: number;
  MisparTikMamada: number | null;
  Shem: string | null;
  TeudatZehut: string | null;
}

/**
 * פריט ב-Data.Shotrim —
 * מפתח זיהוי ייחודי: MisparTikMamada
 */
export interface ShotrimItemServer {
  HarachatAmitim: string | null;
  HarachatKfifim: string | null;
  MelelMerkazHaarachafi: boolean;
  MisparTikMamada: number;
  MoamadLeTafkidBekvu: string | null;
  NetuneiMekazHaaracha: unknown | null;
  NetuneiMekazHaaracha2: unknown | null;
  Shoter: ShoterServer;
  ShoterImage: string;
  UrlForLasthAarachaTkuf: string;
  /**
   * הערכות למועמד בהשוואה מרובת מועמדים.
   * ב-API יחיד יכול להגיע גם כ-haarachot בשורש התשובה.
   */
  haarachot?: HaarachotServer | null;
}

/** גוף Data בתשובה */
export interface DataHashvaatServer {
  Shotrim: ShotrimItemServer[];
  DochotAmitimPath: string;
  DochotKfifimPath: string;
  IsPrintPreview: boolean;
  MelelMeafyenim: string | null;
  MelelStrong: string | null;
  MelelSummary: string | null;
  MelelWeak: string | null;
  MisparTikMamada: number;
  Misparishi: number | null;
  Moamadim: unknown[];
  PrintPreviewMisparimIshiim: number[] | null;
  ShemTikMamada: string;
  ShowSanatzMelel: boolean;
  Tz: string;
  UrlLastHaaracha: string;
  UserDisplayName: string;
  expandAmitim: boolean;
  expandKfifim: boolean;
  expandMerkaz: boolean;
  expandTkofatit: boolean;
}

/** תשובת שרת מלאה */
export interface TguvatHashvaatMeServer {
  Darga: string;
  Data: DataHashvaatServer;
  shoter: ShoterServer;
  haarachot?: HaarachotServer | null;
}

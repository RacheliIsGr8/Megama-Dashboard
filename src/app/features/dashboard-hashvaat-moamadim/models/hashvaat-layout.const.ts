/**
 * מידות עימוד אחידות להשוואת מועמדים — כמו בפיגמה Make.
 * עד 5 מועמדים: מארז ממורכז ~80% מרוחב המסך, עמודות נמתחות שווה.
 * מעל 5: רוחב קבוע (ניווט עמודים — בהמשך).
 */

/** מקסימום מועמדים בלי ניווט אופקי / עמודים */
export const KAMUT_MOAMADIM_MAX_LELO_NIUV = 5;

/** רוחב מארז ממורכז עד 5 מועמדים — 80% מרוחב המסך כמו בפיגמה */
export const ROCHAV_TOKHEN_ACHUZ = '80vw';

/** עמודת תווית אנכית (פרטים / ציונים) */
export const ROCHAV_LABEL_AMUDA = '3rem';
/** רוחב קבוע לעמודת מועמד כשיש יותר מ-5 (לניווט עתידי) */
export const ROCHAV_MOAMAD = '14rem';
export const ROCHAV_MOAMAD_REM = 14;
export const ROCHAV_LABEL_REM = 3;

/** תאימות לאחור — רוחב מינימום לעמודת מועמד */
export const ROCHAV_MIN_MOAMAD = ROCHAV_MOAMAD;

export function isKamutLeHashvaaMerukazet(kamutMoamadim: number): boolean {
  const kamut = kamutMoamadim || 0;
  return kamut > 0 && kamut <= KAMUT_MOAMADIM_MAX_LELO_NIUV;
}

/**
 * תבנית עמודות:
 * עד 5 — תווית קבועה + מועמדים ב-1fr (מתמלאים בתוך המארז).
 * מעל 5 — רוחב קבוע לכל מועמד.
 */
export function bniyatGridTemplateColumns(kamutMoamadim: number): string {
  const kamut = kamutMoamadim || 0;
  if (kamut === 0) {
    return ROCHAV_LABEL_AMUDA;
  }
  if (isKamutLeHashvaaMerukazet(kamut)) {
    return ROCHAV_LABEL_AMUDA + ' repeat(' + kamut + ', minmax(0, 1fr))';
  }
  return (
    ROCHAV_LABEL_AMUDA +
    ' repeat(' +
    kamut +
    ', ' +
    ROCHAV_MOAMAD +
    ')'
  );
}

/** רוחב המארז הממורכז / מינימום לגלילה */
export function bniyatRochavTokhen(kamutMoamadim: number): string {
  if (isKamutLeHashvaaMerukazet(kamutMoamadim)) {
    return ROCHAV_TOKHEN_ACHUZ;
  }
  return bniyatGridMinWidth(kamutMoamadim);
}

/** רוחב כולל קבוע — תווית + מועמדים (למעלה מ-5) */
export function bniyatGridMinWidth(kamutMoamadim: number): string {
  const kamut = kamutMoamadim || 0;
  const total = ROCHAV_LABEL_REM + kamut * ROCHAV_MOAMAD_REM;
  return total + 'rem';
}

/** תבנית עמודות לרשימות באקורדיון */
export function bniyatGridTemplateReshima(kamutMoamadim: number): string {
  return bniyatGridTemplateColumns(kamutMoamadim);
}

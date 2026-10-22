import { MoamadLeHashvaaGrid } from './hashvaat-grid.model';

/** צבעי מועמדים קבועים לסנכרון עם כרטיסי בחירה */
export const COLOR_MOAMADIM_HASHVAA: string[] = [
  '#7B61FF',
  '#00B4D8',
  '#2ECC71',
  '#F39C12',
  '#E74C3C'
];

/**
 * נתוני דמה מלאים לטבלת השוואה + רובריקות אקורדיון.
 * מזהים תואמים ל-MOCK_MOAMADIM במסך הבחירה.
 */
export const MOCK_MOAMADIM_HASHVAA_GRID: MoamadLeHashvaaGrid[] = [
  {
    id: 10001, misparTikMamada: 10001,
    shemMale: 'סנ"צ רונן כהן',
    gil: 53,
    urlTmuna: 'https://i.pravatar.cc/150?img=12',
    colorLeMoamad: COLOR_MOAMADIM_HASHVAA[0],
    pratimIkarim: [
      { shemSadeh: 'תפקיד', erech: 'קצין מבצעים' },
      { shemSadeh: 'יחידה', erech: 'מחוז דרום' },
      { shemSadeh: 'גיל', erech: 53 },
      { shemSadeh: 'ותק בארגון', erech: '23 שנים' },
      { shemSadeh: 'ותק בדרגה', erech: '5 שנים' }
    ],
    pratimNosafim: [
      { shemSadeh: 'מ"א', erech: '1234567' },
      { shemSadeh: 'ת.ז', erech: '012345678' },
      { shemSadeh: 'מצב משפחתי', erech: 'נשוי + 3' }
    ],
    midot: [
      { shem: 'מדד תפקוד', erech: 85, sugIcon: 'amudot', sugRama: 'gavoa' },
      { shem: 'מדד כשירות', erech: 78, sugIcon: 'magen', sugRama: 'beinoni' },
      { shem: 'מדד סוציומטרי', erech: 92, sugIcon: 'amudot', sugRama: 'gavoa' }
    ],
    merkazim: [
      {
        shem: 'מרכז בכירים',
        erech: 9,
        teur: 'סיכויים גבוהים מאוד',
        sugRama: 'gavoa'
      },
      {
        shem: 'מרכז הערכה לנצ"מ',
        erech: 8,
        teur: 'סיכויים גבוהים',
        sugRama: 'gavoa'
      }
    ],
    statusim: [
      { tekst: 'אין הערות משמעת.', sug: 'hatzlacha' },
      { tekst: 'אין התראת יחב"מ', sug: 'hatzlacha', isPill: true }
    ],
    haskalaAcademit: [
      { shana: 2008, tekst: 'תואר ראשון במדעי המדינה - אוניברסיטת בן גוריון' },
      { shana: 2014, tekst: 'תואר שני במנהל ציבורי - האוניברסיטה העברית' }
    ],
    hachsharotMiktzoiyot: [
      { shana: 2023, tekst: 'קורס פו"מ' },
      { shana: 2019, tekst: 'קורס פיקוד ומטה (פומ"ה)' },
      { shana: 2015, tekst: 'קורס מנהיגות בכירה' },
      { shana: 2010, tekst: 'קורס בכירים משרד הפנים' },
      { shana: 2007, tekst: 'קורס מפקדי מחנות' }
    ],
    minuyimKodmim: [
      { shana: '01.03.2020', tekst: 'סנ"צ מפקד יחידת חופש ירושלים לב הבירה' },
      { shana: '15.08.2015', tekst: 'רפ"ק סגן מפקד תחנה — באר שבע' },
      { shana: '01.01.2010', tekst: 'פקד קצין סיור — מחוז דרום' }
    ],
    tziyuneiMeshuvAmitim: {
      'כושר ביצוע': 90,
      'יחסי אנוש': 86,
      'מקצועיות': 93,
      'ערכיות': 88,
      'שליטה עצמית': 91,
      'כושר פיקוד': 89,
      'מצטיינים בתפקידים': 85,
      'כושר ביצוע בולט': 92
    },
    tziyuneiMeshuvKefifim: {
      'כושר הנהגה': 90,
      'ארגון': 86,
      'מנהל וביצוע': 93,
      'מקצועיות': 88,
      'יחסי אנוש / טיפול בכ"א': 91,
      'אמינות': 89,
      'גישה שירותית': 85,
      'כללי': 92
    },
    tziyuneiHaarchotTekufatiyot: {
      '2021': 7,
      '2022': 7.5,
      '2023': 8,
      '2024': 8.5,
      '2025': 9
    },
    isBoletLechiyuvHaarcha: true
  },
  {
    id: 10002, misparTikMamada: 10002,
    shemMale: 'רפ"ק מיכל לוי',
    gil: 45,
    urlTmuna: 'https://i.pravatar.cc/150?img=5',
    colorLeMoamad: COLOR_MOAMADIM_HASHVAA[1],
    pratimIkarim: [
      { shemSadeh: 'תפקיד', erech: 'קצינת מבצעים' },
      { shemSadeh: 'יחידה', erech: 'מחוז תל אביב' },
      { shemSadeh: 'גיל', erech: 45 },
      { shemSadeh: 'ותק בארגון', erech: '18 שנים' },
      { shemSadeh: 'ותק בדרגה', erech: '4 שנים' }
    ],
    pratimNosafim: [
      { shemSadeh: 'מ"א', erech: '2345678' },
      { shemSadeh: 'ת.ז', erech: '023456789' },
      { shemSadeh: 'מצב משפחתי', erech: 'נשואה + 2' }
    ],
    midot: [
      { shem: 'מדד תפקוד', erech: 72, sugIcon: 'amudot', sugRama: 'beinoni' },
      { shem: 'מדד כשירות', erech: 80, sugIcon: 'magen', sugRama: 'gavoa' },
      { shem: 'מדד סוציומטרי', erech: 68, sugIcon: 'amudot', sugRama: 'beinoni' }
    ],
    merkazim: [
      {
        shem: 'מרכז בכירים',
        erech: 7,
        teur: 'סיכויים בינוניים-גבוהים',
        sugRama: 'beinoni'
      },
      {
        shem: 'מרכז הערכה לנצ"מ',
        erech: 6,
        teur: 'סיכויים בינוניים',
        sugRama: 'beinoni'
      }
    ],
    statusim: [
      { tekst: 'אין הערות משמעת.', sug: 'hatzlacha' },
      { tekst: 'יש התראת יחב"מ', sug: 'hatraa', isPill: true }
    ],
    haskalaAcademit: [
      { shana: 2005, tekst: 'תואר ראשון במשפטים - אוניברסיטת תל אביב' },
      { shana: 2012, tekst: 'תואר שני בקרימינולוגיה - אוניברסיטת חיפה' }
    ],
    hachsharotMiktzoiyot: [
      { shana: 2021, tekst: 'קורס טכנאי רשת' },
      { shana: 2018, tekst: 'קורס קצינים מתקדם' },
      { shana: 2015, tekst: 'קורס ניהול משברים' },
      { shana: 2011, tekst: 'קורס מנהיגות ניהולית' }
    ],
    minuyimKodmim: [
      { shana: '12.01.2021', tekst: 'רפ"ק קצינת מבצעים — מחוז תל אביב' },
      { shana: '03.06.2016', tekst: 'פקד סגנית מפקד תחנה — תל אביב' },
      { shana: '20.09.2011', tekst: 'ממ"ש קצינת תנועה — מחוז מרכז' }
    ],
    tziyuneiMeshuvAmitim: {
      'כושר ביצוע': 78,
      'יחסי אנוש': 90,
      'מקצועיות': 82,
      'ערכיות': 85,
      'שליטה עצמית': 80,
      'כושר פיקוד': 76,
      'מצטיינים בתפקידים': 88,
      'כושר ביצוע בולט': 79
    },
    tziyuneiMeshuvKefifim: {
      'כושר הנהגה': 82,
      'ארגון': 90,
      'מנהל וביצוע': 78,
      'מקצועיות': 85,
      'יחסי אנוש / טיפול בכ"א': 88,
      'אמינות': 90,
      'גישה שירותית': 84,
      'כללי': 86
    },
    tziyuneiHaarchotTekufatiyot: {
      '2021': 8,
      '2022': 8,
      '2023': 8.5,
      '2024': 9,
      '2025': 9
    },
    isBoletLechiyuvHaarcha: true
  },
  {
    id: 10003, misparTikMamada: 10003,
    shemMale: 'פקד יוסי אברהם',
    gil: 48,
    urlTmuna: 'https://i.pravatar.cc/150?img=33',
    colorLeMoamad: COLOR_MOAMADIM_HASHVAA[2],
    pratimIkarim: [
      { shemSadeh: 'תפקיד', erech: 'מפקד תחנה' },
      { shemSadeh: 'יחידה', erech: 'מחוז חיפה' },
      { shemSadeh: 'גיל', erech: 48 },
      { shemSadeh: 'ותק בארגון', erech: '20 שנים' },
      { shemSadeh: 'ותק בדרגה', erech: '6 שנים' }
    ],
    pratimNosafim: [
      { shemSadeh: 'מ"א', erech: '3456789' },
      { shemSadeh: 'ת.ז', erech: '034567890' },
      { shemSadeh: 'מצב משפחתי', erech: 'נשוי + 2' }
    ],
    midot: [
      { shem: 'מדד תפקוד', erech: 90, sugIcon: 'amudot', sugRama: 'gavoa' },
      { shem: 'מדד כשירות', erech: 88, sugIcon: 'magen', sugRama: 'gavoa' },
      { shem: 'מדד סוציומטרי', erech: 75, sugIcon: 'amudot', sugRama: 'beinoni' }
    ],
    merkazim: [
      {
        shem: 'מרכז בכירים',
        erech: 8,
        teur: 'סיכויים גבוהים',
        sugRama: 'gavoa'
      },
      {
        shem: 'מרכז הערכה לנצ"מ',
        erech: 7,
        teur: 'סיכויים בינוניים-גבוהים',
        sugRama: 'beinoni'
      }
    ],
    statusim: [
      { tekst: 'הערת מפקד (2022) · איחור בהגשת דוח', sug: 'azhara' },
      { tekst: 'אין התראת יחב"מ', sug: 'hatzlacha', isPill: true }
    ],
    haskalaAcademit: [
      { shana: 2001, tekst: 'תואר ראשון בהיסטוריה - אוניברסיטת בר אילן' },
      { shana: 2010, tekst: 'תואר שני בביטחון לאומי - אוניברסיטת חיפה' }
    ],
    hachsharotMiktzoiyot: [
      { shana: 2021, tekst: 'קורס אג"מ מחוזי' },
      { shana: 2017, tekst: 'קורס מנהיגות אסטרטגית' },
      { shana: 2012, tekst: 'הכשרת קציני מודיעין' }
    ],
    minuyimKodmim: [
      { shana: '2019–היום', tekst: 'מפקד תחנה — מחוז חיפה' },
      { shana: '2014–2019', tekst: 'מפקד יחידה — חיפה' },
      { shana: '2009–2014', tekst: 'קצין מודיעין — מחוז צפון' }
    ],
    tziyuneiMeshuvAmitim: {
      'כושר ביצוע': 95,
      'יחסי אנוש': 72,
      'מקצועיות': 90,
      'ערכיות': 84,
      'שליטה עצמית': 88,
      'כושר פיקוד': 94,
      'מצטיינים בתפקידים': 81,
      'כושר ביצוע בולט': 93
    },
    tziyuneiMeshuvKefifim: {
      'כושר הנהגה': 94,
      'ארגון': 80,
      'מנהל וביצוע': 91,
      'מקצועיות': 87,
      'יחסי אנוש / טיפול בכ"א': 75,
      'אמינות': 88,
      'גישה שירותית': 79,
      'כללי': 90
    },
    tziyuneiHaarchotTekufatiyot: {
      '2021': 6.5,
      '2022': 7,
      '2023': 7.5,
      '2024': 8,
      '2025': 8.5
    },
    isBoletLechiyuvHaarcha: true
  },
  {
    id: 10004, misparTikMamada: 10004,
    shemMale: 'סמ"ר דנה שמש',
    gil: 42,
    urlTmuna: 'https://i.pravatar.cc/150?img=9',
    colorLeMoamad: COLOR_MOAMADIM_HASHVAA[3],
    pratimIkarim: [
      { shemSadeh: 'תפקיד', erech: 'רכזת מודיעין' },
      { shemSadeh: 'יחידה', erech: 'מחוז מרכז' },
      { shemSadeh: 'גיל', erech: 42 },
      { shemSadeh: 'ותק בארגון', erech: '15 שנים' },
      { shemSadeh: 'ותק בדרגה', erech: '2 שנים' }
    ],
    pratimNosafim: [
      { shemSadeh: 'מ"א', erech: '4567890' },
      { shemSadeh: 'ת.ז', erech: '045678901' },
      { shemSadeh: 'מצב משפחתי', erech: 'רווקה' }
    ],
    midot: [
      { shem: 'מדד תפקוד', erech: 65, sugIcon: 'amudot', sugRama: 'namuch' },
      { shem: 'מדד כשירות', erech: 70, sugIcon: 'magen', sugRama: 'beinoni' },
      { shem: 'מדד סוציומטרי', erech: 60, sugIcon: 'amudot', sugRama: 'namuch' }
    ],
    merkazim: [
      {
        shem: 'מרכז בכירים',
        erech: 5,
        teur: 'סיכויים בינוניים',
        sugRama: 'beinoni'
      },
      {
        shem: 'מרכז הערכה לנצ"מ',
        erech: 4,
        teur: 'סיכויים נמוכים-בינוניים',
        sugRama: 'namuch'
      }
    ],
    statusim: [
      { tekst: 'הערת מפקד · איחור בהגשת דוח', sug: 'azhara' },
      { tekst: 'יש התראת יחב"מ', sug: 'hatraa', isPill: true }
    ],
    haskalaAcademit: [
      { shana: 2007, tekst: 'תואר ראשון במדעי המחשב - הטכניון' },
      { shana: 2015, tekst: 'תואר שני בניהול מערכות מידע - אוניברסיטת תל אביב' }
    ],
    hachsharotMiktzoiyot: [
      { shana: 2024, tekst: 'קורס סייבר ואבטחת מידע' },
      { shana: 2019, tekst: 'קורס ניתוח מודיעין' },
      { shana: 2013, tekst: 'הכשרת קציני תקשוב' }
    ],
    minuyimKodmim: [
      { shana: '2023–היום', tekst: 'רכזת מודיעין — מחוז מרכז' },
      { shana: '2018–2023', tekst: 'קצינת תקשוב — מחוז מרכז' },
      { shana: '2013–2018', tekst: 'אנליסטית מודיעין — יחידה ארצית' }
    ],
    tziyuneiMeshuvAmitim: {
      'כושר ביצוע': 62,
      'יחסי אנוש': 70,
      'מקצועיות': 65,
      'ערכיות': 68,
      'שליטה עצמית': 58,
      'כושר פיקוד': 60,
      'מצטיינים בתפקידים': 55,
      'כושר ביצוע בולט': 63
    },
    tziyuneiMeshuvKefifim: {
      'כושר הנהגה': 48,
      'ארגון': 52,
      'מנהל וביצוע': 45,
      'מקצועיות': 50,
      'יחסי אנוש / טיפול בכ"א': 42,
      'אמינות': 55,
      'גישה שירותית': 47,
      'כללי': 49
    },
    tziyuneiHaarchotTekufatiyot: {
      '2021': 5,
      '2022': 5.5,
      '2023': 6,
      '2024': 6,
      '2025': 6.5
    },
    isBoletLechiyuvHaarcha: false
  },
  {
    id: 10005, misparTikMamada: 10005,
    shemMale: 'רס"ב אבי מזרחי',
    gil: 50,
    urlTmuna: 'https://i.pravatar.cc/150?img=15',
    colorLeMoamad: COLOR_MOAMADIM_HASHVAA[4],
    pratimIkarim: [
      { shemSadeh: 'תפקיד', erech: 'מפקד צוות סיור' },
      { shemSadeh: 'יחידה', erech: 'מחוז דרום' },
      { shemSadeh: 'גיל', erech: 50 },
      { shemSadeh: 'ותק בארגון', erech: '22 שנים' },
      { shemSadeh: 'ותק בדרגה', erech: '3 שנים' }
    ],
    pratimNosafim: [
      { shemSadeh: 'מ"א', erech: '5678901' },
      { shemSadeh: 'ת.ז', erech: '056789012' },
      { shemSadeh: 'מצב משפחתי', erech: 'נשוי + 4' }
    ],
    midot: [
      { shem: 'מדד תפקוד', erech: 88, sugIcon: 'amudot', sugRama: 'gavoa' },
      { shem: 'מדד כשירות', erech: 82, sugIcon: 'magen', sugRama: 'gavoa' },
      { shem: 'מדד סוציומטרי', erech: 79, sugIcon: 'amudot', sugRama: 'beinoni' }
    ],
    merkazim: [
      {
        shem: 'מרכז בכירים',
        erech: 8,
        teur: 'סיכויים גבוהים',
        sugRama: 'gavoa'
      },
      {
        shem: 'מרכז הערכה לנצ"מ',
        erech: 7,
        teur: 'סיכויים בינוניים-גבוהים',
        sugRama: 'beinoni'
      }
    ],
    statusim: [
      { tekst: 'אין הערות משמעת.', sug: 'hatzlacha' },
      { tekst: 'אין התראת יחב"מ', sug: 'hatzlacha', isPill: true }
    ],
    haskalaAcademit: [
      { shana: 1999, tekst: 'תואר ראשון בכלכלה - האוניברסיטה הפתוחה' }
    ],
    hachsharotMiktzoiyot: [
      { shana: 2020, tekst: 'קורס ניהול יחידות' },
      { shana: 2016, tekst: 'קורס פיקוד בסיסי' }
    ],
    minuyimKodmim: [
      { shana: '2022–היום', tekst: 'מפקד צוות סיור — מחוז דרום' },
      { shana: '2017–2022', tekst: 'סגן מפקד צוות — מחוז דרום' },
      { shana: '2012–2017', tekst: 'סייר — מחוז דרום' }
    ],
    tziyuneiMeshuvAmitim: {
      'כושר ביצוע': 84,
      'יחסי אנוש': 87,
      'מקצועיות': 91,
      'ערכיות': 83,
      'שליטה עצמית': 86,
      'כושר פיקוד': 80,
      'מצטיינים בתפקידים': 89,
      'כושר ביצוע בולט': 85
    },
    tziyuneiMeshuvKefifim: {
      'כושר הנהגה': 86,
      'ארגון': 84,
      'מנהל וביצוע': 88,
      'מקצועיות': 90,
      'יחסי אנוש / טיפול בכ"א': 83,
      'אמינות': 87,
      'גישה שירותית': 91,
      'כללי': 85
    },
    tziyuneiHaarchotTekufatiyot: {
      '2021': 7,
      '2022': 7.5,
      '2023': 8,
      '2024': 8,
      '2025': 8.5
    },
    isBoletLechiyuvHaarcha: true
  }
];

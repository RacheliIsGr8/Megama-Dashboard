import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Output
} from '@angular/core';

import {
  COLORS_MIDOT_MESHUV_KEFIFIM,
  NetuneiGrafHashvaa,
  PerekAccordionHashvaa,
  SugTatzigGraf
} from '../models/graf-hashvaa.model';
import { EfsharutInputSelect } from '../models/input-select.model';
import { NetuneiTableHashvaa } from '../models/table-hashvaa.model';

@Component({
  selector: 'app-masach-bdikat-rechivim',
  templateUrl: './masach-bdikat-rechivim.component.html',
  styleUrls: ['./masach-bdikat-rechivim.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MasachBdikatRechivimComponent {

  /** חזרה למסך בחירה — דרך המעטפת, בלי routing */
  @Output() chazaraLebchira = new EventEmitter<void>();

  sugTatzigGraf: SugTatzigGraf = 'amudot';

  onChazaraLebchira(): void {
    this.chazaraLebchira.emit();
  }

  efsharuyotShana: EfsharutInputSelect[] = [
    { shem: '2021', erech: 2021 },
    { shem: '2022', erech: 2022 },
    { shem: '2023', erech: 2023 },
    { shem: '2024', erech: 2024 },
    { shem: '2025', erech: 2025 }
  ];
  bechirotsShana: Array<string | number> = [2025];

  efsharuyotMidot: EfsharutInputSelect[] = [
    { shem: 'כושר ביצוע', erech: 'kosher-bitzua' },
    { shem: 'יחסי אנוש', erech: 'yachasei-enosh' },
    { shem: 'מקצועיות', erech: 'miktzoiyut' },
    { shem: 'ערכיות', erech: 'arachiyut' },
    { shem: 'שליטה עצמית', erech: 'shlita-atzmit' },
    { shem: 'כושר פיקוד', erech: 'kosher-pikud' },
    { shem: 'מצטיינים בתפקידים', erech: 'mitztaynim' },
    { shem: 'כושר ביצוע בולט', erech: 'kosher-bitzua-bolet' }
  ];
  bechirotsMidot: Array<string | number> = [
    'kosher-bitzua',
    'yachasei-enosh',
    'miktzoiyut',
    'arachiyut',
    'shlita-atzmit',
    'kosher-pikud',
    'mitztaynim',
    'kosher-bitzua-bolet'
  ];

  prakim: PerekAccordionHashvaa[] = [
    {
      id: 'hashvaa-demo',
      koteret: 'משוב עמיתים — הדגמה',
      isPatuach: true,
      isEzoreHashvaa: true
    },
    {
      id: 'tekst-demo',
      koteret: 'פרק טקסטואלי',
      tochen: 'פרק לבדיקת אקורדיון עם תוכן טקסט פשוט.',
      isPatuach: false
    }
  ];

  netuneiGraf: NetuneiGrafHashvaa = {
    toviyot: [
      'כושר ביצוע',
      'יחסי אנוש',
      'מקצועיות',
      'ערכיות',
      'שליטה עצמית',
      'כושר פיקוד',
      'מצטיינים בתפקידים',
      'כושר ביצוע בולט'
    ],
    sidrot: [
      {
        shemMoamad: 'רונן כהן',
        colorLeMoamad: '#4f46e5',
        erachim: [88, 82, 90, 85, 78, 90, 84, 87]
      },
      {
        shemMoamad: 'ישראל ישראלי',
        colorLeMoamad: '#0891b2',
        erachim: [80, 93, 86, 88, 85, 78, 79, 84]
      },
      {
        shemMoamad: 'דוד לוי',
        colorLeMoamad: '#16a34a',
        erachim: [85, 78, 88, 92, 81, 86, 90, 83]
      }
    ],
    erechMin: 60,
    erechMax: 100
  };

  /** דוגמת משוב כפיפים — עמודה לכל מימד בצבעי הפיגמה */
  netuneiGrafMeshuvKefifim: NetuneiGrafHashvaa = {
    toviyot: [
      'כושר ביצוע',
      'יחסי אנוש',
      'מקצועיות',
      'ערכיות',
      'שליטה עצמית',
      'כושר פיקוד',
      'מצטיינים בתפקידים',
      'כושר ביצוע בולט'
    ],
    sidrot: [
      {
        shemMoamad: 'משוב כפיפים',
        colorLeMoamad: COLORS_MIDOT_MESHUV_KEFIFIM[0],
        erachim: [92, 88, 85, 78, 90, 82, 86, 94]
      }
    ],
    colorsLeMidot: COLORS_MIDOT_MESHUV_KEFIFIM.slice(),
    erechMin: 60,
    erechMax: 100
  };

  /** טבלת ציונים לפי מימדים (השוואה אופקית) */
  netuneiTable: NetuneiTableHashvaa = {
    amudot: [
      { mafteach: 'midda', koteret: 'מימד', sug: 'text', minWidth: '9rem' },
      {
        mafteach: 'ronen',
        koteret: 'רונן כהן',
        sug: 'tziyun',
        colorKoteret: '#4f46e5',
        hadgeshMaxBaShura: true,
        minWidth: '7rem'
      },
      {
        mafteach: 'israel',
        koteret: 'ישראל ישראלי',
        sug: 'tziyun',
        colorKoteret: '#0891b2',
        hadgeshMaxBaShura: true,
        minWidth: '7rem'
      },
      {
        mafteach: 'david',
        koteret: 'דוד לוי',
        sug: 'tziyun',
        colorKoteret: '#16a34a',
        hadgeshMaxBaShura: true,
        minWidth: '7rem'
      }
    ],
    shurot: [
      { id: 1, midda: 'כושר ביצוע', ronen: 88, israel: 80, david: 85 },
      { id: 2, midda: 'יחסי אנוש', ronen: 82, israel: 93, david: 78 },
      { id: 3, midda: 'מקצועיות', ronen: 90, israel: 86, david: 88 },
      { id: 4, midda: 'כושר פיקוד', ronen: 90, israel: 78, david: 86 }
    ]
  };

  /** טבלת מועמדים כמו בפיגמה: מיקום, ציון שנה, בולט, מגמה, הערכה */
  netuneiTableMoamadim: NetuneiTableHashvaa = {
    amudot: [
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
        minWidth: '6rem'
      },
      {
        mafteach: 'shnat2025',
        koteret: '2025',
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
    ],
    shurot: [
      {
        id: 1,
        moamad: {
          tekst: 'רונן כהן',
          color: '#4f46e5',
          moamadId: 1
        },
        mikom: { mikom: 1, miKamut: 3 },
        shnat2025: 9,
        bolet: { isBolet: true, tekst: 'כן' },
        megama: { sug: 'aliya', tekst: 'מגמת עלייה' },
        haarcha: { moamadId: 1 }
      },
      {
        id: 2,
        moamad: {
          tekst: 'ישראל ישראלי',
          color: '#0891b2',
          moamadId: 2
        },
        mikom: { mikom: 2, miKamut: 3 },
        shnat2025: 9,
        bolet: { isBolet: true, tekst: 'כן' },
        megama: { sug: 'yatziv', tekst: 'יציב' },
        haarcha: { moamadId: 2 }
      },
      {
        id: 3,
        moamad: {
          tekst: 'דוד לוי',
          color: '#16a34a',
          moamadId: 3
        },
        mikom: { mikom: 3, miKamut: 3 },
        shnat2025: 8,
        bolet: { isBolet: false, tekst: 'לא' },
        megama: { sug: 'yerida', tekst: 'מגמת ירידה' },
        haarcha: { moamadId: 3 }
      }
    ]
  };

  onSugTatzigGrafChange(sug: SugTatzigGraf): void {
    this.sugTatzigGraf = sug;
  }

  onShinuiBechiratShana(bechirots: Array<string | number>): void {
    this.bechirotsShana = bechirots;
  }

  onShinuiBechiratMidot(bechirots: Array<string | number>): void {
    this.bechirotsMidot = bechirots;
  }
}

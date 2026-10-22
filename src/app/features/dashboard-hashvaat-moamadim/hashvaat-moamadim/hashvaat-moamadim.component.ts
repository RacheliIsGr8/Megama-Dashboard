import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import {
  NetuneiGrafHashvaa,
  PerekAccordionHashvaa,
  SugTatzigGraf
} from '../models/graf-hashvaa.model';
import { MoamadLeHashvaaGrid } from '../models/hashvaat-grid.model';
import { TzadStepper } from '../models/stepper.model';
import { NetuneiTableHashvaa } from '../models/table-hashvaa.model';
import {
  MIDOT_HAARCHOT_TEKUFATIYOT,
  MIDOT_MESHUV_AMITIM,
  MIDOT_MESHUV_KEFIFIM,
  SHANIM_HAARCHOT_BORER
} from '../models/hashvaat-midot.const';
import {
  bniyatGridTemplateColumns,
  bniyatRochavTokhen,
  isKamutLeHashvaaMerukazet
} from '../models/hashvaat-layout.const';
import { EfsharutInputSelect } from '../models/input-select.model';
import { HashvaatMoamadimService } from '../services/hashvaat-moamadim.service';
import {
  bniyatGrafMeMoamadim,
  bniyatTableHaarchotTekufatiyot,
  bniyatTableMeMoamadim
} from '../shared/hashvaat-grid.util';

@Component({
  selector: 'app-hashvaat-moamadim',
  templateUrl: './hashvaat-moamadim.component.html',
  styleUrls: ['./hashvaat-moamadim.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HashvaatMoamadimComponent implements OnInit {

  /** חזרה למסך בחירה — דרך המעטפת, בלי routing */
  @Output() chazaraLebchira = new EventEmitter<void>();

  koteretTafkid = 'מפקד יחידה';
  moamadim: MoamadLeHashvaaGrid[] = [];
  pratimPetuchim: { [id: string]: boolean } = {};
  isTaan = true;
  idTzadPail = 'pratim';

  tzadimStepper: TzadStepper[] = [
    { id: 'pratim', targetId: 'pratim-ishiyim', koteret: 'פרטים אישיים', sugIcon: 'pratim' },
    { id: 'tziyunim', targetId: 'tziyunim', koteret: 'ציונים', sugIcon: 'tziyunim' },
    { id: 'haskala', targetId: 'perek-haskala', koteret: 'השכלה אקדמית', sugIcon: 'haskala' },
    { id: 'hachsharot', targetId: 'perek-hachsharot', koteret: 'הכשרות מקצועיות', sugIcon: 'hachsharot' },
    { id: 'minuyim', targetId: 'perek-minuyim', koteret: 'מינויים קודמים', sugIcon: 'minuyim' },
    { id: 'amitim', targetId: 'perek-meshuv-amitim', koteret: 'משוב עמיתים', sugIcon: 'amitim' },
    { id: 'kefifim', targetId: 'perek-meshuv-kefifim', koteret: 'משוב כפיפים', sugIcon: 'kefifim' },
    { id: 'haarchot', targetId: 'perek-haarchot', koteret: 'הערכות תקופתיות', sugIcon: 'haarchot' }
  ];

  prakim: PerekAccordionHashvaa[] = [
    {
      id: 'haskala',
      koteret: 'השכלה אקדמית',
      sugTochen: 'reshima-amudot',
      mafteachReshima: 'haskalaAcademit',
      isPatuach: true
    },
    {
      id: 'hachsharot',
      koteret: 'הכשרות מקצועיות',
      sugTochen: 'reshima-amudot',
      mafteachReshima: 'hachsharotMiktzoiyot',
      isPatuach: false
    },
    {
      id: 'minuyim',
      koteret: 'מינויים קודמים',
      sugTochen: 'reshima-amudot',
      mafteachReshima: 'minuyimKodmim',
      isPatuach: false
    },
    {
      id: 'meshuv-amitim',
      koteret: 'משוב עמיתים',
      sugTochen: 'hashvaa',
      isEzoreHashvaa: true,
      isPatuach: false
    },
    {
      id: 'meshuv-kefifim',
      koteret: 'משוב כפיפים',
      sugTochen: 'hashvaa',
      isEzoreHashvaa: true,
      isPatuach: false
    },
    {
      id: 'haarchot',
      koteret: 'הערכות תקופתיות (2021–2025)',
      sugTochen: 'hashvaa',
      isEzoreHashvaa: true,
      isPatuach: false
    }
  ];

  netuneiTableLePerek: { [id: string]: NetuneiTableHashvaa } = {};
  netuneiGrafLePerek: { [id: string]: NetuneiGrafHashvaa } = {};
  sugTatzigGraf: SugTatzigGraf = 'kav';

  efsharuyotShana: EfsharutInputSelect[] = [
    { shem: '2025', erech: 2025 },
    { shem: '2024', erech: 2024 },
    { shem: '2023', erech: 2023 }
  ];
  bechirotsShana: Array<string | number> = [2025];

  /** שנה נבחרת בהערכות תקופתיות (בורר כפתורים) */
  shanimHaarchot: number[] = SHANIM_HAARCHOT_BORER.slice();
  shanaHaarchot = 2025;

  efsharuyotMidotLePerek: { [id: string]: EfsharutInputSelect[] } = {
    'meshuv-amitim': MIDOT_MESHUV_AMITIM.map(m => ({ shem: m, erech: m })),
    'meshuv-kefifim': MIDOT_MESHUV_KEFIFIM.map(m => ({ shem: m, erech: m }))
  };
  bechirotsMidotLePerek: { [id: string]: Array<string | number> } = {
    'meshuv-amitim': MIDOT_MESHUV_AMITIM.slice(),
    'meshuv-kefifim': MIDOT_MESHUV_KEFIFIM.slice()
  };

  constructor(
    private hashvaatMoamadimService: HashvaatMoamadimService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    const nivcharim = this.hashvaatMoamadimService.getMoamadimNivcharimLeHashvaa();
    if (!nivcharim || nivcharim.length < 2) {
      // דחייה קלה — מונע ExpressionChanged בזמן *ngIf של ההורה
      setTimeout(() => this.chazaraLebchira.emit(), 0);
      return;
    }

    this.hashvaatMoamadimService.getMoamadimLeHashvaaGrid().subscribe(
      (moamadim: MoamadLeHashvaaGrid[]) => {
        this.moamadim = moamadim || [];
        this.bniyatNetuneiHashvaa();
        this.isTaan = false;
        this.changeDetectorRef.markForCheck();
      }
    );
  }

  onChazaraLebchira(): void {
    this.chazaraLebchira.emit();
  }

  get kamutAmudot(): number {
    return this.moamadim ? this.moamadim.length : 0;
  }

  get gridTemplateColumns(): string {
    return bniyatGridTemplateColumns(this.kamutAmudot);
  }

  /** עד 5 מועמדים — מארז 80% ממורכז כמו בפיגמה */
  get isHashvaaMerukazet(): boolean {
    return isKamutLeHashvaaMerukazet(this.kamutAmudot);
  }

  /** רוחב תוכן פנימי — 100% במצב ממורכז, אחרת רוחב קבוע */
  get gridMinWidth(): string {
    if (this.isHashvaaMerukazet) {
      return '100%';
    }
    return bniyatRochavTokhen(this.kamutAmudot);
  }

  get midotAmitimMesunanim(): string[] {
    return this.sinenMidot(
      MIDOT_MESHUV_AMITIM,
      this.bechirotsMidotLePerek['meshuv-amitim']
    );
  }

  get midotKefifimMesunanim(): string[] {
    return this.sinenMidot(
      MIDOT_MESHUV_KEFIFIM,
      this.bechirotsMidotLePerek['meshuv-kefifim']
    );
  }

  isPratimPatuach(moamad: MoamadLeHashvaaGrid): boolean {
    return !!this.pratimPetuchim[String(moamad.id)];
  }

  onToggelPratim(moamad: MoamadLeHashvaaGrid): void {
    const mafteach = String(moamad.id);
    this.pratimPetuchim = {
      ...this.pratimPetuchim,
      [mafteach]: !this.pratimPetuchim[mafteach]
    };
    this.changeDetectorRef.markForCheck();
  }

  onShinuiSeder(event: CdkDragDrop<MoamadLeHashvaaGrid[]>): void {
    if (!event || event.previousIndex === event.currentIndex) {
      return;
    }
    const meudkan = [...this.moamadim];
    moveItemInArray(meudkan, event.previousIndex, event.currentIndex);
    this.moamadim = meudkan;
    this.bniyatNetuneiHashvaa();
    this.changeDetectorRef.markForCheck();
  }

  onShinuiPerek(prakim: PerekAccordionHashvaa[]): void {
    this.prakim = prakim || [];
    this.changeDetectorRef.markForCheck();
  }

  onSugTatzigGrafChange(sug: SugTatzigGraf): void {
    this.sugTatzigGraf = sug;
    this.changeDetectorRef.markForCheck();
  }

  onShinuiBechiratShana(bechirots: Array<string | number>): void {
    this.bechirotsShana = bechirots || [];
    this.changeDetectorRef.markForCheck();
  }

  onShinuiShanaHaarchot(shana: number): void {
    this.shanaHaarchot = shana || 2025;
    this.bniyatNetuneiHashvaa();
    this.changeDetectorRef.markForCheck();
  }

  onShinuiBechiratMidotMeAccordion(irua: {
    perekId: string;
    bechirots: Array<string | number>;
  }): void {
    if (!irua || !irua.perekId) {
      return;
    }
    this.bechirotsMidotLePerek = {
      ...this.bechirotsMidotLePerek,
      [irua.perekId]: irua.bechirots || []
    };
    this.bniyatNetuneiHashvaa();
    this.changeDetectorRef.markForCheck();
  }

  onBechiratTzad(tzad: TzadStepper): void {
    if (!tzad) {
      return;
    }
    this.idTzadPail = tzad.id;
    this.ptichatPerekImNidrash(tzad);
    this.galelLeTarget(tzad.targetId);
    this.changeDetectorRef.markForCheck();
  }

  onDafMoamad(moamad: MoamadLeHashvaaGrid): void {
    // ייחובר לניווט ל-daf-moamad בהמשך
  }

  onHadpasatDoch(): void {
    // ייחובר להדפסה בהמשך
  }

  trackByMoamadId(index: number, moamad: MoamadLeHashvaaGrid): number {
    if (moamad && moamad.misparTikMamada != null) {
      return moamad.misparTikMamada;
    }
    return moamad && moamad.id != null ? moamad.id : index;
  }

  /** פתיחת פרק אקורדיון אם היעד הוא פרק סגור */
  private ptichatPerekImNidrash(tzad: TzadStepper): void {
    if (!tzad || !tzad.targetId || tzad.targetId.indexOf('perek-') !== 0) {
      return;
    }
    const perekId = tzad.targetId.replace('perek-', '');
    let hishtana = false;
    this.prakim = this.prakim.map(perek => {
      if (String(perek.id) === perekId && !perek.isPatuach) {
        hishtana = true;
        return { ...perek, isPatuach: true };
      }
      return perek;
    });
    if (hishtana) {
      this.changeDetectorRef.markForCheck();
    }
  }

  private galelLeTarget(targetId: string): void {
    if (!targetId) {
      return;
    }
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  }

  private sinenMidot(
    midotMakor: string[],
    bechirots: Array<string | number>
  ): string[] {
    if (!bechirots || bechirots.length === 0) {
      return midotMakor.slice();
    }
    return midotMakor.filter(midda => bechirots.indexOf(midda) > -1);
  }

  private bniyatNetuneiHashvaa(): void {
    const midotAmitim = this.midotAmitimMesunanim;
    const midotKefifim = this.midotKefifimMesunanim;

    this.netuneiTableLePerek = {
      'meshuv-amitim': bniyatTableMeMoamadim(
        this.moamadim,
        midotAmitim,
        moamad => moamad.tziyuneiMeshuvAmitim
      ),
      'meshuv-kefifim': bniyatTableMeMoamadim(
        this.moamadim,
        midotKefifim,
        moamad => moamad.tziyuneiMeshuvKefifim
      ),
      haarchot: bniyatTableHaarchotTekufatiyot(
        this.moamadim,
        this.shanaHaarchot
      )
    };

    this.netuneiGrafLePerek = {
      'meshuv-amitim': bniyatGrafMeMoamadim(
        this.moamadim,
        midotAmitim,
        moamad => moamad.tziyuneiMeshuvAmitim
      ),
      'meshuv-kefifim': bniyatGrafMeMoamadim(
        this.moamadim,
        midotKefifim,
        moamad => moamad.tziyuneiMeshuvKefifim
      ),
      haarchot: bniyatGrafMeMoamadim(
        this.moamadim,
        MIDOT_HAARCHOT_TEKUFATIYOT,
        moamad => moamad.tziyuneiHaarchotTekufatiyot,
        0,
        100
      )
    };
  }
}

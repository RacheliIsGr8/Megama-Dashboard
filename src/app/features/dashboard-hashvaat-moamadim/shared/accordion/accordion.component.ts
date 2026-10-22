import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {
  NetuneiGrafHashvaa,
  PerekAccordionHashvaa,
  SugTatzigGraf
} from '../../models/graf-hashvaa.model';
import { MoamadLeHashvaaGrid } from '../../models/hashvaat-grid.model';
import { EfsharutInputSelect } from '../../models/input-select.model';
import {
  IruaLichitzaTable,
  NetuneiTableHashvaa
} from '../../models/table-hashvaa.model';

/**
 * מעטפת אקורדיון השוואה —
 * פתיחה/סגירה; תוכן לפי sugTochen בקומפוננטות ייעודיות.
 */
@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionComponent {

  @Input() prakim: PerekAccordionHashvaa[] = [];
  @Input() moamadim: MoamadLeHashvaaGrid[] = [];
  @Input() netuneiTable: NetuneiTableHashvaa = { amudot: [], shurot: [] };
  @Input() netuneiGraf: NetuneiGrafHashvaa = { toviyot: [], sidrot: [] };
  @Input() netuneiTableLePerek: { [id: string]: NetuneiTableHashvaa } = {};
  @Input() netuneiGrafLePerek: { [id: string]: NetuneiGrafHashvaa } = {};
  @Input() sugTatzigGraf: SugTatzigGraf = 'kav';
  @Input() govaGraf = '18rem';
  @Input() gridTemplateColumns = '';
  @Input() gridMinWidth = '';

  @Input() efsharuyotShana: EfsharutInputSelect[] = [];
  @Input() bechirotsShana: Array<string | number> = [];
  @Input() efsharuyotMidotLePerek: { [id: string]: EfsharutInputSelect[] } = {};
  @Input() bechirotsMidotLePerek: { [id: string]: Array<string | number> } = {};
  @Input() shanimHaarchot: number[] = [];
  @Input() shanaHaarchot = 2025;

  @Output() sugTatzigGrafChange = new EventEmitter<SugTatzigGraf>();
  @Output() shinuiBechiratShana = new EventEmitter<Array<string | number>>();
  @Output() shinuiBechiratMidot = new EventEmitter<{
    perekId: string;
    bechirots: Array<string | number>;
  }>();
  @Output() shinuiShanaHaarchot = new EventEmitter<number>();
  @Output() tzfiaMoamad = new EventEmitter<IruaLichitzaTable>();
  @Output() peulatHaarcha = new EventEmitter<IruaLichitzaTable>();
  @Output() lichitzatTa = new EventEmitter<IruaLichitzaTable>();
  @Output() shinuiPerek = new EventEmitter<PerekAccordionHashvaa[]>();

  onToggelPerek(perek: PerekAccordionHashvaa): void {
    if (!perek) {
      return;
    }

    this.prakim = this.prakim.map(item => {
      if (item === perek || (item.id !== undefined && item.id === perek.id)) {
        return { ...item, isPatuach: !item.isPatuach };
      }
      return item;
    });

    this.shinuiPerek.emit(this.prakim);
  }

  onSugTatzigGrafChange(sug: SugTatzigGraf): void {
    this.sugTatzigGraf = sug;
    this.sugTatzigGrafChange.emit(sug);
  }

  onShinuiBechiratShana(bechirots: Array<string | number>): void {
    this.shinuiBechiratShana.emit(bechirots || []);
  }

  onShinuiBechiratMidot(
    perek: PerekAccordionHashvaa,
    bechirots: Array<string | number>
  ): void {
    this.shinuiBechiratMidot.emit({
      perekId: this.getMafteachPerek(perek),
      bechirots: bechirots || []
    });
  }

  onTzfiaMoamad(irua: IruaLichitzaTable): void {
    this.tzfiaMoamad.emit(irua);
  }

  onPeulatHaarcha(irua: IruaLichitzaTable): void {
    this.peulatHaarcha.emit(irua);
  }

  onLichitzatTa(irua: IruaLichitzaTable): void {
    this.lichitzatTa.emit(irua);
  }

  isPatuach(perek: PerekAccordionHashvaa): boolean {
    return !!(perek && perek.isPatuach);
  }

  isReshimaAmudot(perek: PerekAccordionHashvaa): boolean {
    return !!(perek && perek.sugTochen === 'reshima-amudot');
  }

  isEzorHashvaa(perek: PerekAccordionHashvaa): boolean {
    if (!perek) {
      return false;
    }
    return perek.sugTochen === 'hashvaa' || !!perek.isEzoreHashvaa;
  }

  isTekst(perek: PerekAccordionHashvaa): boolean {
    if (!perek || !perek.tochen) {
      return false;
    }
    return !this.isReshimaAmudot(perek) && !this.isEzorHashvaa(perek);
  }

  /** סינונים רק למשובים — לא להערכות תקופתיות */
  isMazigSinunim(perek: PerekAccordionHashvaa): boolean {
    const id = this.getMafteachPerek(perek);
    return id === 'meshuv-amitim' || id === 'meshuv-kefifim';
  }

  isHaarchotTekufatiyot(perek: PerekAccordionHashvaa): boolean {
    return this.getMafteachPerek(perek) === 'haarchot';
  }

  isMazigBorerTatzig(perek: PerekAccordionHashvaa): boolean {
    return this.isMazigSinunim(perek);
  }

  onShinuiShanaHaarchot(shana: number): void {
    this.shinuiShanaHaarchot.emit(shana);
  }

  getEfsharuyotMidot(perek: PerekAccordionHashvaa): EfsharutInputSelect[] {
    const id = this.getMafteachPerek(perek);
    return (this.efsharuyotMidotLePerek && this.efsharuyotMidotLePerek[id]) || [];
  }

  getBechirotsMidot(perek: PerekAccordionHashvaa): Array<string | number> {
    const id = this.getMafteachPerek(perek);
    return (this.bechirotsMidotLePerek && this.bechirotsMidotLePerek[id]) || [];
  }

  getNetuneiTableLePerek(perek: PerekAccordionHashvaa): NetuneiTableHashvaa {
    const mafteach = this.getMafteachPerek(perek);
    if (mafteach && this.netuneiTableLePerek && this.netuneiTableLePerek[mafteach]) {
      return this.netuneiTableLePerek[mafteach];
    }
    return this.netuneiTable;
  }

  getNetuneiGrafLePerek(perek: PerekAccordionHashvaa): NetuneiGrafHashvaa {
    const mafteach = this.getMafteachPerek(perek);
    if (mafteach && this.netuneiGrafLePerek && this.netuneiGrafLePerek[mafteach]) {
      return this.netuneiGrafLePerek[mafteach];
    }
    return this.netuneiGraf;
  }

  getPerekDomId(perek: PerekAccordionHashvaa): string {
    if (perek && perek.id !== undefined && perek.id !== null) {
      return 'perek-' + String(perek.id);
    }
    return 'perek-' + (perek && perek.koteret ? perek.koteret : 'unknown');
  }

  trackByPerek(index: number, perek: PerekAccordionHashvaa): string | number {
    if (perek && perek.id !== undefined && perek.id !== null) {
      return perek.id;
    }
    return perek && perek.koteret ? perek.koteret : index;
  }

  private getMafteachPerek(perek: PerekAccordionHashvaa): string {
    if (!perek) {
      return '';
    }
    if (perek.id !== undefined && perek.id !== null) {
      return String(perek.id);
    }
    return perek.koteret || '';
  }
}

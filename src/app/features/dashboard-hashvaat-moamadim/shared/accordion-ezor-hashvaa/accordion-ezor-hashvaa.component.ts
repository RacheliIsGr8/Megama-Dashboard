import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import {
  NetuneiGrafHashvaa,
  SugTatzigGraf
} from '../../models/graf-hashvaa.model';
import { EfsharutInputSelect } from '../../models/input-select.model';
import {
  IruaLichitzaTable,
  NetuneiTableHashvaa
} from '../../models/table-hashvaa.model';

/**
 * תוכן אקורדיון השוואה —
 * משובים: סינונים + בורר קו/עמודות.
 * הערכות תקופתיות: בורר שנים (כפתורים) + טבלה מועמדים + גרף קו.
 */
@Component({
  selector: 'app-accordion-ezor-hashvaa',
  templateUrl: './accordion-ezor-hashvaa.component.html',
  styleUrls: ['./accordion-ezor-hashvaa.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionEzorHashvaaComponent {

  @Input() netuneiTable: NetuneiTableHashvaa = { amudot: [], shurot: [] };
  @Input() netuneiGraf: NetuneiGrafHashvaa = { toviyot: [], sidrot: [] };
  @Input() sugTatzigGraf: SugTatzigGraf = 'kav';
  @Input() govaGraf = '18rem';
  @Input() mazigSinunim = true;
  /** בורר קו/עמודות — מוסתר בהערכות תקופתיות */
  @Input() mazigBorerTatzig = true;
  /** בורר שנים ככפתורים — להערכות תקופתיות */
  @Input() mazigBorerShanim = false;
  @Input() shanimBorer: number[] = [];
  @Input() shanaNivcheret: number = 2025;

  @Input() efsharuyotShana: EfsharutInputSelect[] = [];
  @Input() bechirotsShana: Array<string | number> = [];
  @Input() efsharuyotMidot: EfsharutInputSelect[] = [];
  @Input() bechirotsMidot: Array<string | number> = [];

  @Output() sugTatzigGrafChange = new EventEmitter<SugTatzigGraf>();
  @Output() shinuiBechiratShana = new EventEmitter<Array<string | number>>();
  @Output() shinuiBechiratMidot = new EventEmitter<Array<string | number>>();
  @Output() shinuiShanaHaarchot = new EventEmitter<number>();
  @Output() tzfiaMoamad = new EventEmitter<IruaLichitzaTable>();
  @Output() peulatHaarcha = new EventEmitter<IruaLichitzaTable>();
  @Output() lichitzatTa = new EventEmitter<IruaLichitzaTable>();

  get sugTatzigLeHatzaa(): SugTatzigGraf {
    if (!this.mazigBorerTatzig) {
      return 'kav';
    }
    return this.sugTatzigGraf;
  }

  onBechiratTatzig(sug: SugTatzigGraf): void {
    if (this.sugTatzigGraf === sug) {
      return;
    }
    this.sugTatzigGraf = sug;
    this.sugTatzigGrafChange.emit(sug);
  }

  onBechiratShanaPilla(shana: number): void {
    if (shana === this.shanaNivcheret) {
      return;
    }
    this.shanaNivcheret = shana;
    this.shinuiShanaHaarchot.emit(shana);
  }

  onShinuiBechiratShana(bechirots: Array<string | number>): void {
    this.shinuiBechiratShana.emit(bechirots || []);
  }

  onShinuiBechiratMidot(bechirots: Array<string | number>): void {
    this.shinuiBechiratMidot.emit(bechirots || []);
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

  trackByShana(index: number, shana: number): number {
    return shana;
  }
}

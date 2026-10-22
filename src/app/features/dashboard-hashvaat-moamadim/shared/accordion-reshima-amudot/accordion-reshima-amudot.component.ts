import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

import {
  MoamadLeHashvaaGrid,
  PratReshimaHashvaa
} from '../../models/hashvaat-grid.model';
import {
  bniyatGridMinWidth,
  bniyatGridTemplateColumns
} from '../../models/hashvaat-layout.const';
import { getReshimaMeMoamad } from '../hashvaat-grid.util';

/**
 * תוכן אקורדיון מסוג רשימות מקבילות —
 * השכלה / הכשרות / מינויים לפי סדר המועמדים.
 */
@Component({
  selector: 'app-accordion-reshima-amudot',
  templateUrl: './accordion-reshima-amudot.component.html',
  styleUrls: ['./accordion-reshima-amudot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionReshimaAmudotComponent {

  @Input() moamadim: MoamadLeHashvaaGrid[] = [];
  @Input() mafteachReshima = '';
  /** תבנית עמודות מהמסך הראשי — ליישור עם כותרות המועמדים */
  @Input() gridTemplateColumns = '';
  @Input() gridMinWidth = '';

  get templateAmudot(): string {
    if (this.gridTemplateColumns) {
      return this.gridTemplateColumns;
    }
    return bniyatGridTemplateColumns(this.moamadim ? this.moamadim.length : 0);
  }

  get minWidthGrid(): string {
    if (this.gridMinWidth) {
      return this.gridMinWidth;
    }
    return bniyatGridMinWidth(this.moamadim ? this.moamadim.length : 0);
  }

  getReshima(moamad: MoamadLeHashvaaGrid): PratReshimaHashvaa[] {
    return getReshimaMeMoamad(moamad, this.mafteachReshima);
  }

  shemLeTatzig(shemMale: string): string {
    if (!shemMale) {
      return '';
    }
    const chalakim = shemMale.trim().split(/\s+/);
    if (chalakim.length >= 3) {
      return chalakim.slice(1).join(' ');
    }
    return shemMale;
  }

  trackByMoamadId(index: number, moamad: MoamadLeHashvaaGrid): number {
    if (moamad && moamad.misparTikMamada != null) {
      return moamad.misparTikMamada;
    }
    return moamad && moamad.id != null ? moamad.id : index;
  }

  trackByReshima(index: number, prat: PratReshimaHashvaa): string | number {
    return prat && prat.tekst ? prat.tekst + String(prat.shana || '') : index;
  }
}

import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { MoamadLeHashvaa } from '../models/moamad-le-hashvaa.model';

@Component({
  selector: 'app-bchirat-moamadim',
  templateUrl: './bchirat-moamadim.component.html',
  styleUrls: ['./bchirat-moamadim.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BchiratMoamadimComponent {

  @Input() moamadim: MoamadLeHashvaa[] = [];
  @Input() moamadimNivcharim: MoamadLeHashvaa[] = [];

  @Output() toggelMoamad = new EventEmitter<MoamadLeHashvaa>();
  @Output() tzfiaBodedet = new EventEmitter<MoamadLeHashvaa>();

  get kamutMoamadim(): number {
    return this.moamadim ? this.moamadim.length : 0;
  }

  isMoamadNivchar(moamad: MoamadLeHashvaa): boolean {
    return !!this.getMoamadNivchar(moamad);
  }

  getColorLeMoamad(moamad: MoamadLeHashvaa): string {
    const nivchar = this.getMoamadNivchar(moamad);
    return nivchar && nivchar.colorLeMoamad ? nivchar.colorLeMoamad : '';
  }

  onToggelMoamad(moamad: MoamadLeHashvaa): void {
    this.toggelMoamad.emit(moamad);
  }

  onTzfiaBodedet(moamad: MoamadLeHashvaa): void {
    this.tzfiaBodedet.emit(moamad);
  }

  trackByMoamadId(index: number, moamad: MoamadLeHashvaa): number {
    if (moamad && moamad.misparTikMamada != null) {
      return moamad.misparTikMamada;
    }
    return moamad && moamad.id != null ? moamad.id : index;
  }

  private getMoamadNivchar(moamad: MoamadLeHashvaa): MoamadLeHashvaa | null {
    if (!this.moamadimNivcharim || !moamad) {
      return null;
    }
    return this.moamadimNivcharim.find(
      item =>
        Number(item.misparTikMamada) === Number(moamad.misparTikMamada)
    ) || null;
  }
}

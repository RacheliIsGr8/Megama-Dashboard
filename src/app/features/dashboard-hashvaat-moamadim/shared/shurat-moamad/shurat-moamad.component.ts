import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { MoamadLeHashvaa } from '../../models/moamad-le-hashvaa.model';

@Component({
  selector: 'app-shurat-moamad',
  templateUrl: './shurat-moamad.component.html',
  styleUrls: ['./shurat-moamad.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShuratMoamadComponent {

  @Input() moamad: MoamadLeHashvaa;
  @Input() isNivchar = false;
  @Input() colorLeMoamad = '';

  @Output() toggelBechira = new EventEmitter<MoamadLeHashvaa>();
  @Output() tzfiaBodedet = new EventEmitter<MoamadLeHashvaa>();

  onToggelBechira(): void {
    this.toggelBechira.emit(this.moamad);
  }

  onTzfiaBodedet(): void {
    this.tzfiaBodedet.emit(this.moamad);
  }
}

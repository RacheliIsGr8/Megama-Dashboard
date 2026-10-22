import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { SinunMoamadim } from '../../models/moamad-le-hashvaa.model';

@Component({
  selector: 'app-pakad-itur-megama',
  templateUrl: './pakad-itur-megama.component.html',
  styleUrls: ['./pakad-itur-megama.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PakadIturMegamaComponent {

  @Input() sinun: SinunMoamadim = { milatChinush: '' };

  @Output() sinunChange = new EventEmitter<SinunMoamadim>();
  @Output() milatChinushChange = new EventEmitter<string>();

  get milatChinush(): string {
    return this.sinun && this.sinun.milatChinush ? this.sinun.milatChinush : '';
  }

  onMilatChinushInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const milatChinush = target ? target.value : '';
    const sinunMeudkan: SinunMoamadim = { milatChinush };

    this.milatChinushChange.emit(milatChinush);
    this.sinunChange.emit(sinunMeudkan);
  }
}

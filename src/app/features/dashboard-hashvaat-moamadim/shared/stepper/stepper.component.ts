import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { TzadStepper } from '../../models/stepper.model';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperComponent {

  @Input() tzadim: TzadStepper[] = [];
  @Input() idPail = '';

  @Output() bechiratTzad = new EventEmitter<TzadStepper>();

  onBechiratTzad(tzad: TzadStepper): void {
    if (!tzad) {
      return;
    }
    this.bechiratTzad.emit(tzad);
  }

  isPail(tzad: TzadStepper): boolean {
    return !!(tzad && this.idPail && tzad.id === this.idPail);
  }

  trackByTzad(index: number, tzad: TzadStepper): string {
    return tzad && tzad.id ? tzad.id : String(index);
  }
}

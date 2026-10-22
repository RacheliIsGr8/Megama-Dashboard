import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { MoamadLeHashvaa } from '../../models/moamad-le-hashvaa.model';

@Component({
  selector: 'nivchru-le-hashvaa',
  templateUrl: './nivchru-le-hashvaa.component.html',
  styleUrls: ['./nivchru-le-hashvaa.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NivchruLeHashvaaComponent {

  @Input() moamadimNivcharim: MoamadLeHashvaa[] = [];
  @Input() minKamutLeHashvaa = 2;

  @Output() hasaratMoamad = new EventEmitter<MoamadLeHashvaa>();
  @Output() shinuiSeder = new EventEmitter<MoamadLeHashvaa[]>();
  @Output() hatchalatHashvaa = new EventEmitter<void>();

  get kamutNivcharim(): number {
    return this.moamadimNivcharim ? this.moamadimNivcharim.length : 0;
  }

  get canHatchilHashvaa(): boolean {
    return this.kamutNivcharim >= this.minKamutLeHashvaa;
  }

  onHasaratMoamad(moamad: MoamadLeHashvaa): void {
    this.hasaratMoamad.emit(moamad);
  }

  onShinuiSeder(event: CdkDragDrop<MoamadLeHashvaa[]>): void {
    const moamadimMeudkanim = [...this.moamadimNivcharim];
    moveItemInArray(moamadimMeudkanim, event.previousIndex, event.currentIndex);
    this.shinuiSeder.emit(moamadimMeudkanim);
  }

  onHatchalatHashvaa(): void {
    if (this.canHatchilHashvaa) {
      this.hatchalatHashvaa.emit();
    }
  }
}

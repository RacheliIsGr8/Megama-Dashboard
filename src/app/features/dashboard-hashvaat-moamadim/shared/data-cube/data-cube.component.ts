import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { SadehPratimHashvaa } from '../../models/hashvaat-grid.model';

@Component({
  selector: 'app-data-cube',
  templateUrl: './data-cube.component.html',
  styleUrls: ['./data-cube.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataCubeComponent {

  @Input() pratimIkarim: SadehPratimHashvaa[] = [];
  @Input() pratimNosafim: SadehPratimHashvaa[] = [];
  @Input() isPatuach = false;

  @Output() toggelPratim = new EventEmitter<void>();

  onToggelPratim(): void {
    this.toggelPratim.emit();
  }

  trackByShem(index: number, sadeh: SadehPratimHashvaa): string {
    return sadeh && sadeh.shemSadeh ? sadeh.shemSadeh : String(index);
  }
}

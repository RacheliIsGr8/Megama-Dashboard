import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-moamd-data-header',
  templateUrl: './moamd-data-header.component.html',
  styleUrls: ['./moamd-data-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoamdDataHeaderComponent {

  @Input() shemMale = '';
  @Input() gil: number | null = null;
  @Input() urlTmuna = '';
  @Input() colorLeMoamad = '#4f46e5';
  @Input() isMazigDrag = true;

  @Output() lichitzaDafMoamad = new EventEmitter<void>();

  nekudotDrag = [1, 2, 3, 4, 5, 6];

  onLichitzaDafMoamad(): void {
    this.lichitzaDafMoamad.emit();
  }
}

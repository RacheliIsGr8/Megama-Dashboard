import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';

import {
  EfsharutInputSelect,
  SugIconInputSelect
} from '../../models/input-select.model';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputSelectComponent {

  /** תווית בכפתור (למשל "שנה" / "מימדים") */
  @Input() koteret = '';

  /** רשימת האפשרויות */
  @Input() efsharuyot: EfsharutInputSelect[] = [];

  /** בחירות נוכחיות (ערכים) */
  @Input() bechirots: Array<string | number> = [];

  /** טקסט פעולת בחירת הכל / הצג הכל */
  @Input() tekstBecharHakol = 'בחר הכל';

  /** טקסט כשכל האפשרויות נבחרו — פעולת ביטול */
  @Input() tekstBitulHakol = 'בטל הכל';

  /** טקסט בתווית כשנבחרו כל האפשרויות (למשל "כל השנים") */
  @Input() tekstKolHaEfsharuyot = 'כל השנים';

  /** כותרת אופציונלית בפאנל (למשל "בחר מימדים") */
  @Input() koteretPanel = '';

  /** האם להציג ערך ליד התווית — "שנה: 2025" */
  @Input() isMazigErech = true;

  /** אייקון פילטר ליד התווית */
  @Input() sugIcon: SugIconInputSelect = 'none';

  /** עדכון בחירות החוצה */
  @Output() shinuiBechira = new EventEmitter<Array<string | number>>();

  isPatuach = false;

  constructor(
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  @HostListener('document:click', ['$event'])
  onLichitzatMismah(event: MouseEvent): void {
    if (!this.isPatuach) {
      return;
    }
    const target = event.target as Node;
    if (this.elementRef.nativeElement.contains(target)) {
      return;
    }
    this.isPatuach = false;
    this.changeDetectorRef.markForCheck();
  }

  /**
   * תצוגת ערך בכפתור:
   * - הכל נבחר → "כל השנים"
   * - כמה נבחרו → "2021, 2022, 2025"
   * - אחד → "2025"
   */
  get tekstitErech(): string {
    if (!this.bechirots || this.bechirots.length === 0) {
      return '';
    }

    if (this.isBecharHakolPail) {
      return this.tekstKolHaEfsharuyot;
    }

    const shemot: string[] = [];
    const reshima = this.efsharuyot || [];
    for (let i = 0; i < reshima.length; i++) {
      const efsharut = reshima[i];
      if (this.isNivchar(efsharut.erech)) {
        shemot.push(efsharut.shem);
      }
    }

    if (shemot.length === 0) {
      return '';
    }

    return shemot.join(', ');
  }

  get isBecharHakolPail(): boolean {
    const kamut = (this.efsharuyot || []).length;
    if (kamut === 0) {
      return false;
    }
    return (this.bechirots || []).length === kamut;
  }

  get tekstPeulatHakol(): string {
    return this.isBecharHakolPail ? this.tekstBitulHakol : this.tekstBecharHakol;
  }

  onToggelPanel(): void {
    this.isPatuach = !this.isPatuach;
  }

  onBecharHakol(): void {
    if (this.isBecharHakolPail) {
      this.emmitBechira([]);
      return;
    }
    const kol = (this.efsharuyot || []).map(item => item.erech);
    this.emmitBechira(kol);
  }

  onToggelEfsharut(efsharut: EfsharutInputSelect): void {
    if (!efsharut) {
      return;
    }

    const kayam = this.isNivchar(efsharut.erech);
    let chadash: Array<string | number>;

    if (kayam) {
      chadash = (this.bechirots || []).filter(item => item !== efsharut.erech);
    } else {
      chadash = [...(this.bechirots || []), efsharut.erech];
    }

    this.emmitBechira(chadash);
  }

  isNivchar(erech: string | number): boolean {
    return (this.bechirots || []).indexOf(erech) > -1;
  }

  trackByErech(index: number, efsharut: EfsharutInputSelect): string | number {
    return efsharut && efsharut.erech !== undefined && efsharut.erech !== null
      ? efsharut.erech
      : index;
  }

  private matzaEfsharut(erech: string | number): EfsharutInputSelect | undefined {
    return (this.efsharuyot || []).find(item => item.erech === erech);
  }

  private emmitBechira(bechirots: Array<string | number>): void {
    this.bechirots = bechirots;
    this.shinuiBechira.emit(bechirots);
    this.changeDetectorRef.markForCheck();
  }
}

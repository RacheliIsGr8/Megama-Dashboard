import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  SimpleChanges,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Chart, registerables } from 'chart.js';

import {
  NetuneiGrafHashvaa,
  SidratGrafHashvaa
} from '../../models/graf-hashvaa.model';
import {
  bniyatDatasetsAmudot,
  bniyatOptionsAmudot,
  cheshivMinWidthGraf,
  isTziyurLeMidot,
  pluginPasHaaraAmudot
} from '../graf-hashvaa.util';

Chart.register(...registerables);

export interface MiddaLeMafteach {
  mispar: number;
  shem: string;
  color?: string;
}

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnChartComponent implements AfterViewInit, OnChanges, OnDestroy {

  /** סדרות מועמדים — כל מועמד עם צבע עמודות משלו */
  @Input() moamadim: SidratGrafHashvaa[] = [];
  /** תוויות ציר X (מימדים / מדדים) */
  @Input() midot: string[] = [];
  /** נתונים מאוחדים (עדיפות על moamadim/midot אם מלאים) */
  @Input() netuneiGraf: NetuneiGrafHashvaa | null = null;
  @Input() erechMin: number | null = null;
  @Input() erechMax: number | null = null;
  @Input() govaGraf = '17.5rem';

  @ViewChild('canvasGraf', { static: false }) canvasGraf: ElementRef<HTMLCanvasElement>;

  minWidthGraf = '22rem';
  sidrotLeMafteach: SidratGrafHashvaa[] = [];
  midotLeMafteach: MiddaLeMafteach[] = [];
  isTziyurLeMidot = false;

  private chart: any = null;
  private isViewReady = false;

  ngAfterViewInit(): void {
    this.isViewReady = true;
    this.tziyurGraf();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['moamadim']
      || changes['midot']
      || changes['netuneiGraf']
      || changes['erechMin']
      || changes['erechMax']
      || changes['govaGraf']
    ) {
      this.adkenMafteachim();
      const netunim = this.getNetunimMeuhadim();
      this.minWidthGraf = cheshivMinWidthGraf(netunim);
      if (this.isViewReady) {
        this.tziyurGraf();
      }
    }
  }

  ngOnDestroy(): void {
    this.harosGraf();
  }

  private adkenMafteachim(): void {
    const netunim = this.getNetunimMeuhadim();
    this.isTziyurLeMidot = isTziyurLeMidot(netunim);
    this.sidrotLeMafteach = this.isTziyurLeMidot ? [] : (netunim.sidrot || []);
    this.midotLeMafteach = this.bniyatMidotLeMafteach(netunim);
  }

  private bniyatMidotLeMafteach(netunim: NetuneiGrafHashvaa): MiddaLeMafteach[] {
    const toviyot = netunim.toviyot || [];
    const colors = netunim.colorsLeMidot || [];
    const midot: MiddaLeMafteach[] = [];
    for (let i = 0; i < toviyot.length; i++) {
      midot.push({
        mispar: i + 1,
        shem: toviyot[i],
        color: colors[i] || undefined
      });
    }
    return midot;
  }

  private getNetunimMeuhadim(): NetuneiGrafHashvaa {
    if (
      this.netuneiGraf
      && (
        (this.netuneiGraf.sidrot && this.netuneiGraf.sidrot.length > 0)
        || (this.netuneiGraf.toviyot && this.netuneiGraf.toviyot.length > 0)
      )
    ) {
      return {
        toviyot: this.netuneiGraf.toviyot || [],
        sidrot: this.netuneiGraf.sidrot || [],
        colorsLeMidot: this.netuneiGraf.colorsLeMidot,
        erechMin: typeof this.netuneiGraf.erechMin === 'number'
          ? this.netuneiGraf.erechMin
          : (this.erechMin !== null ? this.erechMin : undefined),
        erechMax: typeof this.netuneiGraf.erechMax === 'number'
          ? this.netuneiGraf.erechMax
          : (this.erechMax !== null ? this.erechMax : undefined)
      };
    }

    return {
      toviyot: this.midot || [],
      sidrot: this.moamadim || [],
      erechMin: this.erechMin !== null ? this.erechMin : undefined,
      erechMax: this.erechMax !== null ? this.erechMax : undefined
    };
  }

  /** תוויות מספריות כמו בפיגמה (1..N) */
  private getToviyotLeTziyur(netunim: NetuneiGrafHashvaa): string[] {
    const kamut = (netunim.toviyot && netunim.toviyot.length)
      ? netunim.toviyot.length
      : (netunim.sidrot[0] && netunim.sidrot[0].erachim
        ? netunim.sidrot[0].erachim.length
        : 0);

    const toviyot: string[] = [];
    for (let i = 0; i < kamut; i++) {
      toviyot.push(String(i + 1));
    }
    return toviyot;
  }

  private tziyurGraf(): void {
    if (!this.canvasGraf || !this.canvasGraf.nativeElement) {
      return;
    }

    this.harosGraf();
    this.adkenMafteachim();

    const netunim = this.getNetunimMeuhadim();
    const toviyot = this.getToviyotLeTziyur(netunim);
    this.minWidthGraf = cheshivMinWidthGraf({
      ...netunim,
      toviyot
    });

    const ctx = this.canvasGraf.nativeElement.getContext('2d');
    if (!ctx) {
      return;
    }

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: toviyot,
        datasets: bniyatDatasetsAmudot(netunim)
      },
      options: bniyatOptionsAmudot(netunim),
      plugins: [pluginPasHaaraAmudot]
    });
  }

  private harosGraf(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
}

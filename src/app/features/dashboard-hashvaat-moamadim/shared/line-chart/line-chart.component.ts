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
  bniyatDatasetsKav,
  bniyatOptionsGraf,
  cheshivMinWidthGraf
} from '../graf-hashvaa.util';

Chart.register(...registerables);

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineChartComponent implements AfterViewInit, OnChanges, OnDestroy {

  @Input() moamadim: SidratGrafHashvaa[] = [];
  @Input() midot: string[] = [];
  @Input() netuneiGraf: NetuneiGrafHashvaa | null = null;
  @Input() erechMin: number | null = null;
  @Input() erechMax: number | null = null;
  @Input() govaGraf = '17.5rem';

  @ViewChild('canvasGraf', { static: false }) canvasGraf: ElementRef<HTMLCanvasElement>;

  minWidthGraf = '22rem';
  sidrotLeMafteach: SidratGrafHashvaa[] = [];

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
      this.adkenSidrotLeMafteach();
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

  private adkenSidrotLeMafteach(): void {
    this.sidrotLeMafteach = this.getNetunimMeuhadim().sidrot || [];
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
    this.adkenSidrotLeMafteach();

    const netunim = this.getNetunimMeuhadim();
    this.minWidthGraf = cheshivMinWidthGraf({
      ...netunim,
      toviyot: this.getToviyotLeTziyur(netunim)
    });

    const ctx = this.canvasGraf.nativeElement.getContext('2d');
    if (!ctx) {
      return;
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.getToviyotLeTziyur(netunim),
        datasets: bniyatDatasetsKav(netunim)
      },
      options: bniyatOptionsGraf(netunim, 'kav')
    });
  }

  private harosGraf(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
}

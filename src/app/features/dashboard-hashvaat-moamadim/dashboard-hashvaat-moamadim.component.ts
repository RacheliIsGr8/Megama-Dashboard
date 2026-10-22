import { Component, OnInit } from '@angular/core';

import { MoamadLeHashvaa, SinunMoamadim } from './models/moamad-le-hashvaa.model';
import { SugMasachHashvaa } from './models/masach-hashvaa.model';
import { HashvaatMoamadimService } from './services/hashvaat-moamadim.service';

/** סדר צבעים כמו בפיגמה (badge מספר מועמד) */
const COLORS_LE_MOAMAD: string[] = [
  '#4f46e5', // 1 indigo-600
  '#0891b2', // 2 cyan-600
  '#16a34a', // 3 green-600
  '#ea580c', // 4 orange-600
  '#db2777', // 5 pink-600
  '#7c3aed', // 6 violet-600
  '#0d9488', // 7 teal-600
  '#b45309'  // 8 amber-700
];

/**
 * מעטפת הפיצ'ר — מחליפה בין מסכים בסלקטורים (*ngSwitch),
 * בלי Angular Router (המערכת הסגורה לא תומכת ב-routing).
 */
@Component({
  selector: 'app-dashboard-hashvaat-moamadim',
  templateUrl: './dashboard-hashvaat-moamadim.component.html',
  styleUrls: ['./dashboard-hashvaat-moamadim.component.scss']
})
export class DashboardHashvaatMoamadimComponent implements OnInit {

  /** איזה סלקטור מוצג כרגע — בלי שינוי URL */
  masachPail: SugMasachHashvaa = 'bchira';

  moamadim: MoamadLeHashvaa[] = [];
  moamadimNivcharim: MoamadLeHashvaa[] = [];
  sinun: SinunMoamadim = { milatChinush: '' };
  minKamutLeHashvaa = 2;

  constructor(
    private hashvaatMoamadimService: HashvaatMoamadimService
  ) {
  }

  ngOnInit(): void {
    this.hashvaatMoamadimService.getAllMoamadimForHashvaa().subscribe(moamadim => {
      this.moamadim = moamadim;
    });
  }

  get isMasachBchira(): boolean {
    return this.masachPail === 'bchira';
  }

  get isMasachHashvaa(): boolean {
    return this.masachPail === 'hashvaa';
  }

  get isMasachBdikatRechivim(): boolean {
    return this.masachPail === 'bdikat-rechivim';
  }

  get moamadimMesunanim(): MoamadLeHashvaa[] {
    const milat = this.sinun && this.sinun.milatChinush
      ? this.sinun.milatChinush.trim().toLowerCase()
      : '';

    if (!milat) {
      return this.moamadim;
    }

    return this.moamadim.filter(moamad => {
      const shemMale = (moamad.shemMale || '').toLowerCase();
      const teudatZehut = (moamad.teudatZehut || '').toLowerCase();
      const misparIshi = (moamad.misparIshi || '').toLowerCase();
      return shemMale.indexOf(milat) > -1
        || teudatZehut.indexOf(milat) > -1
        || misparIshi.indexOf(milat) > -1;
    });
  }

  onSinunChange(sinun: SinunMoamadim): void {
    this.sinun = sinun ? { ...sinun } : { milatChinush: '' };
  }

  onToggelMoamad(moamad: MoamadLeHashvaa): void {
    const tik = Number(moamad.misparTikMamada);
    const indexKayam = this.moamadimNivcharim.findIndex(
      item => Number(item.misparTikMamada) === tik
    );

    if (indexKayam > -1) {
      this.moamadimNivcharim = this.moamadimNivcharim.filter(
        item => Number(item.misparTikMamada) !== tik
      );
      return;
    }

    this.moamadimNivcharim = [
      ...this.moamadimNivcharim,
      { ...moamad, colorLeMoamad: this.getColorPanoi() }
    ];
  }

  onHasaratMoamad(moamad: MoamadLeHashvaa): void {
    const tik = Number(moamad.misparTikMamada);
    this.moamadimNivcharim = this.moamadimNivcharim.filter(
      item => Number(item.misparTikMamada) !== tik
    );
  }

  onShinuiSeder(moamadimMeudkanim: MoamadLeHashvaa[]): void {
    this.moamadimNivcharim = moamadimMeudkanim;
  }

  onTzfiaBodedet(moamad: MoamadLeHashvaa): void {
    // ייחובר למסך daf-moamad בהמשך
  }

  onHatchalatHashvaa(): void {
    if (!this.moamadimNivcharim || this.moamadimNivcharim.length < this.minKamutLeHashvaa) {
      return;
    }

    this.hashvaatMoamadimService
      .hatchalatHashvaa(this.moamadimNivcharim)
      .subscribe(() => {
        this.hatzegetMasach('hashvaa');
      });
  }

  onMaavarLebdikatRechivim(): void {
    this.hatzegetMasach('bdikat-rechivim');
  }

  onChazaraLebchira(): void {
    this.hatzegetMasach('bchira');
  }

  /** מציג סלקטור אחד ומסתיר את השאר — בלי ניווט URL */
  private hatzegetMasach(masach: SugMasachHashvaa): void {
    this.masachPail = masach;
  }

  /** צבע ראשון מהפלטה שלא בשימוש אצל אף מועמד נבחר */
  private getColorPanoi(): string {
    const colorsBeshimush = this.moamadimNivcharim
      .map(item => item.colorLeMoamad)
      .filter(color => !!color);

    const colorPanoi = COLORS_LE_MOAMAD.find(
      color => colorsBeshimush.indexOf(color) === -1
    );

    return colorPanoi || COLORS_LE_MOAMAD[0];
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { MoamadLeHashvaa } from '../models/moamad-le-hashvaa.model';
import { MoamadLeHashvaaGrid } from '../models/hashvaat-grid.model';
import { TguvatHashvaatMeServer } from '../models/server-hashvaat.model';
import { MOCK_TGUVAT_HASHVAAT } from '../models/moamadim-mock-data';
import {
  mapShotrimItemLeGrid,
  mapShotrimLeMoamadimBechira
} from '../shared/hashvaat-server.mapper';

@Injectable({
  providedIn: 'root'
})
export class HashvaatMoamadimService {

  private mockUrl = 'https://api.mock-system.local/hashvaat-moamadim';

  /** תשובת שרת אחרונה (לבניית גריד + מילולים) */
  private tguvaHashvaat: TguvatHashvaatMeServer | null = null;

  /**
   * מועמדים שנבחרו — מפתח זיהוי: misparTikMamada (= id).
   */
  private moamadimNivcharimLeHashvaa: MoamadLeHashvaa[] = [];

  constructor(private http: HttpClient) {
  }

  /**
   * טעינת מאגר מועמדים מתוך Data.Shotrim.
   * בפרודקשן: this.http.get<TguvatHashvaatMeServer>(...)
   */
  getAllMoamadimForHashvaa(): Observable<MoamadLeHashvaa[]> {
    // return this.http.get<TguvatHashvaatMeServer>(this.mockUrl).pipe(
    //   map(tguva => this.shimurTguvaVeMapLeBechira(tguva))
    // );
    return of(MOCK_TGUVAT_HASHVAAT).pipe(
      delay(300),
      map(tguva => this.shimurTguvaVeMapLeBechira(tguva))
    );
  }

  getMoamadByMisparTikMamada(
    misparTikMamada: number
  ): Observable<MoamadLeHashvaa | null> {
    return this.getAllMoamadimForHashvaa().pipe(
      map(moamadim => {
        const matza = (moamadim || []).find(
          item => item.misparTikMamada === misparTikMamada
        );
        return matza || null;
      })
    );
  }

  /** תאימות לאחור — id === misparTikMamada */
  getMoamadById(id: string | number): Observable<MoamadLeHashvaa | null> {
    return this.getMoamadByMisparTikMamada(Number(id));
  }

  /** שמירת בחירה + סימון התחלת השוואה */
  hatchalatHashvaa(moamadim: MoamadLeHashvaa[]): Observable<{
    success: boolean;
    mispareiTikMamada: number[];
    taarichHatchala: string;
  }> {
    this.moamadimNivcharimLeHashvaa = moamadim ? moamadim.slice() : [];
    return of({
      success: true,
      mispareiTikMamada: this.moamadimNivcharimLeHashvaa.map(
        item => item.misparTikMamada
      ),
      taarichHatchala: new Date().toISOString()
    }).pipe(delay(200));
  }

  getMoamadimNivcharimLeHashvaa(): MoamadLeHashvaa[] {
    return this.moamadimNivcharimLeHashvaa.slice();
  }

  /**
   * גריד השוואה לפי המועמדים שנבחרו (סדר + צבעים מהבחירה).
   * מזהה: misparTikMamada.
   */
  getMoamadimLeHashvaaGrid(): Observable<MoamadLeHashvaaGrid[]> {
    const nivcharim = this.moamadimNivcharimLeHashvaa;
    if (!nivcharim || nivcharim.length === 0) {
      return of([]);
    }

    const tguva = this.tguvaHashvaat || MOCK_TGUVAT_HASHVAAT;
    const shotrim = (tguva.Data && tguva.Data.Shotrim) || [];
    const data = tguva.Data;

    const grid: MoamadLeHashvaaGrid[] = nivcharim.map(moamad => {
      const itemServer = shotrim.find(
        s =>
          Number(s.MisparTikMamada) === Number(moamad.misparTikMamada) ||
          (s.Shoter &&
            Number(s.Shoter.MisparTikMamada) ===
              Number(moamad.misparTikMamada))
      );

      if (itemServer) {
        return mapShotrimItemLeGrid(itemServer, {
          darga: tguva.Darga,
          colorLeMoamad: moamad.colorLeMoamad,
          haarachotFallback: tguva.haarachot,
          melelSummary: data.MelelSummary,
          melelStrong: data.MelelStrong,
          melelWeak: data.MelelWeak,
          melelMeafyenim: data.MelelMeafyenim
        });
      }

      // גיבוי אם אין פריט ב-Shotrim — משדות הבחירה בלבד
      return {
        id: moamad.misparTikMamada,
        misparTikMamada: moamad.misparTikMamada,
        shemMale: moamad.shemMale,
        gil: 0,
        urlTmuna: moamad.urlTmuna,
        colorLeMoamad: moamad.colorLeMoamad || '#4f46e5',
        darga: moamad.darga,
        urlHaarachaTkufatit: moamad.urlHaarachaTkufatit,
        pratimIkarim: [
          { shemSadeh: 'תפקיד', erech: moamad.tafkid || '' },
          { shemSadeh: 'יחידה', erech: moamad.machoz || '' },
          { shemSadeh: 'גיל', erech: '—' },
          { shemSadeh: 'ותק בארגון', erech: '—' },
          { shemSadeh: 'ותק בדרגה', erech: '—' }
        ],
        pratimNosafim: [
          { shemSadeh: 'מ"א', erech: moamad.misparIshi || '' },
          { shemSadeh: 'ת.ז', erech: moamad.teudatZehut || '' },
          { shemSadeh: 'תיק ממ"ד', erech: moamad.misparTikMamada }
        ],
        midot: [],
        merkazim: [],
        statusim: [{ tekst: 'אין הערות משמעת.', sug: 'hatzlacha' }],
        haskalaAcademit: [],
        hachsharotMiktzoiyot: [],
        minuyimKodmim: [],
        tziyuneiMeshuvAmitim: {},
        tziyuneiMeshuvKefifim: {},
        tziyuneiHaarchotTekufatiyot: {}
      };
    });

    return of(grid).pipe(delay(250));
  }

  private shimurTguvaVeMapLeBechira(
    tguva: TguvatHashvaatMeServer
  ): MoamadLeHashvaa[] {
    this.tguvaHashvaat = tguva;
    return mapShotrimLeMoamadimBechira(tguva);
  }
}

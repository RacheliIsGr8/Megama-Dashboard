import {
  HaarachotServer,
  ShotrimItemServer,
  TguvatHashvaatMeServer
} from './server-hashvaat.model';

/** בניית חבילת הערכות לדמו לפי שנים ומימדים */
function bniyatHaarachotDemo(
  tziyunimLeShana: { [shana: string]: number },
  midot: string[],
  barColor: string
): HaarachotServer {
  const shanim = Object.keys(tziyunimLeShana).sort();
  const shanaCurrent = shanim[shanim.length - 1] || '2025';
  const tziyunCurrent = tziyunimLeShana[shanaCurrent] || 80;

  const current: HaarachotServer['NetuneiCurrentHaaracha'] = midot.map(
    (teur, index) => ({
      BarColor: barColor,
      KodSugMeymad: index + 1,
      Seder: index + 1,
      Shana: Number(shanaCurrent),
      TeurMeymad: teur,
      Tziyun: Math.max(40, Math.min(100, tziyunCurrent - index * 2))
    })
  );

  const prev: HaarachotServer['NetuneiPrevYearsHaaracha'] = shanim
    .filter(shana => shana !== shanaCurrent)
    .map(shana => ({
      Key: shana,
      Value: midot.map((teur, index) => ({
        BarColor: barColor,
        KodSugMeymad: index + 1,
        Seder: index + 1,
        Shana: Number(shana),
        TeurMeymad: teur,
        Tziyun: Math.max(
          40,
          Math.min(100, (tziyunimLeShana[shana] || 70) - index * 2)
        )
      }))
    }));

  return {
    MeymadimBeHaarach: current.slice(),
    NetuneiCurrentHaaracha: current,
    NetuneiPrevYearsHaaracha: prev
  };
}

const MIDOT_AMITIM_DEMO = [
  'כושר ביצוע',
  'יחסי אנוש',
  'מקצועיות',
  'ערכיות',
  'שליטה עצמית',
  'כושר פיקוד',
  'מצטיינים בתפקידים',
  'כושר ביצוע בולט'
];

const MIDOT_KEFIFIM_DEMO = [
  'כושר הנהגה',
  'ארגון',
  'מנהל וביצוע',
  'מקצועיות',
  'יחסי אנוש / טיפול בכ"א',
  'אמינות',
  'גישה שירותית',
  'כללי'
];

function bniyatShotrimItem(params: {
  misparTikMamada: number;
  misparIshi: number;
  shem: string;
  teudatZehut: string;
  kodYechida: string;
  tafkid: string;
  image: string;
  color: string;
  tziyunimLeShana: { [shana: string]: number };
}): ShotrimItemServer {
  const haarachotAmitim = bniyatHaarachotDemo(
    params.tziyunimLeShana,
    MIDOT_AMITIM_DEMO,
    params.color
  );
  const haarachotKefifim = bniyatHaarachotDemo(
    params.tziyunimLeShana,
    MIDOT_KEFIFIM_DEMO,
    params.color
  );

  return {
    HarachatAmitim: 'קיים דוח עמיתים',
    HarachatKfifim: 'קיים דוח כפופים',
    MelelMerkazHaarachafi: true,
    MisparTikMamada: params.misparTikMamada,
    MoamadLeTafkidBekvu: params.tafkid,
    NetuneiMekazHaaracha: null,
    NetuneiMekazHaaracha2: null,
    Shoter: {
      KodYechida: params.kodYechida,
      Misparlshi: params.misparIshi,
      MisparTikMamada: params.misparTikMamada,
      Shem: params.shem,
      TeudatZehut: params.teudatZehut
    },
    ShoterImage: params.image,
    UrlForLasthAarachaTkuf: '/reports/' + params.misparTikMamada + '.pdf',
    haarachot: {
      MeymadimBeHaarach: haarachotKefifim.MeymadimBeHaarach,
      NetuneiCurrentHaaracha: haarachotAmitim.NetuneiCurrentHaaracha,
      NetuneiPrevYearsHaaracha: haarachotAmitim.NetuneiPrevYearsHaaracha
    }
  };
}

/** תשובת שרת דמו — מבנה זהה ל-API האמיתי */
export const MOCK_TGUVAT_HASHVAAT: TguvatHashvaatMeServer = {
  Darga: 'סנ"צ',
  Data: {
    Shotrim: [
      bniyatShotrimItem({
        misparTikMamada: 10001,
        misparIshi: 1234567,
        shem: 'סנ"צ רונן כהן',
        teudatZehut: '012345678',
        kodYechida: 'מחוז ירושלים',
        tafkid: 'מפקד יחידת חופש',
        image: 'https://i.pravatar.cc/150?img=12',
        color: '#7B61FF',
        tziyunimLeShana: {
          '2021': 82,
          '2022': 85,
          '2023': 88,
          '2024': 90,
          '2025': 91
        }
      }),
      bniyatShotrimItem({
        misparTikMamada: 10002,
        misparIshi: 2345678,
        shem: 'רפ"ק מיכל לוי',
        teudatZehut: '023456789',
        kodYechida: 'מחוז תל אביב',
        tafkid: 'קצינת מבצעים',
        image: 'https://i.pravatar.cc/150?img=5',
        color: '#00B4D8',
        tziyunimLeShana: {
          '2021': 74,
          '2022': 76,
          '2023': 80,
          '2024': 82,
          '2025': 84
        }
      }),
      bniyatShotrimItem({
        misparTikMamada: 10003,
        misparIshi: 3456789,
        shem: 'פקד יוסי אברהם',
        teudatZehut: '034567890',
        kodYechida: 'מחוז חיפה',
        tafkid: 'מפקד תחנה',
        image: 'https://i.pravatar.cc/150?img=33',
        color: '#2ECC71',
        tziyunimLeShana: {
          '2021': 80,
          '2022': 83,
          '2023': 86,
          '2024': 89,
          '2025': 90
        }
      }),
      bniyatShotrimItem({
        misparTikMamada: 10004,
        misparIshi: 4567890,
        shem: 'סמ"ר דנה שמש',
        teudatZehut: '045678901',
        kodYechida: 'מחוז מרכז',
        tafkid: 'רכזת מודיעין',
        image: 'https://i.pravatar.cc/150?img=9',
        color: '#F39C12',
        tziyunimLeShana: {
          '2021': 55,
          '2022': 58,
          '2023': 60,
          '2024': 62,
          '2025': 64
        }
      }),
      bniyatShotrimItem({
        misparTikMamada: 10005,
        misparIshi: 5678901,
        shem: 'רס"ב אבי מזרחי',
        teudatZehut: '056789012',
        kodYechida: 'מחוז דרום',
        tafkid: 'מפקד צוות סיור',
        image: 'https://i.pravatar.cc/150?img=15',
        color: '#E74C3C',
        tziyunimLeShana: {
          '2021': 78,
          '2022': 80,
          '2023': 83,
          '2024': 85,
          '2025': 87
        }
      })
    ],
    DochotAmitimPath: '/path/amitim',
    DochotKfifimPath: '/path/kfifim',
    IsPrintPreview: false,
    MelelMeafyenim: 'מפקד מעולה',
    MelelStrong: 'פיקוד, מקצועיות',
    MelelSummary: 'סיכום הערכה חיובי מאוד',
    MelelWeak: 'טעון שיפור בתחום הניהולי',
    MisparTikMamada: 10001,
    Misparishi: 1234567,
    Moamadim: [],
    PrintPreviewMisparimIshiim: [1234567],
    ShemTikMamada: 'תיק מיון רונן כהן',
    ShowSanatzMelel: true,
    Tz: '012345678',
    UrlLastHaaracha: '/path/haaracha',
    UserDisplayName: 'מנהל מערכת',
    expandAmitim: false,
    expandKfifim: false,
    expandMerkaz: false,
    expandTkofatit: false
  },
  shoter: {
    KodYechida: 'מחוז ירושלים',
    Misparlshi: 1234567,
    MisparTikMamada: 10001,
    Shem: 'רונן כהן',
    TeudatZehut: '012345678'
  },
  haarachot: null
};

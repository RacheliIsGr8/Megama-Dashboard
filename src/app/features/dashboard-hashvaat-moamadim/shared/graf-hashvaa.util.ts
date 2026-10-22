import { NetuneiGrafHashvaa, SidratGrafHashvaa } from '../models/graf-hashvaa.model';

export function getToviyotGraf(netunim: NetuneiGrafHashvaa): string[] {
  return netunim && netunim.toviyot ? netunim.toviyot : [];
}

export function getSidrotGraf(netunim: NetuneiGrafHashvaa): SidratGrafHashvaa[] {
  return netunim && netunim.sidrot ? netunim.sidrot : [];
}

/**
 * קווים מעוקלים כמו בפיגמה (Recharts):
 * stroke 2, נקודה מלאה בצבע הקו + מסגרת לבנה
 */
export function bniyatDatasetsKav(netunim: NetuneiGrafHashvaa): any[] {
  return getSidrotGraf(netunim).map(sidra => {
    const color = sidra.colorLeMoamad || '#4f46e5'; // indigo-600 — ברירת מחדל כמו מועמד 1 בפיגמה
    return {
      label: sidra.shemMoamad,
      data: sidra.erachim || [],
      borderColor: color,
      backgroundColor: color,
      tension: 0.35,
      fill: false,
      borderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBorderWidth: 2,
      pointHoverBorderWidth: 2,
      pointBackgroundColor: '#ffffff',
      pointBorderColor: color,
      pointHoverBackgroundColor: '#ffffff',
      pointHoverBorderColor: color
    };
  });
}

export function isTziyurLeMidot(netunim: NetuneiGrafHashvaa): boolean {
  return !!(
    netunim
    && netunim.colorsLeMidot
    && netunim.colorsLeMidot.length > 0
  );
}

/** עמודות אנכיות כמו בפיגמה: פינות עליונות מעוגלות, רווח בין אשכולות */
export function bniyatDatasetsAmudot(netunim: NetuneiGrafHashvaa): any[] {
  if (isTziyurLeMidot(netunim)) {
    return bniyatDatasetsAmudotLeMidot(netunim);
  }

  return getSidrotGraf(netunim).map(sidra => {
    const color = sidra.colorLeMoamad || '#4f46e5';
    return {
      label: sidra.shemMoamad,
      data: sidra.erachim || [],
      backgroundColor: color,
      hoverBackgroundColor: color,
      borderColor: color,
      borderWidth: 0,
      borderSkipped: false,
      borderRadius: {
        topLeft: 3,
        topRight: 3,
        bottomLeft: 0,
        bottomRight: 0
      },
      maxBarThickness: 18,
      categoryPercentage: 0.58,
      barPercentage: 0.72
    };
  });
}

/** עמודות לפי מימד (משוב כפיפים) — צבע ייחודי לכל עמודה */
export function bniyatDatasetsAmudotLeMidot(netunim: NetuneiGrafHashvaa): any[] {
  const sidra = getSidrotGraf(netunim)[0] || {
    shemMoamad: '',
    colorLeMoamad: '#4285F4',
    erachim: []
  };
  const colors = (netunim.colorsLeMidot || []).slice();
  const erachim = sidra.erachim || [];
  const kamut = Math.max(erachim.length, colors.length, getToviyotGraf(netunim).length);
  const colorsMeuhadim: string[] = [];

  for (let i = 0; i < kamut; i++) {
    colorsMeuhadim.push(colors[i] || '#4285F4');
  }

  return [{
    label: sidra.shemMoamad || 'ציון',
    data: erachim,
    backgroundColor: colorsMeuhadim,
    hoverBackgroundColor: colorsMeuhadim,
    borderColor: colorsMeuhadim,
    borderWidth: 0,
    borderSkipped: false,
    borderRadius: {
      topLeft: 4,
      topRight: 4,
      bottomLeft: 0,
      bottomRight: 0
    },
    maxBarThickness: 36,
    categoryPercentage: 0.62,
    barPercentage: 0.78
  }];
}

/** פס הארה אפור על קבוצת העמודות בריחוף — כמו בפיגמה */
export const pluginPasHaaraAmudot = {
  id: 'pasHaaraAmudot',
  beforeDatasetsDraw(chart: any): void {
    const active = chart.getActiveElements ? chart.getActiveElements() : [];
    if (!active || !active.length) {
      return;
    }

    const idx = active[0].index;
    const xScale = chart.scales && chart.scales.x;
    const area = chart.chartArea;
    if (!xScale || !area) {
      return;
    }

    const kamut = (chart.data && chart.data.labels && chart.data.labels.length)
      ? chart.data.labels.length
      : 1;
    const rohavKategoria = (area.right - area.left) / Math.max(kamut, 1);
    const center = xScale.getPixelForValue(idx);
    if (!isFinite(center) || !isFinite(rohavKategoria) || rohavKategoria <= 0) {
      return;
    }

    const ctx = chart.ctx;
    ctx.save();
    ctx.fillStyle = 'rgba(224, 224, 224, 0.55)';
    ctx.fillRect(
      center - (rohavKategoria / 2),
      area.top,
      rohavKategoria,
      area.bottom - area.top
    );
    ctx.restore();
  }
};

/** אפשרויות גרף עמודות מדויקות לפי פיגמת השוואה / משוב כפיפים */
export function bniyatOptionsAmudot(netunim: NetuneiGrafHashvaa): any {
  const erechMin = netunim && typeof netunim.erechMin === 'number' ? netunim.erechMin : 60;
  const erechMax = netunim && typeof netunim.erechMax === 'number' ? netunim.erechMax : 100;
  const toviyot = getToviyotGraf(netunim);
  const colorsLeMidot = netunim && netunim.colorsLeMidot ? netunim.colorsLeMidot : [];
  const leMidot = isTziyurLeMidot(netunim);

  return {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'x',
    layout: {
      padding: {
        top: 4,
        right: 4,
        bottom: 2,
        left: 2
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        rtl: true,
        textDirection: 'rtl',
        backgroundColor: '#ffffff',
        titleColor: '#111827',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        titleFont: {
          family: "'Heebo', 'Assistant', 'Segoe UI', Tahoma, sans-serif",
          size: 12,
          weight: '600'
        },
        bodyFont: {
          family: "'Heebo', 'Assistant', 'Segoe UI', Tahoma, sans-serif",
          size: 12,
          weight: '500'
        },
        padding: {
          top: 10,
          right: 12,
          bottom: 10,
          left: 12
        },
        cornerRadius: 2,
        displayColors: false,
        caretPadding: 8,
        callbacks: {
          title: (items: any[]) => {
            if (!items || !items.length) {
              return '';
            }
            const idx = items[0].dataIndex;
            if (toviyot && toviyot[idx]) {
              return toviyot[idx];
            }
            return items[0].label || '';
          },
          label: (item: any) => {
            const erech = item.parsed && typeof item.parsed.y === 'number'
              ? item.parsed.y
              : item.formattedValue;
            return 'ציון: ' + erech;
          },
          labelTextColor: (item: any) => {
            if (leMidot && colorsLeMidot[item.dataIndex]) {
              return colorsLeMidot[item.dataIndex];
            }
            if (item.dataset && typeof item.dataset.borderColor === 'string') {
              return item.dataset.borderColor;
            }
            if (item.dataset && typeof item.dataset.backgroundColor === 'string') {
              return item.dataset.backgroundColor;
            }
            return '#374151';
          }
        }
      }
    },
    scales: {
      x: {
        offset: true,
        stacked: false,
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          font: {
            family: "'Heebo', 'Assistant', 'Segoe UI', Tahoma, sans-serif",
            size: 11
          },
          color: '#9ca3af',
          maxRotation: 0,
          minRotation: 0,
          padding: 10
        }
      },
      y: {
        min: erechMin,
        max: erechMax,
        stacked: false,
        border: {
          display: true,
          color: '#d1d5db',
          dash: []
        },
        ticks: {
          stepSize: 10,
          font: {
            family: "'Heebo', 'Assistant', 'Segoe UI', Tahoma, sans-serif",
            size: 11
          },
          color: '#9ca3af',
          padding: 8
        },
        grid: {
          color: '#e5e7eb',
          borderDash: [4, 4],
          drawBorder: false,
          drawTicks: false
        }
      }
    }
  };
}

export function bniyatOptionsGraf(
  netunim: NetuneiGrafHashvaa,
  sug: 'kav' | 'amudot'
): any {
  if (sug === 'amudot') {
    return bniyatOptionsAmudot(netunim);
  }

  const erechMin = netunim && typeof netunim.erechMin === 'number' ? netunim.erechMin : 60;
  const erechMax = netunim && typeof netunim.erechMax === 'number' ? netunim.erechMax : 100;

  return {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'x',
    layout: {
      padding: {
        top: 8,
        right: 8,
        bottom: 4,
        left: 4
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        rtl: true,
        textDirection: 'rtl',
        backgroundColor: 'rgba(23, 43, 77, 0.92)',
        titleFont: {
          family: "'Heebo', 'Assistant', 'Segoe UI', Tahoma, sans-serif",
          size: 12
        },
        bodyFont: {
          family: "'Heebo', 'Assistant', 'Segoe UI', Tahoma, sans-serif",
          size: 11
        },
        padding: 10,
        cornerRadius: 6
      }
    },
    scales: {
      x: {
        offset: true,
        stacked: false,
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          font: {
            family: "'Heebo', 'Assistant', 'Segoe UI', Tahoma, sans-serif",
            size: 10
          },
          color: '#9ca3af',
          maxRotation: 0,
          minRotation: 0,
          padding: 8
        }
      },
      y: {
        min: erechMin,
        max: erechMax,
        stacked: false,
        ticks: {
          stepSize: 10,
          font: {
            family: "'Heebo', 'Assistant', 'Segoe UI', Tahoma, sans-serif",
            size: 9
          },
          color: '#9ca3af',
          padding: 6
        },
        grid: {
          color: '#f0f0f0',
          borderDash: [3, 3],
          drawBorder: false
        }
      }
    }
  };
}

/** רוחב מינימלי דינמי לפי מספר מימדים ומועמדים (גלילה אופקית בתוך המארז) */
export function cheshivMinWidthGraf(netunim: NetuneiGrafHashvaa): string {
  const kamutToviyot = getToviyotGraf(netunim).length;
  const kamutSidrot = getSidrotGraf(netunim).length;
  const minLeToviyot = Math.max(kamutToviyot, 1) * 3.25;
  const minLeSidrot = Math.max(kamutSidrot, 1) * 3;
  const minRem = Math.max(18, minLeToviyot, minLeSidrot);
  return minRem + 'rem';
}

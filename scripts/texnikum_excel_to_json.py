"""Texnikumlar indikatorlari (Excel) -> src/data/vocational-rating.json

Ishlatish:
    python scripts/texnikum_excel_to_json.py "C:/.../Texnikumlar - indikatorlar 2026-09-28.xlsx" [STIR,STIR,...]
    (STIR'lar — sahifada to'liq ko'rsatiladigan texnikumlar; standart: 200056906.
     Qolgan barcha texnikumlar "list" da qisqa: nomi, viloyat, ball, o'rin.)

Excel tuzilishi (har varaq = bitta indikator):
    1-qator: "K1.1 — Pedagoglar salohiyati"
    2-qator: "Formula: ..."
    3-qator: "Bm (indikator balli): 3    Km (...): 0.1053    Ball = Ki × Bm ÷ Km"
    4-qator: "Hisoblangan: 28.09.2026, 15:00:45 (...)"
    6-qator: ustunlar — O'rni, Tashkilot nomi, STIR, Viloyat, <xom qiymatlar...>, Ki, Ball
Natija: har texnikum uchun xom qiymatlar, Ki, ball, "ulush" (tushunarli ko'rsatkich),
jami ball, respublika/viloyat o'rni; har indikator uchun median/maksimum/nollar soni.
"""
import json
import re
import statistics as st
import sys
from pathlib import Path

import openpyxl

GROUPS = {
    'K1': 'Pedagoglar',
    'K2': "Ta'lim jarayoni va sharoit",
    'K3': 'Bitiruvchilar va ishlab chiqarish',
    'K4': "O'quvchilar yutuqlari",
}


def share(code, raw, ki):
    """Indikatorni oddiy tilda tushuniladigan ko'rsatkichga aylantiradi (ulush yoki so'm)."""
    v = list(raw.values())
    base = v[0] or 0  # birinchi xom ustun — "jami" (P, O', B)
    div = lambda a: (a / base) if base else 0
    if code in ('K1.1', 'K1.2', 'K1.3'):
        return div(sum(v[1:4]))
    if code in ('K1.5', 'K4.2'):
        return div(v[1] + v[2])
    if code == 'K2.5':
        return div(v[1])
    if code == 'K3.2':  # bir o'quvchiga tushum, so'm
        return div(v[1] + v[2])
    if code == 'K3.4':
        return div(v[1] + v[2] + v[3])
    if code == 'K4.1':
        return div(sum(v[1:8]))
    return ki  # K1.6, K1.7, K1.8, K2.1–K2.4, K3.3 — Ki o'zi ulush


def num(x):
    if x in (None, ''):
        return 0
    try:
        f = float(x)
        return int(f) if f.is_integer() else f
    except ValueError:
        return x


def main(path, keep=('200056906',)):
    wb = openpyxl.load_workbook(path, read_only=True, data_only=True)
    indicators, colleges = {}, {}
    computed_at = None
    for ws in wb.worksheets:
        rows = list(ws.iter_rows(values_only=True))
        code, title = [s.strip() for s in rows[0][0].split('—', 1)]
        formula = rows[1][0].replace('Formula:', '').strip()
        bm = float(re.search(r'Bm \(indikator balli\):\s*([\d.]+)', rows[2][0]).group(1))
        computed_at = computed_at or re.search(r'Hisoblangan:\s*([\d.]+)', rows[3][0]).group(1)
        header = rows[5]
        raw_cols = list(header[4:-2])
        indicators[code] = {'code': code, 'title': title, 'formula': formula, 'max': bm, 'fields': raw_cols}
        for r in rows[6:]:
            if not r or not r[2]:
                continue
            stir = str(r[2])
            raw = {c: num(val) for c, val in zip(raw_cols, r[4:-2])}
            ki, ball = float(r[-2] or 0), float(r[-1] or 0)
            c = colleges.setdefault(stir, {'stir': stir, 'name': r[1], 'region': r[3], 'ind': {}})
            c['ind'][code] = {'raw': list(raw.values()), 'ki': round(ki, 4), 'ball': round(ball, 2),
                              'share': round(share(code, raw, ki), 4)}

    stirs = list(colleges)
    n = len(stirs)
    # indikator statistikasi
    for code, meta in indicators.items():
        balls = [colleges[s]['ind'][code]['ball'] for s in stirs]
        shares = [colleges[s]['ind'][code]['share'] for s in stirs]
        meta.update({
            'medianBall': round(st.median(balls), 2),
            'medianShare': round(st.median(shares), 4),
            'maxShare': round(max(shares), 4),
            'zeroCount': sum(1 for b in balls if b == 0),
        })
        for s in stirs:
            b = colleges[s]['ind'][code]['ball']
            colleges[s]['ind'][code]['better'] = sum(1 for x in balls if x > b)  # nechta texnikum yuqori
            colleges[s]['ind'][code]['worse'] = sum(1 for x in balls if x < b)  # nechta texnikum past
    # jami ball va o'rinlar
    for s in stirs:
        c = colleges[s]
        c['total'] = round(sum(i['ball'] for i in c['ind'].values()), 2)
        c['groups'] = {g: round(sum(v['ball'] for k, v in c['ind'].items() if k.startswith(g)), 2) for g in GROUPS}
    ranked = sorted(stirs, key=lambda s: -colleges[s]['total'])
    for i, s in enumerate(ranked):
        colleges[s]['rank'] = i + 1
    regions = {}
    for s in ranked:
        regions.setdefault(colleges[s]['region'], []).append(s)
    for reg, lst in regions.items():
        for i, s in enumerate(lst):
            colleges[s]['regionRank'] = i + 1
            colleges[s]['regionCount'] = len(lst)

    totals = [colleges[s]['total'] for s in stirs]
    groups = {}
    for g, title in GROUPS.items():
        codes = [c for c in indicators if c.startswith(g)]
        groups[g] = {
            'title': title,
            'codes': codes,
            'max': sum(indicators[c]['max'] for c in codes),
            'median': round(st.median(colleges[s]['groups'][g] for s in stirs), 2),
        }
    out = {
        'source': Path(path).name,
        'computedAt': computed_at,
        'count': n,
        'max': sum(i['max'] for i in indicators.values()),
        'medianTotal': round(st.median(totals), 2),
        'best': {'name': colleges[ranked[0]]['name'], 'total': colleges[ranked[0]]['total']},
        'groups': groups,
        'indicators': indicators,
        'colleges': {s: colleges[s] for s in keep if s in colleges},
        'list': [[s, colleges[s]['name'], colleges[s]['region'], colleges[s]['total'], colleges[s]['rank']] for s in ranked],
    }
    dst = Path(__file__).resolve().parent.parent / 'src' / 'data' / 'vocational-rating.json'
    dst.write_text(json.dumps(out, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    print(f'{n} texnikum, {len(indicators)} indikator, maks {out["max"]} ball -> {dst} ({dst.stat().st_size // 1024} KB)')


if __name__ == '__main__':
    main(sys.argv[1], tuple(sys.argv[2].split(',')) if len(sys.argv) > 2 else ('200056906',))

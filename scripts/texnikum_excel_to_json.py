"""Texnikumlar indikatorlari (Excel) -> src/data/vocational-passport.json

MUHIM: reyting hali e'lon qilinmagan. Shuning uchun faylga FAQAT tanlangan texnikum(lar)ning
o'z ko'rsatkichlari (xom qiymatlar: pedagoglar soni, bitiruvchilar bandligi va h.k.) yoziladi.
Ball, Ki, reytingdagi o'rin, median va boshqa texnikumlar ma'lumoti yozilmaydi — sayt orqali
ularni ko'rish imkoni bo'lmasligi kerak.

Ishlatish:
    python scripts/texnikum_excel_to_json.py "C:/.../Texnikumlar - indikatorlar 2026-09-28.xlsx" [STIR,STIR,...]
    (standart STIR: 200056906)

Excel tuzilishi (har varaq = bitta indikator):
    1-qator: "K1.1 — Pedagoglar salohiyati"; 4-qator: "Hisoblangan: 28.09.2026, ..."
    6-qator: O'rni, Tashkilot nomi, STIR, Viloyat, <xom qiymatlar...>, Ki, Ball
"""
import json
import re
import sys
from pathlib import Path

import openpyxl


def num(x):
    if x in (None, ''):
        return 0
    f = float(x)
    return int(f) if f.is_integer() else round(f, 4)


def main(path, keep):
    wb = openpyxl.load_workbook(path, read_only=True, data_only=True)
    fields, colleges, computed_at = {}, {}, None
    for ws in wb.worksheets:
        rows = list(ws.iter_rows(values_only=True))
        code, title = [s.strip() for s in rows[0][0].split('—', 1)]
        computed_at = computed_at or re.search(r'Hisoblangan:\s*([\d.]+)', rows[3][0]).group(1)
        raw_cols = list(rows[5][4:-2])  # faqat xom ustunlar: Ki va Ball olinmaydi
        fields[code] = {'title': title, 'fields': raw_cols}
        for r in rows[6:]:
            if not r or str(r[2]) not in keep:
                continue
            c = colleges.setdefault(str(r[2]), {'name': r[1], 'region': r[3], 'data': {}})
            c['data'][code] = [num(v) for v in r[4:-2]]
    out = {'source': Path(path).name, 'date': computed_at, 'fields': fields, 'colleges': colleges}
    dst = Path(__file__).resolve().parent.parent / 'src' / 'data' / 'vocational-passport.json'
    dst.write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding='utf-8')
    print(f"{len(colleges)} texnikum, {len(fields)} ko'rsatkich -> {dst} ({dst.stat().st_size // 1024} KB)")


if __name__ == '__main__':
    main(sys.argv[1], set(sys.argv[2].split(',')) if len(sys.argv) > 2 else {'200056906'})

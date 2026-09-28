"""O'quvchilar ro'yxati (Excel) -> src/data/vocational-programs.json

Ishlatish:
    python scripts/talim_dasturlari_to_json.py "C:/Users/admin/Desktop/ta'lim dastur.xlsx"

Kirish: har qator = bitta o'quvchi. Ustunlar: FIO, Doimiy Viloyat, Doimiy Tuman, Joriy Viloyat,
Joriy Tuman, Ta'lim muassasasi, Kursi, Ta'lim shakli, Yo'nalishi.
Chiqish: FAQAT yig'ma sonlar — yo'nalish (ta'lim dasturi) bo'yicha o'quvchilar soni, kurslar va
ta'lim shakli kesimida. Shaxsiy ma'lumot (FIO, manzil) saytga yozilmaydi.
"""
import json
import sys
from collections import Counter, defaultdict
from pathlib import Path

import openpyxl


def main(path):
    rows = list(openpyxl.load_workbook(path, read_only=True, data_only=True).active.iter_rows(values_only=True))
    head = [str(h).strip() for h in rows[0]]
    col = {h: i for i, h in enumerate(head)}
    data = [r for r in rows[1:] if r and any(r)]

    by_program = defaultdict(Counter)
    for r in data:
        name = str(r[col["Yo'nalishi"]]).strip()
        by_program[name][str(r[col['Kursi']]).strip()] += 1

    programs = sorted(
        ({'name': n, 'total': sum(c.values()), 'courses': dict(sorted(c.items()))} for n, c in by_program.items()),
        key=lambda p: -p['total'],
    )
    out = {
        'source': Path(path).name,
        'institution': Counter(str(r[col["Ta'lim muassasasi"]]).strip() for r in data).most_common(1)[0][0],
        'total': len(data),
        'courses': dict(sorted(Counter(str(r[col['Kursi']]).strip() for r in data).items())),
        'forms': dict(Counter(str(r[col["Ta'lim shakli"]]).strip() for r in data)),
        'programs': programs,
    }
    dst = Path(__file__).resolve().parent.parent / 'src' / 'data' / 'vocational-programs.json'
    dst.write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding='utf-8')
    print(f"{out['total']} o'quvchi, {len(programs)} ta dastur -> {dst}")


if __name__ == '__main__':
    main(sys.argv[1])

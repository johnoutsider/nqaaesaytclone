# NQAAE — Litsey pasporti (yangi dizayn prototipi)

nqaae.uz saytidagi ta'lim tashkiloti sahifasining ([asl sahifa](https://nqaae.uz/uz/secondary/205260966))
React'dagi prototipi: avval asl ko'rinish aniq nusxalandi, so'ng bloklar qayta ishlandi.

> **Muhim**
> - Bu — **dizayn va tuzilma prototipi**, ishlab turgan sayt emas. Asl sayt boshqa texnologiyada
>   (server shablonlari + jQuery/Bootstrap), shuning uchun bu kod ma'lumotnoma sifatida ishlatiladi.
> - `public/assets/public/` ichidagi stillar, shriftlar, logotiplar va rasmlar **NQAAE / nqaae.uz** ga tegishli.
> - Ba'zi ma'lumotlar **taxminiy (namuna)** — sahifada "Taxminiy ma'lumot" belgisi bilan ko'rsatilgan.
>   Ular haqiqiy ma'lumot sifatida ishlatilmasin (pastdagi ro'yxatga qarang).

## Ishga tushirish

Docker orqali:

```bash
docker compose up -d --build
```

Brauzerda: `http://localhost:3011` (yoki `http://<kompyuter-IP>:3011`).

Dasturlash rejimi (o'zgarishlar darhol ko'rinadi):

```bash
npm install
npm run dev
```

## Tuzilishi

| Fayl / papka | Vazifasi |
|---|---|
| `src/data/organization.js` | Tashkilotning barcha ma'lumotlari (bitta joyda) |
| `src/data/menu.js` | Header menyusi, kontaktlar, ijtimoiy tarmoqlar |
| `src/components/` | Header, mobil menyu, breadcrumbs, sidebar, footer |
| `src/components/university/` | Sahifa bloklari (har biri alohida komponent) |
| `public/assets/custom.css` | **Barcha yangi stillar** (asl CSS'ga tegilmagan) |
| `public/assets/public/` | Asl saytdan olingan CSS, shriftlar, ikonkalar |

## Asl sahifaga nisbatan o'zgarishlar

**Bloklar tartibi:** Tashkilot kartochkasi → Pedagoglar → O'quvchilar → Qabul ko'rsatkichlari →
Bitiruvchilar → Bino va inshootlar → Umummilliy so'rovnoma → Akkreditatsiya → Milliy reyting → Bog'lanish.

1. **Tashkilot kartochkasi** — "Ta'lim dasturlari" alohida blokdan kartochkaga (4-band) ko'chirildi.
2. **Pedagoglar**
   - Jami / mahalliy / xorijiy — bitta kartochkada.
   - Malaka toifasi — bo'lingan chiziq + son va foiz ro'yxati (donut o'rniga).
   - Ilmiy daraja — ixcham: ilmiy darajaga ega pedagoglar ulushi + tarkibi.
   - **Yangi:** Yosh tarkibi (6 guruh, ustunli diagramma, chapda "nafar" o'qi).
   - **Sertifikatlar va malaka oshirish** — xalqaro/milliy sertifikat, malaka oshirish kurslari,
     xorijiy stajirovka (**yangi indikator**), har biri jami pedagoglarga nisbatan foizda.
3. **O'quvchilar** — faqat o'quvchilarga oid: soni, **Sertifikatlar va tanlovlar**
   (xalqaro/respublika tanlovlari — **yangi**), Davomat.
4. **Qabul ko'rsatkichlari** — alohida blok: kvota va talabgorlar, tanlov (1 o'ringa aniq nechta talabgor),
   qabul qilinish ulushi.
5. **Bitiruvchilar**
   - Jami va OTMga kirganlar bitta kartochkada, o'rtacha bilim darajasi 1–5 shkalada.
   - **Bitiruvchilar kirgan OTMlar** — reyting toifalari (Top 100/500/1000/1000 dan tashqari),
     har biri ochiladi: OTMlar ro'yxati (ko'pdan kamga, dastlab TOP 5, qidiruv).
   - **Ta'sischi OTM** — nomi, logotipi, kirganlar soni va ulushi, pasportiga havola.
6. **Akkreditatsiya** — faqat kompleks davlat akkreditatsiyasi (holat: o'tgan / o'tmagan / jarayonda).
7. **Bog'lanish** — bitta kartochkada bosiladigan qatorlar (qo'ng'iroq, sayt, pochta, xarita) + jonli xarita.

## Kerak bo'ladigan yangi ma'lumotlar (asl bazada hozircha yo'q)

| Ma'lumot | Qayerda | Hozirgi holat |
|---|---|---|
| Pedagoglar yosh guruhlari bo'yicha soni | `teachers.ages` | **taxminiy** |
| Bitiruvchilar kirgan OTMlar ro'yxati (OTM + soni, toifa bo'yicha) | `graduates.admissions[].universities` | **taxminiy** |
| Ta'sischi OTM (nomi, ID/havola, logotip) | `graduates.founder` | qo'lda kiritilgan |
| Kompleks akkreditatsiya holati va sanalari | `accreditation.complex` | **taxminiy** |
| Litsey koordinatalari (xaritada belgi uchun) | `contacts.mapPoint` | yo'q |
| O'quvchilar, Qabul, Reyting ma'lumotlari sanasi | `*.date` | yo'q (`--.--.----`) |

Namuna ma'lumot haqiqiysiga almashtirilgach, tegishli `ageSample`, `admissionsSample`,
`accreditation.sample` qiymatlarini `false` qiling — "Taxminiy ma'lumot" belgisi yo'qoladi.

## Ochiq savollar

- O'quvchilar sertifikatlari va tanlovlari foizi qaysi jamiga nisbatan: **683** (sahifadagi) yoki **992** (manbadagi)?
- Tanlovlar: **g'oliblar** yoki **ishtirokchilar** soni?
- Yosh guruhlari chegaralari (hozir: 25 gacha, 26–35, 36–45, 46–55, 56–65, 65 dan yuqori).

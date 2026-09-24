// Ta'lim tashkiloti ma'lumotlari (nqaae.uz/uz/secondary/205260966 sahifasidan olingan).
// Boshqa tashkilotni ko'rsatish uchun shu faylni o'zgartirish kifoya.
// null qiymat => "mavjud emas" ko'rinadi.
export const organization = {
  stir: '205260966',
  name: 'ABU RAYHON BERUNIY NOMIDAGI URGANCH DAVLAT UNIVERSITETI AKADEMIK LITSEYI',
  logo: 'uploads/litsey-logo.png',
  ownership: 'Davlat',
  region: 'Urganch shahri',
  foundedYear: null,

  programs: {
    date: '24.06.2026',
    total: 5,
    local: 5,
  },

  teachers: {
    date: '24.06.2026',
    total: 74,
    local: 67,
    foreign: null,
    // Malaka toifasi (manba: l1_2_*) — foizlar jami pedagoglardan hisoblanadi
    qualification: [
      { key: 'Bosh o‘qituvchi', value: 36 },
      { key: 'Yetakchi o‘qituvchi', value: 9 },
      { key: 'Katta o‘qituvchi', value: 5 },
      { key: 'Toifasiz', value: 24 },
    ],
    // Ilmiy daraja (manba: l1_5_*) — ilmiy darajasizlar soni avtomatik hisoblanadi
    degrees: [
      { key: 'Fan doktori (DSc), professor', value: 0 },
      { key: 'Fan nomzodi (PhD), dotsent', value: 5 },
    ],
    certificates: { international: 11, national: 43 },
    // Malaka oshirish va stajirovka (manba: l1_4_domestic_training, l1_4_foreign_internship)
    training: { domestic: 60, foreign: 0 },
    // Yosh tarkibi — TAXMINIY (namuna) raqamlar, manbada hali yo'q. Haqiqiy ma'lumot kelganda almashtiriladi.
    ageSample: true,
    ages: [
      { label: '25 yoshgacha', value: 6 },
      { label: '26–35', value: 18 },
      { label: '36–45', value: 22 },
      { label: '46–55', value: 15 },
      { label: '56–65', value: 10 },
      { label: '65 dan yuqori', value: 3 },
    ],
  },

  students: {
    date: '--.--.----',
    total: 683,
    local: 683,
    foreign: null,
    attendance: '97.71%',
    lessons: { total: 208209, missed: 4777 },
    certificates: { international: 30, national: 240 },
    // Tanlov va olimpiadalar g'oliblari (manba: l4_1_international_olympiad, l4_1_national_stage)
    competitions: { international: 0, republic: 0 },
  },

  admission: {
    date: '--.--.----',
    quota: 338,
    applicants: 2263,
  },

  buildings: {
    date: '01.07.2026',
    educationalCapacity: 875,
    residenceCapacity: 200,
  },

  graduates: {
    date: '01.07.2026',
    total: 311,
    // Yakuniy attestatsiya (YaAK) baholarining o'rtachasi, 5 ballik shkala (manba: l3_2_average_grade)
    averageGrade: 4.71,
    // OTMga kirganlar — OTMning xalqaro reytingidagi o'rni bo'yicha
    admissions: [
      { label: 'Top 100 OTMlar', count: 0 },
      { label: 'Top 500 OTMlar', count: 0 },
      { label: 'Top 1000 OTMlar', count: 0 },
      {
        label: 'Top 1000 dan tashqari OTMlar',
        count: 279,
        // OTMlar ro'yxati — TAXMINIY (namuna) raqamlar, jami 279 ga teng. Haqiqiy ma'lumot kelganda almashtiriladi.
        universities: [
          { name: 'Abu Rayhon Beruniy nomidagi Urganch davlat universiteti', count: 74, founder: true },
          { name: 'Urganch davlat pedagogika instituti', count: 38 },
          { name: 'Toshkent tibbiyot akademiyasi Urganch filiali', count: 26 },
          { name: 'Muhammad al-Xorazmiy nomidagi TATU Urganch filiali', count: 24 },
          { name: 'Urganch innovatsion universiteti', count: 18 },
          { name: 'Mirzo Ulug‘bek nomidagi O‘zbekiston Milliy universiteti', count: 15 },
          { name: 'Toshkent davlat iqtisodiyot universiteti', count: 14 },
          { name: 'Urganch RANCH texnologiya universiteti', count: 12 },
          { name: 'Islom Karimov nomidagi Toshkent davlat texnika universiteti', count: 11 },
          { name: 'Sharof Rashidov nomidagi Samarqand davlat universiteti', count: 9 },
          { name: 'Toshkent davlat yuridik universiteti', count: 8 },
          { name: 'Jahon iqtisodiyoti va diplomatiya universiteti', count: 5 },
          { name: 'Buxoro davlat universiteti', count: 5 },
          { name: 'Toshkent davlat sharqshunoslik universiteti', count: 4 },
          { name: 'Toshkent davlat agrar universiteti', count: 4 },
          { name: 'Toshkent arxitektura-qurilish universiteti', count: 3 },
          { name: 'O‘zbekiston davlat jahon tillari universiteti', count: 3 },
          { name: 'Toshkent kimyo-texnologiya instituti', count: 2 },
          { name: 'Nukus davlat pedagogika instituti', count: 2 },
          { name: 'Berdaq nomidagi Qoraqalpoq davlat universiteti', count: 2 },
        ],
      },
    ],
    admissionsSample: true,
    // Ta'sischi OTM (alohida pasporti bor)
    founder: {
      name: 'Abu Rayhon Beruniy nomidagi Urganch davlat universiteti',
      href: 'https://nqaae.uz/uz/higher/201651846',
      logo: 'uploads/founder-logo.png',
      admitted: 74,
    },
  },

  survey: {
    years: ['2026'],
    // items: [{ question, positive, negative }]
    groups: [{ title: "O'quvchilar", items: [] }],
  },

  // Akkreditatsiya (namuna ma'lumotlar — skrinshotdagidek)
  accreditation: {
    sample: true, // sanalar namuna (skrinshotdan); haqiqiy sanalar kelganda false qiling
    complex: {
      status: 'in_progress', // 'passed' | 'failed' | 'in_progress'
      dates: [
        { label: 'Oxirgi tekshiruv', value: '31.12.2020' },
        { label: 'Ichki baholash tugash muddati', value: '21.10.2026' },
        { label: "Ekspertlar tomonidan hujjatlarni onlayn o'rganish muddati", value: '60 kun' },
        { label: 'Joyiga chiqish muddati boshlanishi*', value: '20.12.2026' },
        { label: 'Joyiga chiqish muddati tugashi*', value: '30.12.2026' },
        { label: 'Yakuniy xulosa tayyorlash muddati', value: '20.01.2027' },
        { label: 'Akkreditatsiya komissiyasi qarori oxirgi muddati', value: '19.02.2027' },
      ],
    },
  },

  rating: {
    date: '--.--.----',
    chart: [
      { label: 'Akademik faoliyat (ball)', value: 5 },
      { label: 'Ilmiy faoliyat (ball)', value: 2 },
      { label: 'Xalqaro faoliyat (ball)', value: 3 },
      { label: 'Bitiruvchilar sifati (ball)', value: 5 },
    ],
  },

  contacts: {
    phone: '+998 62 229 38 19',
    website: 'https://urdulitsey.uz/',
    email: 'raximov.atabek3103@gmail.com',
    address: "8763, Maʼrifat MFY, Fayozov ko'chasi, 27-uy, 220100",
    // Xaritada qidirish uchun (shahar + ko'cha). Aniq koordinata bo'lsa: mapPoint: [uzunlik, kenglik]
    mapQuery: "Urganch, Fayozov ko'chasi, 27",
  },
}

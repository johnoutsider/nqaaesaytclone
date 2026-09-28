// Texnikum ma'lumotlari (nqaae.uz/uz/vocational/200056906 sahifasidan olingan, 28.09.2026).
// Boshqa texnikumni ko'rsatish uchun shu faylni o'zgartirish kifoya.
// null qiymat => "mavjud emas" ko'rinadi.
import surveyGroups from './vocational-survey.json'

export const vocational = {
  stir: '200056906',
  name: '1-son Namangan Abu Ali ibn Sino nomidagi Jamoat salomatligi texnikumi',
  logo: 'assets/public/images/logo-placeholder.jpg', // asl saytda logotip yo'q
  ownership: 'Davlat',
  region: 'Namangan shahri',
  foundedYear: 2025,

  programs: {
    date: '--.--.----',
    total: 12,
    local: 12,
    joint: null, // qo'shma ta'lim dasturlari
  },

  teachers: {
    date: '24.06.2026',
    total: 39,
    women: 20,
    men: 19,
    // Pedagoglar tarkibi (lavozim turi bo'yicha)
    composition: [
      { key: 'Umumta’lim fan o‘qituvchilari', value: 19 },
      { key: 'Maxsus fan o‘qituvchilari', value: 21 },
      { key: 'Ishlab chiqarish ta’lim ustalari', value: null },
    ],
    // Malaka toifasi
    qualification: [
      { key: 'Bosh o‘qituvchi', value: 2 },
      { key: 'Yetakchi o‘qituvchi', value: 11 },
      { key: 'Katta o‘qituvchi', value: 1 },
      { key: 'Toifasiz — oliy ma’lumotli', value: 0 },
      { key: 'Toifasiz — o‘rta maxsus ma’lumotli', value: 26 },
    ],
    // Pedagoglar salohiyati
    perHundredStudents: 3.2, // har 100 ta o'quvchiga pedagog
    doctors: null, // fan doktori
    candidates: null, // fan nomzodi
    // Yosh tarkibi (asl saytdan — haqiqiy ma'lumot)
    avgAge: 38,
    ages: [
      { label: '30 yoshgacha', value: 14 },
      { label: '31–40', value: 10 },
      { label: '41–50', value: 9 },
      { label: '51–60', value: 5 },
      { label: '60 dan yuqori', value: 2 },
    ],
  },

  students: {
    date: '18.05.2026',
    total: 1204,
    women: 1108,
    men: 96,
    dual: 1, // dual ta'limdagi o'quvchilar
    // Eng ko'p o'qilayotgan kasb va mutaxassisliklar
    specialties: [
      { name: 'Hamshiralik ishi', count: 373 },
      { name: 'Davolash ishi', count: 323 },
      { name: 'Feldsherlik ishi', count: 156 },
    ],
  },

  admission: {
    year: '2025/2026',
    plan: 1770, // tasdiqlangan qabul rejasi
    admitted: 1696, // amalda qabul qilinganlar
    grant: 289,
    contract: 1407,
    grade9: 0, // 9-sinf negizida
    grade11: 1696, // 11-sinf negizida
    popular: ['Hamshiralik ishi', 'Davolash ishi'], // ommabop mutaxassisliklar (tartib bo'yicha)
  },

  graduates: {
    year: '2025',
    total: 263,
    women: 232,
    men: 31,
    grant: 26,
    contract: 237,
    forms: [
      { key: 'Kunduzgi', value: 263 },
      { key: 'Sirtqi', value: 0 },
      { key: 'Kechki', value: 0 },
      { key: 'Dual ta’lim', value: 0 },
    ],
    popular: [
      { name: 'Hamshiralik ishi', count: 108 },
      { name: 'Feldsher-akusherlik ishi', count: 50 },
    ],
  },

  buildings: {
    educationalCapacity: 1260,
    residenceCapacity: null, // talabalar yotoqxonasi mavjud emas
  },

  survey: {
    years: ['2026'],
    groups: surveyGroups, // Professor-o'qituvchilar (18 savol), Talabalar (18 savol)
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
    phone: ['+998 (69) 227-08-61', '+998 (69) 227-27-90'],
    basis: '23.10.2025 PF-190',
    email: 'abualiibnsinoJST@gmail.com',
    address: "160100, Namangan viloyati, Namangan, U.Nosir ko'chasi, 14",
    mapPoint: [71.65088, 41.00214], // [uzunlik, kenglik] — asl saytdagi koordinata
  },
}

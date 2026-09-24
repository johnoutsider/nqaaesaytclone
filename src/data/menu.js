// Asosiy menyu (header va mobil menyu uchun umumiy)
export const SITE = 'https://nqaae.uz/uz/'
const u = (p) => SITE + p

export const menu = [
  {
    title: 'Agentlik',
    children: [
      { title: 'Agentlik haqida', href: u('about') },
      { title: 'Jamoa', href: u('structure') },
      { title: 'Huquqiy asoslar', href: u('accepted-document-agency') },
      {
        title: 'Xalqaro hamkorlik',
        children: [
          { title: 'Xalqaro hamkorlik haqida', href: u('international-partnership') },
          { title: 'Xalqaro tashkilotlar bilan tuzilgan kelishuvlar', href: u('agreements') },
          { title: "Xalqaro tarmoqlarga a'zolik", href: u('certificates') },
          { title: 'Xalqaro akkreditatsiya tashkilotlari reyestri', href: u('international-accreditation') },
        ],
      },
      { title: 'Xalqaro boshqaruv kengashi', href: u('governing-board') },
      { title: "Bog'lanish", href: u('contacts') },
    ],
  },
  {
    title: 'Akkreditatsiya',
    children: [
      { title: 'Akkreditatsiya', href: u('accreditation_self') },
      {
        title: 'Kompleks akkreditatsiya',
        children: [
          { title: 'Oʻrta maxsus ta’lim', href: u('accreditation-comprehensive_secondary_special') },
          { title: "Kasbiy ta'lim", href: u('accreditation-comprehensive_vocational') },
          { title: "Oliy ta'lim", href: u('accreditation-comprehensive_higher') },
          { title: "Oliy ta'limdan keyingi ta'lim", href: u('accreditation-comprehensive_postgraduate') },
          { title: 'Kadrlarni qayta tayyorlash va malakasini oshirish', href: u('accreditation-comprehensive_professional_training') },
        ],
      },
      {
        title: 'Maxsus akkreditatsiya',
        children: [
          { title: 'Oʻrta maxsus ta’lim', href: u('accreditation_special_secondary_special') },
          { title: "Kasbiy ta'lim", href: u('accreditation_special_vocational') },
          { title: "Oliy ta'lim", href: u('accreditation_special_higher') },
          { title: "Oliy ta'limdan keyingi ta'lim", href: u('accreditation_special_postgraduate') },
          { title: 'Kadrlarni qayta tayyorlash va malakasini oshirish', href: u('accreditation_special_professional_training') },
        ],
      },
      {
        title: 'Akkreditatsiya rejasi',
        children: [
          { title: "O'rta maxsus ta'lim", href: u('accreditation_plan_secondary_special') },
          { title: "Kasbiy ta'lim", href: u('accreditation_plan_vocational') },
          { title: "Oliy ta'lim", href: u('accreditation_plan_higher') },
          { title: "Oliy ta'limdan keyingi ta'lim", href: u('accreditation_plan_postgraduate') },
          { title: 'Kadrlarni qayta tayyorlash va malakasini oshirish', href: u('accreditation_plan_professional_training') },
        ],
      },
      {
        title: 'Ekspertlar komissiyasi',
        children: [
          { title: 'Ekspertlar reyestri', href: u('experts') },
          { title: "Umumiy ma'lumot", href: u('strategy') },
          { title: 'Ariza topshirish', href: u('expert-apply') },
          { title: 'Ekspertlar statistikasi', href: u('expert-registry') },
          { title: 'Komissiya yo‘nalishlari', href: u('commission-directions') },
        ],
      },
      { title: 'Akkreditatsiya komissiyasi', href: u('accreditation-tasks') },
      {
        title: 'Akkreditatsiya reyestri',
        children: [
          { title: 'Xorijiy akkreditatsiya reyestr', href: u('foreign-accreditation-registry') },
          {
            title: 'Davlat akkreditatsiyasi reyestri',
            children: [
              { title: 'Oʻrta maxsus ta’lim', href: u('state-accreditation-register-secondary-specialized') },
              { title: "Kasbiy ta'lim", href: u('state-accreditation-register-education-vocational') },
              { title: "Oliy ta'lim", href: u('state-accreditation-register') },
              { title: "Oliy ta'limdan keyingi ta'lim", href: u('state-accreditation-register-research-institutions') },
              { title: 'Kadrlarni qayta tayyorlash va malakasini oshirish', href: u('state-accreditation-register-advanced-training') },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Reyting',
    children: [
      { title: "Oliy ta'lim tashkilotlari", href: u('higher-education-institutions') },
      { title: 'O‘rta maxsus ta’lim tashkilotlari', href: u('secondary-specialized-educational-organizations') },
      { title: "Kasbiy ta'lim tashkilotlari", href: u('vocational-education-organizations') },
      {
        title: "Umummilliy so'rovnoma",
        children: [
          { title: 'Oliy ta’lim', href: u('questionnaire-higher') },
          { title: 'Kasbiy ta’lim', href: u('questionnaire-vocational') },
          { title: 'O‘rta maxsus ta’lim', href: u('questionnaire-secondary') },
        ],
      },
    ],
  },
  {
    title: "Ochiq ma'lumotlar",
    children: [
      {
        title: 'Ta’lim tashkilotlari roʻyxati',
        children: [
          { title: "Oliy ta'lim tashkilotlari", href: u('higher') },
          { title: "O'rta maxsus ta'lim tashkilotlari", href: u('secondary') },
          { title: "Kasbiy ta'lim tashkilotlari", href: u('vocational') },
          { title: "Oliy ta'limdan keyingi ta'lim tashkilotlari", href: u('aspirant') },
          { title: "Kadrlarni qayta tayyorlash va malaka oshirish ta'lim tashkilotlari", href: u('training') },
        ],
      },
      { title: 'Davlat xizmati bo‘yicha murojaatlarning holati', href: u('application-status') },
      { title: "Bo'sh ish o'rinlari", href: u('vacancy') },
      { title: 'Korrupsiyaga qarshi kurashish', href: u('anti-corruption-policies') },
      { title: 'Ustoz-shogird dasturi ishtirokchilari', href: u('intern') },
      { title: 'Bitiruvchilar sifati indeksi', href: 'https://bsi.nqaae.uz/' },
      { title: 'Byurokratiyani bartaraf etish — 2030', href: u('bureaucracy-2030') },
    ],
  },
  { title: 'Yangiliklar', href: u('news') },
  {
    title: 'Ilm-fan va tadqiqotlar',
    children: [
      { title: 'Tadqiqotchilar hamjamiyati', href: u('menu/tadqiqotchilar-hamjamiyati') },
      { title: 'Ilmiy nashrlar', href: u('menu/tahlillar') },
      { title: 'Tahlil va sharhlar', href: u('analysis') },
      { title: 'Tadqiqot mavzulari', href: u('menu/dolzarb-mavzular') },
    ],
  },
  {
    title: 'FAQ',
    children: [
      { title: 'Agentlik haqida', href: u('faq/tashkilot-haqida') },
      { title: 'Akkreditatsiya haqida', href: u('faq/akkreditatsiya-haqida1') },
      { title: 'Reyting haqida', href: u('faq/reyting-haqida') },
    ],
  },
]

export const contacts = {
  emails: ['info@nqaae.uz', 'nqaae@exat.uz'],
  phone: { label: '+998 55 505-30-30', tel: '998555053030' },
  callCenter: { label: '+998 55 505-40-40', tel: '998555054040' },
  address: 'Toshkent shahri, Olmazor tumani, Universitet koʻchasi, 7-uy',
}

export const socials = [
  { title: 'Facebook', icon: 'i-facebook-1', href: 'https://facebook.com/nqaaeuz' },
  { title: 'Linkedin', icon: 'i-linkedin-1', href: 'https://www.linkedin.com/company/national-quality-assurance-agency-in-education/' },
  { title: 'Telegram', icon: 'i-telegram-1', href: 'https://t.me/nqaaeuz' },
  { title: 'Instagram', icon: 'i-instagram-1', href: 'https://instagram.com/nqaaeuz' },
]

export const orgLists = [
  { key: 'higher', title: "Oliy ta'lim tashkilotlari", href: u('higher') },
  { key: 'secondary', title: "O'rta maxsus ta'lim tashkilotlari", href: u('secondary') },
  { key: 'vocational', title: "Kasbiy ta'lim tashkilotlari", href: u('vocational') },
  { key: 'aspirant', title: "Oliy ta'limdan keyingi ta'lim tashkilotlari", href: u('aspirant') },
  { key: 'training', title: "Kadrlarni qayta tayyorlash va malaka oshirish ta'lim tashkilotlari", href: u('training') },
]

// Texnikum pasporti (#/texnikum) — texnikumning o'z ko'rsatkichlari, sodda ko'rinishda.
// Reyting hali e'lon qilinmagan: ball, o'rin va boshqa texnikumlar bilan solishtirish KO'RSATILMAYDI.
// Ma'lumot: src/data/vocational-passport.json (Excel'dan, scripts/texnikum_excel_to_json.py) +
// src/data/vocational.js (nqaae.uz pasportidan: yosh, mutaxassisliklar, so'rovnoma savollari, bino, bog'lanish).
import passport from '../../data/vocational-passport.json'
import programs from '../../data/vocational-programs.json' // scripts/talim_dasturlari_to_json.py — faqat yig'ma sonlar
import { IMG, SectionTop, OverviewCard } from '../university/common.jsx'
import UniversityHeader from '../university/UniversityHeader.jsx'
import { BreakdownCard, AgeStructure } from '../university/Teachers.jsx'
import { CertItem } from '../university/PeopleCertificates.jsx'
import Buildings from '../university/Buildings.jsx'
import Survey from '../university/Survey.jsx'
import Rating from '../university/Rating.jsx'
import Contacts from '../university/Contacts.jsx'

const fmt = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
const pct = (part, whole, d = 0) => (whole > 0 ? ((part / whole) * 100).toFixed(d).replace('.', ',') : '0')

// Sodda ro'yxat: nom — qiymat
function FactList({ title, rows, icon = 'university-direction.svg', note }) {
  return (
    <div className="content-section__inner h-100">
      <h2 className="university-bars--title">
        <img src={`${IMG}/${icon}`} alt="" /> {title}
      </h2>
      <div className="qual-list">
        {rows.map((r) => (
          <div key={r.label} className={`qual-list__row ${r.muted ? 'is-muted' : ''}`}>
            <span className="qual-list__name">{r.label}</span>
            <span className="qual-list__count"><b>{r.value}</b> {r.unit ?? 'nafar'}</span>
          </div>
        ))}
      </div>
      {note && <p className="teacher-certs__note mt-3">{note}</p>}
    </div>
  )
}

// Foiz kartochkasi: sarlavha, katta foiz, chiziq, izoh
function PercentCard({ label, percent, text, note, variant = 'intl', icon = 'university-stat-1.svg' }) {
  return (
    <div className={`teacher-certs__item teacher-certs__item--${variant} h-100`}>
      <div className="teacher-certs__top">
        <div className="teacher-certs__icon">
          <img src={`${IMG}/${icon}`} alt="" />
        </div>
        <div className="teacher-certs__text">
          <p className="teacher-certs__label">{label}</p>
          {text && <p className="teacher-certs__value"><span className="teacher-certs__unit">{text}</span></p>}
        </div>
        <div className="teacher-certs__percent">{percent}%</div>
      </div>
      <div className="teacher-certs__bar">
        <span style={{ width: `${Math.min(100, parseFloat(String(percent).replace(',', '.')) || 0)}%` }}></span>
      </div>
      {note && <p className="teacher-certs__note">{note}</p>}
    </div>
  )
}

// Ta'lim dasturlari: dastur nomi va o'quvchilar soni — bitta 100% ulushlar chizig'i + rangli ro'yxat
// (4 ta variantdan foydalanuvchi tanlagani: "D — ulushlar chizig'i", 29.09.2026).
const PROG_COLORS = ['#3E7BB6', '#19AE8B', '#FFA151', '#7161FF', '#E187FF', '#4E95DA', '#23939F', '#F2C94C', '#B3BCCB']

function ProgramsShare() {
  return (
    <div>
      <div className="pv-share__bar">
        {programs.programs.map((p, i) => (
          <span key={p.name} title={`${p.name}: ${p.total}`} style={{ width: `${(p.total / programs.total) * 100}%`, background: PROG_COLORS[i % PROG_COLORS.length] }}></span>
        ))}
      </div>
      <div className="pv-share__legend">
        {programs.programs.map((p, i) => (
          <div key={p.name} className="pv-share__item">
            <i style={{ background: PROG_COLORS[i % PROG_COLORS.length] }}></i>
            <span className="pv-share__name">{p.name}</span>
            <b>{fmt(p.total)}</b>
            <small>{pct(p.total, programs.total)}%</small>
          </div>
        ))}
      </div>
    </div>
  )
}

function Programs() {
  return (
    <div id="talim-dasturlari">
      <SectionTop title="Ta'lim dasturlari" />
      <div className="content-section__inner mb-3">
        <h2 className="university-bars--title">
          <img src={`${IMG}/vocational-famous.svg`} alt="" /> Dasturlar va o'quvchilar soni
        </h2>
        <ProgramsShare />
      </div>
    </div>
  )
}

// Jalb qilingan mutaxassislar va ilmiy salohiyat: ikki blok — jami raqam, jamoadagi ulushi va qisqa ro'yxat
// (3 ta variantdan foydalanuvchi tanlagani: "B — jami + ro'yxat", 29.09.2026).
function expertGroups(d) {
  const [P, ilmiy, xorijdan, top1000] = d['K1.1']
  const [, soha, xorijiy, otm] = d['K1.7']
  return {
    P,
    groups: [
      {
        title: 'Jalb qilingan mutaxassislar',
        color: '#19AE8B',
        items: [
          { label: 'Ishlab chiqarishdan (soha mutaxassisi)', short: 'Soha mutaxassisi', value: soha },
          { label: 'Xorijiy mutaxassis', short: 'Xorijiy mutaxassis', value: xorijiy },
          { label: 'OTT professori', short: 'OTT professori', value: otm },
        ],
      },
      {
        title: 'Ilmiy salohiyat',
        color: '#7161FF',
        items: [
          { label: 'Ilmiy darajali pedagog', short: 'Ilmiy darajali', value: ilmiy },
          { label: 'Xorijdan jalb qilingan pedagog', short: 'Xorijdan jalb qilingan', value: xorijdan },
          { label: 'TOP-1 000 OTM diplomiga ega', short: 'TOP-1 000 OTM diplomi', value: top1000 },
        ],
      },
    ],
  }
}

function ExpertsSummary({ d }) {
  const { P, groups } = expertGroups(d)
  return (
    <div className="ex-sum">
      {groups.map((g) => {
        const total = g.items.reduce((s, i) => s + i.value, 0)
        return (
          <div key={g.title} className="ex-sum__block" style={{ '--c': g.color }}>
            <p className="ex-sum__title">{g.title}</p>
            <p className="ex-sum__big"><b>{total}</b> nafar</p>
            <p className="ex-sum__sub">{total ? `${pct(total, P + (g.title.startsWith('Jalb') ? total : 0))}% — jamoadagi ulushi` : 'Hozircha yo‘q'}</p>
            <div className="ex-sum__list">
              {g.items.map((it) => (
                <p key={it.label}><span>{it.short}</span><b>{it.value}</b></p>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ExpertsCard({ d }) {
  return (
    <div className="content-section__inner h-100">
      <h2 className="university-bars--title">
        <img src={`${IMG}/university-direction.svg`} alt="" /> Jalb qilingan mutaxassislar va ilmiy salohiyat
      </h2>
      <ExpertsSummary d={d} />
    </div>
  )
}

function Teachers({ d, site }) {
  const [P, bosh, yetakchi, katta] = d['K1.2']
  const [, soha, xorijiy, otm] = d['K1.7']
  const [, xCert, mCert] = d['K1.5']
  const [, ustaKurs, pedKurs, xorijda] = d['K1.3']
  return (
    <div>
      <SectionTop title="Pedagoglar" date={passport.date} />
      <OverviewCard
        items={[
          { label: 'Jami pedagoglar', value: P },
          { label: 'Ishlab chiqarishdan jalb qilinganlar', value: soha + xorijiy + otm, icon: 'university-stat-1.svg' },
        ]}
      />
      <div className="row">
        <div className="col-lg-6 mb-3">
          <BreakdownCard
            title="Malaka toifasi"
            total={P}
            items={[
              { key: 'Bosh o‘qituvchi', value: bosh },
              { key: 'Yetakchi o‘qituvchi', value: yetakchi },
              { key: 'Katta o‘qituvchi', value: katta },
              { key: 'Toifasiz', value: Math.max(P - bosh - yetakchi - katta, 0) },
            ]}
          />
        </div>
        <div className="col-lg-6 mb-3">
          <ExpertsCard d={d} />
        </div>
      </div>
      <div className="content-section__inner teacher-certs mb-3">
        <h2 className="university-bars--title">
          <img src={`${IMG}/university-direction.svg`} alt="" /> Sertifikatlar va malaka oshirish
        </h2>
        <div className="teacher-certs__grid mb-3">
          <CertItem label="Xalqaro sertifikatga ega" count={xCert} total={P} unit="pedagog" variant="intl" />
          <CertItem label="Milliy sertifikatga ega" count={mCert} total={P} unit="pedagog" variant="national" />
        </div>
        <div className="teacher-certs__grid">
          <CertItem label="Respublika malaka oshirish kurslari" count={pedKurs + ustaKurs} total={P} unit="pedagog" variant="teal" />
          <CertItem label="Xorijda stajirovka (oflayn)" count={xorijda} total={P} unit="pedagog" variant="purple" />
        </div>
      </div>
      <AgeStructure
        items={site.ages}
        total={site.ages.reduce((s, a) => s + a.value, 0)}
        summary={[
          { label: '30 yoshgacha yosh pedagoglar', from: 0, to: 1, variant: 'young' },
          { label: '50 yoshdan katta pedagoglar', from: -2, variant: 'senior' },
        ]}
      />
    </div>
  )
}

// Tanlov g'oliblari + kurslar kesimi.
// VAQTINCHA: 3 ta ko'rinish varianti (A–C) — foydalanuvchi bittasini tanlaydi.
const COMP_GROUPS = [
  { title: 'Kasbiy tanlovlar', color: '#FFA151', idx: [0, 1, 2, 3] },
  { title: 'Olimpiadalar', color: '#7161FF', idx: [4, 5, 6] },
]
const COMP_NAMES = ['WorldSkills', 'Milliy tanlov — respublika', 'Milliy tanlov — hudud', 'Boshqa kasbiy tanlovlar', 'Xalqaro olimpiada', 'Olimpiada — respublika bosqichi', 'Boshqa tanlovlar']
const COURSE_COLORS = ['#3E7BB6', '#19AE8B', '#FFA151', '#7161FF']

function CardHead({ children, icon = 'university-direction.svg' }) {
  return (
    <h2 className="university-bars--title">
      <img src={`${IMG}/${icon}`} alt="" /> {children}
    </h2>
  )
}

// A — tanlovlar: 2 guruh plitkalari (bor bo'lsa rangli); kurslar: 3 ta katta raqamli plitka
function CompTilesA({ vals }) {
  const total = vals.reduce((s, v) => s + v, 0)
  return (
    <div className="content-section__inner h-100">
      <CardHead>Tanlov va olimpiada g'oliblari</CardHead>
      <p className="cv-total"><b>{total}</b> nafar g'olib</p>
      {COMP_GROUPS.map((g) => (
        <div key={g.title} className="cv-group" style={{ '--c': g.color }}>
          <p className="cv-group__title">{g.title}</p>
          <div className="cv-tiles">
            {g.idx.map((i) => (
              <div key={i} className={`cv-tile ${vals[i] ? 'is-on' : ''}`}>
                <b>{vals[i]}</b>
                <span>{COMP_NAMES[i]}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
function CoursesTilesA() {
  const entries = Object.entries(programs.courses)
  return (
    <div className="content-section__inner h-100">
      <CardHead>Kurslar kesimida</CardHead>
      <div className="cv-course-tiles">
        {entries.map(([k, v], i) => (
          <div key={k} className="cv-course-tile" style={{ '--c': COURSE_COLORS[i] }}>
            <span>{k}-kurs</span>
            <b>{fmt(v)}</b>
            <small>{pct(v, programs.total)}% o'quvchilar</small>
            <div className="cv-course-tile__bar"><i style={{ width: `${pct(v, programs.total)}%` }}></i></div>
          </div>
        ))}
      </div>
    </div>
  )
}

// B — tanlovlar: jami + ikki guruh yig'indisi (ixcham); kurslar: vertikal ustunlar
function CompCompactB({ vals }) {
  const total = vals.reduce((s, v) => s + v, 0)
  return (
    <div className="content-section__inner h-100">
      <CardHead>Tanlov va olimpiada g'oliblari</CardHead>
      <div className="cv-compact">
        <div className="cv-compact__big">
          <b>{total}</b>
          <span>nafar g'olib</span>
        </div>
        <div className="cv-compact__groups">
          {COMP_GROUPS.map((g) => (
            <div key={g.title} className="cv-compact__group" style={{ '--c': g.color }}>
              <p className="cv-compact__head"><span>{g.title}</span><b>{g.idx.reduce((s, i) => s + vals[i], 0)}</b></p>
              {g.idx.map((i) => (
                <p key={i} className="cv-compact__row"><span>{COMP_NAMES[i]}</span><b>{vals[i]}</b></p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
function CoursesColumnsB() {
  const entries = Object.entries(programs.courses)
  const max = Math.max(...entries.map(([, v]) => v), 1)
  return (
    <div className="content-section__inner h-100">
      <CardHead>Kurslar kesimida</CardHead>
      <div className="cv-cols">
        {entries.map(([k, v], i) => (
          <div key={k} className="cv-col">
            <span className="cv-col__val">{fmt(v)} <small>{pct(v, programs.total)}%</small></span>
            <div className="cv-col__track">
              <i style={{ height: `${(v / max) * 100}%`, background: COURSE_COLORS[i] }}></i>
            </div>
            <span className="cv-col__label">{k}-kurs</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// C — bitta keng karta: chapda kurslar (bo'lingan chiziq, raqam ichida), o'ngda tanlovlar belgi (chip) ko'rinishida
function CompCoursesWideC({ vals }) {
  const entries = Object.entries(programs.courses)
  return (
    <div className="content-section__inner mb-3 cv-wide">
      <div className="cv-wide__part">
        <CardHead>Kurslar kesimida</CardHead>
        <div className="cv-seg">
          {entries.map(([k, v], i) => (
            <span key={k} style={{ flex: v, background: COURSE_COLORS[i] }}>
              <b>{fmt(v)}</b> {k}-kurs
            </span>
          ))}
        </div>
        <p className="cv-seg__note">Jami {fmt(programs.total)} o'quvchi</p>
      </div>
      <div className="cv-wide__part">
        <CardHead>Tanlov va olimpiada g'oliblari</CardHead>
        <div className="cv-chips">
          {COMP_NAMES.map((n, i) => (
            <span key={n} className={`cv-chip ${vals[i] ? 'is-on' : ''}`}>
              {n} <b>{vals[i]}</b>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function CompCoursesVariant({ d, variant }) {
  const vals = d['K4.1'].slice(1, 8)
  const tag = { A: 'Plitkalar', B: 'Ixcham + ustunlar', C: 'Bitta keng karta' }[variant]
  return (
    <div className="cv-variant">
      <span className="cv-variant__tag">Variant {variant} · {tag}</span>
      {variant === 'C' ? (
        <CompCoursesWideC vals={vals} />
      ) : (
        <div className="row">
          <div className="col-lg-6 mb-3">{variant === 'A' ? <CompTilesA vals={vals} /> : <CompCompactB vals={vals} />}</div>
          <div className="col-lg-6 mb-3">{variant === 'A' ? <CoursesTilesA /> : <CoursesColumnsB />}</div>
        </div>
      )}
    </div>
  )
}

function Students({ d, site }) {
  const [O, xCert, mCert] = d['K4.2']
  const [, dual] = d['K3.3']
  const [hours, missed] = d['K2.3']
  const [, intlStudents] = d['K2.5']
  return (
    <div>
      <SectionTop title="O'quvchilar" date={passport.date} />
      {/* Ta'lim shakllari (foydalanuvchi tanlagan variant B, 29.09.2026) */}
      <OverviewCard
        items={[
          { label: "Jami o'quvchilar", value: O },
          { label: "Dual ta'limda", value: dual },
          { label: "Xalqaro va qo'shma dasturlarda", value: intlStudents },
        ]}
      />
      {/* Davomat — to'liq kenglikda (dual va xalqaro dasturlar yuqoridagi kartada) */}
      <div className="mb-3">
        <PercentCard
          label="Davomat"
          percent={pct(hours - missed, hours, 1)}
          variant="national"
          icon="calendar-uni.svg"
          text="O'quv mashg'ulotlariga qatnashish darajasi"
          note={`${fmt(hours)} dars soatidan ${fmt(missed)} soati sababsiz qoldirilgan`}
        />
      </div>
      <div className="content-section__inner teacher-certs mb-3">
        <h2 className="university-bars--title">
          <img src={`${IMG}/university-direction.svg`} alt="" /> Sertifikatga ega o'quvchilar
        </h2>
        <div className="teacher-certs__grid">
          <CertItem label="Xalqaro sertifikatga ega" count={xCert} total={O} unit="o'quvchi" variant="intl" />
          <CertItem label="Milliy sertifikatga ega" count={mCert} total={O} unit="o'quvchi" variant="national" />
        </div>
      </div>
      <CompCoursesVariant d={d} variant="A" />
      <CompCoursesVariant d={d} variant="B" />
      <CompCoursesVariant d={d} variant="C" />
    </div>
  )
}

function Admission({ d }) {
  const [plan, admitted] = d['K2.4']
  const free = Math.max(plan - admitted, 0)
  const done = plan > 0 ? Math.min(100, (admitted / plan) * 100) : 0
  return (
    <div>
      <SectionTop title="Qabul" date={passport.date} />
      <div className="grad-overview mb-3">
        <div className="grad-overview__stats">
          <div className="grad-overview__stat">
            <div className="teacher-certs__icon"><img src={`${IMG}/university-stat-1.svg`} alt="" /></div>
            <div>
              <p className="teacher-certs__label">Qabul rejasi</p>
              <p className="grad-overview__value"><b className="teacher-certs__num">{fmt(plan)}</b> <span className="teacher-certs__unit">o'rin</span></p>
            </div>
          </div>
          <div className="grad-overview__divider"></div>
          <div className="grad-overview__stat">
            <div className="teacher-certs__icon"><img src={`${IMG}/university-staff-1.svg`} alt="" /></div>
            <div>
              <p className="teacher-certs__label">Qabul qilinganlar</p>
              <p className="grad-overview__value"><b className="teacher-certs__num">{fmt(admitted)}</b> <span className="teacher-certs__unit">nafar</span></p>
            </div>
          </div>
        </div>
        <div className="grad-overview__split">
          <span className="is-in" style={{ width: `${done}%` }}></span>
          {free > 0 && <span className="is-rest" style={{ width: `${100 - done}%` }}></span>}
        </div>
        <div className="grad-overview__legend">
          <span><i className="is-in"></i>{fmt(admitted)} nafar qabul qilindi</span>
          {free > 0 && <span><i className="is-rest"></i>{fmt(free)} o'rin bo'sh qoldi</span>}
        </div>
      </div>
    </div>
  )
}

function Graduates({ d, popular }) {
  const [B, tadbirkor, ish, oqish] = d['K3.4']
  const band = tadbirkor + ish + oqish
  return (
    <div>
      <SectionTop title="Bitiruvchilar" date={passport.date} />
      <OverviewCard
        items={[
          { label: 'Jami bitiruvchilar', value: B },
          { label: 'Band bitiruvchilar', value: band },
          { label: 'Band bitiruvchilar ulushi', display: pct(band, B), unit: '%', icon: 'university-stat-1.svg' },
        ]}
      />
      <div className="row">
        <div className="col-lg-7 mb-3">
          <BreakdownCard
            title="Bitiruvchilar qayerda?"
            total={B}
            colors={['#0E7C66', '#19AE8B', '#4E95DA', '#D5DCE8']}
            items={[
              { key: 'Tadbirkor / ta’sischi', value: tadbirkor },
              { key: 'Ish bilan band', value: ish },
              { key: 'O‘qishni davom ettirmoqda / o‘zini band qilgan', value: oqish },
              { key: 'Ma’lumot yo‘q', value: Math.max(B - band, 0) },
            ]}
          />
        </div>
        <div className="col-lg-5 mb-3">
          <FactList
            title="Ommabop mutaxassisliklar"
            icon="vocational-famous.svg"
            rows={popular.map((p) => ({ label: p.name, value: p.count }))}
            note="nqaae.uz pasporti bo'yicha, 2025 yil bitiruvchilari"
          />
        </div>
      </div>
    </div>
  )
}

function Production({ d }) {
  const [, davlat, boshqa] = d['K3.2']
  return (
    <div>
      <SectionTop title="Ishlab chiqarish va xizmatlar" date={passport.date} />
      <div className="row">
        <div className="col-lg-6 mb-3">
          <FactList
            title="O‘quvchilar mahsulot va xizmatlaridan tushum"
            rows={[
              { label: 'Davlat xaridlari', value: fmt(davlat), unit: "so'm" },
              { label: 'Boshqa tushumlar', value: fmt(boshqa), unit: "so'm" },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

function Opinions({ d }) {
  const items = [
    ['K1.6', 'Pedagoglar qoniqishi', 'intl'],
    ['K1.8', "O'quvchilar qoniqishi", 'national'],
    ['K2.1', 'Sharoitlardan qoniqish', 'teal'],
    ['K2.2', 'Moddiy-texnik baza', 'purple'],
  ]
  return (
    <div className="content-section__inner teacher-certs mb-3">
      <h2 className="university-bars--title">
        <img src={`${IMG}/university-direction.svg`} alt="" /> So'rovnoma xulosasi — ijobiy javoblar ulushi
      </h2>
      <div className="teacher-certs__grid">
        {items.map(([code, label, variant]) => {
          const [n, share] = d[code]
          return <PercentCard key={code} label={label} percent={pct(share, 1)} variant={variant} note={`${n} ta savol bo'yicha o'rtacha`} />
        })}
      </div>
    </div>
  )
}

export default function VocationalPassport({ org }) {
  const c = passport.colleges[org.stir]
  if (!c) return <p>Bu texnikum ({org.stir}) ma'lumotlar faylida topilmadi.</p>
  const d = c.data
  return (
    <div className="university">
      <UniversityHeader
        org={org}
        onProgramsClick={() => document.getElementById('talim-dasturlari')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
      />
      <Teachers d={d} site={org.teachers} />
      <Programs />
      <Students d={d} site={org.students} />
      <Admission d={d} />
      <Graduates d={d} popular={org.graduates.popular} />
      <Production d={d} />
      <Buildings data={org.buildings} />
      <Survey data={org.survey} />
      <Opinions d={d} />
      <Rating data={org.rating} />
      <Contacts data={org.contacts} />
    </div>
  )
}

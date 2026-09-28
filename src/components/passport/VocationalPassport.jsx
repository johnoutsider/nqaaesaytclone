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
          { label: 'TOP-1 000 OTT diplomiga ega', short: 'TOP-1 000 OTT diplomi', value: top1000 },
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
  const [, xCert, mCert] = d['K1.5']
  const [, ustaKurs, pedKurs, xorijda] = d['K1.3']
  return (
    <div>
      <SectionTop title="Pedagoglar" date={passport.date} />
      <OverviewCard
        items={[
          { label: 'Jami pedagoglar', value: P },
          { label: 'Malaka toifasiga ega', display: fmt(bosh + yetakchi + katta), unit: `nafar · ${pct(bosh + yetakchi + katta, P)}%`, icon: 'university-stat-1.svg' },
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
          { label: '30 yoshgacha pedagoglar', from: 0, to: 1, variant: 'young' },
          { label: '50 yoshdan katta pedagoglar', from: -2, variant: 'senior' },
        ]}
      />
      <p className="teacher-certs__note src-note">
        Yosh tarkibi: nqaae.uz pasporti bo'yicha ({site.date}, {site.ages.reduce((s, a) => s + a.value, 0)} nafar pedagog)
      </p>
    </div>
  )
}

// Tanlov g'oliblari (ixcham: jami + 2 guruh) va kurslar kesimi (vertikal ustunlar)
// (3 ta variantdan foydalanuvchi tanlagani: "B — ixcham + ustunlar", 29.09.2026).
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

function CompCompact({ vals }) {
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
function CoursesColumns() {
  const entries = Object.entries(programs.courses)
  const max = Math.max(...entries.map(([, v]) => v), 1)
  return (
    <div className="content-section__inner h-100">
      <CardHead>Kurslar kesimida</CardHead>
      <div className="cv-cols">
        {entries.map(([k, v], i) => (
          <div key={k} className="cv-col">
            <span className="cv-col__val">{fmt(v)} <small>nafar</small></span>
            <div className="cv-col__track">
              <i style={{ height: `${(v / max) * 100}%`, background: COURSE_COLORS[i] }}>
                <em className="cv-col__pct">{pct(v, programs.total)}%</em>
              </i>
            </div>
            <span className="cv-col__label">{k}-kurs</span>
          </div>
        ))}
      </div>
      <p className="av-note">O'quvchilar ro'yxati bo'yicha, jami {fmt(programs.total)} nafar</p>
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
      <div className="row">
        <div className="col-lg-6 mb-3"><CompCompact vals={d['K4.1'].slice(1, 8)} /></div>
        <div className="col-lg-6 mb-3"><CoursesColumns /></div>
      </div>
    </div>
  )
}

// Qabul ko'rsatkichlari: reja, qabul qilinganlar va ommabop kasb va mutaxassisliklar
// (ommaboplik — 1-kurs o'quvchilari soni bo'yicha, ya'ni joriy qabul; manba: o'quvchilar ro'yxati).
// Ko'rinish: halqa + reyting (3 ta variantdan foydalanuvchi tanlagani: "A", 29.09.2026).
function popularByIntake(limit = 5) {
  return programs.programs
    .map((p) => ({ name: p.name, count: p.courses['1'] || 0 }))
    .filter((p) => p.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}
const intakeTotal = () => programs.courses['1'] || 0

function PopularRanked({ items }) {
  const max = items[0]?.count || 1
  return (
    <div className="av-pop">
      {items.map((p, i) => (
        <div key={p.name} className="av-pop__row">
          <span className={`av-pop__rank ${i < 3 ? `is-top${i + 1}` : ''}`}>{i + 1}</span>
          <div className="av-pop__body">
            <p className="av-pop__head"><span>{p.name}</span><b>{fmt(p.count)} <small>nafar</small></b></p>
            <div className="av-pop__bar"><i style={{ width: `${(p.count / max) * 100}%` }}></i></div>
          </div>
        </div>
      ))}
    </div>
  )
}

function AdmissionRing({ plan, admitted }) {
  const r = 62, c = 2 * Math.PI * r
  const share = plan ? admitted / plan : 0
  return (
    <div className="content-section__inner mb-3 gv-a">
      <div className="gv-a__ring">
        <div className="gv-a__circle">
          <svg width="160" height="160" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r={r} fill="none" stroke="#e8edf4" strokeWidth="16" />
            <circle cx="80" cy="80" r={r} fill="none" stroke="#3E7BB6" strokeWidth="16" strokeLinecap="round"
              strokeDasharray={`${Math.min(share, 1) * c} ${c}`} transform="rotate(-90 80 80)" />
          </svg>
          <div className="gv-a__center"><b className="av-blue">{pct(admitted, plan, 1)}%</b><span>bajarildi</span></div>
        </div>
        <div className="gv-a__nums">
          <p><b>{fmt(plan)}</b><span>Qabul rejasi</span></p>
          <p className="is-band av-band"><b>{fmt(admitted)}</b><span>Qabul qilinganlar</span></p>
        </div>
      </div>
      <div className="gv-a__side">
        <h2 className="university-bars--title"><img src={`${IMG}/vocational-famous.svg`} alt="" /> Ommabop kasb va mutaxassisliklar</h2>
        <PopularRanked items={popularByIntake()} />
        <p className="av-note">1-kurs o'quvchilari soni bo'yicha (jami {fmt(intakeTotal())} nafar)</p>
      </div>
    </div>
  )
}

function Admission({ d }) {
  const [plan, admitted] = d['K2.4']
  return (
    <div>
      <SectionTop title="Qabul ko'rsatkichlari" date={passport.date} />
      <AdmissionRing plan={plan} admitted={admitted} />
    </div>
  )
}

// Bitiruvchilar bo'limi: chapda "band" halqasi, o'ngda toifalar gorizontal ustunlari + ommabop mutaxassisliklar
// (3 ta variantdan foydalanuvchi tanlagani: "A — halqa + ustunlar", 29.09.2026).
const GRAD_COLORS = ['#0E7C66', '#19AE8B', '#4E95DA', '#D5DCE8']

function gradData(d) {
  const [B, tadbirkor, ish, oqish] = d['K3.4']
  const band = tadbirkor + ish + oqish
  return {
    B,
    band,
    parts: [
      { label: 'Tadbirkor / ta’sischi', value: tadbirkor },
      { label: 'Ish bilan band', value: ish },
      { label: 'O‘qishni davom ettirmoqda / o‘zini band qilgan', value: oqish },
      { label: 'Ma’lumot yo‘q', value: Math.max(B - band, 0) },
    ].map((p, i) => ({ ...p, color: GRAD_COLORS[i] })),
  }
}

function GradRing({ d }) {
  const { B, band, parts } = gradData(d)
  const r = 62, c = 2 * Math.PI * r
  const max = Math.max(...parts.map((p) => p.value), 1)
  return (
    <div className="content-section__inner mb-3 gv-a">
      <div className="gv-a__ring">
        <div className="gv-a__circle">
          <svg width="160" height="160" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r={r} fill="none" stroke="#e8edf4" strokeWidth="16" />
            <circle cx="80" cy="80" r={r} fill="none" stroke="#19AE8B" strokeWidth="16" strokeLinecap="round"
              strokeDasharray={`${(band / B) * c} ${c}`} transform="rotate(-90 80 80)" />
          </svg>
          <div className="gv-a__center"><b>{pct(band, B)}%</b><span>band</span></div>
        </div>
        <div className="gv-a__nums">
          <p><b>{fmt(B)}</b><span>Jami bitiruvchilar</span></p>
          <p className="is-band"><b>{fmt(band)}</b><span>Band bitiruvchilar</span></p>
        </div>
      </div>
      <div className="gv-a__bars">
        <h2 className="university-bars--title"><img src={`${IMG}/university-direction.svg`} alt="" /> Bitiruvchilar bandlik toifalari kesimida</h2>
        {parts.map((p) => (
          <div key={p.label} className="gv-a__row">
            <span className="gv-a__label">{p.label}</span>
            <div className="gv-a__track">
              <i style={{ width: `${(p.value / max) * 100}%`, background: p.color, color: p.color === '#D5DCE8' ? '#3a4a66' : '#fff' }}>{p.value}</i>
            </div>
            <span className="gv-a__pct">{pct(p.value, B)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Graduates({ d }) {
  return (
    <div>
      <SectionTop title="Bitiruvchilar" date={passport.date} />
      <GradRing d={d} />
    </div>
  )
}

// Ishlab chiqarish va xizmatlar: o'quvchilar mahsulot va xizmatlaridan tushum (K3.2).
// Ko'rinish: keng karta + manbalar (3 ta variantdan foydalanuvchi tanlagani: "A", 29.09.2026).
// Katta summalar "mln so'm" / "mlrd so'm" ko'rinishida.
function somShort(v) {
  if (v >= 1e9) return [String((v / 1e9).toFixed(1)).replace('.', ','), "mlrd so'm"]
  if (v >= 1e6) return [String((v / 1e6).toFixed(1)).replace('.', ','), "mln so'm"]
  return [fmt(v), "so'm"]
}

function prodData(d) {
  const [O, davlat, boshqa] = d['K3.2']
  const total = davlat + boshqa
  return { O, davlat, boshqa, total, perStudent: O ? total / O : 0 }
}

function ProdWide({ d }) {
  const { davlat, boshqa, total, perStudent } = prodData(d)
  const [tv, tu] = somShort(total)
  const [pv, pu] = somShort(perStudent)
  return (
    <div className="content-section__inner mb-3 pr-a">
      <div className="pr-a__left">
        <p className="pr-a__label">Jami tushum</p>
        <p className="pr-a__big"><b>{tv}</b> {tu}</p>
        <p className="pr-a__label pr-a__label--2">Bir o'quvchiga</p>
        <p className="pr-a__big pr-a__big--2"><b>{pv}</b> {pu}</p>
      </div>
      <div className="pr-a__right">
        <p className="pr-a__label">Tushum manbalari</p>
        <div className="pr-a__bar">
          {total > 0 ? (
            <>
              <span style={{ width: `${(davlat / total) * 100}%`, background: '#3E7BB6' }}></span>
              <span style={{ width: `${(boshqa / total) * 100}%`, background: '#19AE8B' }}></span>
            </>
          ) : (
            <span className="is-empty">Tushum qayd etilmagan</span>
          )}
        </div>
        <div className="pr-a__legend">
          <p><i style={{ background: '#3E7BB6' }}></i>Davlat xaridlari<b>{somShort(davlat).join(' ')}</b></p>
          <p><i style={{ background: '#19AE8B' }}></i>Boshqa tushumlar<b>{somShort(boshqa).join(' ')}</b></p>
        </div>
      </div>
    </div>
  )
}

function Production({ d }) {
  return (
    <div>
      <SectionTop title="Ishlab chiqarish va xizmatlar" date={passport.date} />
      <ProdWide d={d} />
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
      <Graduates d={d} />
      <Production d={d} />
      <Buildings data={org.buildings} />
      <Survey data={org.survey} summary={<Opinions d={d} />} />
      <Rating data={org.rating} />
      <Contacts data={org.contacts} />
    </div>
  )
}

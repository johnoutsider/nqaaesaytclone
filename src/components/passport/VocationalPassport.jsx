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

function ProgramsNote({ declared }) {
  const empty = Math.max((declared || 0) - programs.programs.length, 0)
  return (
    <p className="teacher-certs__note mt-3 mb-0">
      {empty > 0 && `${declared} ta dasturdan ${empty} tasida hozir o'quvchi yo'q. `}
      Barcha o'quvchilar {Object.keys(programs.forms).join(', ').toLowerCase()} ta'lim shaklida. Manba: o'quvchilar ro'yxati.
    </p>
  )
}

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

function Programs({ declared }) {
  return (
    <div id="talim-dasturlari">
      <SectionTop title="Ta'lim dasturlari" />
      <OverviewCard
        items={[
          { label: "Ta'lim dasturlari", value: declared, unit: 'ta', icon: 'vocational-stat-1.svg' },
          { label: "O'quvchilari bor dasturlar", value: programs.programs.length, unit: 'ta', icon: 'vocational-stat-2.svg' },
          { label: "Jami o'quvchilar", value: programs.total },
        ]}
      />
      <div className="content-section__inner mb-3">
        <h2 className="university-bars--title">
          <img src={`${IMG}/vocational-famous.svg`} alt="" /> Dasturlar va o'quvchilar soni
        </h2>
        <ProgramsShare />
        <ProgramsNote declared={declared} />
      </div>
    </div>
  )
}

function Teachers({ d, site }) {
  const [P, bosh, yetakchi, katta] = d['K1.2']
  const [, soha, xorijiy, otm] = d['K1.7']
  const [, ilmiy, xorijdan, top1000] = d['K1.1']
  const [, xCert, mCert] = d['K1.5']
  const [, ustaKurs, pedKurs, xorijda] = d['K1.3']
  return (
    <div>
      <SectionTop title="Pedagoglar" date={passport.date} />
      <OverviewCard
        items={[
          { label: 'Jami pedagoglar', value: P },
          { label: 'Ishlab chiqarishdan jalb qilinganlar', value: soha + xorijiy + otm, icon: 'university-stat-1.svg' },
          { label: 'O‘rtacha yosh', display: String(site.avgAge), unit: 'yosh', icon: 'calendar-uni.svg' },
        ]}
      />
      <div className="row">
        <div className="col-lg-6 mb-3">
          <BreakdownCard
            title="Malaka toifasi"
            total={P}
            items={[
              { key: 'Bosh o‘qituvchi', value: bosh },
              { key: 'Yetakchi o‘qituvchi / sertifikatli usta', value: yetakchi },
              { key: 'Katta o‘qituvchi', value: katta },
              { key: 'Toifasiz', value: Math.max(P - bosh - yetakchi - katta, 0) },
            ]}
          />
        </div>
        <div className="col-lg-6 mb-3">
          <FactList
            title="Jalb qilingan mutaxassislar va ilmiy salohiyat"
            rows={[
              { label: 'Ishlab chiqarishdan (soha mutaxassisi)', value: soha },
              { label: 'Xorijiy mutaxassis', value: xorijiy },
              { label: 'OTM professori', value: otm },
              { label: 'Ilmiy darajali pedagog', value: ilmiy },
              { label: 'Xorijdan jalb qilingan pedagog', value: xorijdan },
              { label: 'TOP-1 000 OTM diplomiga ega', value: top1000 },
            ]}
          />
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
        avgAge={site.avgAge}
        summary={[
          { label: '30 yoshgacha yosh pedagoglar', from: 0, to: 1, variant: 'young' },
          { label: '50 yoshdan katta pedagoglar', from: -2, variant: 'senior' },
        ]}
      />
    </div>
  )
}

function Students({ d, site }) {
  const [O, xCert, mCert] = d['K4.2']
  const [dualTotal, dual] = d['K3.3']
  const [hours, missed] = d['K2.3']
  const [, intlStudents, intlPrograms] = d['K2.5']
  const comp = d['K4.1']
  const COMP = ['WorldSkills', 'Milliy tanlov — respublika', 'Milliy tanlov — hudud', 'Boshqa kasbiy tanlovlar', 'Xalqaro olimpiada', 'Olimpiada — respublika bosqichi', 'Boshqa tanlovlar']
  return (
    <div>
      <SectionTop title="O'quvchilar" date={passport.date} />
      <OverviewCard
        items={[
          { label: "Jami o'quvchilar", value: O },
          { label: "Dual ta'limda", value: dual },
          { label: 'Sertifikatga ega', value: xCert + mCert },
        ]}
      />
      <div className="row">
        <div className="col-lg-4 mb-3">
          <PercentCard
            label="Davomat"
            percent={pct(hours - missed, hours, 1)}
            variant="national"
            icon="calendar-uni.svg"
            note={`${fmt(hours)} dars soatidan ${fmt(missed)} soati sababsiz qoldirilgan`}
          />
        </div>
        <div className="col-lg-4 mb-3">
          <PercentCard
            label="Dual ta'lim"
            percent={pct(dual, dualTotal)}
            variant="teal"
            note={`${fmt(dualTotal)} o'quvchidan ${fmt(dual)} nafari o'qish bilan birga korxonada ishlaydi`}
          />
        </div>
        <div className="col-lg-4 mb-3">
          <PercentCard
            label="Xalqaro va qo'shma dasturlar"
            percent={pct(intlStudents, O)}
            variant="purple"
            note={`${intlPrograms} ta dastur · ${fmt(intlStudents)} nafar o'quvchi`}
          />
        </div>
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
        <div className="col-lg-6 mb-3">
          <FactList
            title="Tanlov va olimpiada g'oliblari"
            rows={COMP.map((label, i) => ({ label, value: comp[i + 1] }))}
          />
        </div>
        <div className="col-lg-6 mb-3">
          <BreakdownCard
            title="Kurslar kesimida"
            total={programs.total}
            colors={['#3E7BB6', '#19AE8B', '#FFA151', '#7161FF']}
            items={Object.entries(programs.courses).map(([k, v]) => ({ key: `${k}-kurs`, value: v }))}
          />
        </div>
      </div>
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
      <Programs declared={org.programs.total} />
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

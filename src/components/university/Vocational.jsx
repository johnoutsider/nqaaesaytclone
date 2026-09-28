import { IMG, SectionTop, OverviewCard } from './common.jsx'
import UniversityHeader from './UniversityHeader.jsx'
import { BreakdownCard, AgeStructure } from './Teachers.jsx'
import Buildings from './Buildings.jsx'
import Survey from './Survey.jsx'
import Rating from './Rating.jsx'
import Contacts from './Contacts.jsx'

// Texnikum (kasbiy ta'lim tashkiloti) pasporti — litsey pasporti bilan bir xil uslub va bloklar tartibida.
// Manba: nqaae.uz/uz/vocational/<stir>. Bloklar: Pedagoglar → O'quvchilar → Qabul → Bitiruvchilar →
// Bino va inshootlar → So'rovnoma → Reyting → Bog'lanish.

const pct = (part, whole) => (whole > 0 ? Math.round((part / whole) * 100) : 0)
const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
const pct1 = (part, whole) => (whole > 0 ? ((part / whole) * 100).toFixed(1).replace('.', ',') : '0')

// Kasb/mutaxassisliklar reytingi: o'rin, nom, son, ulush va chiziq
function RankList({ title, items, total, unit = 'nafar' }) {
  const max = Math.max(...items.map((i) => i.count ?? 0), 1)
  return (
    <div className="content-section__inner h-100">
      <h2 className="university-bars--title">
        <img src={`${IMG}/vocational-famous.svg`} alt="" />
        {title}
      </h2>
      <ol className="uni-list__items">
        {items.map((it, i) => (
          <li key={it.name} className="uni-list__item">
            <span className="uni-list__rank">{i + 1}</span>
            <div className="uni-list__body">
              <div className="uni-list__row">
                <span className="uni-list__name">{it.name}</span>
                {it.count != null && (
                  <span className="uni-list__count">
                    <b>{fmt(it.count)}</b> {unit} · {pct(it.count, total)}%
                  </span>
                )}
              </div>
              {it.count != null && (
                <div className="uni-list__bar">
                  <span style={{ width: `${(it.count / max) * 100}%` }}></span>
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

// Ikki qismga bo'lingan ko'rsatkich (grant/kontrakt, ayol/erkak ...)
function SplitCard({ title, parts, unit = 'nafar' }) {
  const total = parts.reduce((s, p) => s + (p.value ?? 0), 0)
  return (
    <div className="content-section__inner h-100">
      <h2 className="university-bars--title">
        <img src={`${IMG}/university-direction.svg`} alt="" />
        {title}
      </h2>
      <div className="split-card__nums">
        {parts.map((p) => (
          <div key={p.label} className="split-card__num" style={{ '--accent': p.color }}>
            <span>{p.label}</span>
            <p><b>{fmt(p.value)}</b> {unit} <em>{pct(p.value, total)}%</em></p>
          </div>
        ))}
      </div>
      <div className="qual-split mb-0">
        {parts.map((p) =>
          p.value > 0 ? <span key={p.label} style={{ width: `${pct(p.value, total)}%`, background: p.color }}></span> : null
        )}
      </div>
    </div>
  )
}

function Teachers({ data, students }) {
  return (
    <div>
      <SectionTop title="Pedagoglar" date={data.date} />
      <OverviewCard
        items={[
          { label: 'Jami o‘qituvchilar', value: data.total },
          { label: 'Ayollar', value: data.women },
          { label: 'Erkaklar', value: data.men },
        ]}
      />
      <div className="row">
        <div className="col-lg-7 mb-3">
          {/* toifasizlar kulrang tonlarda */}
          <BreakdownCard items={data.qualification} total={data.total} colors={['#7161FF', '#19AE8B', '#FFA151', '#D5DCE8', '#B3BCCB']} />
        </div>
        <div className="col-lg-5 mb-3">
          <BreakdownCard title="Pedagoglar tarkibi" items={data.composition} total={data.total} colors={['#3E7BB6', '#19AE8B', '#FFA151']} />
        </div>
      </div>
      <AgeStructure
        items={data.ages}
        total={data.total}
        avgAge={data.avgAge}
        summary={[
          { label: '30 yoshgacha yosh pedagoglar', from: 0, to: 1, variant: 'young' },
          { label: '50 yoshdan katta pedagoglar', from: -2, variant: 'senior' },
        ]}
      />
      <OverviewCard
        title="Pedagoglar salohiyati"
        items={[
          {
            label: 'Har 100 ta o‘quvchiga',
            display: String(data.perHundredStudents).replace('.', ','),
            unit: 'pedagog',
            icon: 'university-stat-1.svg',
          },
          { label: 'Fan doktori', value: data.doctors, icon: 'university-stat-1.svg' },
          { label: 'Fan nomzodi', value: data.candidates, icon: 'university-stat-1.svg' },
        ]}
      />
    </div>
  )
}

function Students({ data }) {
  return (
    <div>
      <SectionTop title="O'quvchilar" date={data.date} />
      <OverviewCard
        items={[
          { label: "Jami o'quvchilar", value: data.total },
          { label: 'Ayollar', value: data.women },
          { label: 'Erkaklar', value: data.men },
        ]}
      />
      <div className="row">
        <div className="col-lg-7 mb-3">
          <RankList title="Eng ko‘p o‘qilayotgan kasb va mutaxassisliklar" items={data.specialties} total={data.total} />
        </div>
        <div className="col-lg-5 mb-3">
          <div className="content-section__inner h-100 degree-card dual-card">
            <h2 className="university-bars--title">
              <img src={`${IMG}/university-direction.svg`} alt="" />
              Dual ta'lim
            </h2>
            <div className="degree-card__main">
              <b>{fmt(data.dual)}</b>
              <span>nafar o'quvchi<br />dual ta'limda o'qiydi</span>
              <em>{pct1(data.dual, data.total)}%</em>
            </div>
            <div className="teacher-certs__bar degree-card__bar">
              <span style={{ width: `${Math.max(pct(data.dual, data.total), data.dual > 0 ? 1 : 0)}%` }}></span>
            </div>
            <p className="teacher-certs__note">
              Dual ta'lim — o'qish va korxonada ishlashni birga olib borish. Qolgan {fmt(data.total - data.dual)} nafar
              o'quvchi boshqa ta'lim shakllarida.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Admission({ data }) {
  const done = data.plan > 0 ? (data.admitted / data.plan) * 100 : 0
  const free = Math.max(data.plan - data.admitted, 0)
  return (
    <div>
      <SectionTop title="Qabul ko'rsatkichlari" date={data.year} />
      <div className="grad-kpis mb-3">
        <div className="grad-overview">
          <div className="grad-overview__stats">
            <div className="grad-overview__stat">
              <div className="teacher-certs__icon">
                <img src={`${IMG}/university-stat-1.svg`} alt="" />
              </div>
              <div>
                <p className="teacher-certs__label">Tasdiqlangan qabul rejasi</p>
                <p className="grad-overview__value">
                  <b className="teacher-certs__num">{fmt(data.plan)}</b> <span className="teacher-certs__unit">ta o'rin</span>
                </p>
              </div>
            </div>
            <div className="grad-overview__divider"></div>
            <div className="grad-overview__stat">
              <div className="teacher-certs__icon">
                <img src={`${IMG}/university-staff-1.svg`} alt="" />
              </div>
              <div>
                <p className="teacher-certs__label">Amalda qabul qilinganlar</p>
                <p className="grad-overview__value">
                  <b className="teacher-certs__num">{fmt(data.admitted)}</b> <span className="teacher-certs__unit">nafar</span>
                </p>
              </div>
            </div>
          </div>
          <div className="grad-overview__split">
            <span className="is-in" style={{ width: `${done}%` }}></span>
            {free > 0 && <span className="is-rest" style={{ width: `${100 - done}%` }}></span>}
          </div>
          <div className="grad-overview__legend">
            <span><i className="is-in"></i>{fmt(data.admitted)} nafar qabul qilindi</span>
            <span><i className="is-rest"></i>{fmt(free)} o'rin bo'sh qoldi</span>
          </div>
        </div>

        <div className="competition-card">
          <p className="competition-card__label">Qabul rejasining bajarilishi</p>
          <div className="competition-card__main">
            <b>{done.toFixed(1).replace('.', ',')}%</b>
          </div>
          <p className="competition-card__text">
            Tasdiqlangan {fmt(data.plan)} o'rindan {fmt(data.admitted)} tasi to'ldirildi
          </p>
          <div className="competition-card__chance">
            <span>Bo'sh qolgan o'rinlar</span>
            <b>{fmt(free)}</b>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4 mb-3">
          <SplitCard
            title="Moliyalashtirish"
            parts={[
              { label: 'Davlat granti', value: data.grant, color: '#19AE8B' },
              { label: 'To‘lov-kontrakt', value: data.contract, color: '#3E7BB6' },
            ]}
          />
        </div>
        <div className="col-lg-4 mb-3">
          <SplitCard
            title="Qabul negizi"
            parts={[
              { label: '9-sinf negizida', value: data.grade9, color: '#FFA151' },
              { label: '11-sinf negizida', value: data.grade11, color: '#7161FF' },
            ]}
          />
        </div>
        <div className="col-lg-4 mb-3">
          <RankList title="Ommabop mutaxassisliklar" items={data.popular.map((name) => ({ name }))} />
        </div>
      </div>
    </div>
  )
}

function Graduates({ data }) {
  return (
    <div>
      <SectionTop title={`${data.year} yil bitiruvchilari`} />
      <OverviewCard
        items={[
          { label: 'Jami bitiruvchilar', value: data.total },
          { label: 'Ayollar', value: data.women },
          { label: 'Erkaklar', value: data.men },
        ]}
      />
      <div className="row">
        <div className="col-lg-4 mb-3">
          <BreakdownCard title="Ta'lim shakli" items={data.forms} total={data.total} colors={['#3E7BB6', '#19AE8B', '#FFA151', '#7161FF']} />
        </div>
        <div className="col-lg-4 mb-3">
          <SplitCard
            title="Moliyalashtirish"
            parts={[
              { label: 'Davlat granti', value: data.grant, color: '#19AE8B' },
              { label: 'To‘lov-kontrakt', value: data.contract, color: '#3E7BB6' },
            ]}
          />
        </div>
        <div className="col-lg-4 mb-3">
          <RankList title="Ommabop mutaxassisliklar" items={data.popular} total={data.total} />
        </div>
      </div>
    </div>
  )
}

export default function Vocational({ org }) {
  return (
    <div className="university">
      <UniversityHeader org={org} />
      <Teachers data={org.teachers} />
      <Students data={org.students} />
      <Admission data={org.admission} />
      <Graduates data={org.graduates} />
      <Buildings data={org.buildings} />
      <Survey data={org.survey} />
      <Rating data={org.rating} />
      <Contacts data={org.contacts} />
    </div>
  )
}

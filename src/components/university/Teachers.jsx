import { IMG, NA, SectionTop, OverviewCard } from './common.jsx'
import { CertItem } from './PeopleCertificates.jsx'

// O'zgarish: Pedagoglar bo'limi qayta tuzildi —
// 1) jami / mahalliy / xorijiy bitta kartochkada,
// 2) malaka toifasi (bo'lingan chiziq + ro'yxat) va ilmiy daraja (ixcham),
// 3) sertifikatlar + malaka oshirish va stajirovka bitta kartochkada.

const pct = (part, whole) => (whole > 0 ? Math.round((part / whole) * 100) : 0)
const QUAL_COLORS = ['#7161FF', '#19AE8B', '#FFA151', '#B3BCCB', '#4E95DA', '#E187FF']

// Toifalar bo'yicha taqsimot: bo'lingan chiziq + son va foiz ro'yxati (null => "mavjud emas")
export function BreakdownCard({ title = 'Malaka toifasi', items, total, colors = QUAL_COLORS }) {
  return (
    <div className="content-section__inner h-100">
      <h2 className="university-bars--title">
        <img src={`${IMG}/university-direction.svg`} alt="" />
        {title}
      </h2>
      <div className="qual-split">
        {items.map((q, i) =>
          q.value > 0 ? (
            <span key={q.key} style={{ width: `${pct(q.value, total)}%`, background: colors[i % colors.length] }}></span>
          ) : null
        )}
      </div>
      <div className="qual-list">
        {items.map((q, i) => (
          <div key={q.key} className="qual-list__row">
            <i style={{ background: colors[i % colors.length] }}></i>
            <span className="qual-list__name">{q.key}</span>
            {q.value == null ? (
              <span className="qual-list__count">{NA}</span>
            ) : (
              <>
                <span className="qual-list__count"><b>{q.value}</b> nafar</span>
                <span className="qual-list__pct">{pct(q.value, total)}%</span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function Degrees({ items, total }) {
  const holders = items.reduce((s, d) => s + d.value, 0)
  const none = Math.max(total - holders, 0)
  return (
    <div className="content-section__inner h-100 degree-card">
      <h2 className="university-bars--title">
        <img src={`${IMG}/university-direction.svg`} alt="" />
        Ilmiy daraja
      </h2>
      <div className="degree-card__main">
        <b>{holders}</b>
        <span>nafar pedagog<br />ilmiy darajaga ega</span>
        <em>{pct(holders, total)}%</em>
      </div>
      <div className="teacher-certs__bar degree-card__bar">
        <span style={{ width: `${pct(holders, total)}%` }}></span>
      </div>
      <div className="qual-list">
        {items.map((d) => (
          <div key={d.key} className="qual-list__row">
            <i style={{ background: '#7161FF' }}></i>
            <span className="qual-list__name">{d.key}</span>
            <span className="qual-list__count"><b>{d.value}</b> nafar</span>
          </div>
        ))}
        <div className="qual-list__row is-muted">
          <i style={{ background: '#B3BCCB' }}></i>
          <span className="qual-list__name">Ilmiy darajasiz</span>
          <span className="qual-list__count"><b>{none}</b> nafar</span>
        </div>
      </div>
    </div>
  )
}

// Yosh tarkibi: yosh guruhlari bo'yicha ustunli diagramma + qisqa xulosa
// O'q uchun "chiroyli" qadam: 1, 2, 5, 10, 20, 50... (ko'pi bilan 5 ta chiziq)
function niceScale(maxValue) {
  const steps = [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000]
  const step = steps.find((s) => Math.ceil(maxValue / s) <= 5) ?? Math.ceil(maxValue / 5)
  const top = Math.max(step, Math.ceil(maxValue / step) * step)
  const ticks = []
  for (let v = 0; v <= top; v += step) ticks.push(v)
  return { top, ticks }
}

// summary: o'ngdagi xulosalar — items[from..to) yig'indisi
const LYCEUM_AGE_SUMMARY = [
  { label: '35 yoshgacha yosh pedagoglar', from: 0, to: 2, variant: 'young' },
  { label: '56 yosh va undan katta', from: -2, variant: 'senior' },
]

export function AgeStructure({ items, total, sample, avgAge, summary = LYCEUM_AGE_SUMMARY }) {
  const { top, ticks } = niceScale(Math.max(...items.map((a) => a.value), 1))
  const cols = { gridTemplateColumns: `repeat(${items.length}, 1fr)` }
  const sumOf = (sm) => items.slice(sm.from, sm.to).reduce((s, a) => s + a.value, 0)
  return (
    <div className="content-section__inner mb-3">
      <div className="age-card__head">
        <h2 className="university-bars--title mb-0">
          <img src={`${IMG}/university-direction.svg`} alt="" />
          Yosh tarkibi
        </h2>
        <div className="d-flex align-items-center gap-2">
          {avgAge != null && <span className="age-card__avg">O'rtacha yosh: <b>{avgAge}</b></span>}
          {sample && <span className="age-card__sample">Taxminiy ma'lumot</span>}
        </div>
      </div>
      <div className="age-card__body">
        <div className="age-chart">
          {/* chapdagi o'q: pedagoglar soni (nafar) */}
          <div className="age-chart__axis">
            <span className="age-chart__axis-title">nafar</span>
            {ticks.map((t) => (
              <span key={t} className="age-chart__tick" style={{ bottom: `${(t / top) * 100}%` }}>{t}</span>
            ))}
          </div>
          <div className="age-chart__main">
            <div className="age-chart__plot" style={cols}>
              {ticks.map((t) => (
                <span key={t} className={`age-chart__grid ${t === 0 ? 'is-base' : ''}`} style={{ bottom: `${(t / top) * 100}%` }}></span>
              ))}
              {items.map((a, i) => (
                <div key={a.label} className="age-chart__col" title={`${a.label}: ${a.value} nafar`}>
                  <span className={`age-chart__bar age-chart__bar--${i}`} style={{ height: `${(a.value / top) * 100}%` }}>
                    <span className="age-chart__pct">{pct(a.value, total)}%</span>
                  </span>
                </div>
              ))}
            </div>
            <div className="age-chart__labels" style={cols}>
              {items.map((a) => (
                <span key={a.label} className="age-chart__label">{a.label}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="age-card__summary">
          {summary.map((sm) => (
            <div key={sm.label} className={`age-card__stat age-card__stat--${sm.variant}`}>
              <span>{sm.label}</span>
              <p><b>{sumOf(sm)}</b> nafar <em>{pct(sumOf(sm), total)}%</em></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Development({ data }) {
  const t = data.total
  return (
    <div className="content-section__inner teacher-certs mb-3">
      <h2 className="university-bars--title">
        <img src={`${IMG}/university-direction.svg`} alt="" />
        Sertifikatlar va malaka oshirish
      </h2>

      <p className="achievements__group">Sertifikatga ega pedagoglar</p>
      <div className="teacher-certs__grid mb-3">
        <CertItem label="Xalqaro sertifikatga ega" count={data.certificates.international} total={t} unit="pedagog" variant="intl" />
        <CertItem label="Milliy sertifikatga ega" count={data.certificates.national} total={t} unit="pedagog" variant="national" />
      </div>

      <p className="achievements__group">Malaka oshirish va stajirovka dasturlarida ishtirok etganlar</p>
      <div className="teacher-certs__grid">
        <CertItem label="Malaka oshirish kurslari" count={data.training.domestic} total={t} unit="pedagog" variant="teal" />
        <CertItem label="Xorijiy stajirovka" count={data.training.foreign} total={t} unit="pedagog" variant="purple" />
      </div>
    </div>
  )
}

export default function Teachers({ data }) {
  return (
    <div>
      <SectionTop title="Pedagoglar" date={` ${data.date}`} />

      <OverviewCard
        items={[
          { label: 'Jami o‘qituvchilar', value: data.total },
          { label: 'Mahalliy o‘qituvchilar', value: data.local },
          { label: 'Xorijiy o‘qituvchilar', value: data.foreign },
        ]}
      />

      <div className="row">
        <div className="col-lg-7 mb-3">
          <BreakdownCard items={data.qualification} total={data.total} />
        </div>
        <div className="col-lg-5 mb-3">
          <Degrees items={data.degrees} total={data.total} />
        </div>
      </div>

      <AgeStructure items={data.ages} total={data.total} sample={data.ageSample} />

      <Development data={data} />
    </div>
  )
}

import { IMG, SectionTop } from './common.jsx'
import CountUp from './CountUp.jsx'
import AdmissionGroups from './AdmissionGroups.jsx'

// O'zgarish: Bitiruvchilar bo'limi qayta tuzildi —
// 1) asosiy ko'rsatkichlar (jami, OTMga kirganlar, o'rtacha baho),
// 2) OTMga kirganlar reyting guruhlari bo'yicha,
// 3) ta'sischi OTM (pasportiga havola bilan).

const pct = (part, whole) => (whole > 0 ? Math.round((part / whole) * 100) : 0)

function Kpi({ icon, label, children, note, variant = '' }) {
  return (
    <div className={`grad-kpi ${variant}`}>
      <div className="teacher-certs__icon">
        <img src={`${IMG}/${icon}`} alt="" />
      </div>
      <div className="grad-kpi__body">
        <p className="teacher-certs__label">{label}</p>
        <div className="grad-kpi__value">{children}</div>
        {note && <p className="teacher-certs__note">{note}</p>}
      </div>
    </div>
  )
}

// 1–5 shkala: o'rtacha baho qayerda turganini ko'rsatadi
function GradeScale({ value }) {
  const pos = ((value - 1) / 4) * 100
  return (
    <div className="grade-scale">
      <div className="grade-scale__track">
        <span className="grade-scale__fill" style={{ width: `${pos}%` }}></span>
        <span className="grade-scale__marker" style={{ left: `${pos}%` }}></span>
      </div>
      <div className="grade-scale__ticks">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>
    </div>
  )
}

export default function Graduates({ data }) {
  const admitted = data.admissions.reduce((s, a) => s + a.count, 0)
  const notAdmitted = Math.max(data.total - admitted, 0)
  const founderShare = data.total > 0 ? ((data.founder.admitted / data.total) * 100).toFixed(2) : 0

  return (
    <div>
      <SectionTop title="Bitiruvchilar" date={data.date} className=" university-top " />

      {/* 1. Asosiy ko'rsatkichlar */}
      <div className="grad-kpis mb-3">
        {/* Jami bitiruvchilar + OTMga kirganlar bitta kartochkada */}
        <div className="grad-overview">
          <div className="grad-overview__stats">
            <div className="grad-overview__stat">
              <div className="teacher-certs__icon">
                <img src={`${IMG}/university-staff-1.svg`} alt="" />
              </div>
              <div>
                <p className="teacher-certs__label">Jami bitiruvchilar</p>
                <p className="grad-overview__value">
                  <CountUp className="teacher-certs__num" value={data.total} /> <span className="teacher-certs__unit">nafar</span>
                </p>
              </div>
            </div>
            <div className="grad-overview__divider"></div>
            <div className="grad-overview__stat">
              <div className="teacher-certs__icon">
                <img src={`${IMG}/university-stat-1.svg`} alt="" />
              </div>
              <div>
                <p className="teacher-certs__label">OTMga kirganlar</p>
                <p className="grad-overview__value">
                  <CountUp className="teacher-certs__num" value={admitted} /> <span className="teacher-certs__unit">nafar</span>
                  <span className="grad-overview__pct">{pct(admitted, data.total)}%</span>
                </p>
              </div>
            </div>
          </div>
          <div className="grad-overview__split">
            <span className="is-in" style={{ width: `${pct(admitted, data.total)}%` }}></span>
            <span className="is-out" style={{ width: `${pct(notAdmitted, data.total)}%` }}></span>
          </div>
          <div className="grad-overview__legend">
            <span><i className="is-in"></i>{admitted} nafar OTMga kirgan</span>
            <span><i className="is-out"></i>{notAdmitted} nafar kirmagan</span>
          </div>
        </div>
        <Kpi icon="calendar-uni.svg" label="O'rtacha bilim darajasi" variant="grad-kpi--grade">
          <span className="teacher-certs__num">{data.averageGrade.toFixed(2)}</span>{' '}
          <span className="teacher-certs__unit">/ 5 ball</span>
          <GradeScale value={data.averageGrade} />
          <p className="teacher-certs__note">Yakuniy attestatsiya (YaAK) baholarining o'rtachasi</p>
        </Kpi>
      </div>

      <div className="row grad-row">
        {/* 2. Bitiruvchilar kirgan OTMlar — toifalar ochiladi */}
        <div className="col-lg-7 mb-3">
          <AdmissionGroups groups={data.admissions} total={data.total} notAdmitted={notAdmitted} sample={data.admissionsSample} />
        </div>

        {/* 3. Ta'sischi OTM */}
        <div className="col-lg-5 mb-3">
          <div className="founder-card h-100">
            <p className="founder-card__label">Ta'sischi OTM</p>
            <div className="founder-card__head">
              <p className="founder-card__name">{data.founder.name}</p>
              {data.founder.logo && (
                <div className="founder-card__logo">
                  <img src={data.founder.logo} alt="OTM logotipi" />
                </div>
              )}
            </div>
            <div className="founder-card__summary">
              <div className="founder-card__big">
                <b>{data.founder.admitted}</b>
                <span>nafar bitiruvchi</span>
              </div>
              <p className="founder-card__sentence">shu universitetga o'qishga kirgan</p>
            </div>
            <div className="founder-card__share">
              <div className="founder-card__share-head">
                <span>Jami {data.total} nafar bitiruvchining</span>
                <b>{founderShare}%</b>
              </div>
              <div className="founder-card__bar">
                <span style={{ width: `${founderShare}%` }}></span>
              </div>
            </div>
            <a href={data.founder.href} target="_blank" rel="noreferrer" className="founder-card__btn">
              OTM pasportini ko'rish <i className="i-angle-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

import { IMG, SectionTop } from './common.jsx'
import CountUp from './CountUp.jsx'

const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

// Qabul bo'limi: kvota va talabgorlar (bitta kartochkada) + tanlov (1 o'ringa nechta talabgor)
export default function Admission({ data }) {
  const { quota, applicants } = data
  const ratio = quota > 0 ? applicants / quota : 0
  const ratioText = ratio.toFixed(1).replace('.', ',')
  const chance = applicants > 0 ? Math.round((quota / applicants) * 100) : 0
  const noSeat = Math.max(applicants - quota, 0)

  return (
    <div>
      <SectionTop title="Qabul ko'rsatkichlari" date={data.date} />
      <div className="grad-kpis mb-3">
        {/* Kvota va talabgorlar */}
        <div className="grad-overview">
          <div className="grad-overview__stats">
            <div className="grad-overview__stat">
              <div className="teacher-certs__icon">
                <img src={`${IMG}/university-stat-1.svg`} alt="" />
              </div>
              <div>
                <p className="teacher-certs__label">Qabul kvotasi</p>
                <p className="grad-overview__value">
                  <CountUp className="teacher-certs__num" value={quota} /> <span className="teacher-certs__unit">ta o'rin</span>
                </p>
              </div>
            </div>
            <div className="grad-overview__divider"></div>
            <div className="grad-overview__stat">
              <div className="teacher-certs__icon">
                <img src={`${IMG}/university-staff-1.svg`} alt="" />
              </div>
              <div>
                <p className="teacher-certs__label">Talabgorlar</p>
                <p className="grad-overview__value">
                  <CountUp className="teacher-certs__num" value={applicants} /> <span className="teacher-certs__unit">nafar</span>
                </p>
              </div>
            </div>
          </div>
          <div className="grad-overview__split">
            <span className="is-in" style={{ width: `${chance}%` }}></span>
            <span className="is-rest" style={{ width: `${100 - chance}%` }}></span>
          </div>
          <div className="grad-overview__legend">
            <span><i className="is-in"></i>{fmt(quota)} nafari qabul qilinadi</span>
            <span><i className="is-rest"></i>{fmt(noSeat)} nafariga o'rin yetmaydi</span>
          </div>
        </div>

        {/* Tanlov */}
        <div className="competition-card">
          <p className="competition-card__label">Tanlov (bir o'ringa)</p>
          <div className="competition-card__main">
            <b>{ratioText}</b>
            <span>nafar talabgor<br />1 ta o'ringa</span>
          </div>
          <p className="competition-card__text">
            Har bir o'rin uchun o'rtacha {ratioText} nafar talabgor bahslashadi
          </p>
          <div className="competition-card__chance">
            <span>Talabgorlarning qancha qismi o'qishga qabul qilinadi</span>
            <b>{chance}%</b>
          </div>
        </div>
      </div>
    </div>
  )
}

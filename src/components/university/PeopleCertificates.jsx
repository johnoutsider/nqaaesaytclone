import { IMG } from './common.jsx'
import CountUp from './CountUp.jsx'

// Bitta ko'rsatkich kartochkasi (pedagog/o'quvchi soni, jamiga nisbatan foizi va chizig'i)
// Nechta kishida sertifikat bor va bu jami sonning necha foizi.
export function CertItem({ label, count, total, unit, variant }) {
  const percent = total > 0 ? Math.round((count / total) * 100) : 0
  return (
    <div className={`teacher-certs__item teacher-certs__item--${variant}`}>
      <div className="teacher-certs__top">
        <div className="teacher-certs__icon">
          <img src={`${IMG}/university-staff-1.svg`} alt="" />
        </div>
        <div className="teacher-certs__text">
          <p className="teacher-certs__label">{label}</p>
          <p className="teacher-certs__value">
            <CountUp className="teacher-certs__num" value={count} /> <span className="teacher-certs__unit">nafar {unit}</span>
          </p>
        </div>
        <div className="teacher-certs__percent">{percent}%</div>
      </div>
      <div className="teacher-certs__bar">
        <span style={{ width: `${percent}%` }}></span>
      </div>
      <p className="teacher-certs__note">Jami {String(total).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} nafar {unit}dan</p>
    </div>
  )
}

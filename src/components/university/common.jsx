import { Fragment } from 'react'
import CountUp from './CountUp.jsx'

export const IMG = 'assets/public/images'
export const NA = 'mavjud emas'

// Bo'lim sarlavhasi: nom + sana
export function SectionTop({ title, date, className = 'university-top', children }) {
  return (
    <div className={className}>
      <h4>{title}</h4>
      {children ?? (date !== undefined && <p>{date}</p>)}
    </div>
  )
}

// Jami / mahalliy / xorijiy — bitta qatorda (Pedagoglar va O'quvchilar bo'limlarida)
function OverviewStat({ label, value, unit = 'nafar', display, icon = 'university-staff-1.svg' }) {
  return (
    <div className="grad-overview__stat">
      <div className="teacher-certs__icon">
        <img src={`${IMG}/${icon}`} alt="" />
      </div>
      <div>
        <p className="teacher-certs__label">{label}</p>
        <p className="grad-overview__value">
          {display != null ? (
            <>
              <span className="teacher-certs__num">{display}</span> {unit && <span className="teacher-certs__unit">{unit}</span>}
            </>
          ) : value == null ? (
            <span className="teacher-certs__num teacher-overview__na">{NA}</span>
          ) : (
            <>
              <CountUp className="teacher-certs__num" value={value} /> {unit && <span className="teacher-certs__unit">{unit}</span>}
            </>
          )}
        </p>
      </div>
    </div>
  )
}

export function OverviewCard({ items, title }) {
  return (
    <div className="grad-overview mb-3">
      {title && (
        <h2 className="university-bars--title">
          <img src={`${IMG}/university-direction.svg`} alt="" />
          {title}
        </h2>
      )}
      <div className="grad-overview__stats">
        {items.map((it, i) => (
          <Fragment key={it.label}>
            {i > 0 && <div className="grad-overview__divider"></div>}
            <OverviewStat {...it} />
          </Fragment>
        ))}
      </div>
    </div>
  )
}

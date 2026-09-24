import { Fragment } from 'react'
import CountUp from './CountUp.jsx'

export const IMG = '/assets/public/images'
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
function OverviewStat({ label, value }) {
  return (
    <div className="grad-overview__stat">
      <div className="teacher-certs__icon">
        <img src={`${IMG}/university-staff-1.svg`} alt="" />
      </div>
      <div>
        <p className="teacher-certs__label">{label}</p>
        <p className="grad-overview__value">
          {value == null ? (
            <span className="teacher-certs__num teacher-overview__na">{NA}</span>
          ) : (
            <>
              <CountUp className="teacher-certs__num" value={value} /> <span className="teacher-certs__unit">nafar</span>
            </>
          )}
        </p>
      </div>
    </div>
  )
}

export function OverviewCard({ items }) {
  return (
    <div className="grad-overview mb-3">
      <div className="grad-overview__stats">
        {items.map((it, i) => (
          <Fragment key={it.label}>
            {i > 0 && <div className="grad-overview__divider"></div>}
            <OverviewStat label={it.label} value={it.value} />
          </Fragment>
        ))}
      </div>
    </div>
  )
}

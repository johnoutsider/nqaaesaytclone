// Indikatorlarni ko'rsatish uchun umumiy bloklar (docs/TEXNIKUM-SAHIFA-REJASI.md, 4-bo'lim):
// solishtirma chiziq (texnikum / median / eng yaxshi), ball chipi, holat rangi, "Hali yo'q" kartasi.
import { IMG } from '../university/common.jsx'

export const fmt = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
export const pctText = (x, digits = 0) => `${(x * 100).toFixed(digits).replace('.', ',')}%`
export const ballText = (b) => String(Math.round(b * 100) / 100).replace('.', ',')
export const somText = (x) => `${fmt(x)} so'm`

// Holat: median bilan solishtirish. zero — natija yo'q.
export function statusOf(share, median) {
  if (!share) return 'zero'
  if (!median) return 'good'
  if (share >= median * 1.05) return 'good'
  if (share >= median * 0.95) return 'mid'
  return 'bad'
}
export const STATUS_TEXT = {
  good: 'Respublika medianasidan yuqori',
  mid: 'Respublika medianasi darajasida',
  bad: 'Respublika medianasidan past',
  zero: 'Hali natija yo‘q',
}

// "Eng yaxshi X%" — nechta texnikum undan yuqori ekaniga qarab
export const topPercent = (better, n) => Math.max(1, Math.ceil(((better + 1) / n) * 100))

export function SectionHead({ title, note }) {
  return (
    <div className="university-top rt-head">
      <h4>{title}</h4>
      {note && <p>{note}</p>}
    </div>
  )
}

export function CardTitle({ children, icon = 'university-direction.svg', right }) {
  return (
    <div className="rt-card-title">
      <h2 className="university-bars--title mb-0">
        <img src={`${IMG}/${icon}`} alt="" /> {children}
      </h2>
      {right}
    </div>
  )
}

// Ball chipi: "3,52 / 4 ball"
export function BallChip({ ind }) {
  return (
    <span className={`rt-chip rt-chip--${ind.status}`} title={`${ind.code} · ${ind.title}`}>
      {ballText(ind.ball)} / {ballText(ind.max)} ball
    </span>
  )
}

// Solishtirma chiziq: texnikum qiymati, respublika medianasi va eng yaxshi natija
export function Compare({ value, median, best, format = pctText, status, labels = {} }) {
  const top = Math.max(best, value, median) || 1
  const pos = (v) => `${Math.min(100, (v / top) * 100)}%`
  return (
    <div className={`rt-compare rt-compare--${status}`}>
      <div className="rt-compare__track">
        <span className="rt-compare__fill" style={{ width: pos(value) }}></span>
        <span className="rt-compare__median" style={{ left: pos(median) }} title={`Median: ${format(median)}`}></span>
      </div>
      <div className="rt-compare__legend">
        <span className="rt-compare__me"><i></i>{labels.me ?? 'Texnikum'}: <b>{format(value)}</b></span>
        <span className="rt-compare__med"><i></i>Median: <b>{format(median)}</b></span>
        <span className="rt-compare__best">Eng yaxshi: <b>{format(best)}</b></span>
      </div>
    </div>
  )
}

// Nol natija uchun: yashirilmaydi — nega muhimligi aytiladi
export function EmptyNote({ ind, n, children }) {
  return (
    <div className="rt-empty">
      <span className="rt-empty__badge">Hali yo‘q</span>
      <p>{children}</p>
      <p className="rt-empty__ctx">
        {ind.zeroCount} / {n} texnikumda ham natija yo‘q · bu indikator {ballText(ind.max)} ball beradi
      </p>
    </div>
  )
}

// Katta raqam + izoh
export function BigStat({ value, unit, text, status }) {
  return (
    <div className={`rt-big rt-big--${status || 'neutral'}`}>
      <b>{value}</b>
      {unit && <span className="rt-big__unit">{unit}</span>}
      {text && <p>{text}</p>}
    </div>
  )
}

// Bo'lingan chiziq + legenda
export function Stacked({ parts, total, unit = 'nafar' }) {
  return (
    <div className="rt-stacked">
      <div className="rt-stacked__bar">
        {parts.map((p) =>
          p.value > 0 ? (
            <span key={p.label} style={{ width: `${(p.value / total) * 100}%`, background: p.color }} title={`${p.label}: ${p.value}`}></span>
          ) : null
        )}
      </div>
      <div className="rt-stacked__legend">
        {parts.map((p) => (
          <div key={p.label} className="rt-stacked__item">
            <i style={{ background: p.color }}></i>
            <span className="rt-stacked__label">{p.label}</span>
            <b>{fmt(p.value)}</b> <small>{unit} · {pctText(total ? p.value / total : 0)}</small>
          </div>
        ))}
      </div>
    </div>
  )
}

// Halqa (umumiy ball, so'rovnoma)
export function Ring({ value, size = 120, stroke = 12, color = '#3e7bb6', children }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <div className="rt-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e8edf4" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={`${Math.max(0, Math.min(1, value)) * c} ${c}`} transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="rt-ring__center">{children}</div>
    </div>
  )
}

export const STATUS_COLOR = { good: '#19ae8b', mid: '#ffa151', bad: '#e74c3c', zero: '#b3bccb' }

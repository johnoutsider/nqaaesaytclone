import { useMemo, useState } from 'react'
import { IMG } from './common.jsx'

// Bitiruvchilar kirgan OTMlar — reyting toifalari bo'yicha, har bir toifa ochiladi.
// Ko'p bitiruvchi bo'lsa ham tartibli: ro'yxat OTM bo'yicha jamlanadi (har bir bitiruvchi emas),
// ko'pdan kamga saralanadi, dastlab TOP 5 ko'rinadi, uzun ro'yxatda qidiruv va aylantirish bor.
const PREVIEW = 5
const SEARCH_FROM = 8

const pct = (part, whole) => (whole > 0 ? Math.round((part / whole) * 100) : 0)

function UniversityList({ group }) {
  const [showAll, setShowAll] = useState(false)
  const [query, setQuery] = useState('')

  const sorted = useMemo(
    () => [...(group.universities ?? [])].sort((a, b) => b.count - a.count),
    [group.universities]
  )
  const filtered = query
    ? sorted.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()))
    : sorted
  const visible = showAll || query ? filtered : filtered.slice(0, PREVIEW)
  const hidden = sorted.length - PREVIEW
  const max = sorted[0]?.count || 1

  if (group.count === 0) {
    return <p className="uni-list__empty">Bu toifadagi OTMlarga kirgan bitiruvchi yo'q</p>
  }
  if (!sorted.length) {
    return <p className="uni-list__empty">OTMlar bo'yicha ma'lumot hali kiritilmagan</p>
  }

  return (
    <div className="uni-list">
      <div className="uni-list__meta">
        <span><b>{group.count}</b> nafar bitiruvchi · <b>{sorted.length}</b> ta OTM</span>
        {sorted.length >= SEARCH_FROM && (
          <input
            className="uni-list__search"
            type="text"
            placeholder="OTM nomi bo'yicha qidirish..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        )}
      </div>
      <ol className={`uni-list__items ${showAll ? 'is-scroll' : ''}`}>
        {visible.map((u) => (
          <li key={u.name} className={`uni-list__item ${u.founder ? 'is-founder' : ''}`}>
            <span className="uni-list__rank">{sorted.indexOf(u) + 1}</span>
            <div className="uni-list__body">
              <div className="uni-list__row">
                <span className="uni-list__name">
                  {u.name}
                  {u.founder && <em className="uni-list__badge">Ta'sischi OTM</em>}
                </span>
                <span className="uni-list__count">
                  <b>{u.count}</b> nafar · {pct(u.count, group.count)}%
                </span>
              </div>
              <div className="uni-list__bar">
                <span style={{ width: `${(u.count / max) * 100}%` }}></span>
              </div>
            </div>
          </li>
        ))}
        {query && !filtered.length && <li className="uni-list__empty">Hech narsa topilmadi</li>}
      </ol>
      {!query && hidden > 0 && (
        <button type="button" className="uni-list__more" onClick={() => setShowAll((v) => !v)}>
          {showAll ? "Qisqartirish" : `Yana ${hidden} ta OTMni ko'rsatish`}
          <i className="i-angle-bot" style={showAll ? { transform: 'rotate(180deg)' } : undefined}></i>
        </button>
      )}
    </div>
  )
}

export default function AdmissionGroups({ groups, total, notAdmitted, sample }) {
  const [open, setOpen] = useState(null)

  return (
    <div className="content-section__inner h-100 grad-groups">
      <div className="age-card__head mb-2">
        <h2 className="university-bars--title mb-0">
          <img src={`${IMG}/university-direction.svg`} alt="" />
          Bitiruvchilar kirgan oliy ta'lim tashkilotlari
        </h2>
        {sample && <span className="age-card__sample">Taxminiy ma'lumot</span>}
      </div>
      <p className="grad-hint mt-0">
        OTMlarning xalqaro reytingdagi o'rni bo'yicha. Toifani bosing — bitiruvchilar kirgan OTMlar ro'yxati ochiladi.
      </p>

      <div className="grad-rank">
        {groups.map((g, i) => {
          const isOpen = open === i
          return (
            <div key={g.label} className={`grad-rank__row grad-rank__row--${i} grad-acc ${isOpen ? 'is-open' : ''}`}>
              <button type="button" className="grad-acc__toggle" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
                <div className="grad-rank__head">
                  <span className="grad-acc__label">
                    <i className="i-angle-bot grad-acc__chevron"></i>
                    {g.label}
                  </span>
                  <span className="grad-rank__count">
                    <b>{g.count}</b> nafar · {pct(g.count, total)}%
                  </span>
                </div>
                <div className="teacher-certs__bar">
                  <span style={{ width: `${pct(g.count, total)}%` }}></span>
                </div>
              </button>
              {isOpen && (
                <div className="grad-acc__panel">
                  <UniversityList group={g} />
                </div>
              )}
            </div>
          )
        })}

        <div className="grad-rank__row grad-rank__row--none">
          <div className="grad-rank__head grad-acc__static">
            <span>OTMga kirmaganlar</span>
            <span className="grad-rank__count">
              <b>{notAdmitted}</b> nafar · {pct(notAdmitted, total)}%
            </span>
          </div>
          <div className="teacher-certs__bar">
            <span style={{ width: `${pct(notAdmitted, total)}%` }}></span>
          </div>
        </div>
      </div>
    </div>
  )
}

import { SectionTop } from './common.jsx'

// Akkreditatsiya bo'limi — faqat kompleks davlat akkreditatsiyasi.
// status: 'passed' | 'failed' | 'in_progress' — asl sayt CSS'ida uchala rang ham bor.
const STATUS = {
  passed: { icon: 'i-done', title: "Akkreditatsiyadan o'tgan", label: "O'tgan", labelIcon: 'i-tick' },
  failed: { icon: 'i-warning', title: "Akkreditatsiyadan o'tmagan", label: "O'tmagan", labelIcon: 'i-close' },
  in_progress: { icon: 'i-clock', title: 'Akkreditatsiya jarayonida', label: 'Jarayonda', labelIcon: 'i-info' },
}

export default function Accreditation({ data }) {
  const c = data.complex
  const s = STATUS[c.status] ?? STATUS.in_progress
  return (
    <div className="mb-3">
      <SectionTop title="Akkreditatsiya" />
      <div className="tab-panel content-section">
        <div className="age-card__head mb-3">
          <div className="content-section__title text-start mb-0">Kompleks davlat akkreditatsiya holati</div>
          {data.sample && <span className="age-card__sample">Taxminiy ma'lumot</span>}
        </div>
        <div className={`university-accreditation ${c.status}`}>
          <div className="university-accreditation-icon">
            <i className={s.icon}></i>
          </div>
          <div>
            <h5>{s.title}</h5>
            <div className="university-accreditation-grid">
              <div>
                <p>Holati:</p>
                <span><i className={s.labelIcon}></i> {s.label}</span>
              </div>
              {c.dates.map((d) => (
                <div key={d.label}>
                  <p>{d.label}:</p>
                  <span><i className="i-calendar"></i> {d.value}</span>
                </div>
              ))}
            </div>
          </div>
          <i className={`${s.icon} effect`}></i>
        </div>
      </div>
    </div>
  )
}

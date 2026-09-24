import { useRef, useState } from 'react'
import { SectionTop } from './common.jsx'

// Ijobiy/Salbiy donut (so'rovnoma savoli uchun)
function SurveyDonut({ positive, negative }) {
  const total = positive + negative
  const r = 50
  const strokeW = 18
  const gapLen = 2 + strokeW
  const circ = 2 * Math.PI * r
  const available = circ - 2 * gapLen
  const posLen = (positive / total) * available
  const negLen = (negative / total) * available
  const circle = (color, len, offset) => (
    <circle
      cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth={strokeW}
      strokeDasharray={`${len} ${circ - len}`} strokeDashoffset={offset} strokeLinecap="round"
    />
  )
  return (
    <svg viewBox="0 0 120 120" className="charts-donut__svg">
      {circle('#3C878C', posLen, circ / 4)}
      {circle('#E74C3C', negLen, circ / 4 - (posLen + gapLen))}
    </svg>
  )
}

function SurveyGroup({ group }) {
  const [open, setOpen] = useState(false)
  const answerRef = useRef(null)
  const maxHeight = open && answerRef.current ? answerRef.current.scrollHeight + 25 + 'px' : '0'

  return (
    <button
      className={`faq-item  ${open ? 'active' : ''}`}
      onClick={(e) => {
        if (e.target.closest('.answer')) return
        setOpen((v) => !v)
      }}
    >
      <div className="question">
        <div>
          <h5 className="mb-2">{group.title}</h5>
          <p className="soon">11232131311311212</p>
        </div>
        <span className="i-close"></span>
      </div>
      <div className="answer" ref={answerRef} style={{ maxHeight }}>
        <div className="row w-100">
          {group.items.map((d) => (
            <div key={d.question} className="col-lg-4 col-md-6">
              <div className="content-section__inner h-100">
                <div className="content-section__top alt line-fix-3 mb-auto">{d.question}</div>
                <div className="row align-items-center mt-5">
                  <div className="col-6">
                    <div className="charts-donut">
                      <SurveyDonut positive={d.positive} negative={d.negative} />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="charts-donut__labels">
                      <div className="charts-donut__label charts-donut__label--positive">
                        <span className="charts-donut__label-text"><strong>{d.positive}%</strong><br />Ijobiy</span>
                      </div>
                      <div className="charts-donut__label charts-donut__label--negative">
                        <span className="charts-donut__label-text"><strong>{d.negative}%</strong><br />Salbiy</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </button>
  )
}

export default function Survey({ data }) {
  return (
    <div>
      <SectionTop title="Umummilliy so'rovnoma natijalari" className="university-top ">
        <div className="select-wrapper" style={{ width: 'fit-content' }}>
          <select defaultValue={data.years[0]}>
            {data.years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </SectionTop>
      <section className="faq dont_activate_me mb-3 ">
        {data.groups.map((g) => (
          <SurveyGroup key={g.title} group={g} />
        ))}
      </section>
    </div>
  )
}

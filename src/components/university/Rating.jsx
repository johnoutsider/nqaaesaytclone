import { IMG, SectionTop } from './common.jsx'
import RatingChart from './RatingChart.jsx'

function RatingItem({ icon, placeholder, label }) {
  return (
    <div className="university-rating-wrapper-item">
      <div className="university-rating-wrapper-item-img">
        <img src={`${IMG}/${icon}`} alt="" />
        <img className="effect" src={`${IMG}/${icon}`} alt="schema" />
      </div>
      <div className="university-rating-wrapper-item-content">
        <p className="university-rating-wrapper-item-content-title soon">{placeholder}</p>
        <p className="university-rating-wrapper-item-content-desc">{label}</p>
      </div>
    </div>
  )
}

export default function Rating({ data }) {
  return (
    <div>
      <SectionTop title="Milliy reyting ko'rsatkichlari" date={data.date} className="university-top " />
      <div className="content-section university-rating-wrapper ">
        <RatingItem icon="university-rating-1.svg" placeholder="13123123213131" label="Milliy reytingdagi o'rni" />
        <RatingItem icon="university-rating-2.svg" placeholder="1231312312" label="Umumiy ballar" />
      </div>
      <div className="content-section mb-3 soon">
        <RatingChart data={data.chart} />
      </div>
    </div>
  )
}

import { IMG, SectionTop } from './common.jsx'

function InfraItem({ value, label }) {
  return (
    <div className="university-infra  ">
      <div className="university-infra-item">
        <div className="university-infra-item-img">
          <img src={`${IMG}/university-building.svg`} alt="" />
        </div>
        <div className="university-infra-item-content">
          <p className="university-infra-item-content-title ">{value}</p>
          <p className="university-infra-item-content-desc">{label}</p>
        </div>
        <div className="university-infra-item-effect">
          <img src={`${IMG}/university-building.svg`} alt="" />
        </div>
      </div>
    </div>
  )
}

export default function Buildings({ data }) {
  return (
    <div>
      <SectionTop title="Bino va inshootlar" date={data.date} className=" university-top " />
      <div className=" university-infra-wrapper">
        <InfraItem value={data.educationalCapacity} label="O'quv binolari quvvati" />
        <InfraItem value={data.residenceCapacity} label="Talabalar turar joylari quvvati" />
      </div>
    </div>
  )
}

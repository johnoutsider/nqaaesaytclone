import { IMG, NA } from './common.jsx'

function InfoItem({ icon, title, value }) {
  return (
    <div className="university-header-content-wrapper-item">
      <div className="university-header-content-wrapper-item-img">
        <img src={`${IMG}/${icon}`} alt="" />
      </div>
      <div className="university-header-content-wrapper-item-content">
        <p className="university-header-content-wrapper-item-content-title">{title}</p>
        <p className="university-header-content-wrapper-item-content-desc">{value ?? NA}</p>
      </div>
    </div>
  )
}

export default function UniversityHeader({ org }) {
  return (
    <div className="content-section university-header">
      <div className="university-header-img">
        {org.logo && <img className="university-logo" src={org.logo} alt="Logotip" />}
      </div>
      <div className="university-header-content">
        <h1>{org.name}</h1>
        <div className="university-header-content-wrapper">
          <InfoItem icon="property.svg" title="Mulkchilik shakli" value={org.ownership} />
          <InfoItem icon="map.svg" title="Hudud" value={org.region} />
          <InfoItem icon="calendar-uni.svg" title="Tashkil etilgan yil" value={org.foundedYear} />
          {/* O'zgarish: "Ta'lim dasturlari" alohida bo'limdan shu yerga ko'chirildi (jami = mahalliy bo'lgani uchun bitta qiymat) */}
          <InfoItem icon="university-stat-1.svg" title="Ta'lim dasturlari" value={org.programs.total} />
        </div>
      </div>
    </div>
  )
}

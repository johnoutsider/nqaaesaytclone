import { SectionTop } from './common.jsx'

// O'zgarish: Bog'lanish bloki qayta tuzildi — chapda bitta kartochkada 4 ta bosiladigan qator,
// o'ngda manzil bo'yicha topilgan jonli xarita (Yandex).
const mapSrc = (d) =>
  d.mapPoint
    ? `https://yandex.uz/map-widget/v1/?ll=${d.mapPoint.join('%2C')}&pt=${d.mapPoint.join('%2C')},pm2rdm&z=16`
    : `https://yandex.uz/map-widget/v1/?text=${encodeURIComponent(d.mapQuery || d.address)}&z=15`

const mapLink = (d) =>
  d.mapPoint
    ? `https://yandex.uz/maps/?pt=${d.mapPoint.join('%2C')}&z=17&l=map`
    : `https://yandex.uz/maps/?text=${encodeURIComponent(d.mapQuery || d.address)}`

function ContactRow({ icon, label, value, href, action, external }) {
  const Tag = href ? 'a' : 'div'
  return (
    <Tag
      className="contact-row"
      {...(href ? { href, ...(external ? { target: '_blank', rel: 'noreferrer' } : {}) } : {})}
    >
      <span className="contact-row__icon"><i className={icon}></i></span>
      <span className="contact-row__body">
        <span className="contact-row__label">{label}</span>
        <span className="contact-row__value">{value}</span>
      </span>
      {action && <span className="contact-row__action">{action} <i className="i-angle-right"></i></span>}
    </Tag>
  )
}

// Telefon raqamlari bitta "Telefon raqam" qatorida, ustma-ust (nechta bo'lsa ham qator ko'paymaydi).
// Har bir raqam o'z "Qo'ng'iroq" tugmasi bilan. foundedYear berilsa — eng tepada "Tashkil etilgan yil"
// ("Tashkil etilish asosi" o'rniga).
function PhoneRow({ phones }) {
  return (
    <div className="contact-row">
      <span className="contact-row__icon"><i className="i-phone"></i></span>
      <span className="contact-row__body">
        <span className="contact-row__label">Telefon raqam</span>
        {phones.map((p) => (
          <a key={p} className="contact-row__phone" href={`tel:${p.replace(/[^\d+]/g, '')}`}>
            <span className="contact-row__value">{p}</span>
            <span className="contact-row__action">Qo'ng'iroq <i className="i-angle-right"></i></span>
          </a>
        ))}
      </span>
    </div>
  )
}

export default function Contacts({ data, foundedYear }) {
  const phones = [].concat(data.phone || [])
  const site = data.website?.replace(/^https?:\/\//, '').replace(/\/$/, '')

  return (
    <div>
      <SectionTop title="Bog'lanish va manzil" />
      <div className="row mb-3 contacts-block">
        <div className="col-lg-5 mb-3 mb-lg-0">
          <div className="content-section__inner h-100 contact-card">
            {foundedYear && <ContactRow icon="i-docs" label="Tashkil etilgan yil" value={foundedYear} />}
            {phones.length > 0 && <PhoneRow phones={phones} />}
            {site && <ContactRow icon="i-web" label="Rasmiy veb-sayt" value={site} href={data.website} action="Ochish" external />}
            {!foundedYear && data.basis && <ContactRow icon="i-docs" label="Tashkil etilish asosi" value={data.basis} />}
            <ContactRow icon="i-email" label="Elektron manzil" value={data.email} href={`mailto:${data.email}`} action="Yozish" />
            <ContactRow icon="i-location" label="Yuridik manzil" value={data.address} href={mapLink(data)} action="Xaritada" external />
          </div>
        </div>
        <div className="col-lg-7">
          <div className="contact-map h-100">
            <iframe src={mapSrc(data)} title="Xarita" loading="lazy" allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

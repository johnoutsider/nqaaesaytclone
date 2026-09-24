import { contacts, socials } from '../data/menu.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col">
            <a href="" className="footer__logo">
              <img src="/assets/public/images/agenlik-logo-new.svg" alt="logo" />
            </a>
            <p className="footer__text mb-3">
              Oʻzbekiston Respublikasi Prezidenti Administratsiyasi huzuridagi Taʼlim sifatini taʼminlash milliy agentligi.
            </p>
            <div className="header__icons">
              {socials.map((s) => (
                <a key={s.title} href={s.href} className="header__icon-btn" title={s.title} target="_blank" rel="noreferrer">
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>
          </div>
          <div className="col">
            <div className="footer__items">
              <div className="footer__item">
                <a href={`tel:${contacts.phone.tel}`} className="footer__item-value d-flex align-items-center gap-2">
                  <i className="i-phone"></i>{contacts.phone.label}
                </a>
                <span className="footer__item-label">Telefon raqam</span>
              </div>
              <div className="footer__item">
                <a href={`tel:${contacts.callCenter.tel}`} className="footer__item-value d-flex align-items-center gap-2">
                  <i className="i-phone"></i>{contacts.callCenter.label}
                </a>
                <span className="footer__item-label">Call markaz</span>
              </div>
              <div className="footer__item">
                <a href={`mailto:${contacts.emails[0]}`} className="footer__item-value d-flex align-items-center gap-2">
                  <i className="i-email"></i>{contacts.emails[0]}
                </a>
                <span className="footer__item-label">Elektron manzil</span>
              </div>
              <div className="footer__item">
                <span className="footer__item-value d-flex align-items-center gap-2">
                  <i className="i-location"></i>{contacts.address}
                </span>
                <span className="footer__item-label">Manzil</span>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="footer__iframe">
              <iframe
                width="337"
                height="139"
                title="location"
                src="https://yandex.com/map-widget/v1/?ll=69.208114%2C41.348616&mode=whatshere&whatshere%5Bpoint%5D=69.207749%2C41.348792&whatshere%5Bzoom%5D=17&z=16"
                frameBorder="1"
                allowFullScreen
                style={{ position: 'relative' }}
              ></iframe>
            </div>
          </div>
        </div>
        <div className="footer__nav">
          <span className="footer__nav-item"> © 2026 NQAAE. Barcha huquqlari himoyalangan.</span>
        </div>
      </div>
    </footer>
  )
}

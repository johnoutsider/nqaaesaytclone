import { menu, contacts, socials, SITE } from '../data/menu.js'

const IMG = 'assets/public/images'

function SubMenu({ items }) {
  return (
    <ul className="header__submenu">
      {items.map((item) =>
        item.children ? (
          <li key={item.title} className="header__submenu-item header__submenu-item--dropdown">
            <span className="header__submenu-link">
              {item.title} <i className="i-angle-right"></i>
            </span>
            <SubMenu items={item.children} />
          </li>
        ) : (
          <li key={item.title + item.href} className="header__submenu-item">
            <a href={item.href} className="header__submenu-link">{item.title}</a>
          </li>
        )
      )}
    </ul>
  )
}

export default function Header() {
  return (
    <header className="header " role="banner">
      <div className="container">
        <a href={SITE} className="header__brand" aria-label="Home">
          <img src={`${IMG}/logo-mini.svg`} alt="Logo" className="header__brand-img" />
        </a>
        <div className="header__wrapper">
          <div className="header__top">
            <div className="header__top-right">
              {contacts.emails.map((email) => (
                <a key={email} href={`mailto:${email}`} className="header__contact header__contact--link">
                  <i className="i-email"></i>
                  <span>{email}</span>
                </a>
              ))}
              <a href={`tel:${contacts.phone.tel}`} className="header__contact header__contact--link">
                <i className="i-phone"></i>
                <span>{contacts.phone.label}</span>
              </a>
              <a href={`tel:${contacts.callCenter.tel}`} className="header__contact header__contact--link alt">
                <i className="i-phone"></i>
                <span>Call markaz</span> :
                <span>{contacts.callCenter.label}</span>
              </a>
              <div className="divider"></div>
              <div className="header__icon alt">
                <button className="header__icon-btn  bvi-open" title="Visibility"><span className="i-eye"></span></button>
                <button className="header__icon-btn" title="Sound" data-bs-toggle="modal" data-bs-target="#volume"><i className="i-sound"></i></button>
              </div>
              <div className="header__divider alt"></div>
              <div className="header__icon">
                {socials.map((s) => (
                  <a key={s.title} href={s.href} className="header__icon-btn" title={s.title} target="_blank" rel="noreferrer">
                    <i className={s.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="header__nav">
            <ul className="header__menu">
              {menu.map((item) =>
                item.children ? (
                  <li key={item.title} className="header__menu-item header__menu-item--dropdown">
                    <span className="header__menu-link">
                      {item.title} <i className="i-angle-bot"></i>
                    </span>
                    <SubMenu items={item.children} />
                  </li>
                ) : (
                  <li key={item.title} className="header__menu-item">
                    <a href={item.href} className="header__menu-link">{item.title}</a>
                  </li>
                )
              )}
            </ul>

            <div className="header__lang">
              <button data-bs-toggle="dropdown" className="header__lang-btn" type="button" aria-haspopup="true" aria-expanded="false">
                <img src={`${IMG}/flag-uz.png`} alt="uz" />
                <span>O'zbekcha</span>
                <i className="i-angle-bot"></i>
              </button>
              <ul className="dropdown-menu header__lang-dropdown ">
                <li className="header__lang-item">
                  <a className="header__lang-link header__lang-link--active" href="#">
                    <img src={`${IMG}/flag-uz.png`} alt="uz" /> O'zbekcha{' '}
                  </a>
                </li>
                <li className="header__lang-item">
                  <a className="header__lang-link " href="https://nqaae.uz/en/secondary/205260966">
                    <img src={`${IMG}/flag-en.png`} alt="en" /> English
                  </a>
                </li>
              </ul>
            </div>
            <button className="header__menu-btn " type="button" aria-controls="offcanvas" aria-expanded="false" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu">
              <span className="header__burger" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

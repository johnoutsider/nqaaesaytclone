import { menu } from '../data/menu.js'

// Mobil (offcanvas) menyu — Bootstrap collapse orqali ishlaydi
function MobileSubMenu({ items, id }) {
  return (
    <ul className="submenu collapse" id={id}>
      {items.map((item, i) =>
        item.children ? (
          <li key={item.title} className="submenu-item submenu-item--dropdown">
            <span className="submenu-link" data-bs-toggle="collapse" data-bs-target={`#${id}-${i}`} aria-expanded="false" aria-controls={`${id}-${i}`}>
              {item.title} <i className="i-angle-right"></i>
            </span>
            <MobileSubMenu items={item.children} id={`${id}-${i}`} />
          </li>
        ) : (
          <li key={item.title + item.href} className="submenu-item">
            <a href={item.href} className="submenu-link">{item.title}</a>
          </li>
        )
      )}
    </ul>
  )
}

export default function MobileMenu() {
  return (
    <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasMenu" aria-labelledby="offcanvasMenuLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasMenuLabel">Menyu</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="menu">
          {menu.map((item, i) =>
            item.children ? (
              <li key={item.title} className="menu-item menu-item--dropdown">
                <span className="menu-link" data-bs-toggle="collapse" data-bs-target={`#submenu${i}`} aria-expanded="false" aria-controls={`submenu${i}`}>
                  {item.title} <i className="i-angle-bot"></i>
                </span>
                <MobileSubMenu items={item.children} id={`submenu${i}`} />
              </li>
            ) : (
              <li key={item.title} className="menu-item">
                <a href={item.href} className="menu-link">{item.title}</a>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  )
}

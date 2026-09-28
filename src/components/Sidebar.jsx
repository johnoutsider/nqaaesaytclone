import { orgLists } from '../data/menu.js'

// links: prototipdagi ichki sahifalar (masalan secondary → #/litsey); qolganlari asl saytga olib boradi
export default function Sidebar({ active, links = {} }) {
  return (
    <div className="sidebar">
      <div className="sidebar__menu">
        <h3 className="sidebar__title">Ta’lim tashkilotlari roʻyxati</h3>
        <ul className="sidebar__list">
          {orgLists.map((item) => (
            <li key={item.key} className={`sidebar__list--item ${item.key === active ? 'active' : 'no-active'}`}>
              <a href={links[item.key] ?? item.href} className="sidebar__link">{item.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

import { Fragment } from 'react'
import { SITE } from '../data/menu.js'

export default function Breadcrumbs({ items, title }) {
  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__list--item">
            <a href={SITE} className="breadcrumbs__link   i-home fs4"></a>
          </li>
          {items.map((item) => (
            <Fragment key={item}>
              <li className="breadcrumbs__list--item">
                <i className="i-angle-right"></i>
              </li>
              <li className="breadcrumbs-item">
                <a href="" className="breadcrumbs-item__link">{item}</a>
              </li>
            </Fragment>
          ))}
        </ul>
        <h1 className="breadcrumbs__title">{title}</h1>
      </div>
    </div>
  )
}

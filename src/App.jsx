import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import MobileMenu from './components/MobileMenu.jsx'
import Breadcrumbs from './components/Breadcrumbs.jsx'
import Sidebar from './components/Sidebar.jsx'
import Footer from './components/Footer.jsx'
import VolumeModal from './components/VolumeModal.jsx'
import University from './components/university/University.jsx'
import VocationalRating from './components/rating/VocationalRating.jsx'
import VocationalClone from './components/clone/VocationalClone.jsx'
import { organization } from './data/organization.js'
import { vocational } from './data/vocational.js'

// Sahifalar (hash — sayt serversiz va istalgan papkada ham ishlaydi):
//   #/litsey          — litsey pasporti (qayta ishlangan)
//   #/texnikum        — texnikum pasportining ASL KLONI (nqaae.uz/uz/vocational/200056906, 28.09.2026)
//   #/texnikum-yangi  — texnikum pasporti: indikatorlar asosidagi yangi sahifa (docs/TEXNIKUM-SAHIFA-REJASI.md)
// css: 'v2' — asl saytning 28.09.2026 dagi yangilangan main.min.css; custom: false — bizning custom.css o'chiriladi
const PAGES = {
  litsey: {
    title: "O'rta maxsus ta'lim tashkilotlari",
    sidebar: 'secondary',
    render: () => <University org={organization} />,
  },
  texnikum: {
    title: "Kasbiy ta'lim tashkilotlari",
    sidebar: 'vocational',
    css: 'v2',
    custom: false,
    render: () => <VocationalClone />,
  },
  'texnikum-yangi': {
    title: "Kasbiy ta'lim tashkilotlari",
    sidebar: 'vocational',
    render: () => <VocationalRating org={vocational} />,
  },
}
const CSS_FILES = {
  v1: './assets/public/css/main.min.css',
  v2: './assets/public/css/main.2026-09-28.min.css',
}
const SIDEBAR_LINKS = { secondary: '#/litsey', vocational: '#/texnikum' }

const pageFromHash = () => {
  const key = window.location.hash.replace(/^#\/?/, '')
  return PAGES[key] ? key : 'litsey'
}

export default function App() {
  const [pageKey, setPageKey] = useState(pageFromHash)
  const page = PAGES[pageKey]

  useEffect(() => {
    const onHash = () => {
      setPageKey(pageFromHash())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    document.title = page.title
    const main = document.getElementById('main-css')
    const href = CSS_FILES[page.css || 'v1']
    if (main && !main.href.endsWith(href.slice(1))) main.setAttribute('href', href)
    const custom = document.getElementById('custom-css')
    if (custom) custom.disabled = page.custom === false
  }, [page])

  useEffect(() => {
    // Asl saytdagi "Maxsus imkoniyatlar" (ko'z tugmasi) paneli
    if (window.isvek && !window.__bvi) {
      window.__bvi = new window.isvek.Bvi({
        target: '.bvi-open',
        fontSize: 14,
        panelFixed: false,
        panelHide: true,
      })
    }
  }, [])

  return (
    <>
      <Header />
      <MobileMenu />
      <Breadcrumbs items={["Ochiq ma'lumotlar", 'Ta’lim tashkilotlari roʻyxati', page.title]} title={page.title} />
      <div className="layout">
        <div className="container">
          <div className="layout-content" key={pageKey}>
            {page.render()}
          </div>
          <div className="layout-sidebar">
            <Sidebar active={page.sidebar} links={SIDEBAR_LINKS} />
          </div>
        </div>
      </div>
      <Footer />
      <VolumeModal />
    </>
  )
}

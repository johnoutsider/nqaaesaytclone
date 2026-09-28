import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import MobileMenu from './components/MobileMenu.jsx'
import Breadcrumbs from './components/Breadcrumbs.jsx'
import Sidebar from './components/Sidebar.jsx'
import Footer from './components/Footer.jsx'
import VolumeModal from './components/VolumeModal.jsx'
import University from './components/university/University.jsx'
import Vocational from './components/university/Vocational.jsx'
import { organization } from './data/organization.js'
import { vocational } from './data/vocational.js'

// Sahifalar: #/litsey (o'rta maxsus — litsey pasporti) va #/texnikum (kasbiy ta'lim — texnikum pasporti).
// Hash ishlatiladi — sayt serversiz (file://) va istalgan papkada ham ishlaydi.
const PAGES = {
  litsey: {
    title: "O'rta maxsus ta'lim tashkilotlari",
    sidebar: 'secondary',
    render: () => <University org={organization} />,
  },
  texnikum: {
    title: "Kasbiy ta'lim tashkilotlari",
    sidebar: 'vocational',
    render: () => <Vocational org={vocational} />,
  },
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

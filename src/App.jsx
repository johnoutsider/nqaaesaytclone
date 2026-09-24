import { useEffect } from 'react'
import Header from './components/Header.jsx'
import MobileMenu from './components/MobileMenu.jsx'
import Breadcrumbs from './components/Breadcrumbs.jsx'
import Sidebar from './components/Sidebar.jsx'
import Footer from './components/Footer.jsx'
import VolumeModal from './components/VolumeModal.jsx'
import University from './components/university/University.jsx'
import { organization } from './data/organization.js'

export default function App() {
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
      <Breadcrumbs
        items={["Ochiq ma'lumotlar", 'Ta’lim tashkilotlari roʻyxati', "O'rta maxsus ta'lim tashkilotlari"]}
        title="O'rta maxsus ta'lim tashkilotlari"
      />
      <div className="layout">
        <div className="container">
          <div className="layout-content">
            <University org={organization} />
          </div>
          <div className="layout-sidebar">
            <Sidebar active="secondary" />
          </div>
        </div>
      </div>
      <Footer />
      <VolumeModal />
    </>
  )
}

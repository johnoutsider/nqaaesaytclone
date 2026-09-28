// AVTOMATIK KLON: nqaae.uz/uz/vocational/200056906 sahifasining asl ko'rinishi (28.09.2026).
// Belgilash (markup) asl sahifadagidek; diagrammalarni asl saytning o'z skriptlari chizadi
// (vocationalCloneScripts.js). O'zgartirishlarni shu fayldan boshlash mumkin.
import { useEffect, useRef } from 'react'
import { runCloneScripts } from './cloneRuntime.js'
import { scripts } from './vocationalCloneScripts.js'

export default function VocationalClone() {
  const ref = useRef(null)
  useEffect(() => runCloneScripts(ref.current, scripts), [])
  return (
    <div ref={ref} className="clone-root">
      <div className="university">
      
      <div className="content-section university-header">
      <div className="university-header-img">
      <img src="assets/public/images/logo-placeholder.jpg" alt="Logotip yo'q" />
      
      </div>
      <div className="university-header-content">
      <h1>1-son Namangan Abu Ali ibn Sino nomidagi Jamoat salomatligi texnikumi</h1>
      <div className="university-header-content-wrapper">
      <div className="university-header-content-wrapper-item">
      <div className="university-header-content-wrapper-item-img">
      <img src="assets/public/images/property.svg" alt="" />
      </div>
      <div className="university-header-content-wrapper-item-content ">
      <p className="university-header-content-wrapper-item-content-title">
      Mulkchilik shakli                                    </p>
      <p className="university-header-content-wrapper-item-content-desc">
      Davlat                                    </p>
      </div>
      </div>
      <div className="university-header-content-wrapper-item">
      <div className="university-header-content-wrapper-item-img">
      <img src="assets/public/images/map.svg" alt="" />
      </div>
      <div className="university-header-content-wrapper-item-content">
      <p className="university-header-content-wrapper-item-content-title">
      Hudud                                    </p>
      <p className="university-header-content-wrapper-item-content-desc">
      Namangan shahri                                    </p>
      </div>
      </div>
      <div className="university-header-content-wrapper-item">
      <div className="university-header-content-wrapper-item-img">
      <img src="assets/public/images/calendar-uni.svg" alt="" />
      </div>
      <div className="university-header-content-wrapper-item-content">
      <p className="university-header-content-wrapper-item-content-title">
      Tashkil etilgan yil                                    </p>
      <p className="university-header-content-wrapper-item-content-desc">
      2025                                    </p>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div>
      <div className="university-top">
      <h4>Ta'lim dasturlari</h4>
      <p>--.--.----</p>
      </div>
      <div className="university-stats ">
      <div className="university-stats-item">
      <div className="university-stats-item-img">
      <img src="assets/public/images/vocational-stat-1.svg" alt="" />
      </div>
      <div className="university-stats-item-text">
      <p className="top" data-count="12">0</p>
      <p className="bottom">Ta'lim dasturlari soni</p>
      </div>
      </div>
      <div className="university-stats-item">
      <div className="university-stats-item-img">
      <img src="assets/public/images/vocational-stat-2.svg" alt="" />
      </div>
      <div className="university-stats-item-text">
      <p className="top" data-count="12">0</p>
      <p className="bottom">Mahalliy ta'lim dasturlari soni</p>
      </div>
      </div>
      <div className="university-stats-item">
      <div className="university-stats-item-img">
      <img src="assets/public/images/vocational-stat-3.svg" alt="" />
      </div>
      <div className="university-stats-item-text">
      <p className="top">mavjud emas</p>
      <p className="bottom">Qo‘shma ta'lim dasturlari soni</p>
      </div>
      </div>
      </div>
      </div>
      <div>
      <div className="university-top">
      <h4>Pedagoglar</h4>
      <p> 24.06.2026</p>
      </div>
      <div className="content-section__inner ">
      <h2 className="university-bars--title">
      <img src="assets/public/images/university-direction.svg" alt="" />{' '}
      Malaka toifasi                        </h2>
      <div className="university-donut">
      <div className="university-donut-chart">
      <svg id="donutSvg" width="200" height="200" viewBox="0 0 200 200"></svg>
      </div>
      <div className="university-donut-legend grid"></div>
      </div>
      </div>
      <div className="row mb-3">
      <div className="col-md-6">
      <div className="content-section__inner  h-100">
      <div className="d-flex align-items-center gap-3">
      <i className="i-people university-header-content-wrapper-item-img text-white fs-3 rounded-4"></i>
      <div className="d-flex flex-column align-items-start">
      <span className="link content-section__title  mb-0" data-count="39">
      </span>
      <p className=" content-section__text d-flex flex-column ">
      Jami o‘qituvchilari                                        </p>
      </div>
      </div>
      <hr />
      <div className="university-bars gender-bars">
      <div className="university-bars-item contingent">
      <div className="university-bars-item-content">
      <p className="mb-1">Ayollar</p>
      <p className="count" data-count="20">20<span className="percent"></span></p>
      </div>
      <div className="university-bars-item-chart">
      <div className="bar" style={{ '--chart-width': '0' }}></div>
      </div>
      </div>
      <div className="university-bars-item contingent">
      <div className="university-bars-item-content">
      <p className="mb-1">Erkaklar</p>
      <p className="count" data-count="19">19<span className="percent"></span></p>
      </div>
      <div className="university-bars-item-chart">
      <div className="bar" style={{ '--chart-width': '0' }}></div>
      </div>
      </div>
      </div>
      
      </div>
      </div>
      <div className="col-md-6 ">
      <div className="content-section__inner h-100 ">
      <h2 className="university-bars--title">
      <img src="assets/public/images/university-direction.svg" alt="" />{' '}
      Pedagoglar salohiyati                                </h2>
      <div className="row">
      <div className="col-md-6">
      <div className="university-stats-item flex-column align-items-start gap-2" style={{ background: 'linear-gradient(90deg, rgba(60, 135, 140, 0.3) 0%, rgba(60, 135, 140, 0) 100%)', borderRadius: '12px', height: '100%' }}>
      <div className="university-stats-item-img" style={{ background: '#3C878C', marginBottom: 'auto' }}>
      <img src="assets/public/images/university-stat-1.svg" alt="" />
      </div>
      <div className="university-stats-item-text d-flex flex-column gap-2">
      <p className="bottom text-start">Har 100 ta o'quvchiga pedagog nisbati</p>
      <p className="top">3.2</p>
      </div>
      </div>
      </div>
      <div className="col-md-6">
      <div className="university-stats-item mb-2" style={{ background: 'linear-gradient(90deg, #D5EBFF 0%, rgba(213, 235, 255, 0) 100%)', borderRadius: '12px' }}>
      <div className="university-stats-item-img">
      <img src="assets/public/images/university-stat-1.svg" alt="" />
      </div>
      <div className="university-stats-item-text d-flex flex-column gap-2">
      <p className="bottom">Fan doktori</p>
      <p className="top" data-minus="">mavjud emas</p>
      </div>
      </div>
      <div className="university-stats-item" style={{ background: 'linear-gradient(90deg, #D5EBFF 0%, rgba(213, 235, 255, 0) 100%)', borderRadius: '12px' }}>
      <div className="university-stats-item-img">
      <img src="assets/public/images/university-stat-1.svg" alt="" />
      </div>
      <div className="university-stats-item-text d-flex flex-column gap-2">
      <p className="bottom">Fan nomzodi</p>
      <p className="top" data-minus="">mavjud emas</p>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div className="col-md-6 ">
      <div className="content-section__inner h-100 ">
      <div className="d-flex justify-content-between">
      <h2 className="university-bars--title">
      <img src="assets/public/images/university-direction.svg" alt="" />{' '}
      Yosh bo'yicha                                    </h2>
      <div className="d-flex flex-row gap-2">
      <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="#fff" fillOpacity=".01" d="M0 0h48v48H0z" />
      <path d="M4 4v40h40" stroke="#679c9d" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 38S15.313 4 27 4s17 34 17 34" stroke="#679c9d" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 24h34" stroke="#679c9d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 6" />
      </svg>{' '}
      O'rtacha yosh : 38                                    </div>
      </div>
      <div className="university-bar">
      <div className="university-bar-chart">
      <svg id="barSvg" width="100%" viewBox="0 0 1100 340"></svg>
      </div>
      <div className="university-bar-legend grid"></div>
      
      </div>
      </div>
      </div>
      <div className="col-md-6 ">
      <div className="university-staff _2  alt h-100">
      <div className="university-staff-item ">
      <div className="content-section university-staff-item-content ">
      <div className="d-flex align-items-center gap-2 mb-2">
      <img src="assets/public/images/university-staff-1.svg" alt="" />
      <h5 className="" data-count="19">0</h5>
      </div>
      <p>Umumta’lim fan o‘qituvchilari</p>
      </div>
      </div>
      <div className="university-staff-item ">
      <div className="content-section university-staff-item-content ">
      <div className="d-flex align-items-center gap-2 mb-2">
      <img src="assets/public/images/university-staff-1.svg" alt="" />
      <h5 className="" data-count="21">0</h5>
      </div>
      <p>Maxsus o‘qituvchilar</p>
      </div>
      </div>
      <div className="university-staff-item ">
      <div className="content-section university-staff-item-content ">
      <div className="d-flex align-items-center gap-2 mb-2">
      <img src="assets/public/images/university-staff-1.svg" alt="" />
      <h5 className="">mavjud emas</h5>
      </div>
      <p>Ishlab chiqarish ta’lim ustalari</p>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div>
      <div className="university-top ">
      <h4>O'quvchilar</h4>
      <p>18.05.2026</p>
      </div>
      <div className="row mb-3">
      <div className="col-md-5">
      <div className="content-section__inner  h-100">
      <h2 className="university-bars--title mb-2">
      <img src="assets/public/images/university-direction.svg" alt="" />{' '}
      Eng ko‘p o‘qilayotgan kasb va mutaxassisliklar                                </h2>
      <hr />
      <div className="university-bars faculty-bars">
      <div className="university-bars-item contingent2">
      <div className="university-bars-item-content">
      <p className="mb-1">Hamshiralik ishi</p>
      <div className="divider"></div>
      <p className="count" data-count="373">373</p>
      <span className="percent ms-1"></span>
      </div>
      <div className="university-bars-item-chart">
      <div className="bar" style={{ '--chart-width': '44' }}></div>
      </div>
      </div>
      <div className="university-bars-item contingent2">
      <div className="university-bars-item-content">
      <p className="mb-1">Davolash ishi</p>
      <div className="divider"></div>
      <p className="count" data-count="323">323</p>
      <span className="percent ms-1"></span>
      </div>
      <div className="university-bars-item-chart">
      <div className="bar" style={{ '--chart-width': '38' }}></div>
      </div>
      </div>
      <div className="university-bars-item contingent2">
      <div className="university-bars-item-content">
      <p className="mb-1">Feldsherlik ishi</p>
      <div className="divider"></div>
      <p className="count" data-count="156">156</p>
      <span className="percent ms-1"></span>
      </div>
      <div className="university-bars-item-chart">
      <div className="bar" style={{ '--chart-width': '18' }}></div>
      </div>
      </div>
      </div>
      
      </div>
      </div>
      <div className="col-md-7 ">
      <div className="content-section__inner h-100 ">
      <div className="row row-cols-md-2 mb-3">
      <div className="d-flex align-items-center gap-3">
      <i className="i-people university-header-content-wrapper-item-img text-white fs-3 rounded-4"></i>
      <div className="d-flex flex-column align-items-start">
      <span className="link content-section__title  mb-0" data-count="1204">
      </span>
      <p className=" content-section__text d-flex flex-column text-start">
      Jami o'quvchilar                                            </p>
      </div>
      </div>
      <div className="d-flex align-items-center gap-3">
      <i className="i-people university-header-content-wrapper-item-img text-white fs-3 rounded-4"></i>
      <div className="d-flex flex-column align-items-start">
      <span className="link content-section__title  mb-0" data-count="1">1</span>
      <p className=" content-section__text d-flex flex-column text-start">
      Dual ta'limdagi o'quvchilar soni                                            </p>
      </div>
      </div>
      </div>
      <div className="row row-cols-2" style={{ display: 'flex', flexDirection: 'row' }}>
      <div className="university-donut" style={{ width: '50%' }}>
      <div className="university-donut-chart">
      <svg id="donutSvg2" width="200" height="200" viewBox="0 0 200 200"></svg>
      </div>
      <div className="university-donut-legend2 university-donut-legend   "></div>
      </div>
      <div className="university-donut" style={{ width: '50%' }}>
      <div className="university-donut-chart">
      <svg id="donutSvg3" width="200" height="200" viewBox="0 0 200 200"></svg>
      </div>
      <div className="university-donut-legend3 university-donut-legend   "></div>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div className="content-section  ">
      <p className=" content-section__text d-flex flex-column ">
      Ta'lim turlari bo'yicha                        </p>
      <div className="university-rating-chart">
      <svg id="university-rating-chart" viewBox="0 0 1400 400">
      <defs>
      <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="rgba(172, 214, 255, 0.8)" />
      <stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)" />
      </linearGradient>
      </defs>
      </svg>
      </div>
      </div>
      </div>
      <div>
      <div className="university-top ">
      <h4>Umummilliy so'rovnoma natijalari</h4>
      <div className="select-wrapper" style={{ width: 'fit-content' }}>
      <select>
      <option value="2026">2026</option>
      </select>
      </div>
      </div>
      <section className="faq dont_activate_me mb-3 ">
      <button className="faq-item">
      <div className="question">
      <div>
      <h5 className="mb-2">Professor-o'qituvchilar</h5>
      </div>
      <span className="i-close"></span>
      </div>
      <div className="answer">
      <div className="row w-100" id="donutChartsRow"></div>
      
      </div>
      </button>
      <button className="faq-item  ">
      <div className="question">
      <div>
      <h5 className="mb-2">Talabalar</h5>
      </div>
      <span className="i-close"></span>
      </div>
      <div className="answer">
      <div className="row w-100" id="donutChartsRowStudent"></div>
      
      </div>
      </button>
      <button className="faq-item">
      <div className="question">
      <div>
      <h5 className="mb-2">Ish beruvchilar</h5>
      <p className="soon">11232131311311212</p>
      </div>
      <span className="i-close"></span>
      </div>
      </button>
      </section>
      </div>
      <div>
      <div className="university-top ">
      <h4>Bino va inshootlar</h4>
      </div>
      <div className="university-infra-wrapper">
      <div className="university-infra  ">
      <div className="university-infra-item">
      <div className="university-infra-item-img">
      <img src="assets/public/images/university-building-power.svg" alt="" />
      </div>
      <div className="university-infra-item-content">
      <p className="university-infra-item-content-title ">
      1260</p>
      <p className="university-infra-item-content-desc">O'quv binolari quvvati</p>
      </div>
      <div className="university-infra-item-effect">
      <img src="assets/public/images/university-building.svg" alt="" />
      </div>
      </div>
      </div>
      <div className="university-infra  ">
      <div className="university-infra-item">
      <div className="university-infra-item-img">
      <img src="assets/public/images/university-building-power.svg" alt="" />
      </div>
      <div className="university-infra-item-content">
      <p className="university-infra-item-content-title  ">
      Talabalar yotoqxonasi mavjud emas</p>
      <p className="university-infra-item-content-desc">Talabalar turar joylari quvvati</p>
      </div>
      <div className="university-infra-item-effect">
      <img src="assets/public/images/university-building.svg" alt="" />
      </div>
      </div>
      </div>
      </div>
      </div>
      <div>
      <div className="university-top  ">
      <h4>Qabul ko'rsatkichlari</h4>
      <div className="select-wrapper" style={{ width: 'fit-content' }}>
      <select>
      <option value="2026">2025/2026</option>
      </select>
      </div>
      </div>
      <div className="university-staff _5  pb-3 mb-3">
      <div className="university-staff-item ">
      <div className="content-section university-staff-item-content h-100 overflow-hidden">
      <div className="d-flex align-items-center gap-2 mb-2">
      <img src="assets/public/images/university-staff-1.svg" alt="" />
      <h5 className="" data-count="1770">0</h5>
      </div>
      <p>Tasdiqlangan qabul rejasi</p>
      </div>
      </div>
      <div className="university-staff-item ">
      <div className="content-section university-staff-item-content h-100 overflow-hidden">
      <div className="d-flex align-items-center gap-2 mb-2">
      <img src="assets/public/images/vocational-apply-2.svg" alt="" />
      <h5 className=" " data-count="1696">0</h5>
      </div>
      <p>Amaldagi qabul qilinganlar</p>
      </div>
      </div>
      <div className="university-staff-item ">
      <div className="content-section university-staff-item-content h-100 overflow-hidden">
      <div className="d-flex align-items-center gap-2 mb-2">
      <img src="assets/public/images/vocational-apply-3.svg" alt="" />
      <h5 className=" " data-count="289">0</h5>
      </div>
      <p>Davlat granti asosida qabul</p>
      </div>
      </div>
      <div className="university-staff-item ">
      <div className="content-section university-staff-item-content h-100 overflow-hidden">
      <div className="d-flex align-items-center gap-2 mb-2">
      <img src="assets/public/images/vocational-apply-4.svg" alt="" />
      <h5 className=" " data-count="1407">0</h5>
      </div>
      <p>To‘lov-kontrakt asosida qabul</p>
      </div>
      </div>
      <div className="university-staff-item ">
      <div className="content-section university-staff-item-content h-100 overflow-hidden">
      <div className="d-flex align-items-center gap-2 mb-2">
      <img src="assets/public/images/vocational-apply-5.svg" alt="" />
      <h5 className=" " data-count-postfix=" %" data-count-float="1">mavjud emas</h5>
      </div>
      <p>Qabul ulushi</p>
      </div>
      </div>
      </div>
      <div className="row row-cols-md-2 mb-3">
      <div>
      <div className="content-section h-100">
      <div className="content-section__head-title">
      <img src="assets/public/images/vocational-accepted.svg" alt="" />{' '}
      Qabul qilinganlar sinf kesimida                                </div>
      <div>
      <div className="university-bars faculty-bars accepted-bars">
      <div className="university-bars-item contingent2">
      <div className="university-bars-item-content">
      <p className="mb-1">9-sinf negizida qabul qilinganlar</p>
      <div className="divider"></div>
      <p className="count" data-count="0">0</p>
      <span className="percent ms-1">(0%)</span>
      </div>
      <div className="university-bars-item-chart">
      <div className="bar" style={{ '--chart-width': '0' }}></div>
      </div>
      </div>
      <div className="university-bars-item contingent2">
      <div className="university-bars-item-content">
      <p className="mb-1">11-sinf negizida qabul qilinganlar</p>
      <div className="divider"></div>
      <p className="count" data-count="1696">1696</p>
      <span className="percent ms-1">(100%)</span>
      </div>
      <div className="university-bars-item-chart">
      <div className="bar" style={{ '--chart-width': '100' }}></div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div>
      <div className="content-section">
      <div className="content-section__head-title">
      <img src="assets/public/images/vocational-famous.svg" alt="" />{' '}
      Ommabop mutaxassisliklar                                </div>
      <div className="university-common-wrapper">
      <div className="content-section__inner flex-row gap-3 align-items-center university-common blue">
      <div className="university-common-text">
      Hamshiralik ishi                                        </div>
      <div className="divider"></div>
      <div className="d-flex flex-column gap-1 align-items-end">
      <span className="university-common-top">1</span>
      <span className="university-common-bottom">Top</span>
      </div>
      </div>
      <div className="content-section__inner flex-row gap-3 align-items-center university-common green">
      <div className="university-common-text">
      Davolash ishi                                        </div>
      <div className="divider"></div>
      <div className="d-flex flex-column gap-1 align-items-end">
      <span className="university-common-top">2</span>
      <span className="university-common-bottom">Top</span>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div>
      <div className="university-top">
      <h4>2025 yil bitiruvchilari</h4>
      <div className="select-wrapper" style={{ width: 'fit-content' }}>
      <select>
      <option value="2026">2025</option>
      </select>
      </div>
      </div>
      <div className="mb-3">
      <div className="content-section">
      <div className="d-flex align-items-center gap-3">
      <i className="i-people university-header-content-wrapper-item-img text-white fs-3 rounded-4"></i>
      <div className="d-flex flex-column align-items-start">
      <span className="link content-section__title  mb-0" data-count="263">263</span>
      <p className=" content-section__text d-flex flex-column "> Jami bitiruvchilar </p>
      </div>
      </div>
      <hr />
      <div className="university-graduates" id="graduatesChart">
      <div className="university-graduates__chart">
      <div className="university-graduates__track" id="graduatesTrack"></div>
      </div>
      <div className="university-graduates__legend" id="graduatesLegend"></div>
      </div>
      
      </div>
      <div className="row">
      <div className="col-md-4">
      <div className="content-section h-100">
      <div className="content-section__head-title">
      <img src="assets/public/images/vocational-famous.svg" alt="" />{' '}
      Ommabop mutaxassisliklar                                    </div>
      <div className="university-common-wrapper">
      <div className="content-section__inner flex-row gap-3 align-items-center university-common blue">
      <div className="university-common-text">
      Hamshiralik ishi                                            </div>
      <div className="divider"></div>
      <div className="d-flex flex-column gap-1 align-items-end">
      <span className="university-common-top">108</span>
      </div>
      </div>
      <div className="content-section__inner flex-row gap-3 align-items-center university-common green">
      <div className="university-common-text">
      Feldsher-akusherlik ishi                                            </div>
      <div className="divider"></div>
      <div className="d-flex flex-column gap-1 align-items-end">
      <span className="university-common-top">50</span>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div className="col-md-8">
      <div className="university-staff mb-0 _2 alt">
      <div className="university-staff-item ">
      <div className="content-section university-staff-item-content ">
      <div className="d-flex align-items-center gap-2 mb-2">
      <img src="assets/public/images/university-staff-1.svg" alt="" />
      <h5 className="" data-minus="" data-count="31">0</h5>
      </div>
      <p>Erkaklar soni </p>
      </div>
      </div>
      <div className="university-staff-item ">
      <div className="content-section university-staff-item-content ">
      <div className="d-flex align-items-center gap-2 mb-2">
      <img src="assets/public/images/university-staff-1.svg" alt="" />
      <h5 className="" data-minus="" data-count="232">0</h5>
      </div>
      <p>Ayollar soni</p>
      </div>
      </div>
      <div className="university-staff-item ">
      <div className="content-section university-staff-item-content ">
      <div className="d-flex align-items-center gap-2 mb-2">
      <img src="assets/public/images/university-staff-1.svg" alt="" />
      <h5 className="" data-minus="" data-count="26">0</h5>
      </div>
      <p>Grantlar soni</p>
      </div>
      </div>
      <div className="university-staff-item ">
      <div className="content-section university-staff-item-content ">
      <div className="d-flex align-items-center gap-2 mb-2">
      <img src="assets/public/images/university-staff-1.svg" alt="" />
      <h5 className="" data-minus="" data-count="237">0</h5>
      </div>
      <p>Kontraktlar soni</p>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div>
      <div className="university-top ">
      <h4>Milliy reyting ko'rsatkichlari</h4>
      <p>--.--.----</p>
      </div>
      <div className="content-section university-rating-wrapper ">
      <div className="university-rating-wrapper-item">
      <div className="university-rating-wrapper-item-img">
      <img src="assets/public/images/university-rating-1.svg" alt="" />
      <img className="effect" src="assets/public/images/university-rating-1.svg" alt="schema" />
      </div>
      <div className="university-rating-wrapper-item-content">
      <p className="university-rating-wrapper-item-content-title soon">13123123213131</p>
      <p className="university-rating-wrapper-item-content-desc">Milliy reytingdagi o'rni</p>
      </div>
      </div>
      <div className="university-rating-wrapper-item">
      <div className="university-rating-wrapper-item-img">
      <img src="assets/public/images/university-rating-2.svg" alt="" />
      <img className="effect" src="assets/public/images/university-rating-2.svg" alt="schema" />
      </div>
      <div className="university-rating-wrapper-item-content">
      <p className="university-rating-wrapper-item-content-title soon">1231312312</p>
      <p className="university-rating-wrapper-item-content-desc">Umumiy ballar</p>
      </div>
      </div>
      </div>
      <div className="content-section mb-3 soon">
      <div className="university-rating-chart">
      <svg id="university-rating-chart2" viewBox="0 0 1400 400">
      <defs>
      <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="rgba(172, 214, 255, 0.8)"></stop>
      <stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)"></stop>
      </linearGradient>
      </defs>
      </svg>
      </div>
      </div>
      </div>
      <div>
      <div className="university-top">
      <h4>Bog'lanish va manzil</h4>
      </div>
      <div className="row mb-3">
      <div className="col-md-6">
      <div className="university-grid h-100">
      <div className="university-grid-item content-section ">
      <i className="i-phone"></i>
      <p className="university-grid-item-title"> Telefon raqam </p>
      <p className="university-grid-item-desc">+998 (69) 227-08-61
      +998 (69) 227-27-90                                    </p>
      </div>
      <div className="university-grid-item content-section ">
      <i className="i-web"></i>
      <p className="university-grid-item-title">Asos</p>
      <p className="university-grid-item-desc ">23.10.2025 PF-190</p>
      </div>
      <div className="university-grid-item content-section ">
      <i className="i-email"></i>
      <p className="university-grid-item-title">Email</p>
      <p className="university-grid-item-desc ">abualiibnsinoJST@gmail.com</p>
      </div>
      <div className="university-grid-item content-section ">
      <i className="i-location"></i>
      <p className="university-grid-item-title">Yuridik manzili</p>
      <p className="university-grid-item-desc ">160100, Namangan viloyati, Namangan, U.Nosir ko'chasi, 14</p>
      </div>
      </div>
      </div>
      <div className="col-md-6">
      <div className="content-section ">
      <iframe src="https://maps.google.com/maps?q=41.00214,71.65088&hl=uz&output=embed" width="100%" height="370" style={{ border: '0' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade">
      </iframe>
      </div>
      </div>
      </div>
      </div>
      </div>
    </div>
  )
}

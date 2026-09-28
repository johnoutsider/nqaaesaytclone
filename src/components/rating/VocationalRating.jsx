// Texnikum pasporti — indikatorlar asosidagi yangi sahifa (#/texnikum; asl klon: #/texnikum-asl).
// Reja: docs/TEXNIKUM-SAHIFA-REJASI.md. Indikatorlar: src/data/vocational-rating.json
// (scripts/texnikum_excel_to_json.py bilan Excel'dan). Pasport ma'lumotlari (yosh, mutaxassisliklar,
// so'rovnoma savollari, bino, bog'lanish): src/data/vocational.js — amaldagi nqaae.uz sahifasidan.
import { useMemo } from 'react'
import rating from '../../data/vocational-rating.json'
import { OverviewCard } from '../university/common.jsx'
import UniversityHeader from '../university/UniversityHeader.jsx'
import { AgeStructure } from '../university/Teachers.jsx'
import Buildings from '../university/Buildings.jsx'
import Survey from '../university/Survey.jsx'
import Contacts from '../university/Contacts.jsx'
import {
  fmt, pctText, ballText, somText, statusOf, STATUS_TEXT, STATUS_COLOR, topPercent,
  SectionHead, CardTitle, BallChip, Compare, EmptyNote, BigStat, Stacked, Ring,
} from './RatingKit.jsx'

const N = rating.count
const SRC_IND = `Manba: indikatorlar, ${rating.computedAt}`
const pct1 = (x) => pctText(x, 1)

// Indikatorning texnikum bo'yicha qiymati — oddiy tilda
function describe(ind) {
  const r = ind.raw
  const sum = (a, b) => r.slice(a, b).reduce((s, v) => s + v, 0)
  switch (ind.code) {
    case 'K1.1': return `${sum(1, 4)} / ${r[0]} pedagog (ilmiy daraja, xorijiy, TOP-1000)`
    case 'K1.2': return `${sum(1, 4)} / ${r[0]} pedagog malaka toifasiga ega`
    case 'K1.3': return `${sum(1, 4)} / ${r[0]} pedagog kurs yoki stajirovkada`
    case 'K1.5': return `${r[1] + r[2]} / ${r[0]} pedagog sertifikatli`
    case 'K1.7': return `${sum(1, 4)} tashqi mutaxassis (${pctText(ind.share)})`
    case 'K1.6': case 'K1.8': case 'K2.1': case 'K2.2': return `${pctText(ind.share)} ijobiy javob (${r[0]} savol)`
    case 'K2.3': return `${pct1(ind.share)} davomat`
    case 'K2.4': return `${fmt(r[1])} / ${fmt(r[0])} o'rin to'ldi (${pctText(ind.share)})`
    case 'K2.5': return `${fmt(r[1])} o'quvchi, ${r[2]} dastur`
    case 'K3.2': return `${somText(ind.share)} bir o'quvchiga`
    case 'K3.3': return `${fmt(r[1])} / ${fmt(r[0])} o'quvchi dual ta'limda`
    case 'K3.4': return `${sum(1, 4)} / ${r[0]} bitiruvchi band (${pctText(ind.share)})`
    case 'K4.1': return `${sum(1, 8)} g'olib / ${fmt(r[0])} o'quvchi`
    case 'K4.2': return `${fmt(r[1] + r[2])} / ${fmt(r[0])} o'quvchi sertifikatli`
    default: return ''
  }
}

function useRating(stir) {
  return useMemo(() => {
    const c = rating.colleges[stir]
    if (!c) return null
    const ind = {}
    for (const [code, meta] of Object.entries(rating.indicators)) {
      const v = c.ind[code]
      ind[code] = { ...meta, ...v, status: statusOf(v.share, meta.medianShare) }
      ind[code].text = describe(ind[code])
    }
    const all = Object.values(ind)
    // Kuchli tomonlar: ball > 0 va texnikumlarning eng yaxshi 35% ida
    const strengths = all
      .filter((i) => i.ball > 0 && i.better / N <= 0.35)
      .sort((a, b) => a.better - b.better)
      .slice(0, 3)
    // O'sish nuqtalari: mediandan past yoki nol, eng ko'p ball yo'qotilgani bo'yicha
    const growth = all
      .filter((i) => i.status === 'bad' || i.status === 'zero')
      .sort((a, b) => b.max - b.ball - (a.max - a.ball))
      .slice(0, 4)
    return { c, ind, strengths, growth }
  }, [stir])
}

// ---------- Bloklar ----------

function Hero({ c, strengths, growth }) {
  const share = c.total / rating.max
  return (
    <div className="rt-hero mb-3" id="reyting">
      <div className="rt-hero__main">
        <Ring value={share} size={150} stroke={14} color="#3e7bb6">
          <b>{ballText(c.total)}</b>
          <span>/ {ballText(rating.max)} ball</span>
        </Ring>
        <div className="rt-hero__ranks">
          <p className="rt-hero__label">Texnikumlar reytingi · {rating.computedAt}</p>
          <p className="rt-hero__rank">
            Respublikada <b>{c.rank}</b>-o'rin <span>{N} ta texnikumdan</span>
          </p>
          <p className="rt-hero__rank rt-hero__rank--sm">
            {c.region}da <b>{c.regionRank}</b>-o'rin <span>{c.regionCount} tadan</span>
          </p>
          <div className="rt-hero__pos">
            <div className="rt-hero__pos-track">
              <span style={{ left: `${(1 - (c.rank - 1) / (N - 1)) * 100}%` }}></span>
            </div>
            <div className="rt-hero__pos-legend">
              <small>Oxirgi o'rin</small>
              <small>Median: {ballText(rating.medianTotal)} ball</small>
              <small>1-o'rin: {ballText(rating.best.total)}</small>
            </div>
          </div>
        </div>
      </div>

      <div className="rt-hero__groups">
        {Object.entries(rating.groups).map(([g, meta]) => {
          const b = c.groups[g]
          const st = b >= meta.median * 1.05 ? 'good' : b >= meta.median * 0.95 ? 'mid' : 'bad'
          return (
            <div key={g} className="rt-group">
              <div className="rt-group__head">
                <span>{meta.title}</span>
                <b>{ballText(b)} <small>/ {ballText(meta.max)}</small></b>
              </div>
              <div className="rt-group__track">
                <span className="rt-group__fill" style={{ width: `${(b / meta.max) * 100}%`, background: STATUS_COLOR[st] }}></span>
                <span className="rt-group__median" style={{ left: `${(meta.median / meta.max) * 100}%` }} title={`Median: ${ballText(meta.median)}`}></span>
              </div>
            </div>
          )
        })}
        <p className="rt-note">Chiziqdagi belgi — respublika medianasi</p>
      </div>

      <div className="rt-hero__lists">
        <div className="rt-list rt-list--good">
          <p className="rt-list__title">Kuchli tomonlar</p>
          {strengths.map((i) => (
            <a key={i.code} href="#/texnikum" onClick={(e) => { e.preventDefault(); document.getElementById(i.code)?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }}>
              <span>{i.title}</span>
              <em>eng yaxshi {topPercent(i.better, N)}%</em>
            </a>
          ))}
        </div>
        <div className="rt-list rt-list--bad">
          <p className="rt-list__title">O'sish nuqtalari</p>
          {growth.map((i) => (
            <a key={i.code} href="#/texnikum" onClick={(e) => { e.preventDefault(); document.getElementById(i.code)?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }}>
              <span>{i.title}</span>
              <em>−{ballText(i.max - i.ball)} ball</em>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

function Graduates({ ind, popular }) {
  const k = ind['K3.4']
  const [B, B1, B2, B3] = k.raw
  const other = Math.max(B - B1 - B2 - B3, 0)
  return (
    <div>
      <SectionHead title="Bitiruvchilar qayerda?" note={SRC_IND} />
      <div className="row">
        <div className="col-lg-8 mb-3">
          <div className="content-section__inner h-100 rt-card" id="K3.4">
            <CardTitle right={<BallChip ind={k} />}>Bitiruvchilarning bandligi</CardTitle>
            <div className="rt-row">
              <BigStat value={pctText(k.share)} status={k.status} text={`${fmt(B)} bitiruvchidan ${fmt(B1 + B2 + B3)} nafari band`} />
              <div className="rt-grow">
                <Stacked
                  total={B}
                  parts={[
                    { label: 'Tadbirkor / ta’sischi', value: B1, color: '#0e7c66' },
                    { label: 'Ish bilan band', value: B2, color: '#19ae8b' },
                    { label: 'O‘qishni davom ettirmoqda / o‘zini band qilgan', value: B3, color: '#4e95da' },
                    { label: 'Ma’lumot yo‘q / band emas', value: other, color: '#d5dce8' },
                  ]}
                />
              </div>
            </div>
            <Compare value={k.share} median={k.medianShare} best={k.maxShare} status={k.status} labels={{ me: 'Band bitiruvchilar' }} />
            <p className="rt-note">
              Eng og'ir indikator ({ballText(k.max)} ball): tadbirkor bitiruvchi 3 barobar, ishlayotgani 2 barobar,
              o'qishni davom ettirayotgani 1 barobar hisoblanadi.
            </p>
          </div>
        </div>
        <div className="col-lg-4 mb-3">
          <div className="content-section__inner h-100">
            <CardTitle icon="vocational-famous.svg">Ommabop mutaxassisliklar</CardTitle>
            <ol className="uni-list__items mt-3">
              {popular.map((p, i) => (
                <li key={p.name} className="uni-list__item">
                  <span className="uni-list__rank">{i + 1}</span>
                  <div className="uni-list__body">
                    <div className="uni-list__row">
                      <span className="uni-list__name">{p.name}</span>
                      <span className="uni-list__count"><b>{p.count}</b> nafar</span>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <p className="rt-note mt-auto">Manba: nqaae.uz pasporti, 2025 yil bitiruvchilari</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Teachers({ ind, site }) {
  const q = ind['K1.2'], ext = ind['K1.7'], tr = ind['K1.3'], sci = ind['K1.1'], cert = ind['K1.5']
  const P = q.raw[0]
  return (
    <div>
      <SectionHead title="Pedagoglar" note={SRC_IND} />
      <OverviewCard
        items={[
          { label: 'Jami pedagoglar', value: P },
          { label: 'Jalb qilingan tashqi mutaxassislar', value: ext.raw[1] + ext.raw[2] + ext.raw[3], icon: 'university-stat-1.svg' },
          { label: 'O‘rtacha yosh', display: String(site.avgAge), unit: 'yosh', icon: 'calendar-uni.svg' },
        ]}
      />
      <div className="row">
        <div className="col-lg-6 mb-3">
          <div className="content-section__inner h-100 rt-card" id="K1.2">
            <CardTitle right={<BallChip ind={q} />}>Malaka darajasi</CardTitle>
            <Stacked
              total={P}
              parts={[
                { label: 'Bosh o‘qituvchi', value: q.raw[1], color: '#7161ff' },
                { label: 'Yetakchi o‘qituvchi / sertifikatli usta', value: q.raw[2], color: '#19ae8b' },
                { label: 'Katta o‘qituvchi', value: q.raw[3], color: '#ffa151' },
                { label: 'Toifasiz', value: Math.max(P - q.raw[1] - q.raw[2] - q.raw[3], 0), color: '#d5dce8' },
              ]}
            />
            <Compare value={q.share} median={q.medianShare} best={q.maxShare} status={q.status} labels={{ me: 'Toifali pedagoglar' }} />
          </div>
        </div>
        <div className="col-lg-6 mb-3">
          <div className="content-section__inner h-100 rt-card rt-card--highlight" id="K1.7">
            <CardTitle right={<BallChip ind={ext} />}>Ishlab chiqarishdan jalb qilinganlar</CardTitle>
            <div className="rt-row">
              <BigStat value={fmt(ext.raw[1])} unit="soha mutaxassisi" status={ext.status} />
              <div className="rt-grow rt-mini-list">
                <p><span>Xorijiy mutaxassis</span><b>{ext.raw[2]}</b></p>
                <p><span>OTM professori</span><b>{ext.raw[3]}</b></p>
                <p><span>O‘quv jarayonidagi ulushi</span><b>{pctText(ext.share)}</b></p>
              </div>
            </div>
            <Compare value={ext.share} median={ext.medianShare} best={ext.maxShare} status={ext.status} labels={{ me: 'Tashqi mutaxassislar ulushi' }} />
            {ext.ball > 0 && <p className="rt-badge-good">Texnikumlarning eng yaxshi {topPercent(ext.better, N)}% i qatorida</p>}
          </div>
        </div>
        <div className="col-lg-6 mb-3">
          <div className="content-section__inner h-100 rt-card" id="K1.3">
            <CardTitle right={<BallChip ind={tr} />}>Malaka oshirish va stajirovka</CardTitle>
            <div className="rt-mini-list">
              <p><span>Pedagoglar — respublika kursi</span><b>{tr.raw[2]}</b></p>
              <p><span>Ishlab chiqarish ustalari — respublika kursi</span><b>{tr.raw[1]}</b></p>
              <p><span>Xorijda oflayn stajirovka</span><b>{tr.raw[3]}</b></p>
            </div>
            <Compare value={tr.share} median={tr.medianShare} best={Math.min(tr.maxShare, 1)} status={tr.status} labels={{ me: `${P} pedagogdan qamrov` }} />
          </div>
        </div>
        <div className="col-lg-6 mb-3">
          <div className="content-section__inner h-100 rt-card" id="K1.1">
            <CardTitle right={<span className="rt-chips"><BallChip ind={sci} /><BallChip ind={cert} /></span>}>Ilmiy va xalqaro salohiyat</CardTitle>
            <div className="rt-mini-list">
              <p><span>Ilmiy darajali pedagoglar</span><b>{sci.raw[1]}</b></p>
              <p><span>Xorijdan jalb qilinganlar</span><b>{sci.raw[2]}</b></p>
              <p><span>TOP-1 000 OTM diplomi</span><b>{sci.raw[3]}</b></p>
              <p id="K1.5"><span>Sertifikat: xalqaro / milliy</span><b>{cert.raw[1]} / {cert.raw[2]}</b></p>
            </div>
            {sci.ball === 0 && (
              <EmptyNote ind={sci} n={N}>Ilmiy darajali, xorijlik yoki TOP-1 000 OTM bitiruvchisi bo‘lgan pedagog yo‘q.</EmptyNote>
            )}
          </div>
        </div>
      </div>
      <AgeStructure
        items={site.ages}
        total={site.ages.reduce((s, a) => s + a.value, 0)}
        avgAge={site.avgAge}
        summary={[
          { label: '30 yoshgacha yosh pedagoglar', from: 0, to: 1, variant: 'young' },
          { label: '50 yoshdan katta pedagoglar', from: -2, variant: 'senior' },
        ]}
      />
      <p className="rt-note rt-note--src">Yosh tarkibi: nqaae.uz pasporti ({site.date}) — indikatorlardagi pedagoglar sonidan farq qilishi mumkin</p>
    </div>
  )
}

function Students({ ind, site }) {
  const att = ind['K2.3'], dual = ind['K3.3'], intl = ind['K2.5'], cert = ind['K4.2'], comp = ind['K4.1']
  const O = cert.raw[0]
  const COMP = ['WorldSkills', 'Milliy tanlov (respublika)', 'Milliy tanlov (hudud)', 'Boshqa kasbiy tanlov', 'Xalqaro olimpiada', 'Olimpiada respublika bosqichi', 'Boshqa tanlovlar']
  return (
    <div>
      <SectionHead title="O'quvchilar va ta'lim jarayoni" note={SRC_IND} />
      <OverviewCard
        items={[
          { label: "Jami o'quvchilar", value: O },
          { label: "Dual ta'limda", value: dual.raw[1] },
          { label: 'Sertifikatga ega', value: cert.raw[1] + cert.raw[2] },
        ]}
      />
      <div className="row">
        <div className="col-lg-4 mb-3">
          <div className="content-section__inner h-100 rt-card" id="K2.3">
            <CardTitle right={<BallChip ind={att} />}>Davomat</CardTitle>
            <div className="rt-center">
              <Ring value={att.share} color={STATUS_COLOR[att.status === 'zero' ? 'bad' : att.status]}>
                <b>{pct1(att.share)}</b>
              </Ring>
              <p className="rt-note">{fmt(att.raw[0])} dars soatidan {fmt(att.raw[1])} soati sababsiz qoldirilgan</p>
            </div>
            <Compare value={att.share} median={att.medianShare} best={att.maxShare} status={att.status} format={pct1} />
          </div>
        </div>
        <div className="col-lg-4 mb-3">
          <div className={`content-section__inner h-100 rt-card ${dual.status === 'zero' ? 'rt-card--warn' : ''}`} id="K3.3">
            <CardTitle right={<BallChip ind={dual} />}>Dual ta'lim</CardTitle>
            <BigStat value={pctText(dual.share)} status={dual.status} text={`${fmt(dual.raw[0])} o'quvchidan ${fmt(dual.raw[1])} nafari o'qish bilan birga korxonada ishlaydi`} />
            <Compare value={dual.share} median={dual.medianShare} best={dual.maxShare} status={dual.status} />
            {dual.status === 'zero' && <p className="rt-note">Dual ta'lim {ballText(dual.max)} ball beradi — o'quvchilarning yarmini dualga o'tkazish ≈ {ballText((0.5 / dual.maxShare) * dual.max)} ball.</p>}
          </div>
        </div>
        <div className="col-lg-4 mb-3">
          <div className="content-section__inner h-100 rt-card" id="K2.5">
            <CardTitle right={<BallChip ind={intl} />}>Xalqaro va qo'shma dasturlar</CardTitle>
            {intl.ball === 0 ? (
              <EmptyNote ind={intl} n={N}>Xorijiy hamkor bilan qo‘shma yoki xalqaro ta’lim dasturi yo‘q.</EmptyNote>
            ) : (
              <BigStat value={fmt(intl.raw[1])} unit="o'quvchi" text={`${intl.raw[2]} ta dasturda`} status={intl.status} />
            )}
          </div>
        </div>
        <div className="col-lg-6 mb-3">
          <div className="content-section__inner h-100 rt-card" id="K4.2">
            <CardTitle right={<BallChip ind={cert} />}>Sertifikatga ega o'quvchilar</CardTitle>
            <Stacked
              total={O}
              parts={[
                { label: 'Xalqaro sertifikat', value: cert.raw[1], color: '#3e7bb6' },
                { label: 'Milliy sertifikat', value: cert.raw[2], color: '#19ae8b' },
                { label: 'Sertifikatsiz', value: Math.max(O - cert.raw[1] - cert.raw[2], 0), color: '#e8edf4' },
              ]}
            />
            <Compare value={cert.share} median={cert.medianShare} best={cert.maxShare} status={cert.status} format={pct1} />
          </div>
        </div>
        <div className="col-lg-6 mb-3">
          <div className="content-section__inner h-100 rt-card" id="K4.1">
            <CardTitle right={<BallChip ind={comp} />}>Tanlov va olimpiada g'oliblari</CardTitle>
            <div className="rt-medals">
              {COMP.map((name, i) => (
                <div key={name} className={`rt-medal ${comp.raw[i + 1] > 0 ? 'is-on' : ''}`}>
                  <b>{comp.raw[i + 1]}</b>
                  <span>{name}</span>
                </div>
              ))}
            </div>
            {comp.ball === 0 && <p className="rt-note">{comp.zeroCount} / {N} texnikumda ham g'olib yo'q — bitta WorldSkills g'olibi ham sezilarli ball beradi.</p>}
          </div>
        </div>
      </div>
      <div className="content-section__inner mb-3">
        <CardTitle icon="vocational-famous.svg">Eng ko‘p o‘qilayotgan mutaxassisliklar</CardTitle>
        <Stacked
          total={site.total}
          parts={site.specialties.map((s, i) => ({ label: s.name, value: s.count, color: ['#3e7bb6', '#19ae8b', '#ffa151', '#7161ff'][i % 4] })).concat([
            { label: 'Boshqa mutaxassisliklar', value: Math.max(site.total - site.specialties.reduce((s, x) => s + x.count, 0), 0), color: '#e8edf4' },
          ])}
        />
        <p className="rt-note rt-note--src">Manba: nqaae.uz pasporti ({site.date}), jami {fmt(site.total)} o'quvchi</p>
      </div>
    </div>
  )
}

function AdmissionAndCommerce({ ind }) {
  const adm = ind['K2.4'], com = ind['K3.2']
  return (
    <div>
      <SectionHead title="Qabul va ishlab chiqarish" note={SRC_IND} />
      <div className="row">
        <div className="col-lg-6 mb-3">
          <div className="content-section__inner h-100 rt-card" id="K2.4">
            <CardTitle right={<BallChip ind={adm} />}>Qabul rejasining bajarilishi</CardTitle>
            <BigStat value={pctText(adm.share)} status={adm.status} text={`Reja ${fmt(adm.raw[0])} o'rin — ${fmt(adm.raw[1])} nafar qabul qilindi`} />
            <Compare value={adm.share} median={adm.medianShare} best={adm.maxShare} status={adm.status} />
            {adm.ball > 0 && adm.better / N <= 0.35 && <p className="rt-badge-good">Texnikumlarning eng yaxshi {topPercent(adm.better, N)}% i qatorida</p>}
          </div>
        </div>
        <div className="col-lg-6 mb-3">
          <div className="content-section__inner h-100 rt-card" id="K3.2">
            <CardTitle right={<BallChip ind={com} />}>Ishlab chiqarish va tijoratlashtirish</CardTitle>
            <div className="rt-mini-list">
              <p><span>Davlat xaridlaridan tushum</span><b>{somText(com.raw[1])}</b></p>
              <p><span>Boshqa tushumlar</span><b>{somText(com.raw[2])}</b></p>
              <p><span>Bir o'quvchiga</span><b>{somText(com.share)}</b></p>
            </div>
            {com.ball === 0 ? (
              <EmptyNote ind={com} n={N}>
                O‘quvchilar ishlab chiqargan mahsulot yoki xizmatdan tushum yo‘q. Eng yaxshi natija — bir o‘quvchiga {somText(com.maxShare)}.
              </EmptyNote>
            ) : (
              <Compare value={com.share} median={com.medianShare} best={com.maxShare} status={com.status} format={somText} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Opinions({ ind }) {
  const items = [
    ['K1.6', 'Pedagoglar qoniqishi'],
    ['K1.8', "O'quvchilar qoniqishi"],
    ['K2.1', 'Sharoitlardan qoniqish'],
    ['K2.2', 'Moddiy-texnik baza'],
  ]
  return (
    <div>
      <SectionHead title="Fikr va sharoit" note={`${SRC_IND} · umummilliy so'rovnoma`} />
      <div className="rt-opinions mb-3">
        {items.map(([code, label]) => {
          const i = ind[code]
          return (
            <div key={code} className="content-section__inner rt-opinion" id={code}>
              <Ring value={i.share} size={110} stroke={11} color={STATUS_COLOR[i.status === 'zero' ? 'bad' : i.status]}>
                <b>{pctText(i.share)}</b>
              </Ring>
              <p className="rt-opinion__label">{label}</p>
              <p className="rt-opinion__median">Median: {pctText(i.medianShare)} · {i.raw[0]} savol</p>
              <span className={`rt-status rt-status--${i.status}`}>{STATUS_TEXT[i.status]}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function DetailTable({ ind }) {
  return (
    <div>
      <SectionHead title="Reyting tafsiloti" note={`${rating.count} ta texnikum · ${rating.source}`} />
      <div className="content-section__inner mb-3 rt-table-wrap">
        <table className="rt-table">
          <thead>
            <tr>
              <th>Indikator</th>
              <th>Texnikum natijasi</th>
              <th>Ball</th>
              <th>Respublikada</th>
            </tr>
          </thead>
          {Object.entries(rating.groups).map(([g, meta]) => (
            <tbody key={g}>
              <tr className="rt-table__group">
                <td colSpan={4}>{g}. {meta.title} — max {ballText(meta.max)} ball, median {ballText(meta.median)}</td>
              </tr>
              {meta.codes.map((code) => {
                const i = ind[code]
                return (
                  <tr key={code}>
                    <td>
                      <span className="rt-table__code">{code}</span> {i.title}
                      <span className="rt-help" title={`Formula: ${i.formula}\nBall = natija ÷ eng yuqori natija × ${ballText(i.max)}`}>?</span>
                    </td>
                    <td>{i.text}</td>
                    <td>
                      <div className="rt-table__ball">
                        <span style={{ width: `${(i.ball / i.max) * 100}%`, background: STATUS_COLOR[i.status] }}></span>
                      </div>
                      <small>{ballText(i.ball)} / {ballText(i.max)}</small>
                    </td>
                    <td>
                      {i.ball > 0 ? (
                        <span className={`rt-status rt-status--${i.status}`} title={`${i.worse} ta texnikumdan yuqori, ${i.better} tasidan past`}>
                          {Math.round((i.worse / N) * 100)}% texnikumdan yuqori
                        </span>
                      ) : (
                        <span className="rt-status rt-status--zero">natija yo‘q</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          ))}
        </table>
      </div>
    </div>
  )
}

export default function VocationalRating({ org }) {
  const data = useRating(org.stir)
  if (!data) return <p>Bu texnikum ({org.stir}) indikatorlar faylida topilmadi.</p>
  const { c, ind, strengths, growth } = data
  return (
    <div className="university rt-page">
      <UniversityHeader org={org} />
      <Hero c={c} strengths={strengths} growth={growth} />
      <Graduates ind={ind} popular={org.graduates.popular} />
      <Teachers ind={ind} site={org.teachers} />
      <Students ind={ind} site={org.students} />
      <AdmissionAndCommerce ind={ind} />
      <Opinions ind={ind} />
      <Buildings data={org.buildings} />
      <Survey data={org.survey} />
      <DetailTable ind={ind} />
      <Contacts data={org.contacts} />
    </div>
  )
}

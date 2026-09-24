import { IMG, SectionTop, OverviewCard } from './common.jsx'
import { CertItem } from './PeopleCertificates.jsx'

const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

// O'zgarish: "O'quvchilar & Qabul" ikkiga bo'lindi. Bu yerda faqat o'quvchilarga oid ma'lumotlar.
// Qabul ko'rsatkichlari — Admission.jsx (Bitiruvchilardan oldin).
function Attendance({ data }) {
  const percent = parseFloat(data.attendance) || 0
  return (
    <div className="content-section__inner teacher-certs mb-3">
      <div className="teacher-certs__item attendance-card">
        <div className="teacher-certs__top">
          <div className="teacher-certs__icon">
            <img src={`${IMG}/calendar-uni.svg`} alt="" />
          </div>
          <div className="teacher-certs__text">
            <p className="teacher-certs__label">Davomat</p>
            <p className="teacher-certs__value">
              <span className="teacher-certs__unit">O'quv mashg'ulotlariga qatnashish darajasi</span>
            </p>
          </div>
          <div className="teacher-certs__percent">{data.attendance}</div>
        </div>
        <div className="teacher-certs__bar">
          <span style={{ width: `${percent}%` }}></span>
        </div>
        {data.lessons && (
          <p className="teacher-certs__note">
            Jami {fmt(data.lessons.total)} ta darsdan {fmt(data.lessons.missed)} tasi qoldirilgan
          </p>
        )}
      </div>
    </div>
  )
}

// O'quvchilar yutuqlari: sertifikatlar + tanlov g'oliblari (bir xil formatda, 2 qator)
function Achievements({ data }) {
  const t = data.total
  return (
    <div className="content-section__inner teacher-certs mb-3">
      <h2 className="university-bars--title">
        <img src={`${IMG}/university-direction.svg`} alt="" />
        Sertifikatlar va tanlovlar
      </h2>

      <p className="achievements__group">Sertifikatga ega o'quvchilar</p>
      <div className="teacher-certs__grid mb-3">
        <CertItem label="Xalqaro sertifikatga ega" count={data.certificates.international} total={t} unit="o'quvchi" variant="intl" />
        <CertItem label="Milliy sertifikatga ega" count={data.certificates.national} total={t} unit="o'quvchi" variant="national" />
      </div>

      <p className="achievements__group">Tanlov va olimpiadalar g'oliblari</p>
      <div className="teacher-certs__grid">
        <CertItem label="Xalqaro tanlovlar" count={data.competitions.international} total={t} unit="o'quvchi" variant="gold" />
        <CertItem label="Respublika darajasidagi tanlovlar" count={data.competitions.republic} total={t} unit="o'quvchi" variant="purple" />
      </div>
    </div>
  )
}

export default function Students({ data }) {
  return (
    <div>
      <SectionTop title="O'quvchilar" date={data.date} />
      <OverviewCard
        items={[
          { label: "Jami o'quvchilar", value: data.total },
          { label: "Mahalliy o'quvchilar", value: data.local },
          { label: "Xorijiy o'quvchilar", value: data.foreign },
        ]}
      />
      <Achievements data={data} />
      <Attendance data={data} />
    </div>
  )
}

import UniversityHeader from './UniversityHeader.jsx'
import Teachers from './Teachers.jsx'
import Students from './Students.jsx'
import Buildings from './Buildings.jsx'
import Admission from './Admission.jsx'
import Graduates from './Graduates.jsx'
import Survey from './Survey.jsx'
import Accreditation from './Accreditation.jsx'
import Rating from './Rating.jsx'
import Contacts from './Contacts.jsx'

// Ta'lim tashkiloti sahifasining asosiy qismi (bo'limlar tartibi asl saytdagidek)
export default function University({ org }) {
  return (
    <div className="university">
      <UniversityHeader org={org} />
      {/* "Ta'lim dasturlari" bo'limi UniversityHeader ichiga ko'chirildi */}
      <Teachers data={org.teachers} />
      <Students data={org.students} />
      {/* Qabul — "O'quvchilar"dan ajratilgan, Bitiruvchilardan oldin */}
      <Admission data={org.admission} />
      <Graduates data={org.graduates} />
      {/* Bino va inshootlar — Bitiruvchilardan keyin */}
      <Buildings data={org.buildings} />
      <Survey data={org.survey} />
      <Accreditation data={org.accreditation} />
      <Rating data={org.rating} />
      <Contacts data={org.contacts} />
    </div>
  )
}

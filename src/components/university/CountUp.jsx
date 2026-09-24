import { useEffect, useRef, useState } from 'react'

const formatInt = (v) => v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

// Asl saytdagi [data-count] animatsiyasi: ko'rinishga kirganda 0 dan qiymatgacha sanaydi
export default function CountUp({ value, as: Tag = 'span', className, duration = 1500, initial = '0', ...rest }) {
  const ref = useRef(null)
  const [text, setText] = useState(initial)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const target = parseInt(String(value).replace(/\s+/g, ''), 10) || 0
    let raf
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        obs.disconnect()
        let start
        const step = (t) => {
          if (start === undefined) start = t
          const p = Math.min((t - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setText(formatInt(Math.floor(eased * target)))
          if (p < 1) raf = requestAnimationFrame(step)
        }
        raf = requestAnimationFrame(step)
      })
    })
    obs.observe(el)
    return () => {
      obs.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, duration])

  return (
    <Tag ref={ref} className={className} data-count={value} {...rest}>
      {text}
    </Tag>
  )
}

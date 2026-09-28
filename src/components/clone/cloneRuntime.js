// Klon sahifalar uchun: asl saytning inline skriptlari va main.js dagi kerakli qismlar
// (raqamlarni sanash animatsiyasi, FAQ/so'rovnoma akkordeoni) — asl kod mantiqi bilan.

// Asl skriptlar DOMContentLoaded kutadi; React'da DOM allaqachon tayyor — darhol chaqiramiz.
function withImmediateDomReady(fn) {
  const orig = document.addEventListener
  document.addEventListener = function (type, listener, opts) {
    if (type === 'DOMContentLoaded') return listener.call(document, new Event('DOMContentLoaded'))
    return orig.call(this, type, listener, opts)
  }
  try {
    fn()
  } finally {
    document.addEventListener = orig
  }
}

// main.js → frrrr(): [data-count] 0 dan qiymatgacha sanaydi
function countUp(el) {
  const raw = (el.dataset.count || '').replace(/\s+/g, '')
  const floatDigits = parseInt(el.dataset.countFloat, 10)
  const isFloat = !isNaN(floatDigits) && floatDigits > 0
  let target = isFloat ? parseFloat(raw) : parseInt(raw, 10) || 0
  if (isNaN(target)) target = 0
  const duration = parseInt(el.dataset.countDuration, 10) || 1500
  const prefix = el.dataset.countPrefix || ''
  const postfix = el.dataset.countPostfix || ''
  const thousand = el.dataset.thousand !== 'false'
  const minus = el.dataset.minus !== undefined && el.dataset.minus !== 'false'
  if (minus && !target) {
    el.textContent = '-'
    return
  }
  const sep = (s) => (thousand ? s.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : s)
  const format = (v) => {
    if (!isFloat) return sep(Math.floor(v).toString())
    const [i, d] = v.toFixed(floatDigits).split('.')
    return d !== undefined ? sep(i) + '.' + d : sep(i)
  }
  let start
  const step = (t) => {
    if (start === undefined) start = t
    const p = Math.min((t - start) / duration, 1)
    el.textContent = prefix + format((1 - Math.pow(1 - p, 3)) * target) + postfix
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

// main.js → faqSwitch(): har bir .faq ichida bittadan ochiladi
function faqSwitch(root) {
  root.querySelectorAll('.faq').forEach((wrapper) => {
    const items = wrapper.querySelectorAll('.faq-item')
    items.forEach((item) => {
      item.addEventListener('click', function (e) {
        if (e.target.closest('.answer')) return
        items.forEach((i) => {
          if (i !== this) {
            i.classList.remove('active')
            const ans = i.querySelector('.answer')
            if (ans) ans.style.maxHeight = '0'
          }
        })
        this.classList.toggle('active')
        const answer = this.querySelector('.answer')
        if (answer) answer.style.maxHeight = this.classList.contains('active') ? answer.scrollHeight + 25 + 'px' : '0'
      })
    })
    if (!wrapper.classList.contains('dont_activate_me') && items[0]) {
      items[0].classList.add('active')
      const answer = items[0].querySelector('.answer')
      if (answer) answer.style.maxHeight = answer.scrollHeight + 25 + 'px'
    }
  })
}

export function runCloneScripts(root, scripts) {
  if (!root) return
  withImmediateDomReady(() => {
    scripts.forEach((fn, i) => {
      try {
        fn()
      } catch (err) {
        console.warn(`Klon skripti #${i + 1} xatosi:`, err)
      }
    })
  })
  faqSwitch(root)
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        countUp(e.target)
        obs.unobserve(e.target)
      }
    })
  })
  root.querySelectorAll('[data-count]').forEach((el) => obs.observe(el))
  return () => obs.disconnect()
}

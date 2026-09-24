//tooltip
function initializeTooltips() {
    setTimeout(() => {
        document
            .querySelectorAll(
                'p:not(.no-tooltip), span:not(.no-tooltip), div:not(.no-tooltip), h1:not(.no-tooltip), h2:not(.no-tooltip), h3:not(.no-tooltip), h4:not(.no-tooltip), h5:not(.no-tooltip), h6:not(.no-tooltip)'
            )
            .forEach(el => {
                if (el.classList.contains('no-tooltip')) return
                const style = window.getComputedStyle(el)
                const lineClamp =
                    parseInt(style.getPropertyValue('-webkit-line-clamp')) || 0
                const isClamped = lineClamp > 0 && el.scrollHeight > el.offsetHeight
                if (isClamped && !el.hasAttribute('data-bs-toggle')) {
                    el.setAttribute('data-bs-toggle', 'tooltip')
                    el.setAttribute('data-bs-placement', 'bottom')
                    el.setAttribute('data-bs-custom-class', 'custom-tooltip')
                    el.setAttribute('data-bs-title', el.innerText.trim())
                    new bootstrap.Tooltip(el)
                }
            })
    }, 100)
}

function faqSwitch() {
    // There may be several independent .faq wrappers on the same page;
    // each one manages its own set of items separately.
    const wrappers = document.querySelectorAll('.faq')
    if (!wrappers.length) return

    wrappers.forEach(wrapper => {
        const items = wrapper.querySelectorAll('.faq-item')
        if (!items.length) return

        items.forEach(item => {
            item.addEventListener('click', function (e) {
                if (e.target.closest('.answer')) return
                items.forEach(i => {
                    if (i !== this) {
                        i.classList.remove('active')
                        const ans = i.querySelector('.answer')
                        if (ans) ans.style.maxHeight = '0'
                    }
                })

                this.classList.toggle('active')
                const answer = this.querySelector('.answer')

                if (this.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 25 + 'px'
                } else {
                    answer.style.maxHeight = '0'
                }
            })
        })

        if (!wrapper.classList.contains('dont_activate_me')) {
            if (items.length) {
                items[0].classList.add('active')
                const answer = items[0].querySelector('.answer')
                if (answer) answer.style.maxHeight = answer.scrollHeight + 25 + 'px'
            }
        }
    })
}

const toggleMenu = () => {
    const menu = document.querySelector('.menu')
    if (!menu) return
    document.body.classList.toggle('sidebar-open')
    menu.classList.toggle('active')
}

function toggleSearch() {
    const searchBtn = document.querySelector('.header__search--btn')
    const searchWrapper = document.querySelector('.header__search--wrapper')
    const headerMenu = document.querySelector('.header__menu')
    if (!searchWrapper) return
    searchWrapper.classList.toggle('active')
    if (headerMenu) {
        headerMenu.classList.toggle('hidden')
    }
    if (searchWrapper.classList.contains('active')) {
        searchBtn.querySelector('span').className = 'i-close'
        searchBtn.setAttribute('aria-expanded', 'true')
    } else {
        searchBtn.querySelector('span').className = 'i-search'
        searchBtn.setAttribute('aria-expanded', 'false')
    }
}
function frrrr(el) {
    let raw = (el.dataset.count || "").replace(/\s+/g, "")
    // data-count-float="N" treats the value as a float with N decimal places.
    // e.g. data-count="0.0" data-count-float="2" animates 0.00 → target.
    let floatDigits = parseInt(el.dataset.countFloat, 10)
    let isFloat = !isNaN(floatDigits) && floatDigits > 0
    let target = isFloat ? parseFloat(raw) : (parseInt(raw, 10) || 0)
    if (isNaN(target)) target = 0
    let duration = parseInt(el.dataset.countDuration, 10) || 1500
    let prefix = el.dataset.countPrefix || ""
    let postfix = el.dataset.countPostfix || ""
    let thousand = el.dataset.thousand !== "false"
    let minus = el.dataset.minus !== undefined && el.dataset.minus !== "false"
    let startTime

    // If data-minus is true and value is 0 or null, show a dash
    if (minus && !target) {
        el.textContent = "-"
        return
    }

    function formatFloat(v) {
        // toFixed handles rounding to N decimals.
        let s = v.toFixed(floatDigits)
        let [intPart, decPart] = s.split(".")
        if (thousand) {
            intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        }
        return decPart !== undefined ? intPart + "." + decPart : intPart
    }

    function formatInt(v) {
        return thousand
            ? v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            : v.toString()
    }

    function step(t) {
        if (startTime === undefined) startTime = t
        let p = Math.min((t - startTime) / duration, 1)
        // Ease out for smoother animation.
        let eased = 1 - Math.pow(1 - p, 3)
        let v = eased * target
        let formatted = isFloat
            ? formatFloat(v)
            : formatInt(Math.floor(v))

        el.textContent = prefix + formatted + postfix

        if (p < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
}

function initTabSwitching() {
    document.querySelectorAll('.tab-navigation').forEach(navigation => {
        const system = navigation.querySelector('.tab-button')?.dataset.tabSystem
        if (!system) return
        const tabButtons = navigation.querySelectorAll(
            `[data-tab-system="${system}"]`
        )
        const tabPanels = document.querySelectorAll(
            `.tab-panel[data-tab-system="${system}"]`
        )
        if (!tabButtons.length || !tabPanels.length) return
        tabButtons.forEach((button, index) => {
            button.addEventListener('click', e => {
                e.preventDefault()
                switchToTab(index, tabButtons, tabPanels)
            })
            button.addEventListener('keydown', e => {
                let n = index
                if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    n = index > 0 ? index - 1 : tabButtons.length - 1
                    e.preventDefault()
                } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    n = index < tabButtons.length - 1 ? index + 1 : 0
                    e.preventDefault()
                } else if (e.key === 'Home') {
                    n = 0
                    e.preventDefault()
                } else if (e.key === 'End') {
                    n = tabButtons.length - 1
                    e.preventDefault()
                }
                if (n !== index) {
                    switchToTab(n, tabButtons, tabPanels)
                    tabButtons[n].focus()
                }
            })
        })
        switchToTab(0, tabButtons, tabPanels)
    })
}

function switchToTab(i, tabButtons, tabPanels) {
    tabButtons.forEach(b => b.classList.remove('active'))
    tabButtons[i].classList.add('active')
    tabPanels.forEach(p => {
        p.hidden = true
    })
    if (tabPanels[i]) tabPanels[i].hidden = false
}

window.switchToTabByIndex = function (system, i) {
    const tabButtons = document.querySelectorAll(
        `.tab-button[data-tab-system="${system}"]`
    )
    const tabPanels = document.querySelectorAll(
        `.tab-panel[data-tab-system="${system}"]`
    )
    if (i >= 0 && i < tabPanels.length) switchToTab(i, tabButtons, tabPanels)
}

document.addEventListener('DOMContentLoaded', () => {
    initializeTooltips()
    faqSwitch()
    initTabSwitching()
    AOS.init({
        disable: window.innerWidth < 768,
        once: true,
        duration: 400
    })

    let obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                frrrr(e.target, 1200)
                obs.unobserve(e.target)
            }
        })
    })

    document.querySelectorAll('[data-count]').forEach(el => obs.observe(el))

    // Animate horizontal bars
    let barObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.width = e.target.dataset.width
                barObs.unobserve(e.target)
            }
        })
    })
    document.querySelectorAll('.bar[data-width], .charts-horizontal-row-item[data-width]').forEach(el => barObs.observe(el))
})

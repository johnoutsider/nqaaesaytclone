// Asl sahifadagi inline skriptlar (o'zgartirilmagan), tartibi bo'yicha.
// Har biri sahifa DOM'ga chiqqandan keyin bir marta ishga tushadi (cloneRuntime.js).
/* eslint-disable */
export const scripts = [
  // 1
  function () {
    const img = document.querySelector(".university-logo")
    function getAverageColor(image) {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!image.naturalWidth || !image.naturalHeight) return {
    r: 255,
    g: 255,
    b: 255
    }
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight
    ctx.drawImage(image, 0, 0)
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    let r = 0,
    g = 0,
    b = 0,
    count = 0
    for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3]
    if (a < 10) continue
    r += data[i]
    g += data[i + 1]
    b += data[i + 2]
    count++
    }
    if (!count) return {
    r: 255,
    g: 255,
    b: 255
    }
    return {
    r: r / count,
    g: g / count,
    b: b / count
    }
    }
    function luminance({
    r,
    g,
    b
    }) {
    r /= 255
    g /= 255
    b /= 255
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
    }
    if (img) {
    img.onload = () => {
    const color = getAverageColor(img)
    const lum = luminance(color)
    const bg = lum > 0.5 ? "#0a1f44" : "#e4eeef"
    const fg = lum > 0.5 ? "#e4eeef" : "#0a1f44"
    document.querySelector(".university-header-img").style.background = bg
    document.querySelector(".university-header-img").style.color = fg
    }
    if (img.complete) img.onload()
    }
  },
  // 2
  function () {
    document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.gender-bars');
    if (!wrapper) return;
    const items = wrapper.querySelectorAll('.contingent');
    let total = 0;
    items.forEach(function(item) {
    const countEl = item.querySelector('.count');
    total += parseInt((countEl.dataset.count || '0').replace(/[\s,]/g, '')) || 0;
    });
    items.forEach(function(item) {
    const countEl = item.querySelector('.count');
    const count = parseInt((countEl.dataset.count || '0').replace(/[\s,]/g, '')) || 0;
    const percent = total > 0 ? Math.round((count / total) * 100) : 0;
    item.querySelector('.percent').textContent = '(' + percent + '%)';
    item.querySelector('.bar').style.setProperty('--chart-width', percent);
    });
    });
  },
  // 3
  function () {
    (function() {
    // Updated to match the new light teal bar color
    const COLORS = [
    "#679c9d"
    ];
    const DEFAULT_DATA = [
    {
    key: "30 yoshgacha",
    value: 14,
    percent: 35                                                    },
    {
    key: "40 yoshgacha",
    value: 10,
    percent: 25                                                    },
    {
    key: "50 yoshgacha",
    value: 9,
    percent: 22                                                    },
    {
    key: "60 yoshgacha",
    value: 5,
    percent: 12                                                    },
    {
    key: "60 yoshdan yuqori",
    value: 2,
    percent: 5                                                    },
    ].filter(function(item) {
    return item.value > 0;
    });
    const svg = document.getElementById('barSvg');
    const legend = document.querySelector('.university-bar-legend');
    const SVG_NS = 'http://www.w3.org/2000/svg';
    function render(data) {
    svg.innerHTML = '';
    if (legend) legend.innerHTML = '';
    if (!data.length) return;
    // 1. Chart Configuration and Scaling
    // Define inner chart padding and boundaries relative to viewBox(1100, 340)
    const margin = {
    top: 20,
    right: 30,
    bottom: 20,
    left: 50
    };
    const width = 1100 - margin.left - margin.right;
    const height = 270;
    // Determine the maximum Y value: current max + 10% headroom.
    // Falls back to 100 when there is no data so the axis still renders.
    const maxDataValue = Math.max(...data.map(d => d.value));
    const yMax = maxDataValue > 0 ?
    Math.ceil((maxDataValue * 1.1) / 10) * 10 :
    100;
    // 2. Draw Horizontal Grid Lines and Y-Axis Labels
    const numYGridLines = 5; // Creates intervals (0, 20, 40, 60, 80, 100)
    for (let i = 0; i <= numYGridLines; i++) {
    const yValue = (yMax / numYGridLines) * i;
    const yPos = margin.top + height - (yValue / yMax) * height;
    // Grid Line
    const hLine = document.createElementNS(SVG_NS, 'line');
    hLine.setAttribute('x1', margin.left);
    hLine.setAttribute('y1', yPos);
    hLine.setAttribute('x2', margin.left + width);
    hLine.setAttribute('y2', yPos);
    hLine.setAttribute('stroke', '#e4e9f0'); // Light dashed blue-gray
    hLine.setAttribute('stroke-width', '1.5');
    // Keep the bottom baseline solid (i === 0), dash the rest
    if (i > 0) {
    hLine.setAttribute('stroke-dasharray', '6,6');
    }
    svg.appendChild(hLine);
    // Y-Axis Label
    const yText = document.createElementNS(SVG_NS, 'text');
    yText.setAttribute('x', margin.left - 25);
    yText.setAttribute('y', yPos + 8); // Nudge down to vertically center with the line
    yText.setAttribute('text-anchor', 'end');
    yText.setAttribute('fill', '#111827');
    yText.setAttribute('font-family', 'sans-serif, Arial');
    yText.setAttribute('font-size', '24');
    yText.setAttribute('font-weight', '500');
    yText.textContent = Math.round(yValue);
    svg.appendChild(yText);
    }
    // 3. Draw Vertical Grid Lines
    const bandWidth = width / data.length;
    for (let i = 0; i <= data.length; i++) {
    const xPos = margin.left + (i * bandWidth);
    const vLine = document.createElementNS(SVG_NS, 'line');
    vLine.setAttribute('x1', xPos);
    vLine.setAttribute('y1', margin.top);
    vLine.setAttribute('x2', xPos);
    vLine.setAttribute('y2', margin.top + height);
    vLine.setAttribute('stroke', '#e4e9f0');
    vLine.setAttribute('stroke-width', '1.5');
    vLine.setAttribute('stroke-dasharray', '6,6');
    svg.appendChild(vLine);
    }
    // 4. Draw the Bars and X-Axis Labels
    const barWidth = 95; // Controls the thickness of the pill bars
    data.forEach((item, index) => {
    const xCenter = margin.left + (index + 0.5) * bandWidth;
    const barHeight = (item.value / yMax) * height;
    const yPos = margin.top + height - barHeight;
    // Pill-Shaped Bar (Rounded top and bottom matching image_cff643.png)
    const rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttribute('x', xCenter - barWidth / 2);
    rect.setAttribute('y', yPos);
    rect.setAttribute('width', barWidth);
    rect.setAttribute('height', barHeight);
    rect.setAttribute('rx', 22); // Radius for rounded corners
    rect.setAttribute('ry', 22);
    rect.setAttribute('fill', COLORS[0]); // Uses "#679c9d"
    svg.appendChild(rect);
    // Value label above the bar
    const valueText = document.createElementNS(SVG_NS, 'text');
    valueText.setAttribute('x', xCenter);
    valueText.setAttribute('y', yPos - 12); // 12px above the bar top
    valueText.setAttribute('text-anchor', 'middle');
    valueText.setAttribute('fill', '#111827');
    valueText.setAttribute('font-family', 'sans-serif, Arial');
    valueText.setAttribute('font-size', '24');
    valueText.setAttribute('font-weight', '600');
    valueText.textContent = item.value.toLocaleString();
    svg.appendChild(valueText);
    // X-Axis Label (e.g., "30 yosh")
    const xText = document.createElementNS(SVG_NS, 'text');
    xText.setAttribute('x', xCenter);
    xText.setAttribute('y', margin.top + height + 35); // Push down below baseline
    xText.setAttribute('text-anchor', 'middle');
    xText.setAttribute('fill', '#111827');
    xText.setAttribute('font-family', 'sans-serif, Arial');
    xText.setAttribute('font-size', '24');
    xText.setAttribute('font-weight', '500');
    xText.textContent = item.key;
    svg.appendChild(xText);
    });
    }
    render(DEFAULT_DATA);
    })();
  },
  // 4
  function () {
    document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.faculty-bars');
    if (!wrapper) return;
    const items = wrapper.querySelectorAll('.contingent2');
    let total = 1204;
    items.forEach(function(item) {
    const countEl = item.querySelector('.count');
    });
    items.forEach(function(item) {
    const countEl = item.querySelector('.count');
    const count = parseInt((countEl.dataset.count || '0').replace(/[\s,]/g, '')) || 0;
    const percent = total > 0 ? Math.round((count / total) * 100) : 0;
    item.querySelector('.percent').textContent = '(' + percent + '%)';
    item.querySelector('.bar').style.setProperty('--chart-width', percent);
    });
    });
  },
  // 5
  function () {
    (function() {
    var data = [
    {
    question: "Siz ishlayotgan taʼlim tashkilotida dars o‘tish uchun moddiy-texnik baza (auditoriya holati, jihozlar, laboratoriyalar) qanday darajada taʼminlangan?",
    positive: 92.5,
    negative: 7.5                                                },
    {
    question: "Siz dars beradigan yo‘nalishda laboratoriya va ustaxonalar zamonaviy texnika va asbob-uskunalar bilan qay darajada taʼminlangan?",
    positive: 90,
    negative: 10                                                },
    {
    question: "Taʼlim tashkiloti faoliyatini yanada yaxshilash uchun birinchi navbatda nimalarni o‘zgartirish kerak deb hisoblaysiz?",
    positive: 75,
    negative: 25                                                },
    {
    question: "Siz o‘qitayotgan fan dasturlari va o‘quv materiallari bugungi mehnat bozori va ish beruvchilarning real talablariga qanchalik mos deb hisoblaysiz?",
    positive: 97.5,
    negative: 2.5                                                },
    {
    question: "Siz o‘qitayotgan fan dasturlari va o‘quv materiallari bugungi mehnat bozori va ish beruvchilarning real talablariga qanchalik mos deb hisoblaysiz?",
    positive: 95,
    negative: 5                                                },
    {
    question: "Darslarda kompyuter texnologiyalari qulayligi va Internet tezligidan qoniqish darajangizni baholang?",
    positive: 92.5,
    negative: 7.5                                                },
    {
    question: "Siz dars berayotgan soha bo‘yicha bevosita ishlab chiqarishda (korxonada) ish tajribasiga egamisiz?",
    positive: 67.5,
    negative: 32.5                                                },
    {
    question: "Taʼlim tashkilotlarida ish yuklamangiz (dars soatlari va hujjatbozlik) miqdorini qanday baholaysiz?",
    positive: 52.5,
    negative: 47.5                                                },
    {
    question: "o‘zingizning kasbiy malakangizni xalqaro talablarga mos deb hisoblaysizmi?",
    positive: 100,
    negative: 0                                                },
    {
    question: "Oxirgi 2-yil ichida ishlab chiqarish korxonalarida malaka oshirish yoki stajirovkadan o‘tdingizmi?",
    positive: 85,
    negative: 15                                                },
    {
    question: "Ishlab chiqarish taʼlim ustalarining ish haqi va moddiy rag‘batlantirilishi ularni sifatli taʼlim berishga undaydimi?",
    positive: 80,
    negative: 20                                                },
    {
    question: "Texnikumda o\'quv jarayonini tashkil etishda mehnat bozori bilan bog\'liq ta\'minlangan deb hisoblaysizmi?",
    positive: 97.5,
    negative: 2.5                                                },
    {
    question: "Texnikumga o‘quvchilarni qabul qilish talablari (kvotalar) hududiy ish beruvchilar ehtiyojlariga qanchalik mos keladi?",
    positive: 97.5,
    negative: 2.5                                                },
    {
    question: "Texnikum tomonidan ish beruvchilar (korxona va tashkilotlar) bilan o‘quvchilarni ishga joylashtirish bo‘yicha hamkorlik darajasini baholang?",
    positive: 92.5,
    negative: 7.5                                                },
    {
    question: "O‘quvchilarning darsda olgan nazariy bilimlarini bevosita ishlab chiqarishda (korxonalarda) mustahkamlash (dual taʼlim) uchun sharoitlar yetarlimi?",
    positive: 90,
    negative: 10                                                },
    {
    question: "Sizningcha, o‘quvchilarning tanlagan kasbi bo‘yicha bilim va ko‘nikmalarini shakllantirishda eng asosiy to‘siq nimada?",
    positive: 90,
    negative: 10                                                },
    {
    question: "Sizning texnikumingizda pedagoglar va ishlab chiqarish taʼlim ustalarini chet elga malaka oshirish va stajirovkaga yuborish tizimi qanday ishlaydi?",
    positive: 37.5,
    negative: 62.5                                                },
    {
    question: "Hamkor korxonalar o‘quvchilarning ishlab chiqarish amaliyotiga qanchalik masʼuliyat bilan yondashmoqda?",
    positive: 90,
    negative: 10                                                },
    ];
    var svgNS = 'http://www.w3.org/2000/svg';
    var container = document.getElementById('donutChartsRow');
    data.forEach(function(d, idx) {
    var total = d.positive + d.negative;
    var r = 50,
    cx = 60,
    cy = 60,
    strokeW = 18;
    var visibleGap = 2;
    var gapLen = visibleGap + strokeW; // compensate round cap extending strokeW/2 per side
    var circ = 2 * Math.PI * r;
    var availableLen = circ - 2 * gapLen; // subtract both gaps, then distribute
    var posLen = (d.positive / total) * availableLen;
    var negLen = (d.negative / total) * availableLen;
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 120 120');
    svg.setAttribute('class', 'charts-donut__svg');
    // Positive arc (teal, starts from top)
    var posCircle = document.createElementNS(svgNS, 'circle');
    posCircle.setAttribute('cx', cx);
    posCircle.setAttribute('cy', cy);
    posCircle.setAttribute('r', r);
    posCircle.setAttribute('fill', 'none');
    posCircle.setAttribute('stroke', '#3C878C');
    posCircle.setAttribute('stroke-width', strokeW);
    posCircle.setAttribute('stroke-dasharray', '0 ' + circ);
    posCircle.setAttribute('stroke-dashoffset', circ / 4);
    posCircle.setAttribute('stroke-linecap', 'round');
    posCircle.style.transition = 'stroke-dasharray 1.75s ease-in-out';
    svg.appendChild(posCircle);
    // Negative arc (red, starts after positive + gap)
    var negCircle = document.createElementNS(svgNS, 'circle');
    negCircle.setAttribute('cx', cx);
    negCircle.setAttribute('cy', cy);
    negCircle.setAttribute('r', r);
    negCircle.setAttribute('fill', 'none');
    negCircle.setAttribute('stroke', '#E74C3C');
    negCircle.setAttribute('stroke-width', strokeW);
    negCircle.setAttribute('stroke-dasharray', '0 ' + circ);
    negCircle.setAttribute('stroke-dashoffset', circ / 4 - (posLen + gapLen));
    negCircle.setAttribute('stroke-linecap', 'round');
    negCircle.style.transition = 'stroke-dasharray 1.75s ease-in-out';
    svg.appendChild(negCircle);
    var col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6';
    col.innerHTML =
    '<div class="content-section__inner h-100">' +
    '<div class="content-section__top alt line-fix-3 mb-auto">' + d.question + '</div>' +
    '<div class="row align-items-center mt-5">' +
    '<div class="col-6">' +
    '<div class="charts-donut" id="donut' + idx + '"></div>' +
    '</div>' +
    '<div class="col-6">' +
    '<div class="charts-donut__labels">' +
    '<div class="charts-donut__label charts-donut__label--positive">' +
    '<span class="charts-donut__label-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#3C878C"/><path d="M7 12l3 3 7-7" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
    '<span class="charts-donut__label-text"><strong>' + d.positive + '%</strong><br>Ijobiy</span>' +
    '</div>' +
    '<div class="charts-donut__label charts-donut__label--negative">' +
    '<span class="charts-donut__label-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#E74C3C"/><path d="M8 8l8 8M16 8l-8 8" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/></svg></span>' +
    '<span class="charts-donut__label-text"><strong>' + d.negative + '%</strong><br>Salbiy</span>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';
    container.appendChild(col);
    col.querySelector('#donut' + idx).appendChild(svg);
    // Animate on scroll
    var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
    if (e.isIntersecting) {
    posCircle.setAttribute('stroke-dasharray', posLen + ' ' + (circ - posLen));
    negCircle.setAttribute('stroke-dasharray', negLen + ' ' + (circ - negLen));
    obs.disconnect();
    }
    });
    });
    obs.observe(col);
    });
    })();
  },
  // 6
  function () {
    (function() {
    var data = [
    {
    question: "Oʻqituvchi va ishlab chiqarish taʼlimi ustalarining kasbiy mahorati sizni qoniqtiradimi?",
    positive: 97.7,
    negative: 2.3                                                },
    {
    question: "Oʻquv adabiyotlari, darsliklar va kutubxona (jumladan, elektron resurslar) bilan taʼminlanganlik darajasi sizni qoniqtiradimi?",
    positive: 96.1,
    negative: 3.9                                                },
    {
    question: "Sizning texnikumingizda o‘qitish tizimi kredit-modul tizimiga asoslanganmi?",
    positive: 94.9,
    negative: 5.1                                                },
    {
    question: "Tanlagan kasbingizni oʻrganish uchun oʻtkaziladigan amaliy mashgʻulotlar (amaliyot darslari) sifatini qanday baholaysiz?",
    positive: 95.5,
    negative: 4.5                                                },
    {
    question: "Taʼlim tashkiotidagi oʻquv ustaxonalari va laboratoriyalarning jihozlanish darajasini qanday baholaysiz?",
    positive: 86.5,
    negative: 13.5                                                },
    {
    question: "Amaliy mashgʻulotlar uchun zarur boʻlgan xomashyo va materiallar (metall, mato, kimyoviy moddalar va h.k.) bilan taʼminlanish darajasi qanday?",
    positive: 95.1,
    negative: 4.9                                                },
    {
    question: "Oʻquv dasturidagi nazariya va amaliyot mashgʻulotlari nisbati sizningcha qanday?",
    positive: 58.5,
    negative: 41.5                                                },
    {
    question: "Ishlab chiqarish amaliyotini qayerda oʻtayapsiz (yoki oʻtagansiz)?",
    positive: 95.5,
    negative: 4.5                                                },
    {
    question: "Amaliyot oʻtayotgan korxonangizda Sizga zamonaviy texnologiyalarni oʻrgatish uchun sharoit yaratilganmi?",
    positive: 98.1,
    negative: 1.9                                                },
    {
    question: "Dual taʼlim (ham oʻqish, ham ishlash) tizimi haqida maʼlumotga egamisiz va bu tizimda ishtirok etayapsizmi?",
    positive: 58.4,
    negative: 41.6                                                },
    {
    question: "Taʼlim tashkilotida tadbirkorlikka oʻrgatish (startap loyihalar) yoʻlga qoʻyilganmi?",
    positive: 78.2,
    negative: 21.8                                                },
    {
    question: "Kasbiy taʼlim sifatini 5 ballik tizimda baholang",
    positive: 95.3,
    negative: 4.7                                                },
    {
    question: "Darsdan boʻsh vaqtingizda taʼlim tashkilotida faoliyat yuritadigan toʻgaraklar (kasb-hunar, fan toʻgaraklari) sizning qiziqishlaringizga mos keladimi?",
    positive: 76.3,
    negative: 23.7                                                },
    {
    question: "Taʼlim tashkilotida muntazam ravishda sport bilan shugʻullanish uchun yaratilgan sharoitlardan (sport zali, maydonchalar, inventarlar) qoniqish darajangiz qanday?",
    positive: 92.1,
    negative: 7.9                                                },
    {
    question: "Taʼlim tashkilotida oʻtkaziladigan maʼnaviy-maʼrifiy tadbirlar, uchrashuvlar va koʻrik-tanlovlar siz uchun qiziqarlimi?",
    positive: 86.5,
    negative: 13.5                                                },
    {
    question: "Oʻqishni tamomlaganingizdan soʻng, oʻz mutaxassisligingiz boʻyicha tez va qiynalmasdan ish topishingizga ishonasizmi?",
    positive: 97.5,
    negative: 2.5                                                },
    {
    question: "Oʻqish davrida mutaxassisligingiz boʻyicha real korxona yoki tashkilotlarda ishlab chiqarish amaliyotini oʻtadingizmi va u sizga foydali boʻldimi?",
    positive: 78.3,
    negative: 21.7                                                },
    {
    question: "Taʼlim tashkilotingiz sizga ish topishda (boʻsh ish oʻrinlari yarmarkalari, ish beruvchilar bilan uchrashuvlar orqali) qanday darajada amaliy yordam bermoqda?",
    positive: 75.3,
    negative: 24.7                                                },
    ];
    var svgNS = 'http://www.w3.org/2000/svg';
    var container = document.getElementById('donutChartsRowStudent');
    data.forEach(function(d, idx) {
    var total = d.positive + d.negative;
    var r = 50,
    cx = 60,
    cy = 60,
    strokeW = 18;
    var visibleGap = 2;
    var gapLen = visibleGap + strokeW; // compensate round cap extending strokeW/2 per side
    var circ = 2 * Math.PI * r;
    var availableLen = circ - 2 * gapLen; // subtract both gaps, then distribute
    var posLen = (d.positive / total) * availableLen;
    var negLen = (d.negative / total) * availableLen;
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 120 120');
    svg.setAttribute('class', 'charts-donut__svg');
    // Positive arc (teal, starts from top)
    var posCircle = document.createElementNS(svgNS, 'circle');
    posCircle.setAttribute('cx', cx);
    posCircle.setAttribute('cy', cy);
    posCircle.setAttribute('r', r);
    posCircle.setAttribute('fill', 'none');
    posCircle.setAttribute('stroke', '#3C878C');
    posCircle.setAttribute('stroke-width', strokeW);
    posCircle.setAttribute('stroke-dasharray', '0 ' + circ);
    posCircle.setAttribute('stroke-dashoffset', circ / 4);
    posCircle.setAttribute('stroke-linecap', 'round');
    posCircle.style.transition = 'stroke-dasharray 1.75s ease-in-out';
    svg.appendChild(posCircle);
    // Negative arc (red, starts after positive + gap)
    var negCircle = document.createElementNS(svgNS, 'circle');
    negCircle.setAttribute('cx', cx);
    negCircle.setAttribute('cy', cy);
    negCircle.setAttribute('r', r);
    negCircle.setAttribute('fill', 'none');
    negCircle.setAttribute('stroke', '#E74C3C');
    negCircle.setAttribute('stroke-width', strokeW);
    negCircle.setAttribute('stroke-dasharray', '0 ' + circ);
    negCircle.setAttribute('stroke-dashoffset', circ / 4 - (posLen + gapLen));
    negCircle.setAttribute('stroke-linecap', 'round');
    negCircle.style.transition = 'stroke-dasharray 1.75s ease-in-out';
    svg.appendChild(negCircle);
    var col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6';
    col.innerHTML =
    '<div class="content-section__inner h-100">' +
    '<div class="content-section__top alt line-fix-3 mb-auto">' + d.question + '</div>' +
    '<div class="row align-items-center mt-5">' +
    '<div class="col-6">' +
    '<div class="charts-donut" id="donut' + idx + '"></div>' +
    '</div>' +
    '<div class="col-6">' +
    '<div class="charts-donut__labels">' +
    '<div class="charts-donut__label charts-donut__label--positive">' +
    '<span class="charts-donut__label-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#3C878C"/><path d="M7 12l3 3 7-7" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
    '<span class="charts-donut__label-text"><strong>' + d.positive + '%</strong><br>Ijobiy</span>' +
    '</div>' +
    '<div class="charts-donut__label charts-donut__label--negative">' +
    '<span class="charts-donut__label-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#E74C3C"/><path d="M8 8l8 8M16 8l-8 8" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/></svg></span>' +
    '<span class="charts-donut__label-text"><strong>' + d.negative + '%</strong><br>Salbiy</span>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';
    container.appendChild(col);
    col.querySelector('#donut' + idx).appendChild(svg);
    // Animate on scroll
    var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
    if (e.isIntersecting) {
    posCircle.setAttribute('stroke-dasharray', posLen + ' ' + (circ - posLen));
    negCircle.setAttribute('stroke-dasharray', negLen + ' ' + (circ - negLen));
    obs.disconnect();
    }
    });
    });
    obs.observe(col);
    });
    })();
  },
  // 7
  function () {
    (function() {
    const COLORS = ['#8B7BFF', '#4A9BDE', '#FF9B57', '#1AB394'];
    const graduates = [{
    label: 'Kunduzgi',
    value: 263                                        },
    {
    label: 'Sirtqi',
    value: 0                                        },
    {
    label: 'Kechki',
    value: 0                                        },
    {
    label: "Dual ta'lim", // TUZATILDI: asl saytda 'Dual ta'lim' — sintaksis xatosi, bu diagramma u yerda chizilmaydi
    value: 0                                        },
    ];
    const total = graduates.reduce(function(sum, item) {
    return sum + item.value;
    }, 0);
    const track = document.getElementById('graduatesTrack');
    const legend = document.getElementById('graduatesLegend');
    const chart = document.getElementById('graduatesChart');
    graduates.forEach(function(item, index) {
    const color = COLORS[index % COLORS.length];
    const percent = total ? (item.value / total * 100) : 0;
    const bar = document.createElement('div');
    bar.className = 'university-graduates__bar';
    bar.style.setProperty('--graduates-pct', percent.toFixed(2));
    bar.style.backgroundColor = color;
    bar.innerHTML = '<span class="university-graduates__tooltip">' + item.label + ' ' + item.value + '</span>';
    track.appendChild(bar);
    const legendItem = document.createElement('div');
    legendItem.className = 'university-graduates__legend-item';
    legendItem.style.setProperty('--legend-color', color);
    legendItem.innerHTML =
    '<span class="university-graduates__legend-dot"></span>' +
    '<div class="university-graduates__legend-info">' +
    '<p>' + item.label + '</p>' +
    '<strong>' + (item.value > 0 ? item.value : `mavjud emas`) + '</strong>' +
    '</div>';
    legend.appendChild(legendItem);
    });
    chart.dataset.total = total;
    })();
  },
  // 8
  function () {
    const data = [{
    label: "Kunduzgi",
    value: 1204        },
    {
    label: "Kechki",
    value: 0        },
    {
    label: "Sirtqi",
    value: 0        },
    {
    label: "Maxsus sirtqi",
    value: 0        },
    {
    label: "Dual ta'lim",
    value: 0        },
    {
    label: "Qo‘shma ta'lim",
    value: 0        },
    {
    label: "Kattalarni o‘qitish",
    value: 0        }
    ].filter(d => d.value > 0);
    const svg = document.getElementById("university-rating-chart");
    if (!svg || !data.length) {
    if (svg) svg.innerHTML = '';
    } else {
    const width = 1400;
    const height = 400;
    const topPadding = 50;
    const bottomPadding = 80;
    const max = Math.max(...data.map(d => d.value));
    const min = Math.min(...data.map(d => d.value));
    const step = width / (data.length + 1);
    const points = data.map((d, i) => {
    const x = step * (i + 1);
    const y = topPadding +
    ((max - d.value) / (max - min || 1)) * 120;
    return {
    ...d,
    x,
    y
    };
    });
    const areaPath = [
    `M 0 ${points[0].y + 30}`,
    ...points.map(p => `L ${p.x} ${p.y}`),
    `L ${width} ${points.at(-1).y + 30}`,
    `L ${width} ${height}`,
    `L 0 ${height}`,
    'Z'
    ].join(' ');
    svg.innerHTML = `
    <defs>
    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="rgba(172, 214, 255, 0.8)" />
    <stop offset="100%" stop-color="rgba(255, 255, 255, 0.1)" />
    </linearGradient>
    </defs>
    <path class="area" d="${areaPath}"></path>
    ${points.map(p => `
    <line
    class="line"
    x1="${p.x}"
    y1="${p.y}"
    x2="${p.x}"
    y2="${height - bottomPadding}">
    </line>
    <circle
    class="point"
    cx="${p.x}"
    cy="${p.y}"
    r="8">
    </circle>
    <text
    class="label"
    x="${p.x}"
    y="${p.y - 20}"
    text-anchor="middle">
    ${p.value} nafar        </text>
    <text
    class="category"
    x="${p.x}"
    y="${height - 40}"
    text-anchor="middle">
    ${p.label}
    </text>
    `).join('')}
    `;
    }
  },
  // 9
  function () {
    (function() {
    const data = [{
    label: "Akademik faoliyat (ball)",
    value: 5
    },
    {
    label: "Ilmiy faoliyat (ball)",
    value: 2
    },
    {
    label: "Xalqaro faoliyat (ball)",
    value: 3
    },
    {
    label: "Bitiruvchilar sifati (ball)",
    value: 5
    }
    ];
    const svg = document.getElementById("university-rating-chart2");
    if (!svg || !data.length) {
    if (svg) svg.innerHTML = '';
    return;
    }
    const width = 1400;
    const height = 400;
    const topPadding = 50;
    const bottomPadding = 80;
    const max = Math.max(...data.map(d => d.value));
    const min = Math.min(...data.map(d => d.value));
    const step = width / (data.length + 1);
    const points = data.map((d, i) => {
    const x = step * (i + 1);
    const y = topPadding +
    ((max - d.value) / (max - min || 1)) * 120;
    return {
    ...d,
    x,
    y
    };
    });
    const areaPath = [
    `M 0 ${points[0].y + 30}`,
    ...points.map(p => `L ${p.x} ${p.y}`),
    `L ${width} ${points.at(-1).y + 30}`,
    `L ${width} ${height}`,
    `L 0 ${height}`,
    'Z'
    ].join(' ');
    svg.innerHTML = `
    <defs>
    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="rgba(172, 214, 255, 0.8)" />
    <stop offset="100%" stop-color="rgba(255, 255, 255, 0.1)" />
    </linearGradient>
    </defs>
    <path class="area" d="${areaPath}"></path>
    ${points.map(p => `
    <line
    class="line"
    x1="${p.x}"
    y1="${p.y}"
    x2="${p.x}"
    y2="${height - bottomPadding}">
    </line>
    <circle
    class="point"
    cx="${p.x}"
    cy="${p.y}"
    r="8">
    </circle>
    <text
    class="label"
    x="${p.x}"
    y="${p.y - 20}"
    text-anchor="middle">
    ${p.value} ball        </text>
    <text
    class="category"
    x="${p.x}"
    y="${height - 40}"
    text-anchor="middle">
    ${p.label}
    </text>
    `).join('')}
    `;
    })();
  },
  // 10
  function () {
    (function() {
    const COLORS = [
    '#7161FF', '#19AE8B', '#FFA151', '#E187FF', '#4E95DA'
    ];
    const DEFAULT_DATA = [
    {
    key: "Bosh o\u2018qituvchi",
    value: 2,
    percent: 5                },
    {
    key: "Toifasiz \u2014 oliy ma\u2019lumotli",
    value: 0,
    percent: 0                },
    {
    key: "Yetakchi o\u2018qituvchi",
    value: 11,
    percent: 27                },
    {
    key: "Toifasiz \u2014 o\u2018rta maxsus ma\u2019lumotli",
    value: 26,
    percent: 65                },
    {
    key: "Katta o\u2018qituvchi",
    value: 1,
    percent: 2                },
    ].filter(function(item) {
    return item.value > 0;
    });
    const CX = 100,
    CY = 100;
    const OUTER_R = 90,
    INNER_R = 45;
    const STROKE_W = OUTER_R - INNER_R;
    const MID_R = (OUTER_R + INNER_R) / 2;
    const CIRCUMFERENCE = 2 * Math.PI * MID_R;
    const GAP_DEG = 3;
    const svg = document.getElementById('donutSvg');
    const legend = document.querySelector('.university-donut-legend');
    function polar(cx, cy, r, a) {
    return {
    x: cx + Math.cos(a) * r,
    y: cy + Math.sin(a) * r
    };
    }
    function donutSlice(cx, cy, outerR, innerR, start, end) {
    const p1 = polar(cx, cy, outerR, start);
    const p2 = polar(cx, cy, outerR, end);
    const p3 = polar(cx, cy, innerR, end);
    const p4 = polar(cx, cy, innerR, start);
    const large = end - start > Math.PI ? 1 : 0;
    return `
    M ${p1.x} ${p1.y}
    A ${outerR} ${outerR} 0 ${large} 1 ${p2.x} ${p2.y}
    L ${p3.x} ${p3.y}
    A ${innerR} ${innerR} 0 ${large} 0 ${p4.x} ${p4.y}
    Z
    `;
    }
    function roundPath(path, radius = 4) {
    if (!window.SVGPathCommander) return path;
    return SVGPathCommander.round(path, radius);
    }
    function render(data) {
    svg.innerHTML = '';
    if (legend) legend.innerHTML = '';
    const totalPct = data.reduce((s, d) => s + (+d.percent || 0), 0);
    if (!totalPct) return;
    const GAP = 3 * Math.PI / 180;
    let angle = -Math.PI / 2;
    data.forEach((d, i) => {
    const pct = (+d.percent || 0) / totalPct;
    const span = pct * Math.PI * 2;
    const start = angle + GAP / 2;
    const end = angle + span - GAP / 2;
    angle += span;
    const color = COLORS[i % COLORS.length];
    const path = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
    );
    const dPath = donutSlice(
    CX,
    CY,
    OUTER_R,
    INNER_R,
    start,
    end
    );
    path.setAttribute('d', dPath);
    path.setAttribute('fill', color);
    path.style.cursor = 'pointer';
    path.style.transition = 'opacity .15s';
    path.addEventListener('mouseenter', () => path.setAttribute('opacity', '.75'));
    path.addEventListener('mouseleave', () => path.setAttribute('opacity', '1'));
    svg.appendChild(path);
    if (legend) {
    const item = document.createElement('div');
    item.className = 'university-donut-legend-item';
    item.style.borderLeft = `4px solid ${color}`;
    item.innerHTML = `
    <span class="university-donut-legend-marker" style="background:${color}"></span>
    <div class="university-donut-legend-text">
    <p>${d.key}</p>
    <p>${Math.round(pct * 100)}%</p>
    </div>
    `;
    legend.appendChild(item);
    }
    });
    }
    render(DEFAULT_DATA);
    })();
  },
  // 11
  function () {
    (function() {
    const COLORS = [
    '#E187FF', '#4e95da'
    ];
    const DEFAULT_DATA = [{
    key: "Ayollar",
    value: 1108,
    percent: 92.03            },
    {
    key: "Erkaklar",
    value: 96,
    percent: 7.97            }
    ].filter(function(item) {
    return item.value > 0;
    });
    const CX = 100,
    CY = 100;
    const OUTER_R = 90,
    INNER_R = 45;
    const STROKE_W = OUTER_R - INNER_R;
    const MID_R = (OUTER_R + INNER_R) / 2;
    const CIRCUMFERENCE = 2 * Math.PI * MID_R;
    const GAP_DEG = 3;
    const svg = document.getElementById('donutSvg2');
    const legend = document.querySelector('.university-donut-legend2');
    function polar(cx, cy, r, a) {
    return {
    x: cx + Math.cos(a) * r,
    y: cy + Math.sin(a) * r
    };
    }
    function donutSlice(cx, cy, outerR, innerR, start, end) {
    const p1 = polar(cx, cy, outerR, start);
    const p2 = polar(cx, cy, outerR, end);
    const p3 = polar(cx, cy, innerR, end);
    const p4 = polar(cx, cy, innerR, start);
    const large = end - start > Math.PI ? 1 : 0;
    return `
    M ${p1.x} ${p1.y}
    A ${outerR} ${outerR} 0 ${large} 1 ${p2.x} ${p2.y}
    L ${p3.x} ${p3.y}
    A ${innerR} ${innerR} 0 ${large} 0 ${p4.x} ${p4.y}
    Z
    `;
    }
    function roundPath(path, radius = 4) {
    if (!window.SVGPathCommander) return path;
    return SVGPathCommander.round(path, radius);
    }
    function render(data) {
    svg.innerHTML = '';
    if (legend) legend.innerHTML = '';
    const totalPct = data.reduce((s, d) => s + (+d.percent || 0), 0);
    if (!totalPct) return;
    const GAP = 3 * Math.PI / 180;
    let angle = -Math.PI / 2;
    data.forEach((d, i) => {
    const pct = (+d.percent || 0) / totalPct;
    const span = pct * Math.PI * 2;
    const start = angle + GAP / 2;
    const end = angle + span - GAP / 2;
    angle += span;
    const color = COLORS[i % COLORS.length];
    const path = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
    );
    const dPath = donutSlice(
    CX,
    CY,
    OUTER_R,
    INNER_R,
    start,
    end
    );
    path.setAttribute('d', dPath);
    path.setAttribute('fill', color);
    path.style.cursor = 'pointer';
    path.style.transition = 'opacity .15s';
    path.addEventListener('mouseenter', () => path.setAttribute('opacity', '.75'));
    path.addEventListener('mouseleave', () => path.setAttribute('opacity', '1'));
    svg.appendChild(path);
    if (legend) {
    const item = document.createElement('div');
    item.className = 'university-donut-legend-item';
    item.style.borderLeft = `4px solid ${color}`;
    item.innerHTML = `
    <span class="university-donut-legend-marker" style="background:${color}"></span>
    <div class="university-donut-legend-text">
    <p>${d.key}</p>
    <p>${Math.round(pct * 100)}%</p>
    </div>
    `;
    legend.appendChild(item);
    }
    });
    }
    render(DEFAULT_DATA);
    })();
  },
  // 12
  function () {
    (function() {
    const COLORS = [
    '#4E95DA', '#3C878C'
    ];
    const DEFAULT_DATA = [{
    key: "Dual ta'lim",
    value: 0,
    percent: 0            },
    {
    key: "Boshqa ta\u2019lim shakllari",
    value: 1204,
    percent: 100            }
    ].filter(function(item) {
    return item.value > 0;
    });
    const CX = 100,
    CY = 100;
    const OUTER_R = 90,
    INNER_R = 45;
    const STROKE_W = OUTER_R - INNER_R;
    const MID_R = (OUTER_R + INNER_R) / 2;
    const CIRCUMFERENCE = 2 * Math.PI * MID_R;
    const GAP_DEG = 3;
    const svg = document.getElementById('donutSvg3');
    const legend = document.querySelector('.university-donut-legend3');
    function polar(cx, cy, r, a) {
    return {
    x: cx + Math.cos(a) * r,
    y: cy + Math.sin(a) * r
    };
    }
    function donutSlice(cx, cy, outerR, innerR, start, end) {
    const p1 = polar(cx, cy, outerR, start);
    const p2 = polar(cx, cy, outerR, end);
    const p3 = polar(cx, cy, innerR, end);
    const p4 = polar(cx, cy, innerR, start);
    const large = end - start > Math.PI ? 1 : 0;
    return `
    M ${p1.x} ${p1.y}
    A ${outerR} ${outerR} 0 ${large} 1 ${p2.x} ${p2.y}
    L ${p3.x} ${p3.y}
    A ${innerR} ${innerR} 0 ${large} 0 ${p4.x} ${p4.y}
    Z
    `;
    }
    function roundPath(path, radius = 4) {
    if (!window.SVGPathCommander) return path;
    return SVGPathCommander.round(path, radius);
    }
    function render(data) {
    svg.innerHTML = '';
    if (legend) legend.innerHTML = '';
    const totalPct = data.reduce((s, d) => s + (+d.percent || 0), 0);
    if (!totalPct) return;
    const GAP = 3 * Math.PI / 180;
    let angle = -Math.PI / 2;
    data.forEach((d, i) => {
    const pct = (+d.percent || 0) / totalPct;
    const span = pct * Math.PI * 2;
    const start = angle + GAP / 2;
    const end = angle + span - GAP / 2;
    angle += span;
    const color = COLORS[i % COLORS.length];
    const path = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
    );
    const dPath = donutSlice(
    CX,
    CY,
    OUTER_R,
    INNER_R,
    start,
    end
    );
    path.setAttribute('d', dPath);
    path.setAttribute('fill', color);
    path.style.cursor = 'pointer';
    path.style.transition = 'opacity .15s';
    path.addEventListener('mouseenter', () => path.setAttribute('opacity', '.75'));
    path.addEventListener('mouseleave', () => path.setAttribute('opacity', '1'));
    svg.appendChild(path);
    if (legend) {
    const item = document.createElement('div');
    item.className = 'university-donut-legend-item';
    item.style.borderLeft = `4px solid ${color}`;
    item.innerHTML = `
    <span class="university-donut-legend-marker" style="background:${color}"></span>
    <div class="university-donut-legend-text">
    <p>${d.key}</p>
    <p>${Math.round(pct * 100)}%</p>
    </div>
    `;
    legend.appendChild(item);
    }
    });
    }
    render(DEFAULT_DATA);
    })();
  },
]

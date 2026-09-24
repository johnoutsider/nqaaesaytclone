const WIDTH = 1400
const HEIGHT = 400
const TOP_PADDING = 50
const BOTTOM_PADDING = 80

// "Milliy reyting ko'rsatkichlari" maydon grafigi
export default function RatingChart({ data }) {
  const max = Math.max(...data.map((d) => d.value))
  const min = Math.min(...data.map((d) => d.value))
  const step = WIDTH / (data.length + 1)
  const points = data.map((d, i) => ({
    ...d,
    x: step * (i + 1),
    y: TOP_PADDING + ((max - d.value) / (max - min || 1)) * 120,
  }))

  const areaPath = [
    `M 0 ${points[0].y + 30}`,
    ...points.map((p) => `L ${p.x} ${p.y}`),
    `L ${WIDTH} ${points.at(-1).y + 30}`,
    `L ${WIDTH} ${HEIGHT}`,
    `L 0 ${HEIGHT}`,
    'Z',
  ].join(' ')

  return (
    <div className="university-rating-chart">
      <svg id="university-rating-chart" viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(172, 214, 255, 0.8)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)" />
          </linearGradient>
        </defs>
        <path className="area" d={areaPath}></path>
        {points.map((p) => (
          <g key={p.label}>
            <line className="line" x1={p.x} y1={p.y} x2={p.x} y2={HEIGHT - BOTTOM_PADDING}></line>
            <circle className="point" cx={p.x} cy={p.y} r="8"></circle>
            <text className="label" x={p.x} y={p.y - 20} textAnchor="middle">
              {p.value} ball
            </text>
            <text className="category" x={p.x} y={HEIGHT - 40} textAnchor="middle">
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

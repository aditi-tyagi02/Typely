import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const RECENT_LIMIT = 30;

function readThemeColor(name) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(`--c-${name}`).trim();
  return `rgb(${value.split(/\s+/).join(', ')})`;
}

function ChartCard({ title, description, children }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6">
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-muted">{description}</p>
      <div className="mt-5 h-56 sm:h-64">{children}</div>
    </div>
  );
}

export default function PerformanceCharts({ history }) {
  const recent = history.slice(-RECENT_LIMIT).map((record, index, list) => ({
    test: history.length - list.length + index + 1,
    wpm: record.wpm,
    accuracy: record.accuracy,
  }));

  const accent = readThemeColor('accent');
  const correct = readThemeColor('correct');
  const muted = readThemeColor('muted');
  const grid = readThemeColor('line');
  const tooltipStyle = {
    background: readThemeColor('raised'),
    border: `1px solid ${grid}`,
    borderRadius: 12,
    color: readThemeColor('text'),
    fontSize: 13,
  };

  const axisProps = { stroke: muted, tick: { fill: muted, fontSize: 12 }, tickLine: false, axisLine: false };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ChartCard title="WPM over time" description={`Last ${recent.length} tests`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={recent} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
            <CartesianGrid stroke={grid} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="test" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip contentStyle={tooltipStyle} labelFormatter={(label) => `Test #${label}`} />
            <Line
              type="monotone"
              dataKey="wpm"
              name="WPM"
              stroke={accent}
              strokeWidth={2.5}
              dot={{ r: 3, fill: accent, strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Accuracy over time" description="Share of keystrokes typed correctly">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={recent} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
            <defs>
              <linearGradient id="accuracyFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={correct} stopOpacity={0.35} />
                <stop offset="100%" stopColor={correct} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={grid} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="test" {...axisProps} />
            <YAxis domain={[0, 100]} {...axisProps} />
            <Tooltip
              contentStyle={tooltipStyle}
              labelFormatter={(label) => `Test #${label}`}
              formatter={(value) => [`${value}%`, 'Accuracy']}
            />
            <Area
              type="monotone"
              dataKey="accuracy"
              name="Accuracy"
              stroke={correct}
              strokeWidth={2.5}
              fill="url(#accuracyFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

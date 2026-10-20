/**
 * zig hero line art: hairline rays running in from the left edge toward the
 * card cluster, plus large concentric arcs around it. Decorative, server-rendered.
 */
export function HeroRays({ className }: { className?: string }) {
  const fx = 1180;
  const fy = 450;
  const rays = [
    [0, 40],
    [0, 860],
    [1440, 380],
    [1440, 560],
    [1370, 0],
    [1340, 900],
  ];
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      fill="none"
    >
      <g stroke="var(--color-gray-300)" strokeWidth="1" opacity="0.8">
        {rays.map(([x, y]) => (
          <line key={`${x}-${y}`} x1={x} y1={y} x2={fx} y2={fy} vectorEffect="non-scaling-stroke" />
        ))}
        <circle cx={fx + 330} cy={fy} r={380} vectorEffect="non-scaling-stroke" />
        <circle cx={fx + 120} cy={fy} r={640} vectorEffect="non-scaling-stroke" opacity="0.6" />
      </g>
    </svg>
  );
}

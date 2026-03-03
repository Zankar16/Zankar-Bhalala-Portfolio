export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Red glow top-left */}
      <div
        className="glow-orb"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(220,38,38,0.25) 0%, transparent 70%)',
          top: '-200px',
          left: '-150px',
          animationDelay: '0s',
          animationDuration: '10s',
        }}
      />
      {/* Blue glow bottom-right */}
      <div
        className="glow-orb"
        style={{
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(29,78,216,0.15) 0%, transparent 70%)',
          bottom: '-250px',
          right: '-200px',
          animationDelay: '3s',
          animationDuration: '12s',
        }}
      />
      {/* Subtle red glow center-right */}
      <div
        className="glow-orb"
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 70%)',
          top: '40%',
          right: '10%',
          animationDelay: '5s',
          animationDuration: '15s',
        }}
      />
      {/* Grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  )
}

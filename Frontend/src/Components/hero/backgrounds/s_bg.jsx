const SBg = () => (
  <div
    className="pointer-events-none select-none"
    style={{
      position: 'absolute',
      bottom: 0,
      right: 0,
      zIndex: 0,
      width: '60vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      overflow: 'hidden',
      pointerEvents: 'none',
    }}
    aria-hidden="true"
  >
    <span
      style={{
        fontSize: '28vw',
        fontWeight: 900,
        color: '#ea580c',
        opacity: 0.07,
        lineHeight: 1,
        fontFamily: 'Arial Black, sans-serif',
        textShadow: '0 0 80px #ea580c44',
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    >
      S
    </span>
  </div>
);

export default SBg;
import Logo from '../../../assets/Logo.png';

const HeroLogoBg = () => (
  <div
    className="pointer-events-none select-none"
    style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: '60vw',
      height: '100vh',
      zIndex: 0,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      pointerEvents: 'none',
    }}
    aria-hidden="true"
  >
    <img
      src={Logo}
      alt="Super60 Logo"
      style={{
        width: '100%',
        height: 'auto',
        maxWidth: '900px',
        opacity: 0.08,
        filter: 'blur(0.5px)',
        objectFit: 'contain',
        objectPosition: 'bottom right',
        userSelect: 'none',
        pointerEvents: 'none',
      }}
      draggable={false}
    />
  </div>
);

export default HeroLogoBg;
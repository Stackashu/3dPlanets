import React from 'react'
import PlanetScene from './components/PlanetScene.jsx'

const navStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '2rem',
  paddingRight: '2.5rem',
}

const navMobileStyles = {
  // flexDirection: 'column',
  alignItems: 'flex-start',
  margin: '1rem',
  paddingRight: '1rem',
  gap: '1rem',
}

const navLinksStyles = {
  display: 'flex',
  gap: '2.5rem',
}

const navLinksMobileStyles = {
  // flexDirection: 'column',
  gap: '1rem',
  marginTop: '1rem',
}

const headingFontSizes = {
  desktop: '8rem',
  tablet: '4rem',
  mobile: '2.2rem',
}

const getResponsiveValue = (desktop, tablet, mobile) => {
  if (window.innerWidth < 640) return mobile
  if (window.innerWidth < 1024) return tablet
  return desktop
}

const useResponsive = () => {
  const [width, setWidth] = React.useState(window.innerWidth)
  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return width
}

const App = () => {
  const width = useResponsive()
  const isMobile = width < 640
  const isTablet = width >= 640 && width < 1024

  // Responsive font size for headings
  const headingFontSize = isMobile
    ? headingFontSizes.mobile
    : isTablet
    ? headingFontSizes.tablet
    : headingFontSizes.desktop

  // Responsive nav styles
  const navStyle = isMobile
    ? { ...navStyles, ...navMobileStyles }
    : navStyles

  const navLinksStyle = isMobile
    ? { ...navLinksStyles, ...navLinksMobileStyles }
    : navLinksStyles

  // Responsive container for headings
  const headingContainerStyle = {
    height: isMobile ? '4.5em' : isTablet ? '7em' : '9em',
    overflow: 'hidden',
    textAlign: 'center',
  }

  // Responsive main writing container
  const writingContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    top: isMobile ? '7%' : isTablet ? '6%' : '5%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: isMobile ? '95%' : isTablet ? '80%' : 'auto',
    padding: isMobile ? '0 0.5rem' : isTablet ? '0 1rem' : 0,
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* writing part in this div  */}
      <div
        style={{
          width: '100%',
          height: '100vh',
          position: 'absolute',
          zIndex: 10,
          top: 0,
          left: 0,
        }}
      >
        <nav style={navStyle}>
          <h1
            style={{
              color: 'white',
              fontSize: isMobile ? '1.2rem' : isTablet ? '1.3rem' : '1.5rem',
              fontWeight: 'bold',
              paddingLeft: isMobile ? '0.5rem' : isTablet ? '1.5rem' : '2.5rem',
              cursor: 'pointer',
              marginBottom: isMobile ? '0.5rem' : 0,
            }}
          >
            Planets
          </h1>
          <div style={navLinksStyle}>
            <a
              href="#"
              style={{
                color: 'white',
                fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.25rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
            >
              Home
            </a>
            <a
              href="#"
              style={{
                color: 'white',
                fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.25rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
            >
              About
            </a>
            <a
              href="#"
              style={{
                color: 'white',
                fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.25rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
            >
              Contact
            </a>
          </div>
        </nav>

        <div style={writingContainerStyle}>
          <div style={headingContainerStyle}>
            <h1
              className="heading"
              style={{
                color: 'white',
                height: '100%',
                fontSize: headingFontSize,
                lineHeight: 1,
                margin: 0,
              }}
            >
              Earth
            </h1>
            <h1
              className="heading"
              style={{
                color: 'white',
                height: '100%',
                fontSize: headingFontSize,
                lineHeight: 1,
                margin: 0,
              }}
            >
              Csilla
            </h1>
            <h1
              className="heading"
              style={{
                color: 'white',
                height: '100%',
                fontSize: headingFontSize,
                lineHeight: 1,
                margin: 0,
              }}
            >
              Venus
            </h1>
            <h1
              className="heading"
              style={{
                color: 'white',
                height: '100%',
                fontSize: headingFontSize,
                lineHeight: 1,
                margin: 0,
              }}
            >
              Volcanic
            </h1>
          </div>

          <p
            style={{
              color: 'white',
              fontSize: isMobile ? '0.7rem' : isTablet ? '0.85rem' : '1rem',
              fontWeight: 'bold',
              margin: isMobile ? '0.5rem 0' : '1rem 0',
              textAlign: 'center',
              maxWidth: isMobile ? '95vw' : isTablet ? '80vw' : '40vw',
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>
          <div
            style={{
              width: '100%',
              height: '1px',
              marginTop: isMobile ? '0.5rem' : '1rem',
              marginBottom: isMobile ? '0.5rem' : '1rem',
              background: 'linear-gradient(to right, transparent, white, transparent)',
            }}
          ></div>
        </div>
      </div>
      <PlanetScene />
    </div>
  )
}

export default App

import React from 'react'
import PlanetScene from './components/planetScene'

const App = () => {
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
        <nav
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '2rem',
            paddingRight: '2.5rem',
          }}
        >
          <h1
            style={{
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              paddingLeft: '2.5rem',
              cursor: 'pointer',
            }}
          >
            Planets
          </h1>

          <div
            style={{
              display: 'flex',
              gap: '2.5rem',
            }}
          >
            <a
              href="#"
              style={{
                color: 'white',
                fontSize: '1.25rem',
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
                fontSize: '1.25rem',
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
                fontSize: '1.25rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
            >
              Contact
            </a>
          </div>
        </nav>

        <div
          style={{
            display: 'flex',
            // border:'1px solid white',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute',
            top: '5%',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <div
            style={{
              height: '9em',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            <h1
              className="heading"
              style={{
                color: 'white',
                height: '100%',
                // marginBottom:'2%',
                // letterSpacing: '-0.05em',
                fontSize: '8rem',
                // "heading" class is not defined, so we keep it for now
              }}
            >
              Earth
            </h1>
            <h1
              className="heading"
              style={{
                color: 'white',
                height: '100%',
                // letterSpacing: '-0.05em',
                fontSize: '8rem',
              }}
            >
              Csilla
            </h1>
            <h1
              className="heading"
              style={{
                color: 'white',
                height: '100%',
                // letterSpacing: '-0.05em',
                fontSize: '8rem',
              }}
            >
              Venus
            </h1>
            <h1
              className="heading"
              style={{
                color: 'white',
                height: '100%',
                // letterSpacing: '-0.05em',
                fontSize: '8rem',
              }}
            >
              Volcanic
            </h1>
          </div>

          <p
            style={{
              color: 'white',
              fontSize: '10px',
              fontWeight: 'bold',
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>
          <div
            style={{
              width: '100%',
              height: '1px',
              marginTop: '1rem',
              marginBottom: '1rem',
              background: 'linear-gradient(to right, transparent, white, transparent)',
            }}
          ></div>
        </div>
      </div>
      <PlanetScene/>
    </div>
  )
}

export default App

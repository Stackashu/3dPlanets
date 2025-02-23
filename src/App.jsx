import React from 'react'
import PlanetScene from './components/planetScene'

const App = () => {
  return (
    <div className='w-full h-screen overflow-hidden'>
    {/* writing part in this div  */}
      <div className='w-full h-screen absolute z-[2] top-0 left-0 '>
         <nav className='flex justify-between items-center m-8 pr-10'>
                   <h1 className='text-white text-2xl font-bold pl-10 '>Planets</h1>

             <div className='flex gap-10'>
                   <h1 className='text-white text-1xl font-bold '>Home</h1>
                   <h1 className='text-white text-1xl font-bold '>About</h1>
                   <h1 className='text-white text-1xl font-bold '>Contact</h1>
             </div>

         </nav>

         <div className=' flex flex-col  items-center absolute top-10% left-1/2 -translate-x-1/2 h-1/4'>
          <h1 className='text-white text-6xl font-bold '>Earth</h1>
          <p className='text-white text-[10px] font-bold '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
         <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent my-4"></div>
         </div>
      </div>
      <PlanetScene/>
    </div>
  )
}

export default App

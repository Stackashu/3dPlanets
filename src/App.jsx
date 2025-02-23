import React from 'react'
import PlanetScene from './components/planetScene'

const App = () => {
  return (
    <div className='w-full h-screen overflow-hidden'>
    {/* writing part in this div  */}
      <div className='w-full h-screen absolute z-[2] top-0 left-0 '>
         <nav className='flex justify-between items-center m-8 pr-10'>
                   <h1 className='text-white text-2xl font-bold pl-10 cursor-pointer '>Planets</h1>

             <div className='flex gap-10'>
                   <h1 className='text-white text-1xl font-bold cursor-pointer '>Home</h1>
                   <h1 className='text-white text-1xl font-bold cursor-pointer '>About</h1>
                   <h1 className='text-white text-1xl font-bold cursor-pointer '>Contact</h1>
             </div>

         </nav>

         <div className=' flex flex-col  items-center absolute top-5% left-1/2 -translate-x-1/2 '>
                     <div className=' h-[9em] overflow-hidden text-center'>
                          <h1 className='text-white h-full  tracking-tight text-9xl  heading'>Earth</h1>
                          <h1 className='text-white h-full  tracking-tight text-9xl  heading'>Csilla</h1>
                          <h1 className='text-white h-full  tracking-tight text-9xl  heading'>Venus</h1>
                          <h1 className='text-white h-full  tracking-tight text-9xl  heading'>Volcanic</h1>
                     </div>
        
          <p className='text-white text-[10px] font-bold '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
         <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent my-4"></div>
         </div>
      </div>
      <PlanetScene/>
    </div>
  )
}

export default App

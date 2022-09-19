import React from 'react'
import LeftSide from './LeftSide'
import WaiterAdmin from './WaiterAdmin'

const TicketsPOS = () => {
  return (
    <div className='bg-gray-50 scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-100'>
          <div className='flex flex-col md:flex-row min-h-screen antialiased text-gray-800 bg-gray-50'>
            <LeftSide />
            <div className='flex-grow flex'>
                <WaiterAdmin />
            </div>
          </div>
      </div>
  )
}

export default TicketsPOS
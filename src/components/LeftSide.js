import React, { Component } from 'react'
import {LogoutIcon,HomeIcon, ClipboardListIcon, InformationCircleIcon} from '@heroicons/react/outline'

export default class LeftSide extends Component {
  render() {
    return (
      <div className='flex flex-row w-auto flex-shrink-0 pl-4 pr-2 py-4 '>
      <div className='flex flex-row md:flex-col items-center px-4 md:py-4 md:flex-shrink-0 h-20 md:h-auto w-full md:w-20 bg-yellow-500 rounded-3xl'>
          <a className='flex items-center justify-center h-12 w-12 bg-cyan-50 text-yellow-700 rounded-2xl' href='http://localhost:3000/'>
              <LogoutIcon className='h-5 w-5 text-black cursor-pointer'/>
          </a>
          <ul className='flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2 ml-12 md:ml-0 md:mt-12'>
              <li>
                  <a className='flex items-center' href="http://localhost:3000/pos/">
                      <span className='flex items-center justify-center h-12 w-12 rounded-2xl bg-yellow-300 shadow-lg text-white hover:bg-yellow-400 active:bg-yellow-300' >
                          <HomeIcon className='h-10 w-6 text-white cursor-pointer'/>
                      </span>
                  </a>
              </li>
              <li>
                  <a className='flex items-center' href="http://localhost:3000/pos/tickets">
                      <span className='flex items-center justify-center text-yellow-100 hover:bg-yellow-400 h-12 w-12 rounded-2xl'>
                          <ClipboardListIcon className='h-10 w-6 text-white cursor-pointer'/>
                      </span>
                  </a>
              </li>
          </ul>
          <a className='ml-auto md:ml-0 md:mt-auto flex items-center justify-center text-yellow-200 hover:text-yellow-100 h-10 w-10 focus:outline-none'>
              <InformationCircleIcon className='h-10 w-8 text-white cursor-pointer'/>
          </a>
      </div>
  </div>
)
}
    
  
}

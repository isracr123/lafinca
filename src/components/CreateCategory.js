import React from 'react'
import axios from 'axios'
import { XIcon, PhotographIcon } from '@heroicons/react/outline'
import { useState } from 'react'

const CreateCategory = () => {

  const [createCategory, setCreateCategory] = useState(null);

  /*Add Categories*/
  const Functions = () => {
    if (createCategory === null){
        alert('Llena todos los campos');
    }else{
        axios.post('http://localhost:4000/api/categories', {
            category: createCategory,
        });
        window.location.href = 'http://localhost:3000/pos/';
    }
    
  }

  return (
    <div className="bg-black absolute inset-0 flex flex-col space-y-14 items-center justify-center">
        <a href="http://localhost:3000/pos/">
        <div className='flex flex-row justify-center items-center'>
            <p className='text-white'>Cerrar</p>   
            <XIcon className='h-6 w-10 text-white'/>
        </div>
        </a>
        <div className="flex w-full h-8 items-center justify-center space-y-3">
            <label className="w-auto flex flex-col items-center px-4 py-0 bg-white text-yellow-50 rounded-lg shadow-lg tracking-wide uppercase border border-yellow-50 hover:bg-yellow-50 hover:text-black cursor-pointer space-y-1">
                <span className="mt-2 text-base leading-normal text-black ">Imagen</span>
                <PhotographIcon className='h-auto w-auto justify-center -mt-3 text-black'/>
                <input type='file' className="hidden"/>
            </label>
        </div>
        <form className="w-full max-w-sm  ">
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                    Agrega una categoría
                    </label>    
                </div>
                <div className="md:w-2/3">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" type="text" 
                    onChange={(event) => {setCreateCategory(event.target.value)}}/>
                </div>
            </div>
            <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                <button className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button"
                onClick={Functions}>
                        Agregar 
                </button>
                </div>
            </div>
        </form> 
    </div>
  )
}

export default CreateCategory
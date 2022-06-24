import React from 'react'
import { XIcon } from '@heroicons/react/outline'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { useState, useEffect } from 'react';

const EditCategory = () => {

    const [newCategory, setNewCategory] = useState(null);
    const [category, setCategory] = useState(null);
    const [actualCategory, setActualCategory] = useState(null);

    useEffect(() => {
        getCategoriesData();
        getCategoryData();
    }, []);

    const { id } = useParams();
    const newid = {id}

    /*Get categories*/
    const getCategoriesData = async () => {
        const c = await axios.get('http://localhost:4000/api/categories');
        setCategory(c.data);
    }

    /*Get categoryData*/
    const getCategoryData = async () => {
        const c = await axios.get('http://localhost:4000/api/categories/' + newid.id);
        setActualCategory(c.data.category);
    }

    /*Update Category*/
    const updateCategory = async () => {
        /*Take all categories*/
        const array = category.map (c=> c.category)
        /*Compares First Value otherwise The Typed Values*/
        const uno = newCategory || actualCategory;
        /*Compare if the value is repeated in categories*/
        const filteredArray = array.filter(array => array===uno)
        /*Repeated Value = Nothing || No Repeated Value = Update */
        if (filteredArray.length===0){
            await axios.put('http://localhost:4000/api/categories/'+ newid.id,{
            category: newCategory,
            });
        }else{
            alert("Categoria repetida, elige otro nombre");
        }
    }

  return (
    <div className="bg-black absolute inset-0 flex flex-col space-y-6 items-center justify-center">
        <a href="http://localhost:3000/pos/">
        <div className='flex flex-row justify-center items-center'>
            <p className='text-white'>Cerrar</p>   
            <XIcon className='h-6 w-10 text-white'/>
        </div>
        </a>
        <form className="w-full max-w-sm ">
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                    Actualiza la categoría
                    </label>    
                </div>
                <div className="md:w-2/3">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" type="text"
                    onChange={(event) => {setNewCategory(event.target.value)}} defaultValue={actualCategory}/>
                </div>
            </div>
            <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                <a href="http://localhost:3000/pos/">
                <button className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button"
                onClick={() => updateCategory()} >
                        Actualizar 
                </button>
                </a>
                </div>
            </div>
        </form> 
    </div>
  )
}

export default EditCategory
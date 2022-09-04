import React from 'react'
import { XIcon } from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'

const EditProducts = () => {
    /*Old Product*/
    const [oldCategoryPro, setOldCategoryPro] = useState(null);
    const [oldPricePro, setOldPricePro]= useState(null);
    const [oldProductPro, setOldProductPro] = useState(null);
    const [oldQtyPro, setOldQtyPro] =  useState(null);
    const [oldUnitsPro, setOldUnitsPro] = useState(null);

    /*New Product*/
    const [category, setCategory] = useState(null);
    const [categoryPro, setCategoryPro] = useState(null);
    const [pricePro, setPricePro]= useState(null);
    const [productPro, setProductPro] = useState(null);
    const [qtyPro, setQtyPro] =  useState(null);
    const [unitsPro, setUnitsPro] = useState(null);

    const { id } = useParams();
    const newid = { id }

    useEffect(() => {
        getCategoriesData();
        getProductData(newid.id);
    }, []);
    
    /*Get Products*/
    const getProductData = async (id) => {
        const p = await axios.get('http://192.168.0.3:4000/api/products/' + id);
        setOldCategoryPro(p.data.category);
        setOldPricePro(p.data.price);
        setOldProductPro(p.data.product);
        setOldQtyPro(p.data.quantity);
        setOldUnitsPro(p.data.units);
    }

    /*Get categories*/
    const getCategoriesData = async () => {
        const c = await axios.get('http://192.168.0.3:4000/api/categories');
        setCategory(c.data);
    }

    /*Update Products*/
    const updateProducts = async () => {
        await axios.put('http://192.168.0.3:4000/api/products/' + newid.id, {
                category: categoryPro || oldCategoryPro,
                price: pricePro || oldPricePro,
                product: productPro || oldProductPro, 
                quantity: qtyPro || oldQtyPro,
                units: unitsPro || oldUnitsPro,
        });
    }


  return (
    <div className="bg-black absolute inset-0 flex flex-col space-y-6 items-center justify-center">
    <a href="http://192.168.0.3:3000/pos/">
    <div className='flex flex-row justify-center items-center'>
        <p className='text-white'>Cerrar</p>   
        <XIcon className='h-6 w-10 text-white'/> 
    </div>
    </a>
    <form className="w-full max-w-sm ">
        <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                Producto
                </label>
            </div>
            <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" type="text"
                onChange={(event) => {setProductPro(event.target.value)}} defaultValue={oldProductPro}/>
            </div>
        </div>
        <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                Precio $
                </label>
            </div>
            <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" type="text" 
                onChange={(event) => {setPricePro(event.target.value)}} defaultValue={oldPricePro}/>
            </div>
        </div>
        <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                Categorías
                </label>
            </div>
            <div className="w-full md:w-8/12">
                <div className="flex justify-center">
                    <div className="mb-3 w-full">
                        <select className="form-select appearance-none
                            block
                            w-full
                            px-3
                            py-1
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding bg-no-repeat
                            border border-solid border-gray-300
                            rounded
                           transition
                            ease-in-out
                            m-0
                            md:mx-1
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            onChange={(event) => {setCategoryPro(event.target.value)}}>
                            <option>{oldCategoryPro} </option>
                            {category && category.map( c => 
                                <option key={c._id}> {c.category} </option>
                            )}
                        </select>
                    </div>
                </div>
            </div>    
        </div>
        <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                Cantidad
                </label>
            </div>
            <div className="w-full md:w-3/6">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" type="text"
                onChange={(event) => {setQtyPro(event.target.value)}} defaultValue={oldQtyPro}/>
            </div>
            <div className="flex justify-center">
                <div className="mb-3 w-full">
                    <select className="form-select appearance-none
                        block
                        w-full
                        px-3
                        py-1
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding bg-no-repeat
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        md:mx-1
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        onChange={(event) => {setUnitsPro(event.target.value)}}>
                        <option>{oldUnitsPro}</option>
                        <option>Pz</option>
                        <option>Kg</option>
                        <option>Lt</option>
                    </select>
                </div>
            </div>    
        </div>
        <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
            <a href="http://192.168.0.3:3000/pos/">
                <button className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button"
                onClick={()=> updateProducts()}>
                Actualizar
                </button>
            </a>
            </div>
        </div>
    </form> 
</div>
  )
}

export default EditProducts
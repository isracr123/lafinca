import React from 'react'
import { XIcon, PhotographIcon } from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import axios from 'axios'

 const CreateProduct = () => {

    const [category, setCategory] = useState('');
    const [categoryPro, setCategoryPro] = useState('');
    const [pricePro, setPricePro]= useState(0);
    const [productPro, setProductPro] = useState('');
    const [qtyPro, setQtyPro] =  useState(0);
    const [unitsPro, setUnitsPro] = useState('');
    const [selectedFile, setSelectedFile] = useState('');

    useEffect(() => {
        getCategoriesData();
    }, []); 

    /*Get categories*/
    const getCategoriesData = async () => {
        const c = await axios.get('http://192.168.1.175:4000/api/categories');
        setCategory(c.data);
    }

    /*Add Products*/
    const addProduct = () => {
        /*Form Data if there is an image*/
        var bodyFormData = new FormData();
        bodyFormData.append('category', categoryPro); 
        bodyFormData.append("price", pricePro);
        bodyFormData.append("product", productPro);
        bodyFormData.append("quantity", qtyPro);
        bodyFormData.append("units", unitsPro);
        bodyFormData.append("productsImage", selectedFile);

        /*Type of the image*/
        if (selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/jpg' || selectedFile.type === 'image/png'){
            /*Size of the image*/
            if (selectedFile.size <= 5200000){
                axios({
                    method: "post",
                    url: "http://192.168.1.175:4000/api/products",
                    data: bodyFormData,
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then(function (response) {
                //handle success
                console.log(response);
                })
                .catch(function (response) {
                //handle error
                console.log(response);
                });
                alert('Guardado');                 
            }else{
                alert('Solo se aceptan 1024 x 1024 o menor');
            }
        }else if (selectedFile === ''){
            alert('Elige una imagen')
        }else{
            alert('Solo se aceptan formatos JPEG, JPG, PNG');
        }

        /* axios.post('http://192.168.1.175:4000/api/products', {
                category: categoryPro,
                price: pricePro,
                product: productPro, 
                quantity: qtyPro,
                units: unitsPro,
        });
        window.location.href = 'http://192.168.1.175:3000/pos/'; */
    }



   return (
     <div className="bg-black absolute inset-0 flex flex-col space-y-16 items-center justify-center">
        <a href="http://192.168.1.175:3000/pos/">
        <div className='flex flex-row justify-center items-center'>
            <p className='text-white'>Cerrar</p>   
            <XIcon className='h-6 w-10 text-white'/> 
        </div>
        </a>
        <div className="flex w-full h-8 items-center justify-center space-y-3">
            <label className="w-auto flex flex-col items-center px-4 py-0 bg-white text-yellow-50 rounded-lg shadow-lg tracking-wide uppercase border border-yellow-50 hover:bg-yellow-50 hover:text-black cursor-pointer space-y-1">
                <span className="mt-2 text-base leading-normal text-black ">Imagen</span>
                {selectedFile ?
                    <img src={URL.createObjectURL(selectedFile)} alt="" className='object-contain h-24 w-48' />
                :   <PhotographIcon className='h-auto w-auto justify-center -mt-3 text-black'/>
                }
                <input 
                    type='file' 
                    className="hidden"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    name="file"
                />
            </label>
        </div>
        <form className="w-full max-w-sm ">
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                    Producto
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" type="text" placeholder="Naranja"
                    onChange={(event) => {setProductPro(event.target.value)}}/>
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                    Precio $
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" type="text" placeholder="100"
                    onChange={(event) => {setPricePro(event.target.value)}}/>
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
                                <option>Elige una opción </option>
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
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" type="text" placeholder="100"
                    onChange={(event) => {setQtyPro(event.target.value)}}/>
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
                            <option>Elige</option>
                            <option>Pz</option>
                            <option>Gr</option>
                            <option>Kg</option>
                            <option>Lt</option>
                        </select>
                    </div>
                </div>    
            </div>
            <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                    <button className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button"
                    onClick={addProduct}>
                    Agregar
                    </button>
                </div>
            </div>
        </form> 
    </div>
   )
 }
 
 export default CreateProduct
import React from 'react'
import axios from 'axios'
import { XIcon, PhotographIcon } from '@heroicons/react/outline'
import { useState, useEffect } from 'react'

const CreateCategory = () => {

  const [createCategory, setCreateCategory] = useState('');
  const [getCategories, setGetCategories] = useState('');
  const [selectedFile, setSelectedFile] = useState('');


  useEffect(() => {
    getCategoriesData();
  }, []); 

  /*Get Categories*/
  const getCategoriesData = async () => {
    const a = await axios.get('http://192.168.0.3:4000/api/categories');
    setGetCategories(a.data);
  } 

  /*Add Categories*/
  const Functions = () => {
    /*Form Data if there is an image*/
    var bodyFormData = new FormData();
    bodyFormData.append('category', createCategory); 
    bodyFormData.append("categoryImage", selectedFile);
    /*Type of the image*/
    if (selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/jpg' || selectedFile.type === 'image/png'){
        /*Size of the image*/
        if (selectedFile.size <= 5200000){
            /*No categories*/
            if (createCategory === ''){
                alert('Llena todos los campos');
            /*With categories*/
            }else if (getCategories !== ''){
                /*Map categories*/
                const array = getCategories && getCategories.map((a) => (a.category)); 
                /*Compare if the value is repeated in categories */
                const filteredArray = array.filter(array => array===createCategory);
                /*If repeated categories*/
                if (filteredArray.length > 0){
                    alert('Categoria Repetida | Elige otro nombre');

                /*No repeated categories*/
                } else{

                    axios({
                        method: "post",
                        url: "http://192.168.0.3:4000/api/categories",
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
                }
            /*No categories*/
            }else if (getCategories === ''){

                axios({
                    method: "post",
                    url: "http://192.168.0.3:4000/api/categories",
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
            }
        }else{
            alert('Solo se aceptan 1024 x 1024 o menor');
        }
    }else if (selectedFile === ''){
       alert('Elige una imagen')
    }else{
        alert('Solo se aceptan formatos JPEG, JPG, PNG');
    }
  }

  return (
    <div className="bg-black absolute inset-0 flex flex-col space-y-14 items-center justify-center">
        <a href="http://192.168.0.3:3000/pos/">
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
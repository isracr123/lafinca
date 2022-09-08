import React from 'react'
import { TrashIcon } from '@heroicons/react/solid'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios'



const WaiterThreeEdit = () => {

    const { id } = useParams();
    const newid = { id }

    useEffect(() => {
        getOneWaiter(newid.id);
    }, []);

  /*Old Product*/
  const [oldProduct, setOldProduct] = useState('');
  const [oldQty, setOldQty] =  useState();

  /*New Product*/
  const [product, setProduct] = useState('');
  const [qty, setQty] =  useState(0);

  /*Get One Waiter*/
  const getOneWaiter = async (id) => {
    const w = await axios.get('http://192.168.1.175:4000/api/waiterThree/' + id);
    setOldProduct(w.data.products);
    setOldQty(w.data.qty);
  }

  /*Update Waiter*/
  const updateOneWaiter = async () => {
    await axios.put('http://192.168.1.175:4000/api/waiterThree/' + id, {
        qty: qty || oldQty,
        products: product || oldProduct,
    });
    window.location.href='http://192.168.1.175:3000/waiterThree';
 }
 
  /*Delete Products*/
  const deleteWaiter = async () => {
    await axios.delete('http://192.168.1.175:4000/api/waiterThree/' + id);
    window.location.href='http://192.168.1.175:3000/waiterThree';
  }

  const CloseFunction = () => {
    window.location.href="http://192.168.1.175:3000/waiterThree";
  }


  return (
    <div className='fixed w-full h-screen left-0 top-0 z-10 flex flex-wrap justify-center content-center p-1 overflow-y-scroll'>
    <div className='w-96 rounded-3xl bg-black shadow-xl overflow-hidden z-10 '>
        <div className='text-left w-full text-sm p-6'>
        <div>  
            <div>
                <div className='text-center text-white'> 
                    <h2 className='text-xl font-semibold my-3'>PUNTO DE VENTA</h2>
                    <p>LA FINCA</p>
                </div>
            </div>
            <div className='w-full border-t border-gray-300 my-2'></div>
            <div>
                <table className='w-full text-xs text-white'>
                    <thead>
                        <tr>
                            <th className='py-1 w-1/12 text-center'>#</th>
                            <th className='py-1 text-left'>Producto</th>
                        </tr>
                    </thead>
                    <tbody className='flex-row'>
                        <tr>
  
                            <td>
                                <table className='mx-5'>
                                    <tbody>
                                        <tr>
                                            <td className='py-1 text-center flex-col text-white'>
                                                <button className="absolute  top-[320px] left-3 md:left-[220px] md:top-[580px] lg:left-[510px] lg:top-[328px] bg-yellow-500 text-white active:bg-yellow-600 font-bold uppercase text-xs px-2 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                onClick={deleteWaiter}>
                                                    <TrashIcon className="h-3 w-3 text-white"/>
                                                </button>
                                                <input className='w-7 border-2 border-white text-black' defaultValue={oldQty}
                                                onChange={(event) => {setQty(event.target.value)}}/>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className='py-1 text-left overflow-visible'>
                                                <input className='w-60 border-2 border-white text-black' defaultValue={oldProduct}
                                                onChange={(event) => {setProduct(event.target.value)}}/>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody> 
                </table>
            </div>
            <div className='w-full border-t border-gray-300 my-2'></div>
            <div className='text-center'>
                <button className=" focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                    onClick={CloseFunction}>
                        Salir
                </button>
                <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                onClick={updateOneWaiter}>
                    Actualizar
                </button>
            </div>
        </div>
        </div>
    </div>
</div>
  )
}

export default WaiterThreeEdit
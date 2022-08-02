import React from 'react'
import Moment from 'react-moment'
import {useState, useEffect} from 'react'
import { PlusIcon } from '@heroicons/react/solid'
import axios from 'axios'

const EditTicket = () => {

  useEffect(() => {
    getProductsData();
  }, []);

  const date = new Date();
  
  /* Variables*/
  const [name, setName] = useState();
  const [table, setTable] = useState();
  const [qty, setQty] = useState();
  const [products, setProducts] = useState();
  const [price, setPrice] = useState();
  const [subtotal, setSubtotal] = useState();
  const [total, setTotal] = useState();
  const [pay, setPay] = useState();
  const [change, setChange] = useState();

  /*Filter */
  const [searchBarFilter, setSearchBarFilter] = useState('');
  const [focus, setFocus] = useState(false);
  const [product, setProduct] = useState('');

  /*Get Products*/
  const getProductsData = async () => {
    const p = await axios.get('http://localhost:4000/api/products');
    setProducts(p.data);
  } 

  return (
    <div className='fixed w-full h-screen left-0 top-0 z-10 flex flex-wrap justify-center content-center p-1 overflow-y-scroll'>
    <div className='w-96 rounded-3xl bg-white shadow-xl overflow-hidden z-10 '>
        <div className='text-left w-full text-sm p-6'>
        <div>  
            <div>
            <div className='text-center'> 
                <h2 className='text-xl font-semibold my-3'>PUNTO DE VENTA</h2>
                <p>LA FINCA</p>
            </div>
            <div className='flex mt-4 text-xs'>
                <div className='flex-grow'>
                    No: 121232
                </div>
                <div>
                    <Moment format='MMMM Do YYYY, h:mm:ss a'>{date}</Moment>
                </div>
            </div>
            <div className='flex-grow text-xs'>
                   Mesero: <input className="border-2 border-black" onChange={event => setName(event.target.value)} defaultValue="nombre"/>
                    Mesa #<input className="w-10 border-2 border-black" onChange={event => setTable(event.target.value)} defaultValue="1"/>
            </div>
            </div>
            <div className='w-full border-t border-gray-300 my-2'></div>
            <div>
                <table className='w-full text-xs'>
                    <thead>
                        <tr>
                            <th className='py-1 w-1/12 text-center'>#</th>
                            <th className='py-1 text-left'>Producto</th>
                            <th className='py-1 w-2/12 text-center'>Precio</th>
                            <th className='py-1 w-2/12 text-right'>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody className='flex-row'>
                        <tr>
                            <td>
                                <table className='mx-5'>
                                    <tbody>
                                        <tr>
                                            <td className='py-1 text-center flex-col'>
                                                <input className='w-5 border-2 border-black' onChange={event => setQty(event.target.value)} defaultValue={1}/>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className='py-1 text-left'>
                                                <input className='w-13 border-2 border-black' defaultValue={product} onChange={(e)=>setSearchBarFilter(e.target.value)} 
                                                onFocus={(e) => {
                                                  setFocus(true);
                                                }}/>
                                                {focus ?
                                                  <div className="z-10 w-30 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                                                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                                                    {products && products.filter((p)=>{
                                                      if(p.product.toLowerCase().includes(searchBarFilter.toLowerCase())){
                                                        return p;
                                                      }
                                                    }).map(p =>
                                                    <li key={p._id}>
                                                        <button className="w-32 block py-1 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                                                        onClick={() => {
                                                          const function1 = setProduct(p.product);
                                                          /* const function2 = setFocus(false); */
                                                        }}>
                                                          {p.product}
                                                        </button>
                                                    </li>)}
                                                    </ul>
                                                  </div>
                                                : null}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td>
                                <table className='mx-5'>
                                    <tbody>
                                        <tr>
                                            <td className='py-1 text-center'>
                                                <div className='grid grid-cols-2 space-x-2'>
                                                    <p>$</p> 
                                                    <input className='w-7 border-2 border-black' onChange={event => setPrice(event.target.value)}/>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td>
                                <table className='mx-6 '>
                                    <tbody>
                                        <tr>
                                            <td className='py-1 text-center'>
                                                <div className='grid grid-cols-2 space-x-2'>
                                                    <p>$</p> 
                                                    <input className='w-7 border-2 border-black' onChange={event => setSubtotal(event.target.value)}/>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody> 
                </table>
            </div>
            <div className='relative left-1/2 top-1'>
              <button type="button" className=" text-green-700 border border-green-700 hover:bg-green-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:focus:ring-green-800">
                  <PlusIcon className="h-5 w-5 text-green-500"/>
              </button>
            </div>
            <div className='w-full border-t border-gray-300 my-2'></div>
            <div>
            <div className='flex font-semibold'>
                <div className='flex-grow'>TOTAL</div>
                <div className='grid grid-cols-2'>
                    <p className='px-5'>$</p>
                    <input className='w-12 border-2 border-black' onChange={event => setTotal(event.target.value)} defaultValue="2"/>
                </div>
            </div>
            <div className='flex text-xs font-semibold'>
                <div className='flex-grow'>Pago</div>
                <div className='grid grid-cols-2'>
                    <p className='px-5'>$</p>
                    <input className='w-12 border-2 border-black' onChange={event => setPay(event.target.value)} defaultValue="2"/>
                </div>
            </div>
            <div className='w-full border-t border-gray-300 my-2'></div>
            <div className='flex text-xs font-semibold'>
                <div className='flex-grow'>Cambio</div>
                <div className='grid grid-cols-2'>
                    <p className='px-5'>$</p>
                    <input className='w-12 border-2 border-black' onChange={event => setChange(event.target.value)} defaultValue="2"/>
                </div>
            </div>
            </div>
        </div>
        </div>
        <div className='p-4 w-full'>
            {/* <button className='w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700' onClick={()=>{
            const function1 = window.location.href='http://localhost:3000/pos/tickets';
            }}>
            X Cerrar
            </button>
            <button className='w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
            onClick={()=>{
                const function1 = updateTickets();
            }}>
                Actualizar
            </button>
            <button className='bg-yellow-500 text-white text-lg px-4 py-3 rounded-2xl w-full focus:outline-none'
            onClick={handlePrint}>
                IMPRIMIR
            </button> */}
        </div>
    </div>
</div>
  )
}

export default EditTicket
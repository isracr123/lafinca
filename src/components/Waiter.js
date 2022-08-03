import React from 'react'
import Moment from 'react-moment'
import {useState, useEffect} from 'react'
import { PlusIcon, MinusIcon } from '@heroicons/react/solid'
import axios from 'axios'
import Autocomplete from 'react-autocomplete';
console.warn = () => {}

const EditTicket = () => {

  useEffect(() => {
    getProductsData();
  }, []);

  const date = new Date();
  
  /* Variables*/
  const [name, setName] = useState();
  const [table, setTable] = useState();
  const [qty, setQty] = useState(1);
  const [products, setProducts] = useState();
  const [price, setPrice] = useState();
  const [subtotal, setSubtotal] = useState();
  const [total, setTotal] = useState();
  const [pay, setPay] = useState();
  const [change, setChange] = useState();

  /*Filter */
  const [value, setValue] = useState('');

  /*Inicio*/
  const [start, setStart] = useState(false);
 
  /*Get Products*/
  const getProductsData = async () => {
    const p = await axios.get('http://localhost:4000/api/products');
    setProducts(p.data);
  } 

  /*Filter price */
  const filterPrice = (product) => {
    const array = products.filter((item) => item.product.toLowerCase().includes(product.toLowerCase()));
    setPrice(array[0].price);
    setSubtotal(array[0].price*qty)
  }

  /*Sum products*/
  const sumProducts = () => {
    setQty(qty+1);
    setSubtotal(price*(qty+1));
  }

  /*Rest Products*/
  const restProducts = () => {
    if (qty > 0) {
        setQty(qty-1);
        setSubtotal(price*(qty-1));
    }else{

    }
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
                                                <button className="absolute left-3 md:left-96 bg-rose-500 text-white active:bg-rose-600 font-bold uppercase text-xs px-2 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                onClick={() => {sumProducts()}}>
                                                    <PlusIcon className="h-2 w-2 text-white"/>
                                                </button>
                                                <button className="absolute top-[320px] left-3 md:left-96 md:top-[368px] bg-rose-500 text-white active:bg-rose-600 font-bold uppercase text-xs px-2 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                onClick={() => {restProducts()}}>
                                                    <MinusIcon className="h-2 w-2 text-white"/>
                                                </button>
                                                <p className='w-5 border-2 border-black'>
                                                    {qty}
                                                </p>
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
                                                {start ? 
                                                    <Autocomplete
                                                        getItemValue={(item) => item.product}
                                                        items={products.filter((item) => item.product.toLowerCase().includes(value.toLowerCase()))}
                                                        renderItem={(item, isHighlighted) =>
                                                            <div key={item.product} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                                            {item.product}
                                                            </div>
                                                        }
                                                        wrapperStyle={{
                                                            border: "solid 2px #000000"
                                                        }}
                                                        value={value || ''}
                                                        onChange={(e) => setValue(e.target.value)}
                                                        onSelect={(value) => {
                                                            const function1 = setValue(value);
                                                            const function2 = filterPrice(value);
                                                        }}
                                                    />: null}
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
                                                    <p className='w-7 border-2 border-black'>
                                                        {price}
                                                    </p>
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
                                                    <p className='w-7 border-2 border-black'>
                                                        {subtotal}
                                                    </p>
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
            <div className='relative left-72 top-1'>
              <button type="button" className=" text-green-700 border border-green-700 hover:bg-green-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:focus:ring-green-800"
              onClick={() => setStart(true)}>
                  <PlusIcon className="h-5 w-5 text-green-500"/>
              </button>
            </div>
            <div className='w-full border-t border-gray-300 my-2'></div>
            <div className='text-center'>
                <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">
                    ENVIAR
                </button>
            </div>
        </div>
        </div>
    </div>
</div>
  )
}

export default EditTicket
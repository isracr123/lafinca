import React from 'react'
import Moment from 'react-moment'
import {useState, useEffect} from 'react'
import { PlusIcon, MinusIcon } from '@heroicons/react/solid'
import axios from 'axios'
import Autocomplete from 'react-autocomplete';
import {Link} from 'react-router-dom';

console.warn = () => {}

const Waiter = () => {

  useEffect(() => {
    getProductsData();
    getWaiters();
  }, []);

  const date = new Date();

  /* Variables*/
  const [name, setName] = useState('Nombre');
  const [table, setTable] = useState(1);
  const [qty, setQty] = useState(1);
  const [products, setProducts] = useState('');

  /* Create Kitchen Variables*/
  const [arrayProducts, setArrayProducts] = useState('');
  const [arrayQty, setArrayQty] = useState('');

  /*Waiter */
  const [waiter, setWaiter] = useState('');

  /*Filter */
  const [value, setValue] = useState('');

  /*Inicio*/
  const [start, setStart] = useState(false);
 
  /*Get Products*/
  const getProductsData = async () => {
    const p = await axios.get('http://192.168.0.10:4000/api/products');
    setProducts(p.data);
  } 

  /*Get Waiters*/
  const getWaiters = async () => {
    const w = await axios.get('http://192.168.0.10:4000/api/waiter');
    setWaiter(w.data);
  } 

  /*Sum products*/
  const sumProducts = () => {
    if (qty >= 0) {
        setQty(qty+1);
    }else{
    }
  }

  /*Rest Products*/
  const restProducts = () => {
    if (qty > 0) {
        setQty(qty-1);
    }else{
    }
  }

  /*Create Waiter data*/
  const createWaiter = () => {
    axios.post('http://192.168.0.10:4000/api/waiter', {
                qty: qty,
                products: value
    });
    getWaiters();
  }
  
  /*Plus button Functionality*/
  const plusButton = () => {
    if (start === false){
        setStart(true);
    }else{
        createWaiter();
    }
  }

  /*Kitchen Data*/
  const kitchenData = () => {
    const products = waiter.map (w => w.products);
    const qty = waiter.map (w => w.qty);
    setArrayProducts(products);
    setArrayQty(qty);
  }

  /*Create Kitchen Data*/
  const createKitchen = () => {
    if (arrayProducts === ''){
        console.log(arrayProducts);
        console.log(arrayQty);
        kitchenData();
    }else{
        axios.post('http://192.168.0.10:4000/api/kitchen', {
        date: date,
        waiter: name,
        table: table, 
        qty: arrayQty,
        products: arrayProducts,
        });
        alert('Enviado');
    }
  }

  /*Delete All Waiter | Borrado completo de mesero*/
  const deleteAllWaiter = async () => {
    await axios.delete('http://192.168.0.10:4000/api/waiter');
  }

  /*Functions when we send it "Enviar" button | Borrado completo de mesero*/
  const SendFunctions = () => {
    deleteAllWaiter();
    createKitchen();
    getWaiters();
  }

  return (
    <div className=' w-full min-h-screen left-0 top-0 z-10 flex flex-wrap justify-center content-center p-1 scroll-auto'>
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
                   Mesero: <input className="border-2 border-black" onChange={event => setName(event.target.value)} defaultValue={name}/>
                    Mesa #<input className="w-10 border-2 border-black" onChange={event => setTable(event.target.value)} defaultValue={table}/>
            </div>
            </div>
            <div className='w-full border-t border-gray-300 my-2'></div>
            <div>
                <table className='w-full text-xs'>
                    <thead>
                        <tr>
                            <th className='py-1 w-1/12 text-center'>#</th>
                            <th className='py-1 text-left'>Producto</th>
                        </tr>
                    </thead>
                    <tbody className='flex-row'>
                        {waiter && waiter.map(w => 
                        <tr key={w._id}>
                            <td>
                                <table className='mx-5'>
                                    <tbody>
                                        <tr>
                                            <td className='py-1 text-center flex-col'>
                                                <p className='w-5 border-2 border-black'>
                                                    {w.qty}
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td >
                                <table>
                                    <tbody>
                                        <tr className='overflow-visible	w-1'>
                                            <td className='py-1 text-left'>
                                                <Link to={"/editwaiter/" + w._id}>
                                                    <p>{w.products}</p>
                                                </Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>)}
                        <tr>
                            <td>
                                <table className='mx-5'>
                                    <tbody>
                                        <tr>
                                            <td className='py-1 text-center flex-col'>
                                                <div className='space-y-10'>
                                                    <button className="absolute left-4 md:left-[200px] lg:left-[510px] bg-yellow-500 text-white active:bg-yellow-600 font-bold uppercase text-xs px-2 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    onClick={() => {sumProducts()}}>
                                                        <PlusIcon className="h-2 w-2 text-white"/>
                                                    </button>
                                                    <button className="absolute  left-4 md:left-[200px] lg:left-[510px] bg-yellow-500 text-white active:bg-yellow-600 font-bold uppercase text-xs px-2 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    onClick={() => {restProducts()}}>
                                                        <MinusIcon className="h-2 w-2 text-white"/>
                                                    </button>
                                                </div>
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
                                                        items={products && products.filter((item) => item.product.toLowerCase().includes(value.toLowerCase()))}
                                                        renderItem={(item, isHighlighted) =>
                                                            <div key={item._id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                                            {item.product}
                                                            </div>
                                                        }
                                                        wrapperStyle={{
                                                            border: "solid 2px #000000",
                                                        }}
                                                        value={value || ''}
                                                        onChange={(e) => setValue(e.target.value)}
                                                        onSelect={(value) => {
                                                            setValue(value);
                                                        }}
                                                    />: null}
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
              <button type="button" className=" text-yellow-700 border border-yellow-700 hover:bg-yellow-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-yellow-500 dark:text-yellow-500 dark:hover:text-white dark:focus:ring-yellow-800"
              onClick={() => {plusButton()}}>
                  <PlusIcon className="h-5 w-5 text-yellow-500"/>
              </button>
            </div>
            <div className='w-full border-t border-gray-300 my-2'></div>
            <div className='text-center'>
                <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                onClick={SendFunctions /*Borrado completo de mesero*/}>
                    ENVIAR
                </button>
            </div>
        </div>
        </div>
    </div>
</div>
  )
}

export default Waiter
import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'
import Moment from 'react-moment'
import { PlusIcon, MinusIcon, TrashIcon } from '@heroicons/react/solid'
import Autocomplete from 'react-autocomplete';


const KitchenEdit = () => {

    useEffect(() => {
        getKitchen();
        AutocompleteData();
    }, []);


    const [oneKitchen, setOneKitchen] = useState(['']);
    
    /* Variables*/
    const [name, setName] = useState('Nombre');
    const [table, setTable] = useState(1);
    const [products, setProducts] = useState();
    const [qty, setQty] = useState();
    const [price, setPrice] = useState([]);
    const [subtotal, setSubtotal] = useState([]);

    /*Autocomplete Variables*/
    const [counter, setCounter] = useState(1);
    const [autocomplete, setAutocomplete] = useState(false);
    const [value, setValue] = useState('');

    /*Inicio*/
    const [start, setStart] = useState(false);

    const { id } = useParams();
    const newid = {id};

    /*Get Autocomplete Data*/
    const AutocompleteData = async () => {
        const p = await axios.get('http://192.168.0.3:4000/api/products');
        setAutocomplete(p.data);
    } 

    /*Get One Ticket*/
    const getKitchen = async () => {
        const k = await axios.get('http://192.168.0.3:4000/api/kitchen/' + newid.id);
        setOneKitchen(k.data);
        setQty(k.data.qty);
        setProducts(k.data.products);
        setName(k.data.name);
        setTable(k.data.table);

        /*Price and subtotal*/
        const array = new Array(k.data.qty.length).fill(0);
        setPrice(array);
        setSubtotal(array);
    }

    /*Qyt array*/
    const qtyArray = (key, event) => {
        const qtyArray = oneKitchen.qty;
        oneKitchen.qty.forEach(() => {
            qtyArray[key] = event.target.value;
        })
        setQty(qtyArray);
    }

    /*Products array*/
    const productsArray = (key, event) => {
        const productsArray = oneKitchen.products;
        oneKitchen.products.forEach(() => {
            productsArray[key] = event.target.value;
        })
        setProducts(productsArray);
    }

    /*Update kitchen with URL*/
    const updateKitchen = async () => {
        await axios.put('http://192.168.0.3:4000/api/kitchen/'+ newid.id,{
            waiter: name,
            table: table,
            qty: qty,
            products: products          
        });
        window.location.href = 'http://192.168.0.3:3000/kitchen'
        alert('Actualizado');
    }

    const updateWithoutAlerts = async () => {
        await axios.put('http://192.168.0.3:4000/api/kitchen/'+ newid.id,{
            waiter: name,
            table: table,
            qty: qty,
            products: products          
        });
        window.location.href = 'http://192.168.0.3:3000/editkitchen/' + newid.id ;
    }

    /*Create tickets*/
    const createTickets = async () => {
        await axios.post('http://192.168.0.3:4000/api/tickets', {
            waiter: name,
            table: table,
            qty: qty,
            products: products,
            price: price,
            subtotal: subtotal,
            total: 0,
            pay: 0,
            change: 0,                 
        });
        window.location.href='http://192.168.0.3:3000/kitchen';
        deleteOneKitchen();
    }

    /*Close Kitchen*/
    const CloseFunction = () => {
        window.location.href="http://192.168.0.3:3000/kitchen";
    }

    /*Delete Products*/
    const deleteOneKitchen = async () => {
        await axios.delete('http://192.168.0.3:4000/api/kitchen/' + newid.id);
    }
    
    /*Plus button Functionality*/
    const plusButton = () => {
        if (start === false){
            setStart(true);
        }else{
            addKitchen();
            updateWithoutAlerts();

        }
    }

    /*Sum Autocomplete*/
  const sumAutocomplete = () => {
    if (counter >= 0) {
        setCounter(counter+1);
    }else{
    }
  }

  /*Rest Autocomplete*/
  const restAutocomplete = () => {
    if (counter > 0) {
        setCounter(counter-1);
    }else{
    }
  }

  /*Add products to Kitchen*/
  const addKitchen = () => {
    products.push(value);
    qty.push(counter);
  }

  /*Delete one element of products in Kitchen*/
  const deleteKitchen = (index) => {
    products.splice(index, 1);
    qty.splice(index, 1);
  }

  const TrashFunction = (key) => {
    deleteKitchen(key);
    updateWithoutAlerts();
  }

  return (
    <div className='scroll-auto w-full min-h-screen left-0 top-0 z-10 flex flex-wrap justify-center content-center p-1 overflow-y-scroll'>
    <div className='fixed bg-black w-full h-screen left-0 top-0 z-0 '>
    </div>
    <div className='w-96 rounded-3xl bg-white shadow-xl overflow-hidden z-10 '>
        <div className='text-left w-full text-sm p-6'>
        <div>  
            <div>
            <div className='text-center'> 
                <h2 className='text-xl font-semibold my-3'>PUNTO DE VENTA</h2>
                <p>LA FINCA</p>
            </div>
            <div className='flex mt-4 text-xs'>
                <div>
                    <Moment format='MMMM Do YYYY, h:mm:ss a'>{oneKitchen.date}</Moment>
                </div>
            </div>
            <div className='flex-grow text-xs'>
                    Mesero: <input onChange={event => setName(event.target.value)} defaultValue={oneKitchen.waiter}/>
                    Mesa #<input onChange={event => setTable(event.target.value)} className='w-10' defaultValue={oneKitchen.table}/>
            </div>
            </div>
            <div className='w-full border-t border-gray-300 my-2'></div>
            <div>
                <table className='w-full text-xs'>
                    <thead>
                        <tr>
                            <th className='py-1 w-4/12 text-center'>#</th>
                            <th className='py-1 text-left'>Producto</th>
                        </tr>
                    </thead>
                    <tbody className='flex-row '>
                        <tr>
                            <td>
                                <table className='mx-5'>
                                    {<tbody>
                                        {oneKitchen.qty && oneKitchen.qty.length ? oneKitchen.qty.map((a, key)=>
                                        <tr key={key}>
                                            <td>
                                                <button onClick={() => TrashFunction(key)}>
                                                    <TrashIcon className='h-4 w-6 text-black text-blue-gray-300 hover:text-red-500 focus:outline-none mt-1'/>
                                                </button>    
                                            </td>
                                            <td className='py-1 text-center flex-col'>
                                                <input className='w-8 text-center' onChange={event => qtyArray(key, event)} defaultValue={a}/>
                                            </td>
                                        </tr>) : null}
                                    </tbody>}
                                </table>
                            </td>
                            <td>
                                <table>
                                    <tbody>
                                        {oneKitchen.products && oneKitchen.products.length ? oneKitchen.products.map((b, key)=>
                                        <tr key={key}>
                                            <td className='py-1 text-left'>
                                                <input className='w-13' onChange={event => productsArray(key, event)} defaultValue={b}/>
                                            </td>
                                        </tr>) : null}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table className='mx-5'>
                                    <tbody>
                                        <tr>
                                            <td className='py-1 text-center flex-col'>
                                                <div className='space-y-10'>
                                                    <button className="absolute left-4 md:left-[200px] lg:left-[510px] bg-yellow-500 text-white active:bg-yellow-600 font-bold uppercase text-xs px-2 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    onClick={() => {sumAutocomplete()}}>
                                                        <PlusIcon className="h-2 w-2 text-white"/>
                                                    </button>
                                                    <button className="absolute  left-4 md:left-[200px] lg:left-[510px] bg-yellow-500 text-white active:bg-yellow-600 font-bold uppercase text-xs px-2 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    onClick={() => {restAutocomplete()}}>
                                                        <MinusIcon className="h-2 w-2 text-white"/>
                                                    </button>
                                                </div>
                                                <p className='w-5 border-2 border-black'>
                                                    {counter}
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
                                                        items={autocomplete && autocomplete.filter((item) => item.product.toLowerCase().includes(value.toLowerCase()))}
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
                                                    /> : null} 
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
        </div>
        </div>
        <div className='p-4 w-full space-y-2'>
            <button className='bg-yellow-500 text-blacks text-base px-4 py-3 rounded-2xl w-full focus:outline-none'
            onClick={CloseFunction}>
                Cerrar
            </button>
            <button className='bg-yellow-500 text-white text-base px-4 py-3 rounded-2xl w-full focus:outline-none'
            onClick={updateKitchen}>
                Actualizar
            </button>
            <button className='bg-green-500 text-white text-base px-4 py-3 rounded-2xl w-full focus:outline-none' onClick={createTickets}>
                ENVIAR
            </button>
        </div>
    </div>
</div>
  )
}

export default KitchenEdit
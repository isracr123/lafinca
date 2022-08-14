import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'
import Moment from 'react-moment'


const KitchenEdit = () => {

    useEffect(() => {
        getKitchen();
    }, []);


    const [oneKitchen, setOneKitchen] = useState(['']);
    
    /* Variables*/
    const [name, setName] = useState();
    const [table, setTable] = useState();
    const [products, setProducts] = useState();
    const [qty, setQty] = useState();

    const { id } = useParams();
    const newid = {id};

    /*Get One Ticket*/
    const getKitchen = async () => {
        const k = await axios.get('http://localhost:4000/api/kitchen/' + newid.id);
        setOneKitchen(k.data);
        setQty(k.data.qty);
        setProducts(k.data.products);
        setName(k.data.name);
        setTable(k.data.table);
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

    /*Update kitchen*/
    const updateKitchen = async () => {
        await axios.put('http://localhost:4000/api/kitchen/'+ newid.id,{
            waiter: name,
            table: table,
            qty: qty,
            products: products          
        });
        window.location.href = 'http://localhost:3000/kitchen'
        alert('Actualizado');
    }

    /*Create tickets*/
    const createTickets = async () => {
        await axios.post('http://localhost:4000/api/tickets', {
            waiter: name,
            table: table,
            qty: qty,
            products: products,
            price: 0,
            subtotal: 0,
            total: 0,
            pay: 0,
            change: 0,                 
        });
        window.location.href='http://localhost:3000/pos/tickets';
    }

    /*Close Kitchen*/
    const CloseFunction = () => {
        window.location.href="http://localhost:3000/kitchen";
      }

  return (
    <div className='fixed w-full h-screen left-0 top-0 z-10 flex flex-wrap justify-center content-center p-1 overflow-y-scroll'>
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
                            <th className='py-1 w-1/12 text-center'>#</th>
                            <th className='py-1 text-left'>Producto</th>
                        </tr>
                    </thead>
                    <tbody className='flex-row'>
                        <tr>
                            <td>
                                <table className='mx-5'>
                                    {<tbody>
                                        {oneKitchen.qty && oneKitchen.qty.length ? oneKitchen.qty.map((a, key)=>
                                        <tr key={key}>
                                            <td className='py-1 text-center flex-col'>
                                                <input className='w-5' onChange={event => qtyArray(key, event)} defaultValue={a}/>
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
                    </tbody> 
                </table>
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
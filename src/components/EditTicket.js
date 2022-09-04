import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'
import Moment from 'react-moment'
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';


const EditTicket = () => {

    const [oneTicket, setOneTicket] = useState(['']);
    
    /* Variables*/
    const [name, setName] = useState(oneTicket.waiter);
    const [table, setTable] = useState(oneTicket.table);
    const [qty, setQty] = useState(oneTicket.qty);
    const [products, setProducts] = useState(oneTicket.products);
    const [price, setPrice] = useState(oneTicket.price);
    const [subtotal, setSubtotal] = useState(oneTicket.subtotal);
    const [total, setTotal] = useState(oneTicket.total);
    const [pay, setPay] = useState(oneTicket.pay);
    const [change, setChange] = useState(oneTicket.change);

    /*Print */
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    useEffect(() => {
        getTickets();
    }, []);

    const { id } = useParams();
    const newid = {id};

    /*Get One Ticket*/
    const getTickets = async () => {
        const t = await axios.get('http://192.168.0.3:4000/api/tickets/' + newid.id);
        setOneTicket(t.data);
    }

    /*Qyt array*/
    const qtyArray = (key, event) => {
        const qtyArray = oneTicket.qty;
        oneTicket.qty.forEach(() => {
            qtyArray[key] = event.target.value;
        })
        setQty(qtyArray);
    }

    /*Products array*/
    const productsArray = (key, event) => {
        const productsArray = oneTicket.products;
        oneTicket.products.forEach(() => {
            productsArray[key] = event.target.value;
        })
        setProducts(productsArray);
    }

    /*Price array*/
    const priceArray = (key, event) => {
        const priceArray = oneTicket.price;
        oneTicket.price.forEach(() => {
            priceArray[key] = event.target.value;
        })
        setPrice(priceArray);
    }

    /*Price array*/
    const subtotalArray = (key, event) => {
        const subtotalArray = oneTicket.subtotal;
        oneTicket.subtotal.forEach(() => {
            subtotalArray[key] = event.target.value;
        })
        setSubtotal(subtotalArray);
    }

    /*Update tickets*/
    const updateTickets = async () => {
        await axios.put('http://192.168.0.3:4000/api/tickets/' + newid.id, {
            waiter: name,
            table: table,
            qty: qty,
            products: products,
            price: price,
            subtotal: subtotal,
            total: total,
            pay: pay,
            change: change,                
        });
        window.location.href='http://192.168.0.3:3000/pos/tickets';
    }

    /*Delete Ticket | Boton eliminar en tickets*/
    const deleteTicket = async () => {
        await axios.delete('http://192.168.0.3:4000/api/tickets/' + newid.id);
        window.location.href='http://192.168.0.3:3000/pos/tickets';
    }

  return (
    <div className='scroll-auto w-full min-h-screen left-0 top-0 z-10 flex flex-wrap justify-center content-center p-1 overflow-y-scroll bg-black'>
    <div className='min-h-screen bg-black md:w-1/4 z-0'>
        <div className='w-96 rounded-3xl bg-white shadow-xl overflow-hidden z-10 ' ref={componentRef}>
            <div className='text-left w-full text-sm p-6'>
            <div>  
                <div>
                <div className='text-center'> 
                    <h2 className='text-xl font-semibold my-3'>PUNTO DE VENTA</h2>
                    <p>LA FINCA</p>
                </div>
                <div className='flex mt-4 text-xs'>
                    <div className='flex-grow'>
                        No: {Math.trunc(1 + Math.random() * (10000 - 1))}
                    </div>
                    <div>
                        <Moment format='MMMM Do YYYY, h:mm:ss a'>{oneTicket.date}</Moment>
                    </div>
                </div>
                <div className='flex-grow text-xs'>
                        Mesero: <input onChange={event => setName(event.target.value)} defaultValue={oneTicket.waiter}/>
                        Mesa #<input onChange={event => setTable(event.target.value)} className='w-10' defaultValue={oneTicket.table}/>
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
                                        {<tbody>
                                            {oneTicket.qty && oneTicket.qty.length ? oneTicket.qty.map((a, key)=>
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
                                            {oneTicket.products && oneTicket.products.length ? oneTicket.products.map((b, key)=>
                                            <tr key={key}>
                                                <td className='py-1 text-left'>
                                                    <input className='w-13' onChange={event => productsArray(key, event)} defaultValue={b}/>
                                                </td>
                                            </tr>) : null}
                                        </tbody>
                                    </table>
                                </td>
                                <td>
                                    <table className='mx-5'>
                                        <tbody>
                                            {oneTicket.price && oneTicket.price.length ? oneTicket.price.map((c, key)=>
                                            <tr key={key}>
                                                <td className='py-1 text-center'>
                                                    <div className='grid grid-cols-2'>
                                                        <p>$</p> 
                                                        <input className='w-5' onChange={event => priceArray(key, event)} defaultValue={c}/>
                                                    </div>
                                                </td>
                                            </tr>): null}
                                        </tbody>
                                    </table>
                                </td>
                                <td>
                                    <table className='mx-6 '>
                                        <tbody>
                                            {oneTicket.subtotal && oneTicket.subtotal ? oneTicket.subtotal.map((d, key)=>
                                            <tr key={key}>
                                                <td className='py-1 text-center'>
                                                    <div className='grid grid-cols-2 space-x-1'>
                                                        <p>$</p> 
                                                        <input className='w-5' onChange={event => subtotalArray(key, event)} defaultValue={d}/>
                                                    </div>
                                                </td>
                                            </tr>): null}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody> 
                    </table>
                </div>
                <div className='w-full border-t border-gray-300 my-2'></div>
                <div>
                <div className='flex font-semibold'>
                    <div className='flex-grow'>TOTAL</div>
                    <div className='grid grid-cols-2'>
                        <p className='px-5'>$</p>
                        <input className='w-12' onChange={event => setTotal(event.target.value)} defaultValue={oneTicket.total}/>
                    </div>
                </div>
                <div className='flex text-xs font-semibold'>
                    <div className='flex-grow'>Pago</div>
                    <div className='grid grid-cols-2'>
                        <p className='px-5'>$</p>
                        <input className='w-12' onChange={event => setPay(event.target.value)} defaultValue={oneTicket.pay}/>
                    </div>
                </div>
                <div className='w-full border-t border-gray-300 my-2'></div>
                <div className='flex text-xs font-semibold'>
                    <div className='flex-grow'>Cambio</div>
                    <div className='grid grid-cols-2'>
                        <p className='px-5'>$</p>
                        <input className='w-12' onChange={event => setChange(event.target.value)} defaultValue={oneTicket.change}/>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className='w-96 rounded-3xl bg-black shadow-xl overflow-hidden z-10'>
            <div className='text-left w-full text-sm p-6'>
                <div className='p-4 w-full space-y-2'>
                    <button className='bg-yellow-500 text-black text-base px-4 py-3 rounded-2xl w-full focus:outline-none' 
                    onClick={()=>{
                        window.location.href='http://192.168.0.3:3000/pos/tickets';
                    }}>
                        X Cerrar
                    </button>
                    <button className='bg-red-500 text-white text-base px-4 py-3 rounded-2xl w-full focus:outline-none' 
                    onClick={deleteTicket /*Boton eliminar en tickets*/}>
                        Eliminar
                    </button>
                    <button className='bg-yellow-500 text-white text-base px-4 py-3 rounded-2xl w-full focus:outline-none'
                    onClick={()=>{
                        updateTickets();
                    }}>
                        Actualizar
                    </button>
                    <button className='bg-yellow-500 text-white text-base px-4 py-3 rounded-2xl w-full focus:outline-none'
                    onClick={handlePrint}>
                        IMPRIMIR
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default EditTicket
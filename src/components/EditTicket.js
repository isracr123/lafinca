import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'
import Moment from 'react-moment'   



const EditTicket = () => {

    const [oneTicket, setOneTicket] = useState(['']);
    
    /* Variables*/
    const [name, setName] = useState('');
    const [table, setTable] = useState(0);
    const [qty, setQty] = useState('');
    /* 
    const [products, setProducts] = useState('');
    const [price, setPrice] = useState('');
    const [subtotal, setSubtotal] = useState('');
    const [total, setTotal] = useState('');
    const [pay, setPay] = useState('');
    const [change, setChange] = useState(''); */


    useEffect(() => {
        getTickets();
    }, []);

    const { id } = useParams();
    const newid = {id};

    /*Get One Ticket*/
    const getTickets = async () => {
        const t = await axios.get('http://localhost:4000/api/tickets/' + newid.id);
        setOneTicket(t.data);
    }


  return (
    <div className='fixed w-full h-screen left-0 top-0 z-10 flex flex-wrap justify-center content-center p-24 overflow-y-scroll'>
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
                <div className='flex-grow'>
                    No: {newid.id}
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
                                                <input className='w-5' onChange={event => setQty(event.target.value)} defaultValue={a}/>
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
                                            <td className='py-1 text-left'>{b}</td>
                                        </tr>) : null}
                                    </tbody>
                                </table>
                            </td>
                            <td>
                                <table className='mx-5'>
                                    <tbody>
                                        {oneTicket.price && oneTicket.price.length ? oneTicket.price.map((c, key)=>
                                        <tr key={key}>
                                            <td className='py-1 text-center'>${c}</td>
                                        </tr>): null}
                                    </tbody>
                                </table>
                            </td>
                            <td>
                                <table className='mx-6 '>
                                    <tbody>
                                        {oneTicket.subtotal && oneTicket.subtotal ? oneTicket.subtotal.map((d, key)=>
                                        <tr key={key}>
                                            <td className='py-1 text-left'>${d}</td>
                                        </tr>): null}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody> 
                </table>
            </div>
            <div className='w-full border-t border-gray-300 my-2'></div>
            {/* {totalData && totalData.map(t =>
            <div key={t._id}>
            <div className='flex font-semibold'>
                <div className='flex-grow'>TOTAL</div>
                <div>${t.total}</div>
            </div>
            <div className='flex text-xs font-semibold'>
                <div className='flex-grow'>Pago</div>
                <div>${t.pay}</div>
            </div>
            <div className='w-full border-t border-gray-300 my-2'></div>
            <div className='flex text-xs font-semibold'>
                <div className='flex-grow'>Cambio</div>
                <div>${t.change}</div>
            </div>
            </div>)} */}
        </div>
        </div>
        {/* <div className='p-4 w-full'>
            {totalData && totalData.map(t =><div key={t._id + 2}>
            <button className='w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700' onClick={()=>{
            const function1 = window.location.href='http://localhost:3000/pos/';
            const function2 = deleteTotal(t._id);
            }}>
            X Cerrar
            </button>
            <button className='w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
            onClick={()=>{
                const function1 = createTickets(t._id);
            }}>
                GUARDAR
            </button>
            </div>)}
            <button className='bg-yellow-500 text-white text-lg px-4 py-3 rounded-2xl w-full focus:outline-none'
            onClick={handlePrint}>
                IMPRIMIR
            </button>
        </div> */}
    </div>
</div>
  )
}

export default EditTicket
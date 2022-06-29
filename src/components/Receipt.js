import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import Moment from 'react-moment'   
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const Receipt = () => {

    const [cart, setCart] = useState([]);
    const [totalData, setTotalData] = useState([]);
    const date = new Date();

    /*Ticket Data */
    const [qty, setQty] = useState('');
    const [products, setProducts] = useState('');
    const [price, setPrice] = useState('');
    const [subtotal, setSubtotal] = useState('');
    const [total, setTotal] = useState('');
    const [pay, setPay] = useState('');
    const [change, setChange] = useState('');

    /*Print */
    const [name, setName] = useState('');
    const [table, setTable] = useState(0);

    useEffect(() => {
        getCartData();
        getTotalData();
        console.log('cart and total data twice');
      }, []);

      useEffect(() => {
        dataTickets();
      }, [table]);

    /*Print */
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    /*Get Cart*/
    const getCartData = async () => {
        const a = await axios.get('http://localhost:4000/api/cart');
        setCart(a.data);
    }
    
    /*Get Total*/
    const getTotalData = async () => {
        const t = await axios.get('http://localhost:4000/api/total');
        setTotalData(t.data);
    } 

    /*Delete Products*/
    const deleteTotal = async (id) => {
        await axios.delete('http://localhost:4000/api/total/' + id);
    }

    /*Delete All Cart*/
    const deleteAllCart = async () => {
        await axios.delete('http://localhost:4000/api/cart/');
    }

    /*Create tickets*/
    const createTickets = (id) => {
        if (table === 0 || name === ''){
            alert('Completar todos los campos');
        }else{
            axios.post('http://localhost:4000/api/tickets', {
                date: date,
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
            window.location.href='http://localhost:3000/pos/';
            deleteTotal(id);
            deleteAllCart();
        }
    }

    /*Take data to create tickets */
    const dataTickets = () => {
        const qtyTicket = cart && cart.map((a) => (a.sum));
        setQty(qtyTicket);
        const productsTicket = cart && cart.map((a) => (a.product));
        setProducts(productsTicket);
        const priceTicket = cart && cart.map((a) => (a.price));
        setPrice(priceTicket);
        const subtotalTicket = cart && cart.map((a) => (a.sum*a.price));
        setSubtotal(subtotalTicket);
        const totalTicket = totalData && totalData.map((t) => (t.total));
        setTotal(totalTicket[0]);
        const payTicket = totalData && totalData.map((t) => (t.pay));
        setPay(payTicket[0]);
        const changeTicket = totalData && totalData.map((t) => (t.change));
        setChange(changeTicket[0]);
    }

  return (
    <div className='fixed w-full h-screen left-0 top-0 z-10 flex flex-wrap justify-center content-center p-24 overflow-y-scroll'>
        <div className='fixed bg-black w-full h-screen left-0 top-0 z-0 '>
        </div>
        <div className='w-96 rounded-3xl bg-white shadow-xl overflow-hidden z-10 '>
            <div className='text-left w-full text-sm p-6' ref={componentRef}>
            <div>
            {totalData && totalData.map(t =><div key={t._id + 1}>
                <div className='text-center'>   
                    <h2 className='text-xl font-semibold my-3'>PUNTO DE VENTA</h2>
                    <p>LA FINCA</p>
                </div>
                <div className='flex mt-4 text-xs'>
                    <div className='flex-grow'>
                        No: {t._id}
                    </div>
                    <div><Moment format='MMMM Do YYYY, h:mm:ss a'>{date}</Moment></div>
                </div>
                <div className='flex-grow text-xs'>
                        Mesero: <input placeholder='Nombre' onChange={event => setName(event.target.value)}/>
                        Mesa #<input placeholder='0' onChange={event => setTable(event.target.value)} className='w-10'/>
                </div>
                </div>)}
                <div className='w-full border-t border-gray-300 my-2'></div>
                <div>
                    <table className='w-full text-xs'>
                        <thead>
                            <tr>
                                <th className='py-1 w-1/12 text-center'>#</th>
                                <th className='py-1 text-left'>Producto</th>
                                <th className='py-1 w-2/12 text-center'>Precio</th>
                                <th className='py-1 w-3/12 text-right'>Subtotal</th>
                            </tr>
                        </thead>
                        {cart && cart.map(a =>
                        <tbody key={a._id} >
                            <tr>
                                <td className='py-2 text-center'>{a.sum}</td>
                                <td className='py-2 text-left'>{a.product}</td>
                                <td className='py-2 text-center'>${a.price}</td>
                                <td className='py-2 text-right'>${a.sum*a.price}</td>
                            </tr>
                        </tbody>
                        )}
                    </table>
                </div>
                <div className='w-full border-t border-gray-300 my-2'></div>
                {totalData && totalData.map(t =>
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
                </div>)}
            </div>
            </div>
            <div className='p-4 w-full'>
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
            </div>
        </div>
    </div>
  )
}

export default Receipt
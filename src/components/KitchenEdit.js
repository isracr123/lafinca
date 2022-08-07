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
    const [total, setTotal] = useState();
    const [pay, setPay] = useState();
    const [change, setChange] = useState();

    /* Variables inside products*/
    const [products, setProducts] = useState();
    const [qty, setQty] = useState();
    const [price, setPrice] = useState();
    const [subtotal, setSubtotal] = useState();

    /*Variable to save all products*/
    const [allProducts, setAllProducts] = useState();

    const { id } = useParams();
    const newid = {id};

    /*Get One Ticket*/
    const getKitchen = async () => {
        const k = await axios.get('http://localhost:4000/api/kitchen/' + newid.id);
        setOneKitchen(k.data);
        setAllProducts(k.data.products);
        setQty(k.data.products.map(w => w.qty));
        setProducts(k.data.products.map(w => w.products));
        setPrice(k.data.products.map(w => w.price));
        setSubtotal(k.data.products.map(w => w.subtotal));
        setName(k.data.name);
        setTable(k.data.table);
        setTotal(k.data.total);
        setPay(k.data.pay);
        setChange(k.data.change);
    }

    /*Qyt array*/
    const qtyArray = (key, event) => {
        const qtyArray = oneKitchen.products.map(w => w.qty);
        oneKitchen.products.map(w => w.qty).forEach(() => {
            qtyArray[key] = event.target.value;
        })
        setQty(qtyArray);
    }

    /*Products array*/
    const productsArray = (key, event) => {
        const productsArray = oneKitchen.products.map(w => w.products);
        oneKitchen.products.map(w => w.products).forEach(() => {
            productsArray[key] = event.target.value;
        })
        setProducts(productsArray);
    }

    /*Price array*/
    const priceArray = (key, event) => {
        const priceArray = oneKitchen.products.map(w => w.price);
        oneKitchen.products.map(w => w.price).forEach(() => {
            priceArray[key] = event.target.value;
        })
        setPrice(priceArray);
    }

    /*Subtotal array*/
    const subtotalArray = (key, event) => {
        const subtotalArray = oneKitchen.products.map(w => w.subtotal);
        oneKitchen.products.map(w => w.subtotal).forEach(() => {
            subtotalArray[key] = event.target.value;
            
        })
        setSubtotal(subtotalArray);
    }

    const allProductsUpdate = () => {
        const theProducts = oneKitchen.products.map((w, index) => {
            return ([{
                qty: qty,
                products: products,
                price: price,
                subtotal: subtotal,
            }]);
        });
        const mapping = theProducts.map((w, index) => {
            return (w)
        });
        setAllProducts(mapping);
        console.log(allProducts);
    }

    /*Update kitchen*/
    const updateKitchen = async () => {
        await axios.put('http://localhost:4000/api/kitchen/'+ newid.id,{
            waiter: name,
            table: table,
            products: allProducts,
            total: total,
            pay: pay,
            change: change,                 
        });
        window.location.href='http://localhost:3000/kitchen';
    }

    /*Create tickets*/
    const createTickets = async () => {
        await axios.post('http://localhost:4000/api/tickets', {
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
        window.location.href='http://localhost:3000/pos/tickets';
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
                <div className='flex-grow'>
                    No: {newid.id}
                </div>
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
                            <th className='py-1 w-2/12 text-center'>Precio</th>
                            <th className='py-1 w-2/12 text-right'>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody className='flex-row'>
                        <tr>
                            <td>
                                <table className='mx-5'>
                                    {<tbody>
                                        {oneKitchen.products && oneKitchen.products.length ? oneKitchen.products.map((a, key)=>
                                        <tr key={key}>
                                            <td className='py-1 text-center flex-col'>
                                                <input className='w-5' onChange={event => qtyArray(key, event)} defaultValue={a.qty}/>
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
                                                <input className='w-13' onChange={event => productsArray(key, event)} defaultValue={b.products}/>
                                            </td>
                                        </tr>) : null}
                                    </tbody>
                                </table>
                            </td>
                            <td>
                                <table className='mx-5'>
                                    <tbody>
                                        {oneKitchen.products && oneKitchen.products.length ? oneKitchen.products.map((c, key)=>
                                        <tr key={key}>
                                            <td className='py-1 text-center'>
                                                <div className='grid grid-cols-2'>
                                                    <p>$</p> 
                                                    <input className='w-5' onChange={event => priceArray(key, event)} defaultValue={c.price}/>
                                                </div>
                                            </td>
                                        </tr>): null}
                                    </tbody>
                                </table>
                            </td>
                            <td>
                                <table className='mx-6 '>
                                    <tbody>
                                        {oneKitchen.products && oneKitchen.products ? oneKitchen.products.map((d, key)=>
                                        <tr key={key}>
                                            <td className='py-1 text-center'>
                                                <div className='grid grid-cols-2 space-x-1'>
                                                    <p>$</p> 
                                                    <input className='w-5' onChange={event => subtotalArray(key, event)} defaultValue={d.subtotal}/>
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
                    <input className='w-12' onChange={event => setTotal(event.target.value)} defaultValue={oneKitchen.total}/>
                </div>
            </div>
            <div className='flex text-xs font-semibold'>
                <div className='flex-grow'>Pago</div>
                <div className='grid grid-cols-2'>
                    <p className='px-5'>$</p>
                    <input className='w-12' onChange={event => setPay(event.target.value)} defaultValue={oneKitchen.pay}/>
                </div>
            </div>
            <div className='w-full border-t border-gray-300 my-2'></div>
            <div className='flex text-xs font-semibold'>
                <div className='flex-grow'>Cambio</div>
                <div className='grid grid-cols-2'>
                    <p className='px-5'>$</p>
                    <input className='w-12' onChange={event => setChange(event.target.value)} defaultValue={oneKitchen.change}/>
                </div>
            </div>
            </div>
        </div>
        </div>
        <div className='p-4 w-full'>
            <button className='w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700' onClick={()=>{
            const function1 = window.location.href='http://localhost:3000/kitchen';
            }}>
            X Cerrar
            </button>
            <button className='w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
            onClick={updateKitchen}>
                Actualizar
            </button>
            <button className='bg-yellow-500 text-white text-lg px-4 py-3 rounded-2xl w-full focus:outline-none' onClick={createTickets}>
                ENVIAR
            </button>
        </div>
    </div>
</div>
  )
}

export default KitchenEdit
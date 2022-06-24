import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { ShoppingCartIcon, TrashIcon, PhotographIcon, MinusIcon, PlusIcon } from '@heroicons/react/outline'


const RightSide = (props) => {

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [updateTotal, setUpdateTotal] = useState(false);

  /*Pago*/

  const [pago, setPago] = useState(0);

  /*Cambio */

  const [cambio, setCambio] = useState(0);

  useEffect(() => {
    const cambio2 = pago - total;
    if (cambio2 < 0){
      setCambio(0);
    }else{
      setCambio(cambio2);
    }
  }, [pago, total]);

  useEffect(() => {
    getCartData();
    props.changeRefresh(false);
  }, [props.refresh]);

  useEffect(() => {
    totalFunction(cart);
    setUpdateTotal(false);
  }, [updateTotal]);

  /*Get Cart*/
  const getCartData = async () => {
    const a = await axios.get('http://localhost:4000/api/cart');
    setCart(a.data);
  }
  
  /*Create Total*/
  const addTotal = () => {
    axios.post('http://localhost:4000/api/total', {
        total: total,
        pay: pago,
        change: cambio, 
    })
  }

  /*Total Function */
  const totalFunction = () => {
    /*Variable*/
    let sum = 0;
    /*Take all cart price data*/
    const array = cart.map ((a)=> {
      return (a.price*a.sum)
    });
    console.log(array);
    /*Sumar los valores*/
    for (let i = 0; i < array.length; i++) {
      sum += array[i];
      setTotal(sum);
    }
    console.log(total);
  }

  /*Delete Cart*/
  const deleteCart = async (id, qty) => {
    await axios.delete('http://localhost:4000/api/cart/' + id);
    updateQtyProduct(id, qty);
    props.changePro(true);
    getCartData();
  }

  /*Update Qyt Product*/
  const updateQtyProduct = async (id, finalQtyValue) => {
    await axios.put('http://localhost:4000/api/products/' + id, {
            quantity: finalQtyValue,
    });
  }

  /*Update sum*/
  const addSum = async (id, sum, qty) => {
    if (props.stopSum === 0){
      props.changeIdQty(id);
      props.changeSumValue(sum);
      props.changeRefreshQty(true);
      props.changeQty(qty);
    }else{
      await axios.put('http://localhost:4000/api/cart/'+ id,{
      sum: sum + 1,
      });
      props.changeIdQty(id);
      props.changeSumValue(sum + 1);
      props.changeRefreshQty(true);
      props.changeQty(qty);
      getCartData();
    }
  }

  /*Update rest*/
  const addRest = async (id, sum, qyt) => {
    if (sum > 1){
      await axios.put('http://localhost:4000/api/cart/'+ id,{
        sum: sum - 1,
      });
      props.changeIdQty(id);
      props.changeSumValue(sum - 1);
      props.changeRefreshQty(true);
      props.changeQty(qyt);
      getCartData();
    }else{
      deleteCart(id, qyt);
    }
  }


  return (
    <div className='w-full md:w-5/12 flex flex-col h-full bg-gray-50 pr-4 pl-2 py-4'>
      <div className='bg-white rounded-3xl flex flex-col h-full shadow'>
        <div className='flex-1 flex flex-col overflow-auto'>
          <div className='space-y-16'>
          <div className='h-1 text-center flex justify-center'>
            <div className='pl-8 text-left text-lg py-4 relative mb-10'> 
              <ShoppingCartIcon className='h-7 w-6 text-black'/>
            </div>
          </div>
          <div className='flex-1 w-full px-4 overflow-auto '>
          {cart && cart.map(a =>
            <div className='select-none mb-3 bg-gray-50 rounded-lg w-full text-gray-700 py-2 px-2 flex justify-center' key={a._id}> {/*Repeat item*/}
            <TrashIcon className='h-7 w-6 text-black text-blue-gray-300 hover:text-red-500 focus:outline-none cursor-pointer'
            onClick={()=> deleteCart(a._id, a.qty)}/>
            <PhotographIcon className='rounded-lg h-12 md:h-15 w-10 bg-white shadow mr-2'/>
            <div className='flex-grow'>
              <h5 className='text-base'>{a.product}</h5>
              <p className='text-sm block'>${a.price}</p>
            </div>
            <div className='py-1'>
              <div className='w-28 grid grid-cols-3 gap-2 ml-2'>
                <button className='rounded-lg text-center py-1 text-white bg-gray-600 hover:bg-gray-700 focus:outline-none'
                onClick={()=> {
                  const function1 = addRest(a._id, a.sum, a.qty);
                  
                }}>
                  <MinusIcon className='h-6 w-3 inline-block'/>
                </button>
                <input type="text" className='bg-white rounded-lg text-center shadow focus:outline-none focus:shadow-lg text-sm' 
                value={a.sum} readOnly/>
                <button className='rounded-lg text-center py-1 text-white bg-gray-600 hover:bg-gray-700 focus:outline-none'
                onClick={()=> {
                  const function1 = addSum(a._id, a.sum, a.qty);
                  
                }}>
                  <PlusIcon className='h-6 w-3 inline-block'/>
                </button>
              </div>
            </div>
            </div>
          )}
          </div>
          </div>
          <div className='select-none h-auto w-full text-center pt-3 pb-4 px-4'>
            <div className='flex mb-3 text-lg font-semibold'>
              <div>Pago</div>
              <input type="text" className='text-right w-full' value={pago} onChange={e => setPago(e.target.value)}/>
            </div>
            <div className='flex mb-3 text-lg font-semibold'>
              <div>Cambio</div>
              <input type="text" className='text-right w-full text-red-500' value={'$'+cambio} readOnly/>
            </div>
            <div className='flex mb-3 text-lg font-semibold'>
              <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-yellow-400 rounded shadow'
              onClick={()=> setUpdateTotal(true)}>
                Total
              </button>
              <input type="text" className='text-right w-full' value={'$' + total} readOnly/>
            </div>
            <button className='text-white rounded-2xl text-lg w-full py-3 focus:outline-none bg-yellow-200 hover:bg-yellow-600 active:bg-yellow-200'
            onClick={()=> {
              const function1 = window.location.href='http://localhost:3000/pos/receipt';
              const function2 = addTotal();
            }}>
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightSide


import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import Moment from 'react-moment'   


const TicketsSkin = () => {

  const [tickets, setTickets] = useState('');

  useEffect(() => {
    getTickets();
  }, []);

  /*Get Tickets*/
  const getTickets = async () => {
    const t = await axios.get('http://localhost:4000/api/tickets');
    setTickets(t.data);
  }


  return (
    <div className=' w-full min-h-full left-0 top-0 z-10 flex flex-wrap p-5 md:space-x-5 space-y-5 md:space-y-0'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 space-x-2 space-y-2'>
      {tickets && tickets.map(t  => 
      <div className='w-70 h-80 rounded-3xl bg-white shadow-xl overflow-hidden z-10 overflow-y-scroll scroll-smooth' key={t._id}>
        <div className='text-left w-full text-sm p-6'>
          <div className='text-center'>
            <p className='text-xs	'>LA FINCA</p>
          </div>
          <div className='flex-grow text-xs'>
            <p>Mesero: {t.waiter}</p>
            <p>Mesa #{t.table}</p>
            <div><Moment format='MMMM Do YYYY, h:mm:ss a'>{t.date}</Moment></div>
          </div>
          <table className='w-full text-xs'>
            <thead>
              <tr>
                <th className='py-1 w-1/12 text-center'>#</th>
                <th className='py-1 text-left'>Producto</th>
                <th className='py-1 w-2/12 text-center'>Precio</th>
                <th className='py-1 w-3/12 text-right'>Subtotal</th>
              </tr>
              </thead>
              <tbody className='flex-row'>
                <tr>
                  <td>
                    <table>
                      <tbody>
                        {t.qty.map((a, key)=>
                        <tr key={key}>
                          <td className='py-1 text-center flex-col'>{a}</td>
                        </tr>)}
                      </tbody>
                    </table>
                  </td>
                  <td>
                    <table>
                      <tbody>
                        {t.products.map((b, key)=>
                        <tr key={key}>
                          <td className='py-1 text-left'>{b}</td>
                        </tr>)}
                      </tbody>
                    </table>
                  </td>
                  <td>
                    <table>
                      <tbody>
                        {t.price.map((c, key)=>
                        <tr key={key}>
                          <td className='py-1 text-center'>${c}</td>
                        </tr>)}
                      </tbody>
                    </table>
                  </td>
                  <td>
                    <table>
                      <tbody>
                        {t.subtotal.map((d, key)=>
                        <tr key={key}>
                          <td className='py-1 text-right'>${d}</td>
                        </tr>)}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>    
          </table>
          <div className='w-full border-t border-gray-300 my-2'></div>
          <div className='flex font-semibold'>
            <div className='flex-grow'>Total</div>
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
          <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow w-full my-2'>
              Editar
          </button>
        </div>
      </div>)}
      </div>
    </div>
  )
}

export default TicketsSkin
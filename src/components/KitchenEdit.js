import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'
import Moment from 'react-moment'
import { PlusIcon, MinusIcon, TrashIcon } from '@heroicons/react/solid'
import Autocomplete from 'react-autocomplete';


const KitchenEdit = () => {

    const [repeater,setRepeater]=useState(0);

    useEffect(() => {
        getKitchen();
        AutocompleteData();
        getPos();
    }, []);

    useEffect(() => {
        getPos();
        setTimeout(() => setRepeater(prevState=>prevState+1), 1000);
      }, [repeater])


    const [oneKitchen, setOneKitchen] = useState(['']);
    
    /* Variables*/
    const [name, setName] = useState('Nombre');
    const [table, setTable] = useState(1);
    const [products, setProducts] = useState();
    const [qty, setQty] = useState();
    const [price, setPrice] = useState([]);
    const [subtotal, setSubtotal] = useState([]);
    const [no, setNo] = useState(0);
    const [oneListQty, setOneListQty] = useState('');

    /*Autocomplete Variables*/
    const [counter, setCounter] = useState(0);
    const [autocomplete, setAutocomplete] = useState(false);
    const [value, setValue] = useState('');

    /*Inicio*/
    const [start, setStart] = useState(false);

    /*Products POS*/
    const [pos, setPos] = useState('');

    const { id } = useParams();
    const newid = {id};

    /*Get Autocomplete Data*/
    const AutocompleteData = async () => {
        const p = await axios.get('http://192.168.0.10:4000/api/products');
        setAutocomplete(p.data);
    } 

    /*Get One Ticket*/
    const getKitchen = async () => {
        const k = await axios.get('http://192.168.0.10:4000/api/kitchen/' + newid.id);
        setOneKitchen(k.data);
        setQty(k.data.qty);
        setProducts(k.data.products);
        setName(k.data.name);
        setTable(k.data.table);
        setNo(k.data.no);
        repeatedValueFirst(k.data.products, k.data.qty)
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
        await axios.put('http://192.168.0.10:4000/api/kitchen/'+ newid.id,{
            waiter: name,
            table: table,
            qty: qty,
            products: products          
        });
        repeatedValue();
        CloseFunction();
        alert('Actualizado');
    }

    const updateWithoutAlerts = async () => {
        await axios.put('http://192.168.0.10:4000/api/kitchen/'+ newid.id,{
            waiter: name,
            table: table,
            qty: qty,
            products: products          
        });
        repeatedValue();
        window.location.href = 'http://192.168.0.10:3000/editkitchen/' + newid.id ;
    }

    /*Get Pos*/
    const getPos = async () => {
        const p = await axios.get('http://192.168.0.10:4000/api/products');
        setPos(p.data);
    }

    /*Update Qty in pos*/
  const repeatedValue = () => {
    const arr1 = products;
    const arr2 = qty;

    const obj = {};

    arr1.forEach((element, index) => {
        
        if (obj[element]){
            obj[element] = Number(obj[element]) + Number(arr2[index]);
        }else{
            obj[element] = Number(arr2[index]);
        }
    });

    let newArrayProducts = products.filter((nameProduct, index) => {
        return products.indexOf(nameProduct) === index;
    });

    const listQty = {};

    newArrayProducts.forEach((element, index) => {
        listQty[index] = obj[element];
    });

    findProducts(newArrayProducts, listQty);
  }

  const findProducts = (newArrayProducts, listQty) => {
    const posData = pos.map( p => p.product );
    newArrayProducts.forEach((nameProduct, indexOne) => {
        posData.forEach((namePos, indexTwo) => {
            if (nameProduct === namePos){
                const id = pos[indexTwo]._id;
                const qty = pos[indexTwo].quantity;
                return updateQty(id, indexOne, qty, nameProduct, listQty);
            }else if (nameProduct !== namePos){
                return console.log('false')
            }
        });
    });
  }

  const updateQty = async (id, indexOne, qty, nameProduct, listQty) => {
    /*Si son iuales entonces que no haga nada si son diferentes que haga la operación*/
    
    const allLength = Object.keys(listQty).length;
    console.log(allLength);
    for (let i =0; i<allLength; i++){
        if (oneListQty[i] === listQty[i]){
            console.log('nada');
        }else if (oneListQty[i] !== listQty[i]){
            const diff = listQty[i] - oneListQty[i];
            const qtyUpdate = qty - diff;
            if (qtyUpdate >= 0){
                await axios.put('http://192.168.0.10:4000/api/products/'+ id,{
                quantity: qtyUpdate,
                });
            }else if (qtyUpdate < 0){
                alert('Quedan: ' + qty + ' de '  + nameProduct);
            }
        }
    }

  }

  /*First Update Qty in pos*/
  const repeatedValueFirst = (p, q) => {
    const arr1 = p;
    const arr2 = q;

    const obj = {};

    arr1.forEach((element, index) => {
        
        if (obj[element]){
            obj[element] = Number(obj[element]) + Number(arr2[index]);
        }else{
            obj[element] = Number(arr2[index]);
        }
    });

    let newArrayProducts = arr1.filter((nameProduct, index) => {
        return arr1.indexOf(nameProduct) === index;
    });

    const listQty = {};

    newArrayProducts.forEach((element, index) => {
        listQty[index] = obj[element];
    });

    setOneListQty(listQty);
    console.log(listQty);
  }

    /*Create tickets*/
    const createTickets = async () => {
        await axios.post('http://192.168.0.10:4000/api/tickets', {
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
        CloseFunction();
        deleteOneKitchen();
    }

    /*Close Kitchen*/
    const CloseFunction = () => {
        if (no === 1){
            window.location.href="http://192.168.0.10:3000/waiter";
        }else if (no === 2){
            window.location.href="http://192.168.0.10:3000/waiterTwo";
        }else if (no === 3){
            window.location.href="http://192.168.0.10:3000/waiterThree";
        }
    }

    /*Delete Products*/
    const deleteOneKitchen = async () => {
        await axios.delete('http://192.168.0.10:4000/api/kitchen/' + newid.id);
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

  const closeButton = () => {
    repeatedValue();
    CloseFunction();
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
                                                <input 
                                                    className='w-7 border-2 border-black text-center'
                                                    defaultValue={counter} 
                                                    onChange={e => setCounter(e.target.value)}
                                                />
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
            onClick={closeButton}>
                Cerrar
            </button>
            <button className='bg-yellow-500 text-white text-base px-4 py-3 rounded-2xl w-full focus:outline-none'
            onClick={updateKitchen}>
                Actualizar
            </button>
            <button 
                className='bg-green-500 text-white text-base px-4 py-3 rounded-2xl w-full focus:outline-none' 
                onClick={createTickets}
            >
                ENVIAR
            </button>
        </div>
    </div>
</div>
  )
}

export default KitchenEdit
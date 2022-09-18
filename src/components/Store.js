import React from 'react'
import { SearchIcon, PhotographIcon, PlusIcon, TrashIcon} from '@heroicons/react/outline'
import axios from 'axios'
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

const Store = (props) => {
    
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState(null);
    const [repeater,setRepeater]=useState(0);

    /*Cart Data*/
    const [cart, setCart] = useState('');
    const [refreshCart, setRefreshCart] = useState(false);

    /*Filter states*/
    const [categoryFilter, setCategoryFilter] = useState('');
    const [searchBarFilter, setSearchBarFilter] = useState('');

    useEffect(() => {
        getCategoriesData();
        getProductsData();
        getCartData();
    }, []);

    useEffect(() => {
        getCartData();
        setRefreshCart(false);
    }, [refreshCart]);

    useEffect(() => {
        props.changeRefreshQty(false);
        lastQuantityValue();
    }, [props.refreshQty]);

    useEffect(() => {
        getProductsData();
        props.changePro(false);
    }, [props.updateProduct]);

    useEffect(() => {
        getProductsData();
        setTimeout(() => setRepeater(prevState=>prevState+1), 1000);
    }, [repeater])

    /*Get categories*/
    const getCategoriesData = async () => {
        const c = await axios.get('http://192.168.0.10:4000/api/categories');
        setCategory(c.data);
    }

    /*Delete categories*/
    const deleteCategories = async (id) => {
        await axios.delete('http://192.168.0.10:4000/api/categories/' + id);
        getCategoriesData();
    }

    /*Get Products*/
    const getProductsData = async () => {
        const p = await axios.get('http://192.168.0.10:4000/api/products');
        setProducts(p.data);
    } 

    /*Delete Products*/
    const deleteProducts = async (id) => {
        await axios.delete('http://192.168.0.10:4000/api/products/' + id);
        getProductsData();
    }

    /*Get Cart*/
    const getCartData = async () => {
        const a = await axios.get('http://192.168.0.10:4000/api/cart');
        setCart(a.data);
    } 

    /*Create Cart*/
    const newCart = async (id, price, product, qty) =>{
        setRefreshCart(true);
        /*Take all cart data*/
        const array = cart.map (a=> a._id);
        /* Compares ID Value */
        const uno = id;
        /*Compare if the value is repeated in categories*/
        const filteredArray = array.filter(array => array===uno)
        /* If there is 0 products do not add them */
        if(qty === 0){
            console.log('No more food');
        }else{
            /*Repeated Value = Nothing || No Repeated Value = Update */
            if (filteredArray.length===0){
                axios.post('http://192.168.0.10:4000/api/cart', {
                    _id: id,
                    price: price,
                    product: product, 
                    sum: 1,
                    qty: qty,
                })
                updateQtyProduct(id, qty - 1);
            }else if (filteredArray.length > 0){
                console.log('repetido');
            }  
        }
        
    }

    /*Function Qty = Cart - Quantity*/
    const lastQuantityValue = () => {
        /*Take all products data*/
        if (products === null){
            console.log('null products');
        }else{
            const array = products.map (p=> p._id);
            /* Compares ID Value */
            const idCart = props.idValueQty;
            /*Compare if the id is repeated in id_products*/
            const filteredArray = array.filter(array => array===idCart);
            /*If there isn't id: NOTHING | If id_exists: Operation*/
            if (filteredArray.length===0){
                console.log('nada');
            }else{
                const idQty = filteredArray[0];
                const finalQtyValue = props.valueQty - props.sumValue;
                props.changeStopSum(finalQtyValue);
                updateQtyProduct(idQty, finalQtyValue);
            }
        }
                
    }

    /*Update Qyt Product*/
     const updateQtyProduct = async (id, finalQtyValue) => {
        await axios.put('http://192.168.0.10:4000/api/products/' + id, {
                quantity: finalQtyValue,
        });
        getProductsData();
    }

    const buttonProducts = (id, price, product, quantity) => {
        newCart(id, price, product, quantity);
        props.changeRefresh(true);
    }

  return (
    <div className='flex flex-col min-h-full w-full py-4'>
        <div className='flex px-2 flex-row relative'>
            <div className='absolute left-5 top-3 px-2 py-2 rounded-full bg-yellow-500 text-white'>
                <SearchIcon className='h-5 w-5 text-white'/>
            </div>
            <input type="text" placeholder='Busca tus productos...' className='bg-white rounded-3xl shadow text-lg full w-full h-16 py-4 pl-16 transition-shadow focus:shadow-2xl focus:outline-none'
            onChange={(e)=>setSearchBarFilter(e.target.value)}/>
        </div>
        <div className='flex h-16'>
            <h2 className='font-bold h-5 w-full font-sans mt-8 ml-4 text-xl'>Categorías</h2>
            <div className='flex-grow px-8 text-lg py-4 relative'>
                <a href="http://192.168.0.10:3000/pos/createcategory">
                <div className='relative left-3 px-2 py-2 w-11 h-auto rounded-full bg-yellow-500 text-white'>
                    <PlusIcon className='pl-1 h-7 w-6 text-white hover:text-black focus:outline-none cursor-pointer'/>
                </div>
                </a>
            </div>  
        </div>
        <div className='h-auto overflow-hidden mt-4'>
            <div className='h-auto overflow-y-auto px-2'>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 pb-3'>{/* CSS Categories Copy*/}
                    {/* All Categories Button*/}
                    <div className='select-none cursor-pointer overflow-hidden rounded-2xl bg-white' >
                        <div className='px-2 py-7 text-right relative' onClick={() => setCategoryFilter('')}>
                            <PhotographIcon className='h-auto w-auto justify-center -mt-3 transition-shadow shadow hover:shadow-lg'/> {/* Photo*/}
                        </div> 
                        <div className='flex pb-3 px-3 text-sm -mt-3'>
                            <p className='flex-grow truncate mr-1 font-bold font-lg text-center'>Todas las categorias</p>
                        </div>
                    </div> 
                    {/* Categories Mapping*/}
                    {category && category.map(c => 
                    <div className='select-none cursor-pointer overflow-hidden rounded-2xl bg-white space-y-1' key={c._id}>
                    <div className='px-2 py-1 text-right relative'>
                        <button onClick={() => deleteCategories(c._id)}>
                            <TrashIcon className='h-auto w-6 text-black text-blue-gray-300 hover:text-red-500 focus:outline-none mt-1' />
                        </button>
                        {c.categoryImage ?
                            <img 
                                src={'http://192.168.0.10:4000/' + c.categoryImage} 
                                alt="" 
                                className='object-contain h-24 w-48 transition-shadow shadow hover:shadow-lg' 
                                onClick={() => setCategoryFilter(c.category)}
                            />
                        :   <PhotographIcon 
                                className='h-auto w-auto justify-center -mt-3 transition-shadow shadow hover:shadow-lg' 
                                onClick={() => setCategoryFilter(c.category)}
                            /> 
                        }
                    </div> 
                        <div className='flex pb-3 px-3 text-sm -mt-3'>
                            <p className='flex-grow truncate mr-1 font-bold font-lg text-center'>{c.category}</p>
                        </div>
                        <Link to={"/pos/editcategory/" + c._id} >
                            <button className='select-none cursor-pointer transition-shadow overflow-hidden rounded-sm bg-white shadow hover:shadow-lg w-full h-9'>
                                Editar
                            </button>
                        </Link>
                    </div>)} 
                </div>
            </div>
        </div>
        <div className='flex h-16'>
            <h2 className='font-bold h-5 w-full font-sans mt-8 ml-4 text-xl'>Mis productos</h2>
            <div className='flex-grow px-8 text-lg py-4 relative'>
                <a href="http://192.168.0.10:3000/pos/createproduct">
                <div className='relative left-3 px-2 py-2 w-11 h-auto rounded-full bg-yellow-500 text-white'>
                    <PlusIcon className='pl-1 h-7 w-6 text-white hover:text-black focus:outline-none cursor-pointer'/>
                </div>
                </a>
            </div>
        </div>
        <div className='h-auto overflow-hidden mt-4'>
            <div className='h-auto overflow-y-auto px-2 '>
                <div className=' grid grid-cols-2 md:grid-cols-4 gap-4 pb-3'>{/* CSS Products Copy*/}
                {/* Filter Products Mapping*/}  
                {products && products.filter((p)=>{
                    if (categoryFilter==="" && searchBarFilter!==""){
                        if(p.product.toLowerCase().includes(searchBarFilter.toLowerCase())){
                            return p;
                        }
                    }else if(p.category.toLowerCase().includes(categoryFilter.toLowerCase())){
                        if (searchBarFilter!==""){
                            if(p.product.toLowerCase().includes(searchBarFilter.toLowerCase())){
                                return p;
                            }
                        }else {
                            return p;
                        }
                    }
                }).map(p =>            
                    <div className='select-none cursor-pointer overflow-hidden rounded-2xl bg-white space-y-0.5' key={p._id}>
                        <div className='px-2 py-1 text-right relative'>
                            <button onClick={() => deleteProducts(p._id)}>
                                <TrashIcon className='h-auto w-6 text-black text-blue-gray-300 hover:text-red-500 focus:outline-none mt-1'/>
                            </button>
                            {p.productsImage ?
                                <img 
                                    src={'http://192.168.0.10:4000/' + p.productsImage} 
                                    alt="" 
                                    className='object-contain h-24 w-48 transition-shadow shadow hover:shadow-lg' 
                                    onClick={()=> {buttonProducts(p._id, p.price, p.product, p.quantity);}}
                                />
                            :   <PhotographIcon 
                                    className='h-auto w-auto justify-center -mt-3 transition-shadow shadow hover:shadow-lg'
                                    onClick={()=> {buttonProducts(p._id, p.price, p.product, p.quantity);}}
                                /> 
                            } 
                        </div>      
                        <div className='flex pb-3 px-3 text-sm'>
                            <p className='flex-grow truncate mr-1 font-bold font-lg'>{p.product}</p>
                            <p className='nowrap font-semibold'>${p.price}</p>
                        </div>
                        <div className='flex pb-1 px-3 text-sm '>
                            <p className='flex-grow truncate mr-1 font-bold font-lg'>Cantidad</p>
                            <p className='nowrap font-semibold'>{p.quantity}{p.units}</p>
                        </div>
                        <Link to={"/pos/editproduct/" + p._id} >
                            <button className='select-none cursor-pointer transition-shadow overflow-hidden rounded-sm bg-white shadow hover:shadow-lg w-full h-9'> 
                                Editar
                            </button>
                        </Link>
                    </div>)} 
                </div>
            </div>
        </div>
    </div>

    
  )
}

export default Store
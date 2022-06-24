import React from 'react'
import { useState } from 'react'
import LeftSide from './LeftSide'
import RightSide from './RightSide'
import Store from './Store'

const Pos = () => {

  const [refresh, setRefresh] = useState('');
  const [idValueQty, setIdValueQty] = useState('');
  const [sumValue, setSumValue] = useState('');
  const [valueQty, setValueQty] = useState('');
  const [refreshQty, setRefreshQty] = useState(false);
  /*Stop sum*/
  const [stopSum, setStopSum] = useState('');
  /*updateProductData*/
  const [updateProduct, setUpdateProduct] = useState(false);

  return (
    <div className='bg-gray-50 scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-100'>
          <div className='flex flex-col md:flex-row min-h-screen antialiased text-gray-800 bg-gray-50'>
            <LeftSide/>
            <div className='flex-grow flex'>
              <Store changeRefresh={refresh => setRefresh(refresh)} idValueQty={idValueQty} sumValue={sumValue} 
              refreshQty={refreshQty} changeRefreshQty={refreshQty => setRefreshQty(refreshQty)}
              valueQty={valueQty}
              changeStopSum={stopSum => setStopSum(stopSum)}
              updateProduct={updateProduct}
              changePro={updateProduct => setUpdateProduct(updateProduct)}/>          
            </div>
            <RightSide refresh={refresh} changeRefresh={refresh => setRefresh(refresh)} changeIdQty={idValueQty => setIdValueQty(idValueQty)}
            changeSumValue={sumValue => setSumValue(sumValue)}
            changeRefreshQty={refreshQty => setRefreshQty(refreshQty)}
            changeQty={valueQty => setValueQty(valueQty)}
            stopSum={stopSum}
            changePro={updateProduct => setUpdateProduct(updateProduct)}/>
          </div>
      </div>
  )
}

export default Pos
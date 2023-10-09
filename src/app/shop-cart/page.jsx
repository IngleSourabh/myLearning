 
'use client';

import React, { useEffect, useState } from 'react';
import { useCardContext } from '../Context/Store';
import style from './shop.module.scss'


const ShopCard = () => {
 let { selecteditem, setSelectedItem } = useCardContext();
 const[prodprice,setProdPrice]=useState(); 
 const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleTotalPrice=()=>{
    let ans=0;
    selecteditem.map(item=>{
      ans+=item.count*item.price;
    })
    setProdPrice(ans);
  }

  useEffect(()=>{
    handleTotalPrice();
  },[selecteditem])

  const addItemCount = (id) => {
   const incresedAmount=selecteditem.map(item=>{
      if(item.id===id){
        return {...item,count:item.count+1}
      }
      return item;
    }) 
      setSelectedItem(incresedAmount);    
  }; 

  const removeItemCount = (id) => {
    const incresedAmount=selecteditem.map(item=>{
      if(item.id===id){
        let removeIndividualItem=item.count>1?item.count-1:1;

        item.count<1?setButtonDisabled(true):setButtonDisabled(false);
        
        return {...item,count:removeIndividualItem}
      }
      return item;
    }) 
      setSelectedItem(incresedAmount); 
  };

  const removeItem=(id)=>{
    let arr=selecteditem.filter(item=>item.id!==id);
    setSelectedItem(arr);
  }
  
  return (
    <>
      <h2 className={style['selectedcart-title']}>Your Shopping Cart</h2>

      {
        selecteditem.map((item,i)=>{
          const{id,title,price,count}=item;
          return(
            <React.Fragment key={id}>
              <div className={style['selected-item']}>

              <h2 className={style['item-title']} >{title}</h2>
              <p  className={style['item-price']}>{price}</p>
              <div className={style['item-count']}>
                <button disabled={isButtonDisabled} onClick={()=>removeItemCount(id)}>-</button>
                <p>{count}</p>
                <button onClick={()=> addItemCount(id)}>+</button>
              </div>
              <p >item price:{price*count}</p>
              <button onClick={()=>removeItem(id)}>Remove</button>
              </div>
            </React.Fragment>
          )
        })
      }

      <p> Total of all Products : {prodprice} </p>
      
    </>
  );
};

export default ShopCard;

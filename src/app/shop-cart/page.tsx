 
'use client';

import React, { useState } from 'react';
import { useCardContext } from '../Context/Store';
import style from './shop.module.scss'


const ShopCard = () => {
  const { selecteditem, setSelectedItem } = useCardContext();
  

  // const[count,setCount]=useState(1); 

   const countState = selecteditem.map(item => ({
      ...item,
      "count":1, 
    }));

  const clickOn = (id) => {
    // addPropertyToItems();
    let mycount=selecteditem.find(item=>item.id===id);
    setSelectedItem([...selecteditem,...countState]);
    console.log(mycount,'mycount');
    console.log(selecteditem,'selected')
  };

  const deleted = () => {
    // count<=1?setCount(1):setCount(count-1);
    setSelectedItem((e)=>e.slice(0,-1));
  };

  return (
    <>
      <h2>Shopping cart</h2>

      {
        selecteditem.map((item,i)=>{
          // const{title,image,price}=item;
          return(
            <React.Fragment key={i}>
              <div className={style['selected-item']}>

              <h2 className={style['item-title']} >{item.title}</h2>
              <p  className={style['item-price']}>{item.price}</p>
              <div className={style['item-count']}>
                <button onClick={deleted}>-</button>
                <p>{item.count}</p>
                <button onClick={()=>clickOn(item.id)}>+</button>
              </div>
              {/* <p >item price:{itemPrice}</p> */}
              </div>
            </React.Fragment>
            
          )
        })
      }

      <p> Total of all Element :  </p>
      
    </>
  );
};

export default ShopCard;

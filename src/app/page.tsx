'use client';
import React, { useContext, useEffect, useState } from 'react';
import Image from '../../node_modules/next/image';
import style from './page.module.scss'
import { useCardContext, UserContext } from './Context/Store';



// https://fakestoreapi.com/products

export default function Home() {

  const {selecteditem,setSelectedItem} = useCardContext();
 
  const[prod,setProd]=useState<any>([]);

  useEffect(()=>{
    const getFetchData = async ()=>{
      try {
        const res=await fetch('https://fakestoreapi.com/products');
        const data=await res.json();
        setProd(data);
        console.log(data);
      } catch (error) {
        console.log(error)
      }
    }
    getFetchData();
  },[])
    
  return (
     <div className={style['container']}>
       <h2>Hello</h2>

       <div className={style['cardwrap']}>
      {
        prod.map((prod:any)=>{
          return(
            <div className={style.card} key={prod.id}>
              <div className={style['image-wrap']}>
                <Image src={prod.image}
                       alt={prod.title} 
                       fill
                        />
               </div>
               <h3>{prod.title}</h3>
               <p>$: {prod.price}</p>
               <button onClick={()=>setSelectedItem([...selecteditem,prod])}>add To cart</button>
            </div>            
          )
        })
      }
      </div>
     
     </div>
    
  )
}

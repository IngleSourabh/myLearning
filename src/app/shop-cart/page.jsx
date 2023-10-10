"use client";

import React, { useEffect, useState } from "react";
import { useCardContext } from "../Context/Store";
import style from "./shop.module.scss";
import Image from "next/image";

const ShopCard = () => {
  const {
    state: { selecteditem },
    Dispatch,
  } = useCardContext();

  const [prodprice, setProdPrice] = useState();
  const[countItem,setCountItem]=useState(0);

  const handleTotalPrice = () => {
    let ans = 0;
    selecteditem.map((item) => {
      ans += item.count * item.price;
    });
    setProdPrice(ans.toFixed(2));
  };

  const handleTotalCount = ()=>{
    const totalCount = selecteditem.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.count;
    }, 0);
    setCountItem(totalCount);
  }

  useEffect(() => {
    handleTotalCount();
    handleTotalPrice();
  }, [selecteditem]);


  const EmptyCart=()=>{
    return(
       <div className={style['empty-cart']}>
         <h2 className={style['empty-cart-title']}>cart is empty.</h2>
       </div>
    )
  }

  return (
    <>
      <div className="container">
        <h2 className={style["selectedcart-title"]}>Your Shopping Cart</h2>
        <div className={style['total-price']}>
          <p className={style['total-item-price']}>total count of all products : {countItem}</p>
          <p className={style['total-item-price']}> Total prize of all Products : {prodprice} </p>
        </div>

        {
          selecteditem.length>0?
          <div className={style["selected-cart"]}>
            {selecteditem.map((item, i) => {
              const { image, id, title, price, count } = item;
              return (
                <React.Fragment key={id}>
                  <div className={` ${style["selected-item"]}`}>
                    <div className={style["indi-image"]}>
                      <Image src={image} alt={title} width={70} height={40} />
                    </div>
                    <h2 className={style["item-title"]}>{title}</h2>

                    <div className={style["item-count"]}>
                      {/* <button disabled={isButtonDisabled} onClick={()=>removeItemCount(id)}>-</button> */}
                      <button
                        className={`${style["red"]} ${style["count-button"]}`}
                        onClick={() =>
                          Dispatch({ type: "REMOVE_COUNT_CART", payload: id })
                        }
                      >
                        -
                      </button>

                      <p className={style["count"]}>{count}</p>
                      {/* <button onClick={()=> addItemCount(id)}>+</button> */}
                      <button
                        className={`${style["green"]} ${style["count-button"]}`}
                        onClick={() =>
                          Dispatch({ type: "ADD_COUNT_CART", payload: id })
                        }
                      >
                        +
                      </button>
                    </div>
                    <p className={style["count-price"]}>
                      ${(price * count).toFixed(2)}
                    </p>
                    {/* <button onClick={()=>removeItem(id)}>Remove</button> */}
                    <button
                      className={style["remove-item"]}
                      onClick={() =>
                        Dispatch({ type: "REMOVE_ITEM_FROM_CART", payload: id })
                      }
                    >
                      Remove
                    </button>
                  </div>
                </React.Fragment>
              );
            })}
          </div>: <EmptyCart/>
        }

      </div>
    </>
  );
};

export default ShopCard;

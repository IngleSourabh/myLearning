"use client";

import React, { useEffect, useState } from "react";
import Image from "../../node_modules/next/image";
import style from "./page.module.scss";
import { useCardContext, UserContext } from "./Context/Store";
import { setTimeout } from "timers";

export default function Home() {
  const {
    state: { selecteditem },
    Dispatch,
  } = useCardContext();

  const [prod, setProd] = useState<any>([]);
  const [warning, setWarning] = useState<boolean>(false);

  useEffect(() => {
    const getFetchData = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProd(data);
      } catch (error) {
        console.log(error);
      }
    };
    getFetchData();
  }, []);

  const addToCard = (prod: any) => {
    let isPresent = false;
    selecteditem.forEach((item: any) => {
      if (item.id === prod.id) {
        isPresent = true;
      }
    });
    if (isPresent) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 2000);
      return;
    }
    Dispatch({
      type: "ADD_TO_SELECTEDITEM",
      payload: prod,
    });
  };
  return (
    <div className={style["container"]}>

      {warning && (
        <div className={`${style["cart-warning"]}`}>
          <h3 className={style["warning-heading"]}>
            "Already you have added this Product."
          </h3>
        </div>
      )} 

      <div className={style["cardwrap"]}>
        {prod.map((prod: any) => {
          return (
            <div className={style["card"]} key={prod.id}>
              <div className={style["image-wrap"]}>
                <Image src={prod.image} alt={prod.title} fill />
              </div>
              <h3 className={style["card-title"]}>{prod.title}</h3>
              <p className={style["card-item-price"]}>price :${prod.price}</p>
              <button
                className={style["add-button"]}
                onClick={() => addToCard(prod)}
              >
                add To cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// "use client";
// import React, { useContext, useEffect, useState } from "react";
// import Image from "../../node_modules/next/image";
// import style from "./page.module.scss";
// import { useCardContext, UserContext } from "./Context/Store";
// import { setTimeout } from "timers";

// // https://fakestoreapi.com/products

// export default function Home() {
//   const {state:{selecteditem},Dispatch} = useCardContext();

//   const [prod, setProd] = useState<any>([]);
//   const [warning, setWarning] = useState<boolean>(false);

//   useEffect(() => {
//     const getFetchData = async () => {
//       try {
//         const res = await fetch("https://fakestoreapi.com/products");
//         const data = await res.json();
//         setProd(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getFetchData();
//   }, []);

//   const addToCard = (prod: any) => {
//     let isPresent = false;
//     selecteditem.forEach((item: any) => {
//       if (item.id === prod.id) {
//         isPresent = true;
//       }
//     });
//     if (isPresent) {
//       setWarning(true);
//       setTimeout(() => {
//         setWarning(false);
//       }, 2000);
//       return;
//     }
//      Dispatch({
//       type:"ADD_TO_SELECTEDITEM",
//       payload:prod
//      })
   
//      console.log(selecteditem,'selecteditem');
//   };
//   return (
//     <div className={style["container"]}>
//       <h2>Hello</h2>

//       {warning && <h3>Product already exist</h3>}

//       <div className={style["cardwrap"]}>
//         {prod.map((prod: any) => {
//           return (
//             <div className={style.card} key={prod.id}>
//               <div className={style["image-wrap"]}>
//                 <Image src={prod.image} alt={prod.title} fill />
//               </div>
//               <h3>{prod.title}</h3>
//               <p>$: {prod.price}</p>
//               <button onClick={() => addToCard(prod)}>add To cart</button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "../../node_modules/next/image";
import style from "./page.module.scss";
import { useCardContext, UserContext } from "./Context/Store";
import { setTimeout } from "timers";

// https://fakestoreapi.com/products

export default function Home() {
  // const { selecteditem, setSelectedItem } = useCardContext();
  const{state:{selecteditem},Dispatch}=useCardContext();

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
    // ADDING COUNT PROPERTY BY USING USESTATE
    //  let tempItem={...prod,count:1};
    //  setSelectedItem([...selecteditem,tempItem]);

    // ADDING COUNT PROPERTY BY USING USEREDUCER HOOK
    Dispatch({
      type:"ADD_TO_SELECTEDITEM",
      payload:prod,
    })
  };
  return (
    <div className={style["container"]}>
      <h2>Hello</h2>

      {warning && <h3>Product already exist</h3>}

      <div className={style["cardwrap"]}>
        {prod.map((prod: any) => {
          return (
            <div className={style.card} key={prod.id}>
              <div className={style["image-wrap"]}>
                <Image src={prod.image} alt={prod.title} fill />
              </div>
              <h3>{prod.title}</h3>
              <p>$: {prod.price}</p>
              <button onClick={() => addToCard(prod)}>add To cart</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}


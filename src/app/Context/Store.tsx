
// 'use client';

// import { createContext,useContext,useState } from "react";
// import React from 'react';

// type CardProviderProps={
//   children:React.ReactNode;
// }

// export type selectedCard = {
//   count:number;
//   category:string;
//   title:string
//   description:string;
//   id:number;
//   image: string;
//   price:number;
// }[]

// type CardList={
//   selecteditem:selectedCard[];
//   setSelectedItem:React.Dispatch<React.SetStateAction<selectedCard[]>>;
// }

//   export const UserContext=createContext<any | []>([]);

//   export const CardProvider=({children}:CardProviderProps)=>{
//     const[selecteditem,setSelectedItem]=useState<selectedCard[] | []>([]);
//     return(
//       <UserContext.Provider
//       value={{
//         selecteditem,
//         setSelectedItem
//       }}>
//         {children}
//       </UserContext.Provider>
//     )
//   };

//   export const useCardContext=()=>{
//     const context = React.useContext(UserContext);
//     if(!context){
//       throw new Error(
//         " errorr of error"
//       )
//     }
//     return context;
//   }


// This All Using useReducer Hook


'use client';

import { createContext,useContext,useState, useReducer} from "react";
import React from 'react';
import { cartRerducer } from "./cartRerducer";

type CardProviderProps={
  children:React.ReactNode;
}

const initialState={
   selecteditem:[],
}

  export const UserContext=createContext<any | []>([]);

  export const CardProvider=({children}:CardProviderProps)=>{
    const [state,Dispatch]=useReducer(cartRerducer,initialState);
    
    return(
      <UserContext.Provider
      value={{
        state,
        Dispatch
      }}>
        {children}
      </UserContext.Provider>
    )
  };

  export const useCardContext=()=>{
    const context = React.useContext(UserContext);
    if(!context){
      throw new Error(
        " errorr of error"
      )
    }
    return context;
  }






'use client';

import { createContext,useContext,useState } from "react";
import React from 'react';

type CardProviderProps={
  children:React.ReactNode;
}

type selectedCard = {
  count:number;
  category:string;
  title:string
  description:string;
  id:number;
  image: string;
  price:number;
}[]

type CardList={
  selecteditem:selectedCard[];
  setSelectedItem:React.Dispatch<React.SetStateAction<selectedCard[]>>;
}

  export const UserContext=createContext<any | []>([]);

  export const CardProvider=({children}:CardProviderProps)=>{
    const[selecteditem,setSelectedItem]=useState<selectedCard[] | []>([]);
    return(
      <UserContext.Provider
      value={{
        selecteditem,
        setSelectedItem
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



'use client'
import { useCardContext } from '@/app/Context/Store';
import Link from 'next/link';
import { useEffect } from 'react';
import styles  from './header.module.scss';


export default function Header() {

  const{selecteditem}=useCardContext(); 
   let itemcount = selecteditem.length>0? `(${selecteditem.length})`:'';
  
    return (
      <header className={styles.header_container}>
        <nav className={styles.navbar}>
          <ul className={styles.nav_list}>
            <li className={styles.item}><Link className={styles.link} href='/'>Home</Link> </li>
            <li className={styles.item}><Link className={styles.link} href='/shop-cart'>cart {itemcount}</Link> </li>
          </ul>
        </nav>
      </header>
    )
  }
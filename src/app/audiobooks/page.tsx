import styles from "./audiobooks.module.scss"
import Link from "next/link"
import { Metadata } from "next";
export const metadata: Metadata = {
   title: "Audiobooks",
   description: "Bookshop using Google Books API",
 }; 

export default function Audiobooks() {

   return(

      <div className={styles.main}>
         <h2 >Страница в разработке</h2>
         <Link href="/">
         <div>Перейти на главную страницу</div>
         </Link>
      </div>
   )
}
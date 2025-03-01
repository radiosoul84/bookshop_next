import Link from "next/link"

export default function NotFound() {
   return (
     <div className="not-found">
       <h1>404 Not Found</h1>
       <h3>К сожалению, такой страницы не существует.</h3> 
       <Link href="/">Перейти на главную страницу</Link>
     </div>
   )
}
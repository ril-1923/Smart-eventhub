import {createContext,useContext,useEffect,useState,ReactNode} from 'react'
import {Booking} from './types'
export function useLS<T>(k:string,d:T):[T,(v:T)=>void]{const [v,s]=useState<T>(()=>{try{const x=localStorage.getItem(k);return x?JSON.parse(x):d}catch{return d}});useEffect(()=>{localStorage.setItem(k,JSON.stringify(v))},[k,v]);return [v,s]}
const C=createContext<any>(null)
export const useApp=()=>useContext(C)
export function Provider({children}:{children:ReactNode}){
 const [theme,setTheme]=useLS('seh-theme','light')
 const [favs,setFavs]=useLS<number[]>('seh-favs',[])
 const [bookings,setBookings]=useLS<Booking[]>('seh-bookings',[])
 const [user,setUser]=useLS<string|null>('seh-user',null)
 const [toast,setToast]=useState('')
 useEffect(()=>{document.documentElement.setAttribute('data-bs-theme',theme)},[theme])
 const notify=(m:string)=>{setToast(m);setTimeout(()=>setToast(''),2500)}
 const toggleFav=(id:number)=>{const has=favs.includes(id);setFavs(has?favs.filter(f=>f!==id):[...favs,id]);notify(has?'Removed from favorites':'Added to favorites')}
 return <C.Provider value={{theme,setTheme,favs,setFavs,toggleFav,bookings,setBookings,user,setUser,notify}}>{children}{toast&&<div className="toast-box" role="status">{toast}</div>}</C.Provider>}

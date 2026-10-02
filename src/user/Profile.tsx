import {useApp,useLS} from '../context'
import {events,CATEGORIES} from '../data'
import {EventCard} from '../pages'
import {Link} from 'react-router-dom'
export default function Profile(){const {user,bookings,favs,notify}=useApp()
 const [p,setP]=useLS<any>('seh-profile',{name:user||'Demo User',email:'demo@smarteventhub.com',phone:'+91 98765 43210',location:'Chennai',cats:['Technology','Music'],notif:true})
 const s=(k:string)=>(e:any)=>setP({...p,[k]:e.target.value})
 const rec=events.filter(e=>p.cats.includes(e.category)&&e.status!=='Draft').slice(0,3)
 return <div className="container py-4"><div className="d-flex align-items-center gap-3 mb-4"><div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fs-3" style={{width:64,height:64}} aria-hidden>{p.name[0]}</div><div><h1 className="h3 mb-0">{p.name}</h1><small className="text-body-secondary">{p.email}</small></div></div>
 <div className="row g-3 mb-4"><div className="col-6"><Link to="/bookings" className="card text-decoration-none"><div className="card-body">My Bookings: <strong>{bookings.length}</strong></div></Link></div><div className="col-6"><Link to="/favorites" className="card text-decoration-none"><div className="card-body">Favorites: <strong>{favs.length}</strong></div></Link></div></div>
 <h2 className="h5">Account settings</h2><div className="row g-3 mb-3" style={{maxWidth:720}}>{[['name','Name'],['email','Email'],['phone','Phone'],['location','Location']].map(([k,l])=><div key={k} className="col-md-6"><label className="form-label" htmlFor={k}>{l}</label><input id={k} className="form-control" value={p[k]} onChange={s(k)}/></div>)}</div>
 <p className="mb-1">Preferred categories</p>{CATEGORIES.map(c=><div key={c[0]} className="form-check form-check-inline"><input className="form-check-input" type="checkbox" id={'c'+c[0]} checked={p.cats.includes(c[0])} onChange={()=>setP({...p,cats:p.cats.includes(c[0])?p.cats.filter((x:string)=>x!==c[0]):[...p.cats,c[0]]})}/><label className="form-check-label" htmlFor={'c'+c[0]}>{c[0]}</label></div>)}
 <div className="form-check form-switch my-3"><input className="form-check-input" type="checkbox" role="switch" id="nf" checked={p.notif} onChange={()=>setP({...p,notif:!p.notif})}/><label className="form-check-label" htmlFor="nf">Email notifications</label></div>
 <button className="btn btn-primary mb-4" onClick={()=>notify('Profile saved successfully')}>Save preferences</button><h2 className="h5">Recommended for you</h2><div className="row g-4">{rec.map(e=><EventCard key={e.id} e={e}/>)}</div></div>}

import {useState} from 'react'
import {Link} from 'react-router-dom'
import {events,inr} from '../data'
import {useApp,useLS} from '../context'
export function MB(){const {bookings,setBookings,notify}=useApp();const [q,setQ]=useState('');const [s,setS]=useState('')
 const t=(id:number)=>events.find(e=>e.id===id)
 const l=bookings.filter((b:any)=>(!s||b.status===s)&&(b.id+b.name+t(b.eventId)?.title).toLowerCase().includes(q.toLowerCase()))
 const upd=(id:string,st:string)=>{setBookings(bookings.map((b:any)=>b.id===id?{...b,status:st}:b));notify('Booking '+st.toLowerCase())}
 return <div><h1 className="h3">Manage Bookings</h1><div className="row g-2 mb-3"><div className="col-md-8"><input aria-label="Search" className="form-control" placeholder="Search ID, customer, event" value={q} onChange={e=>setQ(e.target.value)}/></div>
 <div className="col-md-4"><select aria-label="Status" className="form-select" value={s} onChange={e=>setS(e.target.value)}><option value="">All statuses</option><option>Upcoming</option><option>Completed</option><option>Cancelled</option></select></div></div>
 {l.length?<div className="table-responsive"><table className="table align-middle"><thead><tr><th>ID</th><th>Customer</th><th>Event</th><th>Date</th><th>Tickets</th><th>Amount</th><th>Status</th><th/></tr></thead><tbody>
 {l.map((b:any)=><tr key={b.id}><td>{b.id}</td><td>{b.name}</td><td>{t(b.eventId)?.title}</td><td>{t(b.eventId)?.date}</td><td>{b.qty} × {b.ticket}</td><td>{inr(b.total)}</td><td>{b.status}</td>
 <td className="text-nowrap"><Link className="btn btn-sm btn-outline-primary me-1" to={`/booking-confirmation/${b.id}`}>View</Link>{b.status==='Upcoming'&&<><button className="btn btn-sm btn-outline-danger me-1" onClick={()=>upd(b.id,'Cancelled')}>Cancel</button><button className="btn btn-sm btn-outline-success" onClick={()=>upd(b.id,'Completed')}>Complete</button></>}</td></tr>)}</tbody></table></div>:<p className="text-body-secondary py-4">No bookings match. Make a booking as the demo user first.</p>}</div>}
const N=['Aarav Kumar','Priya Nair','Rahul Mehta','Sneha Iyer','Karthik Raja','Divya Menon','Arjun Das','Meera Pillai']
export function MU(){const {notify}=useApp()
 const [u,setU]=useLS<any[]>('seh-users',N.map((n,i)=>({id:i,name:n,email:n.split(' ')[0].toLowerCase()+'@mail.com',location:['Chennai','Bengaluru','Mumbai','Delhi'][i%4],joined:`2026-0${1+i%9}-1${i}`,bookings:(i*3)%7,active:true})))
 return <div><h1 className="h3">Manage Users</h1><div className="table-responsive"><table className="table align-middle"><thead><tr><th>Name</th><th>Email</th><th>Location</th><th>Joined</th><th>Bookings</th><th>Status</th><th/></tr></thead><tbody>
 {u.map(x=><tr key={x.id}><td>{x.name}</td><td>{x.email}</td><td>{x.location}</td><td>{x.joined}</td><td>{x.bookings}</td><td><span className={`badge ${x.active?'bg-success':'bg-secondary'}`}>{x.active?'Active':'Inactive'}</span></td>
 <td className="text-nowrap"><button className="btn btn-sm btn-outline-primary me-1" onClick={()=>notify(`${x.name} · ${x.email} · ${x.location}`)}>View</button><button className="btn btn-sm btn-outline-secondary" onClick={()=>{setU(u.map(y=>y.id===x.id?{...y,active:!y.active}:y));notify(x.active?'User deactivated':'User activated')}}>{x.active?'Deactivate':'Activate'}</button></td></tr>)}</tbody></table></div><small className="text-body-secondary">Mock admin data only.</small></div>}
export function Ann(){const {notify}=useApp();const [a,setA]=useLS<any[]>('seh-ann',[]);const [f,setF]=useState<any>({eventId:1,type:'Announcement',message:'',priority:'Normal',publish:''})
 const s=(k:string)=>(e:any)=>setF({...f,[k]:e.target.value})
 return <div><h1 className="h3">Live Announcement Manager</h1><form className="row g-2 mb-4" onSubmit={e=>{e.preventDefault();setA([{id:'a'+Date.now(),...f,eventId:+f.eventId,time:f.publish||new Date().toISOString()},...a]);setF({...f,message:'',publish:''});notify('Announcement published')}}>
 <div className="col-md-6"><select aria-label="Event" className="form-select" value={f.eventId} onChange={s('eventId')}>{events.map(e=><option key={e.id} value={e.id}>{e.title}</option>)}</select></div>
 <div className="col-md-3"><select aria-label="Type" className="form-select" value={f.type} onChange={s('type')}>{['Announcement','Schedule','Venue','Speaker','Weather','Tickets'].map(t=><option key={t}>{t}</option>)}</select></div>
 <div className="col-md-3"><select aria-label="Priority" className="form-select" value={f.priority} onChange={s('priority')}><option>Normal</option><option>High</option></select></div>
 <div className="col-12"><textarea required aria-label="Message" className="form-control" rows={2} placeholder="Message" value={f.message} onChange={s('message')}/></div>
 <div className="col-md-6"><input aria-label="Publish time" type="datetime-local" className="form-control" value={f.publish} onChange={s('publish')}/></div><div className="col-md-6"><button className="btn btn-primary w-100">Publish</button></div></form>
 {a.map(x=><div key={x.id} className="card mb-2"><div className="card-body d-flex justify-content-between"><div><strong>{events.find(e=>e.id===x.eventId)?.title}</strong> <span className="badge bg-primary">{x.type}</span> {x.priority==='High'&&<span className="badge bg-danger">High</span>}<div className="small">{x.message}</div></div><button className="btn btn-sm btn-outline-danger align-self-start" onClick={()=>setA(a.filter(y=>y.id!==x.id))}>Delete</button></div></div>)}</div>}

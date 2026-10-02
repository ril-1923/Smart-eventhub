import {useState} from 'react'
import {Link} from 'react-router-dom'
import {events,inr,saveEvents} from '../data'
import {useApp} from '../context'
export default function ManageEvents(){const {notify}=useApp();const [,f]=useState(0);const [q,setQ]=useState('')
 const re=()=>{saveEvents();f(x=>x+1)}
 return <div><div className="d-flex justify-content-between flex-wrap gap-2 mb-3"><h1 className="h3">Manage Events</h1><Link to="/organizer/events/new" className="btn btn-primary"><i className="bi bi-plus-lg"/> Add event</Link></div>
 <input aria-label="Search events" className="form-control mb-3" placeholder="Search…" value={q} onChange={e=>setQ(e.target.value)}/>
 <div className="table-responsive"><table className="table align-middle"><thead><tr><th>Title</th><th>Category</th><th>Date</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead><tbody>
 {events.filter(e=>e.title.toLowerCase().includes(q.toLowerCase())).map(e=><tr key={e.id}><td>{e.title}</td><td>{e.category}</td><td>{e.date}</td><td>{inr(e.price)}</td>
 <td><span className={`badge ${e.status==='Draft'?'bg-secondary':'bg-success'}`}>{e.status||'Published'}</span></td>
 <td className="text-nowrap"><Link className="btn btn-sm btn-outline-primary me-1" to={`/organizer/events/${e.id}/edit`}>Edit</Link>
 <button className="btn btn-sm btn-outline-secondary me-1" onClick={()=>{e.status=e.status==='Draft'?'Published':'Draft';re();notify(e.status==='Draft'?'Event unpublished':'Event published')}}>{e.status==='Draft'?'Publish':'Unpublish'}</button>
 <button className="btn btn-sm btn-outline-danger" onClick={()=>{if(confirm(`Delete "${e.title}"?`)){events.splice(events.indexOf(e),1);re();notify('Event deleted')}}}>Delete</button></td></tr>)}</tbody></table></div></div>}

import {useState} from 'react'
import {NavLink,Outlet} from 'react-router-dom'
const L=[['/organizer','Dashboard','speedometer2'],['/organizer/events','Manage Events','calendar-event'],['/organizer/bookings','Bookings','receipt'],['/organizer/users','Users','people'],['/organizer/announcements','Announcements','megaphone']]
export default function OrgLayout(){const [open,setOpen]=useState(false)
 return <div className="container-fluid"><button className="btn btn-outline-secondary d-lg-none my-2" onClick={()=>setOpen(!open)}><i className="bi bi-list"/> Organizer menu</button>
 <div className="d-lg-flex"><aside className={`org-side border-end pe-3 py-3 ${open?'':'d-none'} d-lg-block`}><ul className="nav flex-column">{L.map(([p,l,i])=><li key={p}><NavLink end={p==='/organizer'} className="nav-link" to={p} onClick={()=>setOpen(false)}><i className={`bi bi-${i}`}/> {l}</NavLink></li>)}</ul></aside>
 <section className="flex-grow-1 p-lg-4 py-3" style={{minWidth:0}}><Outlet/></section></div></div>}

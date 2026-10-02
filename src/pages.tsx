import {useState} from 'react'
import {Link,useNavigate,useParams,useSearchParams} from 'react-router-dom'
import {useApp} from './context'
import {events,CATEGORIES,TICKETS,inr,aiFind} from './data'
import {Ev} from './types'
export function EventCard({e}:{e:Ev}){const {favs,toggleFav}=useApp()
 return <div className="col-sm-6 col-lg-4"><div className="card h-100 ev-card shadow-sm"><img src={e.image} alt={e.title} className="card-img-top" loading="lazy" onError={x=>{(x.target as HTMLImageElement).style.visibility='hidden'}}/>
 <div className="card-body d-flex flex-column"><span className="badge bg-primary-subtle text-primary-emphasis align-self-start mb-2">{e.category}</span><h3 className="h6">{e.title}</h3>
 <p className="small text-body-secondary mb-2"><i className="bi bi-calendar-event"/> {e.date} · {e.time}<br/><i className="bi bi-geo-alt"/> {e.location}<br/>by {e.organizer}</p>
 <div className="mt-auto d-flex justify-content-between align-items-center"><strong>{inr(e.price)}</strong><div>
 <button aria-label="Favorite" className="btn btn-sm btn-outline-danger me-1" onClick={()=>toggleFav(e.id)}><i className={`bi bi-heart${favs.includes(e.id)?'-fill':''}`}/></button>
 <Link className="btn btn-sm btn-primary" to={`/events/${e.id}`}>View Details</Link></div></div></div></div></div>}
const Grid=({list}:{list:Ev[]})=>list.length?<div className="row g-4">{list.map(e=><EventCard key={e.id} e={e}/>)}</div>:<div className="text-center py-5 text-body-secondary"><i className="bi bi-calendar-x display-4"/><p className="mt-2">No events found.</p></div>
function AIFinder(){const [q,setQ]=useState('');const [res,setRes]=useState<any[]|null>(null)
 const chips=['Find technology events in Chennai','Show music events under ₹2000','Show sports events near Chennai','I want a business workshop this weekend']
 const run=(t:string)=>{setQ(t);setRes(aiFind(t))}
 return <div><form className="input-group mb-2" onSubmit={e=>{e.preventDefault();run(q)}}><input aria-label="Describe your event" className="form-control" value={q} onChange={e=>setQ(e.target.value)} placeholder="I want a technology event in Chennai this weekend under ₹1000"/><button className="btn btn-primary"><i className="bi bi-stars"/> Find</button></form>
 <div className="mb-3">{chips.map(c=><button key={c} className="btn btn-sm btn-outline-primary me-2 mb-2 rounded-pill" onClick={()=>run(c)}>{c}</button>)}</div>
 <p className="small text-body-secondary">Keyword matching runs locally in your browser — no AI service is used.</p>
 {res&&(res.length?res.map(r=><div key={r.e.id} className="card mb-2"><div className="card-body d-flex justify-content-between flex-wrap gap-2"><div><Link to={`/events/${r.e.id}`} className="fw-semibold">{r.e.title}</Link><div className="small">{r.e.category} · {r.e.location} · {r.e.date} · {inr(r.e.price)}</div><div className="small text-success"><i className="bi bi-check-circle"/> Why this matches: {r.why}</div></div></div></div>):<p>No matches — try different keywords.</p>)}</div>}
export const AIPage=()=><div className="container py-5"><h1>AI Event Finder</h1><p className="text-body-secondary">Tell us what you're looking for and we'll find matching events.</p><AIFinder/></div>
export function Home(){const nav=useNavigate();const [q,setQ]=useState('')
 return <><section className="hero"><div className="container"><h1 className="display-5 fw-bold">Discover Events That Match Your World</h1><p className="lead">Discover, book and manage events from one platform.</p>
 <form className="input-group input-group-lg mb-3" style={{maxWidth:640}} onSubmit={e=>{e.preventDefault();nav('/events?q='+encodeURIComponent(q))}}><input aria-label="Search events" className="form-control" placeholder="Search events…" value={q} onChange={e=>setQ(e.target.value)}/><button className="btn btn-warning">Search</button></form>
 {CATEGORIES.slice(0,5).map(c=><Link key={c[0]} to={`/events?cat=${encodeURIComponent(c[0])}`} className="btn btn-sm btn-outline-light me-2 rounded-pill">{c[0]}</Link>)}</div></section>
 <div className="container py-5"><h2 className="mb-3">Featured Events</h2><Grid list={events.filter(e=>e.featured).slice(0,6)}/>
 <h2 className="mt-5 mb-3">Popular Categories</h2><div className="row g-3">{CATEGORIES.map(c=><div key={c[0]} className="col-6 col-md-3"><Link to={`/events?cat=${encodeURIComponent(c[0])}`} className="card text-center text-decoration-none ev-card"><div className="card-body"><i className={`bi bi-${c[1]} fs-2 text-primary`}/><div className="fw-semibold">{c[0]}</div><small className="text-body-secondary">{events.filter(e=>e.category===c[0]).length} events</small></div></Link></div>)}</div>
 <h2 className="mt-5 mb-3">Trending Events</h2><Grid list={events.filter(e=>e.trending).slice(0,3)}/>
 <h2 className="mt-5 mb-3">AI Event Finder</h2><AIFinder/></div></>}
export function Events(){const [sp]=useSearchParams();const [q,setQ]=useState(sp.get('q')||'');const [cat,setCat]=useState(sp.get('cat')||'');const [loc,setLoc]=useState('');const [max,setMax]=useState(5000);const [sort,setSort]=useState('date');const [n,setN]=useState(9)
 let l=events.filter(e=>e.status!=='Draft'&&(!q||(e.title+e.tags.join()).toLowerCase().includes(q.toLowerCase()))&&(!cat||e.category===cat)&&(!loc||e.location===loc)&&e.price<=max)
 l=[...l].sort((a,b)=>sort==='date'?a.date.localeCompare(b.date):sort==='low'?a.price-b.price:sort==='high'?b.price-a.price:b.registered-a.registered)
 return <div className="container py-4"><h1>Events</h1><div className="row g-2 mb-3">
 <div className="col-md-3"><input aria-label="Search" className="form-control" placeholder="Search" value={q} onChange={e=>setQ(e.target.value)}/></div>
 <div className="col-6 col-md-2"><select aria-label="Category" className="form-select" value={cat} onChange={e=>setCat(e.target.value)}><option value="">All categories</option>{CATEGORIES.map(c=><option key={c[0]}>{c[0]}</option>)}</select></div>
 <div className="col-6 col-md-2"><select aria-label="Location" className="form-select" value={loc} onChange={e=>setLoc(e.target.value)}><option value="">All locations</option>{[...new Set(events.map(e=>e.location))].map(c=><option key={c}>{c}</option>)}</select></div>
 <div className="col-6 col-md-3"><label className="small">Max price {inr(max)}</label><input type="range" className="form-range" min={0} max={5000} step={100} value={max} onChange={e=>setMax(+e.target.value)}/></div>
 <div className="col-6 col-md-2"><select aria-label="Sort" className="form-select" value={sort} onChange={e=>setSort(e.target.value)}><option value="date">Date</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option><option value="pop">Popularity</option></select></div></div>
 <p className="text-body-secondary">{l.length} events found</p><Grid list={l.slice(0,n)}/>{n<l.length&&<div className="text-center mt-4"><button className="btn btn-outline-primary" onClick={()=>setN(n+9)}>Load more</button></div>}</div>}
export function Detail(){const {id}=useParams();const e=events.find(x=>x.id===+id!);const {favs,toggleFav,notify}=useApp();const nav=useNavigate();const [t,setT]=useState('General');const [qty,setQty]=useState(1)
 if(!e)return <NotFound/>
 const price=Math.round(e.price*TICKETS[t]),fee=Math.round(price*qty*.05)
 return <div className="container py-4"><img src={e.image} alt={e.title} className="w-100 rounded mb-3" style={{maxHeight:340,objectFit:'cover'}} onError={x=>{(x.target as HTMLImageElement).style.display='none'}}/>
 <div className="row g-4"><div className="col-lg-8"><span className="badge bg-primary">{e.category}</span><h1>{e.title}</h1><p className="text-body-secondary">By {e.organizer} · ★ {e.rating} · {e.registered} attending · {e.capacity-e.registered} seats left</p>
 <p><i className="bi bi-calendar-event"/> {e.date} at {e.time}<br/><i className="bi bi-geo-alt"/> {e.venue}, {e.address}</p><p>{e.description}</p>
 <h2 className="h5">Related events</h2><div className="row g-3">{events.filter(x=>x.category===e.category&&x.id!==e.id).slice(0,3).map(x=><EventCard key={x.id} e={x}/>)}</div></div>
 <div className="col-lg-4"><div className="card"><div className="card-body"><h2 className="h5">Select tickets</h2>
 <select aria-label="Ticket type" className="form-select mb-2" value={t} onChange={x=>setT(x.target.value)}>{Object.keys(TICKETS).map(k=><option key={k} value={k}>{k} — {inr(Math.round(e.price*TICKETS[k]))}</option>)}</select>
 <input aria-label="Quantity" type="number" min={1} max={10} className="form-control mb-3" value={qty} onChange={x=>setQty(Math.max(1,Math.min(10,+x.target.value||1)))}/>
 <div className="small d-flex justify-content-between"><span>Tickets</span><span>{inr(price*qty)}</span></div><div className="small d-flex justify-content-between"><span>Service fee</span><span>{inr(fee)}</span></div>
 <div className="fw-bold d-flex justify-content-between mb-3"><span>Total</span><span>{inr(price*qty+fee)}</span></div>
 <button className="btn btn-primary w-100 mb-2" onClick={()=>nav(`/book/${e.id}?t=${t}&q=${qty}`)}>Book Tickets</button>
 <button className="btn btn-outline-danger w-100 mb-2" onClick={()=>toggleFav(e.id)}>{favs.includes(e.id)?'Remove from favorites':'Add to favorites'}</button>
 <button className="btn btn-outline-secondary w-100" onClick={()=>{navigator.clipboard?.writeText(location.href);notify('Link copied')}}>Share Event</button></div></div></div></div></div>}
export function Book(){const {id}=useParams();const [sp]=useSearchParams();const e=events.find(x=>x.id===+id!);const {bookings,setBookings,notify,user}=useApp();const nav=useNavigate();const [name,setName]=useState('');const [card,setCard]=useState('')
 if(!e)return <NotFound/>
 const t=sp.get('t')||'General',qty=+(sp.get('q')||1),price=Math.round(e.price*(TICKETS[t]||1)),total=price*qty+Math.round(price*qty*.05)
 const submit=(ev:any)=>{ev.preventDefault();const bid='SEH-'+Math.random().toString(36).slice(2,8).toUpperCase()
  setBookings([...bookings,{id:bid,eventId:e.id,ticket:t,qty,total,name,status:'Upcoming',created:new Date().toISOString()}]);notify('Booking confirmed!');nav('/booking-confirmation/'+bid)}
 return <div className="container py-4" style={{maxWidth:640}}><h1 className="h3">Book: {e.title}</h1><p>{qty} × {t} · Total <strong>{inr(total)}</strong></p>
 <form onSubmit={submit}><h2 className="h5">Attendee information</h2><label className="form-label">Full name</label><input required className="form-control mb-3" value={name} onChange={x=>setName(x.target.value)} placeholder={user}/>
 <h2 className="h5">Payment (demo simulation — nothing is stored)</h2><label className="form-label">Cardholder / Card number</label><input required inputMode="numeric" maxLength={19} className="form-control mb-2" placeholder="4242 4242 4242 4242" value={card} onChange={x=>setCard(x.target.value)}/>
 <div className="row g-2 mb-3"><div className="col"><input required className="form-control" placeholder="MM/YY" aria-label="Expiry"/></div><div className="col"><input required className="form-control" placeholder="CVV" maxLength={4} aria-label="CVV"/></div></div>
 <button className="btn btn-primary w-100">Pay {inr(total)}</button></form></div>}
export function Confirmation(){const {id}=useParams();const {bookings}=useApp();const b=bookings.find((x:any)=>x.id===id);const e=b&&events.find(x=>x.id===b.eventId)
 if(!b||!e)return <NotFound/>
 return <div className="container py-5" style={{maxWidth:560}}><h1 className="text-success text-center">Booking Confirmed!</h1><div className="card"><div className="card-body">
 <div className="d-flex justify-content-between"><div><h2 className="h5">{e.title}</h2><p className="small mb-0">ID: <strong>{b.id}</strong><br/>Attendee: {b.name}<br/>{e.date} · {e.time}<br/>{e.venue}<br/>{b.qty} × {b.ticket}<br/>Paid: {inr(b.total)}</p></div><div className="qr" aria-label="QR placeholder"/></div></div></div>
 <div className="d-flex gap-2 mt-3 no-print"><button className="btn btn-primary" onClick={()=>window.print()}>Download / Print Ticket</button><Link className="btn btn-outline-secondary" to="/">Back to Home</Link></div></div>}
export function Bookings(){const {bookings,setBookings,notify}=useApp();const [tab,setTab]=useState('Upcoming');const l=bookings.filter((b:any)=>b.status===tab)
 return <div className="container py-4"><h1>My Bookings</h1><ul className="nav nav-tabs mb-3">{['Upcoming','Completed','Cancelled'].map(s=><li key={s} className="nav-item"><button className={`nav-link ${tab===s?'active':''}`} onClick={()=>setTab(s)}>{s}</button></li>)}</ul>
 {l.length?l.map((b:any)=>{const e=events.find(x=>x.id===b.eventId)!;return <div key={b.id} className="card mb-2"><div className="card-body d-flex justify-content-between flex-wrap gap-2"><div><strong>{e.title}</strong><div className="small">{e.date} · {e.venue} · {b.qty} × {b.ticket} · {b.id}</div></div>
 <div><Link className="btn btn-sm btn-outline-primary me-1" to={`/booking-confirmation/${b.id}`}>View Ticket</Link>{b.status==='Upcoming'&&<button className="btn btn-sm btn-outline-danger" onClick={()=>{if(confirm('Cancel this booking?')){setBookings(bookings.map((x:any)=>x.id===b.id?{...x,status:'Cancelled'}:x));notify('Booking cancelled')}}}>Cancel</button>}</div></div></div>}):<p className="text-body-secondary py-4">No {tab.toLowerCase()} bookings.</p>}</div>}
export function Favorites(){const {favs,setFavs}=useApp();const l=events.filter(e=>favs.includes(e.id))
 return <div className="container py-4"><div className="d-flex justify-content-between"><h1>Favorites</h1>{l.length>0&&<button className="btn btn-outline-danger btn-sm align-self-center" onClick={()=>confirm('Clear all favorites?')&&setFavs([])}>Clear favorites</button>}</div><Grid list={l}/></div>}
export function Login(){const {setUser,notify}=useApp();const nav=useNavigate();const [em,setEm]=useState('demo@smarteventhub.com');const [pw,setPw]=useState('demo123');const [err,setErr]=useState('')
 return <div className="container py-5" style={{maxWidth:420}}><h1 className="h3">Login</h1><p className="small text-body-secondary">Demo: demo@smarteventhub.com / demo123</p>
 <form onSubmit={e=>{e.preventDefault();if(em==='demo@smarteventhub.com'&&pw==='demo123'){setUser('Demo User');notify('Welcome back!');nav('/bookings')}else setErr('Invalid credentials')}}>
 <input aria-label="Email" className="form-control mb-2" value={em} onChange={e=>setEm(e.target.value)}/><input aria-label="Password" type="password" className="form-control mb-2" value={pw} onChange={e=>setPw(e.target.value)}/>{err&&<div className="text-danger small mb-2">{err}</div>}<button className="btn btn-primary w-100">Login</button></form><p className="small mt-3">No account? <Link to="/register">Register</Link></p></div>}
export const NotFound=()=><div className="container py-5 text-center"><h1 className="display-3">404</h1><p>Page not found.</p><Link to="/" className="btn btn-primary">Back to Home</Link></div>

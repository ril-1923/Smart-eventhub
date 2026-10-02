import {Link} from 'react-router-dom'
import {LineChart,Line,BarChart,Bar,PieChart,Pie,Cell,AreaChart,Area,XAxis,YAxis,Tooltip,ResponsiveContainer,CartesianGrid} from 'recharts'
import {events,inr} from '../data'
import {useApp} from '../context'
const M=['Apr','May','Jun','Jul','Aug','Sep']
const reg=M.map((m,i)=>({m,v:[320,410,380,520,610,720][i]}))
const rev=M.map((m,i)=>({m,v:[240,310,290,420,510,610][i]*1000}))
const att=M.map((m,i)=>({m,v:[78,82,75,88,91,94][i]}))
const COL=['#4f46e5','#06b6d4','#f59e0b','#10b981','#ef4444','#8b5cf6','#ec4899','#64748b']
const CC=({t,children}:any)=><div className="col-lg-6"><div className="card h-100"><div className="card-body"><h2 className="h6">{t}</h2><div style={{height:230}}><ResponsiveContainer width="100%" height="100%">{children}</ResponsiveContainer></div></div></div></div>
export default function Dash(){const {bookings}=useApp()
 const regs=events.reduce((s,e)=>s+e.registered,0),revn=events.reduce((s,e)=>s+e.registered*e.price,0)
 const avg=Math.round(events.reduce((s,e)=>s+e.registered/e.capacity,0)/events.length*100)
 const cats=[...new Set(events.map(e=>e.category))].map(c=>({name:c,value:events.filter(e=>e.category===c).length}))
 const stats=[['Total Events',events.length,'calendar-event'],['Registrations',regs.toLocaleString(),'people'],['Revenue',inr(revn),'cash-stack'],['Active Events',events.filter(e=>e.status!=='Draft').length,'lightning'],['Avg Attendance',avg+'%','graph-up']]
 return <div><h1 className="h3 mb-3">Organizer Dashboard</h1>
 <div className="row g-3 mb-4">{stats.map(s=><div key={s[0] as string} className="col-6 col-md-4 col-xl"><div className="card"><div className="card-body"><i className={`bi bi-${s[2]} text-primary`}/><div className="h5 mb-0">{s[1]}</div><small className="text-body-secondary">{s[0]}</small></div></div></div>)}</div>
 <div className="row g-3">
 <CC t="Registration Analytics"><LineChart data={reg}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="m"/><YAxis/><Tooltip/><Line dataKey="v" stroke="#4f46e5" strokeWidth={2}/></LineChart></CC>
 <CC t="Monthly Revenue (₹)"><BarChart data={rev}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="m"/><YAxis/><Tooltip/><Bar dataKey="v" fill="#06b6d4"/></BarChart></CC>
 <CC t="Event Categories"><PieChart><Pie data={cats} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85}>{cats.map((_,i)=><Cell key={i} fill={COL[i%8]}/>)}</Pie><Tooltip/></PieChart></CC>
 <CC t="Attendance (%)"><AreaChart data={att}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="m"/><YAxis/><Tooltip/><Area dataKey="v" stroke="#10b981" fill="#10b98133"/></AreaChart></CC></div>
 <div className="row g-3 mt-1"><div className="col-lg-4"><div className="card h-100"><div className="card-body"><h2 className="h6">Recent bookings</h2>{bookings.length?bookings.slice(-5).reverse().map((b:any)=><div key={b.id} className="small border-bottom py-1">{b.id} · {b.name} · {inr(b.total)}</div>):<p className="small text-body-secondary">No bookings yet.</p>}</div></div></div>
 <div className="col-lg-4"><div className="card h-100"><div className="card-body"><h2 className="h6">Upcoming events</h2>{[...events].sort((a,b)=>a.date.localeCompare(b.date)).slice(0,5).map(e=><div key={e.id} className="small border-bottom py-1"><Link to={`/events/${e.id}`}>{e.title}</Link> · {e.date}</div>)}</div></div></div>
 <div className="col-lg-4"><div className="card h-100"><div className="card-body"><h2 className="h6">Event performance</h2>{[...events].sort((a,b)=>b.registered/b.capacity-a.registered/a.capacity).slice(0,5).map(e=>{const p=Math.round(e.registered/e.capacity*100);return <div key={e.id} className="small mb-2">{e.title}<div className="progress" style={{height:6}}><div className="progress-bar" style={{width:p+'%'}}/></div></div>})}</div></div></div></div></div>}

import {useState} from 'react'
import {useNavigate,useParams} from 'react-router-dom'
import {events,CATEGORIES,saveEvents} from '../data'
import {useApp} from '../context'
export default function EventForm(){const {id}=useParams();const nav=useNavigate();const {notify}=useApp();const ex=events.find(e=>e.id===+id!)
 const [f,setF]=useState<any>(ex||{title:'',description:'',category:'Technology',date:'',time:'10:00',location:'Chennai',venue:'',address:'',price:0,capacity:100,organizer:'Nimbus Events',image:'https://picsum.photos/seed/new/800/500',status:'Published',registered:0,rating:4.5,tags:[],featured:false,trending:false})
 const set=(k:string)=>(e:any)=>setF({...f,[k]:['price','capacity'].includes(k)?+e.target.value:e.target.value})
 const save=(e:any)=>{e.preventDefault();if(ex)events.splice(events.indexOf(ex),1,f);else events.push({...f,id:Math.max(0,...events.map(x=>x.id))+1,address:f.address||f.venue});saveEvents();notify('Event saved successfully');nav('/organizer/events')}
 const F:[string,string,string][]=[['title','Title','text'],['date','Date','date'],['time','Time','time'],['location','Location','text'],['venue','Venue','text'],['price','Price (₹)','number'],['capacity','Capacity','number'],['organizer','Organizer','text'],['image','Image URL','text']]
 return <form onSubmit={save} style={{maxWidth:760}}><h1 className="h3">{ex?'Edit':'New'} event</h1><div className="row g-3">
 {F.map(([k,l,t])=><div key={k} className="col-md-6"><label className="form-label" htmlFor={k}>{l}</label><input id={k} required={k!=='image'} type={t} className="form-control" value={f[k]} onChange={set(k)}/></div>)}
 <div className="col-md-6"><label className="form-label" htmlFor="category">Category</label><select id="category" className="form-select" value={f.category} onChange={set('category')}>{CATEGORIES.map(c=><option key={c[0]}>{c[0]}</option>)}</select></div>
 <div className="col-md-6"><label className="form-label" htmlFor="status">Status</label><select id="status" className="form-select" value={f.status||'Published'} onChange={set('status')}><option>Published</option><option>Draft</option></select></div>
 <div className="col-12"><label className="form-label" htmlFor="description">Description</label><textarea id="description" required rows={4} className="form-control" value={f.description} onChange={set('description')}/></div></div>
 <button className="btn btn-primary mt-3 me-2">Save event</button><button type="button" className="btn btn-outline-secondary mt-3" onClick={()=>nav('/organizer/events')}>Cancel</button></form>}

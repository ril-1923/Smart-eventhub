import {Link,NavLink,Navigate,Route,Routes} from 'react-router-dom'
import {useApp} from './context'
import OrgLayout from './organizer/Layout'
import Dash from './organizer/Dashboard'
import ManageEvents from './organizer/ManageEvents'
import EventForm from './organizer/EventForm'
import {MB,MU,Ann} from './organizer/Admin'
import Live from './user/Live'
import Profile from './user/Profile'
import Register from './user/Register'
import {About,Help} from './user/Static'
import {Home,Events,Detail,Book,Confirmation,Bookings,Favorites,AIPage,Login,NotFound} from './pages'
function Nav(){const {theme,setTheme,user,setUser,notify}=useApp()
 return <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom sticky-top"><div className="container">
 <Link className="navbar-brand fw-bold text-primary" to="/"><i className="bi bi-ticket-perforated"/> Smart EventHub</Link>
 <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nv" aria-label="Menu"><span className="navbar-toggler-icon"/></button>
 <div className="collapse navbar-collapse" id="nv"><ul className="navbar-nav me-auto">
 {[['/events','Events'],['/ai-event-finder','AI Finder'],['/live-updates','Live'],['/favorites','Favorites'],['/organizer','Organizer'],['/bookings','My Bookings']].map(([p,l])=><li key={p} className="nav-item"><NavLink className="nav-link" to={p}>{l}</NavLink></li>)}</ul>
 <button className="btn btn-outline-secondary btn-sm me-2" aria-label="Toggle theme" onClick={()=>setTheme(theme==='dark'?'light':'dark')}><i className={`bi bi-${theme==='dark'?'sun':'moon'}`}/></button>
 {user&&<Link className="btn btn-sm btn-link" to="/profile">Profile</Link>}{user?<button className="btn btn-sm btn-outline-primary" onClick={()=>{setUser(null);notify('Logged out')}}>Logout</button>:<Link className="btn btn-sm btn-primary" to="/login">Login</Link>}
 </div></div></nav>}
const Guard=({children}:any)=>{const {user}=useApp();return user?children:<Navigate to="/login"/>}
export default function App(){return <>
 <Nav/><main style={{minHeight:'70vh'}}><Routes>
 <Route path="/" element={<Home/>}/><Route path="/events" element={<Events/>}/><Route path="/events/:id" element={<Detail/>}/>
 <Route path="/book/:id" element={<Guard><Book/></Guard>}/><Route path="/booking-confirmation/:id" element={<Guard><Confirmation/></Guard>}/>
 <Route path="/bookings" element={<Guard><Bookings/></Guard>}/><Route path="/favorites" element={<Favorites/>}/>
 <Route path="/ai-event-finder" element={<AIPage/>}/><Route path="/login" element={<Login/>}/><Route path="/live-updates" element={<Live/>}/><Route path="/profile" element={<Guard><Profile/></Guard>}/><Route path="/register" element={<Register/>}/><Route path="/about" element={<About/>}/><Route path="/help" element={<Help/>}/><Route path="/404" element={<NotFound/>}/>
 <Route path="/organizer" element={<Guard><OrgLayout/></Guard>}><Route index element={<Dash/>}/><Route path="events" element={<ManageEvents/>}/><Route path="events/new" element={<EventForm/>}/><Route path="events/:id/edit" element={<EventForm/>}/><Route path="bookings" element={<MB/>}/><Route path="users" element={<MU/>}/><Route path="announcements" element={<Ann/>}/></Route>
 <Route path="*" element={<NotFound/>}/></Routes></main>
 <nav className="bottom-nav d-lg-none" aria-label="Quick navigation">{[['/','house','Home'],['/events','search','Events'],['/live-updates','broadcast','Live'],['/bookings','ticket-perforated','Tickets'],['/profile','person','Me']].map(([p,i,l])=><NavLink key={p} to={p}><i className={`bi bi-${i}`}/><small>{l}</small></NavLink>)}</nav>
 <footer className="border-top py-4 mt-5 text-center text-body-secondary small">© 2026 Smart EventHub · Demo project with mock data</footer></>}

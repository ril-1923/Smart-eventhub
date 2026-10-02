import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useApp} from '../context'
export default function Register(){const {setUser,notify}=useApp();const nav=useNavigate();const [n,setN]=useState('')
 return <div className="container py-5" style={{maxWidth:420}}><h1 className="h3">Create account</h1><p className="small text-body-secondary">Demo only — no real account is created.</p>
 <form onSubmit={e=>{e.preventDefault();setUser(n);notify('Account created');nav('/')}}><input required aria-label="Name" className="form-control mb-2" placeholder="Full name" value={n} onChange={e=>setN(e.target.value)}/><input required type="email" aria-label="Email" className="form-control mb-2" placeholder="Email"/><input required type="password" minLength={6} aria-label="Password" className="form-control mb-3" placeholder="Password"/><button className="btn btn-primary w-100">Register</button></form></div>}

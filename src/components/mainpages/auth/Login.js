import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'

export default function Login() {
    const [state, setState] = useState({})
    const { addToast } = useToasts()

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post('/users/login', {...state})

            localStorage.setItem('previousLogin', true)
            
            window.location.href = "/";
        } catch (err) {
            addToast((`Error ${err.response.status}: ${ err.response.data.message || err.response.statusText }` ), { appearance: "error" })
        }
    }
    
    return (
        <div className="center">
            <form className="form" onSubmit={e => handleSubmit(e)}>
                <h1>Login</h1>

                <input type="email" value={state.email} onChange={e => setState({...state, email: e.target.value})} placeholder="Email"/>
                <input type="password" value={state.password} onChange={e => setState({...state, password: e.target.value})} placeholder="Password"/>
                <button className="btn small" type="submit">Login</button>
                
                <p className="subtext" style={{ display: "block" }}>New Here? <Link to="/register" style={{ textDecoration:"underline" }}>Register</Link></p>
            </form>
        </div>
    )
}

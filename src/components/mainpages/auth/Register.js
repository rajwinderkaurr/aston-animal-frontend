import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import axios from 'axios'

export default function Register() {
    const { addToast } = useToasts()
    const [state, setState] = useState({})

    const handleChange = e => {
        console.log("caller", e.target.name, e.target.value)
        setState({...state, [e.target.name]: e.target.value})
    }

    const handleSubmit = async e => {
        e.preventDefault()

        console.log(state.first)
        console.log(state.last)
        state.name = `${state.first} ${state.last}`

        const {first, last, ...toSend} = {...state, name:`${state.first} ${state.last}`}
        console.log("State", toSend)

        try {
            await axios.post('/users/register', {...toSend}).then(res => {
                localStorage.setItem('previousLogin', true)
            
                window.location.href = "/";
            }).catch(err => {
                addToast((`Error ${err.response.status}: ${ err.response.data.message }` ), { appearance: "error" })
            })
        } catch (err) {
            addToast((`Error ${err.response.status}: ${ err.response.data.message }` ), { appearance: "error" })
        }
    }

    return (
        <div className="center">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Register</h1>

                <div className="col-2">
                    <input name="first" onChange={handleChange} value={state.first} type="text" placeholder="First Name"/>
                    <input name="last" onChange={handleChange} value={state.last} type="text" placeholder="Last Name"/>
                </div>

                <input name="email" onChange={handleChange} value={state.email} type="email" placeholder="Email"/>
                <input name="password" onChange={handleChange} value={state.password} type="password" placeholder="Password"/>

                <button className="btn small">Register</button>
                <p className="subtext">Already a user? <Link to="/login" style={{ textDecoration: "underline" }}>Login</Link></p>
            </form>
        </div>
    )
}

import React from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
    return (
        <div className="center">
            <form className="form">
                <h1>Register</h1>
                <div className="col-2">
                    <input type="text" placeholder="First Name"/>
                    <input type="text" placeholder="Last Name"/>
                </div>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <button className="btn small">Register</button>
                <p className="subtext">Already a user? <Link to="/login" style={{ textDecoration: "underline" }}>Login</Link></p>
            </form>
        </div>
    )
}

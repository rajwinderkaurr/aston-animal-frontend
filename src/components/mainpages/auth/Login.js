import React from 'react'
import Form from '../../forms/Form'
import { Link } from 'react-router-dom'

export default function Login() {
    return (
        <div className="center">
            <Form>
                <h1>Login</h1>
                <input type="text" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <button className="btn small">Login</button>
                <p className="subtext" style={{ display: "block" }}>New Here? <Link to="/register" style={{ textDecoration:"underline" }}>Register</Link></p>
            </Form>
        </div>
    )
}

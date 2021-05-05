// import React, { createContext } from 'react'
import React from 'react'

import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/images/Logo.svg';
import './header.css'
// import axios from 'axios'

export default function Header() {
    const isAdmin = false
    const isLoggedIn = false
    const adminRouter = () => {
        return (
            <>
                <Link to="/add_animal">Add Animal</Link>
                <Link to="/categories">Categories</Link>
                <Link to="/requests">Requests</Link>
            </>
        )
    }
    const commonRouter = () => {
        return (
            <>
                <Link to="/">Explore</Link>
                <Link to="/adoptions">Adoptions</Link>
            </>
        )
    }

    return (
        <header>
            <Link to="/"><Logo style={{marginTop: "-1ow 0px"}}/></Link>
            <nav className="right">
                { isAdmin && adminRouter() }
                { commonRouter() }
                { isLoggedIn ? <Link to="/profile">User</Link> : <Link to="/login">Login | Register</Link> }
            </nav>
        </header>
    )
}

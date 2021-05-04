import React, { createContext } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/images/Logo.svg';
import './header.css'
import axios from 'axios'

export default function Header() {
    return (
        <header>
            <Logo style={{width: "250px"}}/>
            <div className="right"></div>
        </header>
    )
}

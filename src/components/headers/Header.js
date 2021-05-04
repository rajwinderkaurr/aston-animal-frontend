// import React, { createContext } from 'react'
import React from 'react'

import {} from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/images/Logo.svg';
import './header.css'
// import axios from 'axios'

export default function Header() {
    return (
        <header>
            <Logo style={{width: "250px"}}/>
            <div className="right"></div>
        </header>
    )
}

import React from 'react'
import './form.css'

export default function Form({ children }) {
    return (
        <form class="form">
            { children }
        </form>
    )
}

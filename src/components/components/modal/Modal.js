import React, { useState } from 'react'
import { X } from 'react-bootstrap-icons'
import './modal.css'

export default function Modal({ title, children }) {
    const [ modalIsOpen, setModalIsOpen ] = useState(true)
    const closeModal = () => {
        setModalIsOpen(false)
    }

    const modal = () => {
        return (
            <div className="modal" onClick={closeModal}>
                <div className="form modal-container" onClick="">
                    <h3>{title}</h3>
                    <div className="modal-header">
                        <X />
                    </div>
                    <div className="modal-content">
                        {children}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            { modalIsOpen ? modal() : <></>}
        </>
    )
}

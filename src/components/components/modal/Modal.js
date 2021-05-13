import React, { useState } from 'react'
import { X } from 'react-bootstrap-icons'
import './modal.css'

export default function Modal({ title, children, onClose }) {
    const [ modalIsOpen, setModalIsOpen ] = useState(true)

    const closeModal = () => {
        setModalIsOpen(false)
        onClose()
    }

    const Modal = () => {
        return (
            <div className="modal">
                <div className="form modal-container">
                    <div className="modal-header">
                        <h3>{title}</h3>
                        <X className="close-icon" style={{}} onClick={closeModal}/>
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
            { modalIsOpen ? <Modal /> : <></>}
        </>
    )
}

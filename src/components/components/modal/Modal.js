import React, { useState, useEffect } from 'react'
import { X } from 'react-bootstrap-icons'
import './modal.css'

export default function Modal({ title, children, onClose }) {
    const [ modalIsOpen, setModalIsOpen ] = useState(true)

    useEffect(() => {
        document.getElementsByTagName('body')[0].style.overflow = 'hidden'
    }, [modalIsOpen])

    const closeModal = () => {
        setModalIsOpen(false)
        document.getElementsByTagName('body')[0].style.overflow = 'visible'
        onClose()
    }

    const modal = () => {
        return (
            <div className="modal">
                <div className="form modal-container" onClick="">
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
            { modalIsOpen ? modal() : <></>}
        </>
    )
}

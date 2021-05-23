import React, { useContext, useState } from 'react'
import './adoptionComponent.css'
import { Trash, CheckCircleFill, XCircleFill } from 'react-bootstrap-icons'
import { useToasts } from 'react-toast-notifications'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import NotFound from '../../mainpages/utils/notFound/NotFound'
import Modal from '../../components/modal/Modal'
import axios from 'axios'
import moment from 'moment'

export default function AdoptionComponent({animal, requester, allower, adoption, index, isPublic }) {
    const state = useContext(GlobalState)
    const [isUserMessageModalOpen, setIsUserMessageModalOpen] = useState(false)
    const [ token ] = state.token
    const [isAdmin] = state.userAPI.isAdmin
    const refresh = state.refresh
    const {addToast} = useToasts()
    const { _id: animalId, name, breed, dob, images, category } = animal
    const { _id, updatedAt, createdAt, status, allowerMessage: reason, userMessage } = adoption

    let requesterName
    if (isPublic) {
        requesterName = requester.name
    }
    
    // Allower name
    let by
    if (allower) by  = allower.name


    const handleDelete = () => {
        axios.delete(`/api/adoption/${_id}`, {
            headers: {Authorization: token}
        }).then(res => {
            addToast(`Deleted Adoption for ${name}`, { appearance: "success"})
            refresh()
        }).catch(err => {
            addToast((`Error ${err.response.status}: ${ err.response.data.message || err.response.statusText }` ), { appearance: "error" })
        })
    }
    const handleStatusChange = (id, status) => {
        axios.put(`api/adoption/${id}`, {
            status,
            ...(status === 0 && {allowerMessage: ""})
        }, {
            headers: {Authorization: token}
        }).then(res => {
            addToast("Status Changed. An email has been sent as well...", {appearance: "success"})
            refresh()
        }).catch(err => addToast((`Error ${err.response.status}: ${ err.response.data.message || err.response.statusText }` ), { appearance: "error" }))
    }

    if (!images || images.length === 0) return <NotFound />

    const Adoptions = () => {
        return (
            <div className="adoption" key={_id}>
                <Link to={`/animals/${animalId}`} className="left-side">
                    <img src={images[0].url} alt={name}/>
                </Link>
                <div className="right-side">
                    <div className="absolute-delete">
                        {isAdmin && status === 0? (
                            <>
                                <button onClick={() => handleStatusChange(_id, 1)}>
                                    <CheckCircleFill />
                                </button>
                                <button onClick={() => handleStatusChange(_id, 2)}>
                                    <XCircleFill />
                                </button>
                            </>
                        ) : (!isPublic && status === 0) && (
                            <button onClick={handleDelete}>
                                <Trash />
                            </button>
                        )}
                    </div>
                        <h3>Status</h3>
                        <h1 style={{ textTransform: "capitalize" }}>{
                            {
                                0: "Pending 🙄",
                                1: "Approved 😊",
                                2: "Rejected 😔"
                            }[status]
                        }</h1>
                        <h2>{name}</h2>
                        <h4>{ `${breed} ${category}・${moment(dob).fromNow().replace(' ago', '')} old` }</h4>
                    <hr/>
                        <h2>
                            {status=== 0 ?  "Waiting for Approval" : `By ${by}・${moment(updatedAt).fromNow()}`}
                        </h2>
                        <h4>
                        {
                            isPublic? `Requested by ${requesterName}` :{
                                0: "You will recieve a mail when the status changes",
                                1: `Let us know how’s your life with ${name.split(" ")[0]} is going...`,
                                2: `Reason: ${reason}`
                            }[status]
                        }
                        </h4>
                        <h5>Request { {0: "Raised", 1: "Approved", 2: "Rejcted"}[status]}: {moment(createdAt).format("MMMM Do, YYYY・hh:mm a ")}</h5>
                        <span style={{textDecoration: "underline", cursor: "pointer"}} onClick={() => setIsUserMessageModalOpen(true)}>User Message</span>
                        { isUserMessageModalOpen && (
                            <Modal onClose={() => setIsUserMessageModalOpen(false)} title="User Message" >
                                <p style={{textAlign: "left"}}>
                                    <strong>{requesterName}</strong> says:<br />
                                </p>
                                <blockquote >{ userMessage }</blockquote>
                            </Modal>
                        ) }
            </div>
        </div>
        )
    }
    return (
        <>
            <Adoptions /> 
        </>
    )
}

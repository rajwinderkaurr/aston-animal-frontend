import React, { useContext } from 'react'
import './adoptionComponent.css'
import { Trash } from 'react-bootstrap-icons'
import { useToasts } from 'react-toast-notifications'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'
import moment from 'moment'

export default function AdoptionComponent({animal, requester, allower, adoption, index }) {
    const state = useContext(GlobalState)
    const [ token ] = state.token
    const refresh = state.refresh
    const {addToast} = useToasts()
    const { _id: animalId, name, breed, dob, images, category } = animal
    const { _id, updatedAt, createdAt, status, allowerMessage: reason } = adoption
    
    // Allower name
    let by
    if (allower) by  = allower.name


    const handleDelete = () => {
        axios.delete(`/api/adoption/${_id}`, {
            headers: {Authorization: token}
        }).then(res => {
            addToast("Deleted Animal", { appearance: "success"})
            refresh()
        }).catch(err => {
            addToast((`Error ${err.response.status}: ${ err.response.data.message || err.response.statusText }` ), { appearance: "error" })
        })
    }

    if (!images || images.length === 0) return <h1>No return</h1>

    const Adoptions = () => {
        return (
            <div className="adoption" key={_id}>
                <Link to={`/animals/${animalId}`} className="left-side">
                    <img src={images[0].url} alt={name}/>
                </Link>
                <div className="right-side">
                    {status === 0 && (
                        <button onClick={handleDelete} className="absolute-delete">
                            <Trash />
                        </button>
                    )}
                        <h3>Status</h3>
                        <h1 style={{ textTransform: "capitalize" }}>{
                            {
                                0: "Pending 🙄",
                                1: `Approved 😊`,
                                2: `Rejected 😔`
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
                            {
                                0: "You will recieve a mail when the status changes",
                                1: `Let us know how’s your life with ${name.split(" ")[0]} is going...`,
                                2: `Reason: ${reason}`
                            }[status]
                        }
                        </h4>
                        <h5>Request { {0: "Raised", 1: "Approved", 2: "Rejcted"}[status]}: {moment(createdAt).format("MMMM Do, YYYY・hh:mm a ")}</h5>
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

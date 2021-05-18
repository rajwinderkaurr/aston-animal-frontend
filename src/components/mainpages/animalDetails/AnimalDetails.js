import React, { useState, useEffect, useContext, useRef } from 'react'
import { useParams } from 'react-router-dom'
import './animalDetails.css'
import AnimalsGrid from '../../components/animalsGrid/AnimalsGrid'
import axios from 'axios'
import moment from 'moment'
import Loading from '../utils/loading/Loading'
import Modal from '../../components/modal/Modal'
import { useToasts } from 'react-toast-notifications'
import { GlobalState } from '../../../GlobalState'


export default function AnimalDetails() {
    const params = useParams()
    const state = useContext(GlobalState)
    const { addToast } = useToasts()

    const [isAdmin] = state.userAPI.isAdmin
    const [isLogged] = state.userAPI.isLogged
    const [token] = state.token
    const [animals] = state.animalsAPI.animals
    const refresh = state.refresh

    // const [adoptAnimal] = state.userAPI.adoptAnimal
    
    const [detailss, setDetailss] = useState({images: [], initial: true})
    const [isConfirmDelete, setIsConfirmDelete] = useState(false)
    const [isConfirmAdopt, setIsConfirmAdopt] = useState(false)
    const [activeImage, setActiveimage] = useState(detailss.images[0])
    const [isLoading, setIsLoading] = useState(true)
    const textarea = useRef(null)
    const relatedAnimals = animals.filter(animal => (String(animal.category) === String(detailss.category) && String(animal._id) !== String(params.id)))

    
    useEffect(() => {
        if (!detailss.initial) {
            setIsLoading(false)
            setActiveimage(detailss.images[0].url)
        }
    }, [detailss])

    useEffect(() => {
        const getAnimalDetails = async () => {
            try {
                    axios.get(`/api/animals/single/${params.id}`).then(res => {
                        if (res.status === 200) {
                            setDetailss({...res.data.rawAnimal, adoptions: res.data.adoptions, initial: false })
                        }
                    }).catch(err => {
                        addToast((`Error ${err.response.status}: ${ err.response.data.message || err.response.statusText }` ), { appearance: "error" })
                    })
            } catch (error) {
                console.error("Error: ", error)
            }
        }
        getAnimalDetails()
    }, [params, addToast])

    const handlePress = () => {
        if (!isLogged) return addToast("Please Login before raising adoption", {appearance: 'warning'})
        if (isAdmin) return addToast("Admins cannot adopt animals", {appearance: 'warning'})
        setIsConfirmAdopt(true)
    }

    const handleDelete = () => {
        if (!isLogged) return addToast("Please login before deleting", {appearance: 'warning'})
        if (!isAdmin) return addToast("You don't have admin rights", {appearance: 'warning'})

        confirmDelete()
    }

    const confirmDelete = () => {
        setIsConfirmDelete(true)
    }

    const handleAdoptionSubmit = async e => {
        e.preventDefault()
        setIsConfirmAdopt(false)
        await axios.post('/api/adoption', {userMessage: textarea.current.value, animalId: params.id}, {
            headers: {
                Authorization: token
            }
        }).then(res => {
            addToast("Adoption request posted. You will recieve an e-mail (on registered email) when the status changes", {appearance: "success"})
            refresh()
        }).catch(err => addToast((`Error ${err.response.status}: ${ err.response.data.message || err.response.statusText }` ), { appearance: "error" }))
    }

    const animalDetailsComponent = () => {
        return (
            <>
                <div className="top">
                    <div className="left-side">
                        <div className="img-main">
                            <img src={activeImage} alt={ detailss.name }/>
                        </div>
                        <div className="extra-images">
                            {
                                detailss.images.map(img => {
                                    return (
                                        <div key={img.public_id} className="extra-image" onClick={() => setActiveimage( img.url )}>
                                            <img src={img.url} alt={ detailss.name }/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="right-side">
                        <h3>{`${detailss.breed} ${detailss.category}・Born on ${moment(detailss.dob).format("MMMM Do, YYYY")}`}</h3>
                        <h1>{detailss.name}</h1>
                        {
                            isAdmin ? <button className="btn" onClick={handleDelete}>Delete</button> : 
                            detailss.isAdopted? <button className="btn" title="Animal adopted out :)" disabled>Raise Adoption Request</button> :
                            <button className="btn" onClick={() => handlePress()}>Raise Adoption Request</button>
                        }
                        <h3>{
                            !detailss.isAdopted && `${detailss.adoptions} waiting in queue to adopt this ${detailss.category}`
                        }</h3>
                        <hr/>
                        <h2>About Me</h2>
                        <p>{detailss.description}</p>
                    </div>
                </div>
                <div className="bottom">
                    {relatedAnimals.length > 0 && (
                        <>
                            <hr/>
                            <h1>My friends</h1>
                            <AnimalsGrid animals={relatedAnimals}  />
                        </>
                    )}
                </div>
            </>
        )
    }

    return (
        <div className="animal-details">
            { isConfirmDelete && <Modal title="Confirm delete" onClose={() => setIsConfirmDelete(false)}>
                <h2>Do you really want to snatch {detailss.name} off adoption 👉🥺👈?</h2>
                <div className="col-2">
                    <button className="btn">Yes</button>
                    <button className="btn btn-outline" onClick={() => setIsConfirmDelete(false)}>No</button>
                </div>
            </Modal> }
            { isConfirmAdopt && <Modal title="Confirm Adoption" onClose={() => {
                setIsConfirmAdopt(false)
            }}>
                <h2>Generate adoption request..</h2>
                <textarea key="jsakdfjkdsa" name="user_message" placeholder="Write a request message..." rows="10" ref={textarea} style={{marginBottom: "20px", width: "100%"}}/>
                <button className="btn" onClick={handleAdoptionSubmit}>Post Request</button>
            </Modal> }
            { isLoading? <Loading /> : animalDetailsComponent() }
        </div>
    )
}

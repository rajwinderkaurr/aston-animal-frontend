import React, { useState, useEffect, useContext } from 'react'
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
    // const [adoptAnimal] = state.userAPI.adoptAnimal
    
    const [detailss, setDetailss] = useState({images: [], initial: true})
    const [isConfirmDelete, setIsConfirmDelete] = useState(false)
    const [isConfirmAdopt, setIsConfirmAdopt] = useState(false)
    const [activeImage, setActiveimage] = useState(detailss.images[0])
    const [isLoading, setIsLoading] = useState(true)
    const [adoptFormState, setAdoptFormState] = useState({})

    
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

    const handleChange = e => {
        setAdoptFormState({...adoptFormState, [e.target.name]: e.target.value})
    }

    const confirmDelete = () => {
        setIsConfirmDelete(true)
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
                        {isAdmin? <button className="btn" onClick={handleDelete}>Delete</button>:<button className="btn" onClick={() => handlePress()}>Raise Adoption Request</button>}
                        <h3>{detailss.adoptions} waiting in queue to adopt this {detailss.category}</h3>
                        <hr/>
                        <h2>About Me</h2>
                        <p>{detailss.description}</p>
                    </div>
                </div>
                <div className="bottom">
                    <hr/>
                    <h1>My friends</h1>
                    <AnimalsGrid  />
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
            { isConfirmAdopt && <Modal title="Confirm Adoption" onClose={() => setIsConfirmAdopt(false)}>
                <h2>Generate adoption request..</h2>
                <textarea name="user_message" placeholder="Write a request message..." style={{width: "100%"}} rows="10" onChange={handleChange} value={adoptFormState.user_message} />
            </Modal> }
            { isLoading? <Loading /> : animalDetailsComponent() }
        </div>
    )
}

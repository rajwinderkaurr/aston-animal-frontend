import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './animalDetails.css'
import AnimalsGrid from '../../components/animalsGrid/AnimalsGrid'
import axios from 'axios'
import moment from 'moment'
import Loading from '../../../components/components/loading/Loading'
import { useToasts } from 'react-toast-notifications'


export default function AnimalDetails() {
    const { addToast } = useToasts()
    const params = useParams()
    const [detailss, setDetailss] = useState({images: [], initial: true})
    const [activeImage, setActiveimage] = useState(detailss.images[0])
    const [isLoading, setIsLoading] = useState(true)

    
    useEffect(() => {
        if (!detailss.initial) {
            setIsLoading(false)
            setActiveimage(detailss.images[0])
        }
    }, [detailss])

    useEffect(() => {
        const getAnimalDetails = async () => {
            try {
                    axios.get(`/api/animals/single/${params.id}`).then(res => {
                        console.log("response:", res)
                        setDetailss({...res.data.rawAnimal, adoptions: res.data.adoptions, initial: false })
                    }).catch(err => {
                        console.log("error", err.response)
                        addToast((`Error ${err.response.status}: ${ err.response.data.message }` ), { appearance: "error" })
                    })
            } catch (error) {
                console.error("Error: ", error)
            }
            
        }
        getAnimalDetails()
    }, [params, addToast])

    const handlePress = () => {
        console.log("Hey guys")
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
                                        <div className="extra-image" onClick={() => setActiveimage( img )}>
                                            <img src={img} alt={ detailss.name }/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="right-side">
                        <h3>{`${detailss.breed} ${detailss.category}・${moment(detailss.dob).fromNow().replace(' ago', '')} old`}</h3>
                        <h1>{detailss.name}</h1>
                        <button className="btn" onClick={() => handlePress()}>Raise Adoption Request</button>
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
            { isLoading? <Loading /> : animalDetailsComponent() }
        </div>
    )
}

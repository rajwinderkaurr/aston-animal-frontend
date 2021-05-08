import React, { useEffect, useState } from 'react'
import InfoBoxBW from '../infoBox/InfoBoxBW'
import moment from 'moment'
import Loading from '../loading/Loading'
import './animalsGrid.css'
import axios from 'axios'
import { useToasts } from 'react-toast-notifications'

export default function AnimalsGrid(props) {
    const { addToast } = useToasts()
    const [isLoading, setLoading] = useState(true);
    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        axios.get("/api/animals").then(response => {
            setAnimals(response.data)
            setLoading(false)
        }).catch(err => {
            addToast((`Error ${err.response.status}: ${ err.response.data.message || err.response.statusText }` ), { appearance: "error" })
        })
    }, [addToast]);

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="animals-grid">
            {animals.map(animal => {
                return (
                    <InfoBoxBW 
                        key={animal._id}
                        id={animal._id}
                        name={animal.name}
                        images={animal.images}
                        description={animal.description}
                        age={moment(animal.dob).fromNow().replace(' ago', '')} breed={animal.breed}
                        category={animal.category} 
                    />
                )
            })}
        </div>
    )
}

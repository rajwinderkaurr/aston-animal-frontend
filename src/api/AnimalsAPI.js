import { useEffect, useState } from 'react'
import axios from 'axios'

export default function AnimalsAPI() {
    const [animals, setAnimals] = useState([])

    useEffect(() => {
        axios.get("/api/animals").then(res => {
            setAnimals(res.data)
        }).catch(err => {
            alert(`Error ${err.response.status}: ${ err.response.data.message || err.response.statusText }` )
        })
    }, []);

    return (
        { animals: [animals, setAnimals] }
    )
}

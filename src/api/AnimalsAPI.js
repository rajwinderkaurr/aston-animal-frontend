import { useEffect, useState } from 'react'
import axios from 'axios'

export default function AnimalsAPI() {
    const [animals, setAnimals] = useState([])

    const getAnimals = async () => {
        const res = await axios.get('/api/animals')

        setAnimals(res)
    }

    useEffect(() => {
        getAnimals()
    }, [])

    return (
        { animals: [animals, setAnimals] }
    )
}

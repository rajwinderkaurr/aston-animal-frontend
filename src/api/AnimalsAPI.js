import { useEffect } from 'react'
import axios from 'axios'

export default function AnimalsAPI() {
    // const [animals, setAnimals] = useState([])


    const getAnimals = async () => {
        const res = await axios.get('/api/animals')

        console.log(res)
    }

    useEffect(() => {
        getAnimals()
    }, [])

}

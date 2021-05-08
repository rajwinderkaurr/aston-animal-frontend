// import { useEffect, useState } from 'react'
// import axios from 'axios'

// export default function AnimalsAPI() {
//     const [animals, setAnimals] = useState({data: []})

//     const getAnimals = async () => {
//         axios.get('/api/animals').then(res => {
//             setAnimals(res.data)
//         }).catch(err => {
//             setAnimals({ error: err.response })
//         })
//     }

//     useEffect(() => {
//         getAnimals()
//     }, [])

//     return (
//         { animals: [animals, setAnimals] }
//     )
// }

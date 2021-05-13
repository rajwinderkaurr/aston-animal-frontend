import React, { useContext } from 'react'
import AnimalsGrid from '../../components/animalsGrid/AnimalsGrid'
import { GlobalState } from '../../../GlobalState'
import Loading from '../../mainpages/utils/loading/Loading'

export default function Home() {
    const state = useContext(GlobalState)
    const [animals] = state.animalsAPI.animals

    const unAdoptedAnimals = animals.filter(animal => (String(animal.isAdopted) === String(false)))
    const adoptedAnimals = animals.filter(animal => (String(animal.isAdopted) === String(true)))

    return (
        <div>
            {animals.length === 0? <Loading />:
                <>
                    <h1>Animals in need of help</h1>
                    <AnimalsGrid animals={
                        unAdoptedAnimals
                    }/>
                    <h1>Previously Adopted Animals</h1>
                    <AnimalsGrid animals={
                        adoptedAnimals
                    }/>
                </>
            }
        </div>
    )
}

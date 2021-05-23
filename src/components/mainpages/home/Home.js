import React, { useContext, useEffect, useState } from 'react'
import AnimalsGrid from '../../components/animalsGrid/AnimalsGrid'
import { GlobalState } from '../../../GlobalState'
import Loading from '../../mainpages/utils/loading/Loading'
import NotFound from '../../mainpages/utils/notFound/NotFound'
import _ from "lodash";

export default function Home() {
    const state = useContext(GlobalState)
    const [sourceAnimals] = state.animalsAPI.animals
    const [animals, setAnimals] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
      // Search function
    if (!searchTerm) return setAnimals(sourceAnimals);
    setAnimals(
        _.filter(sourceAnimals, ({ name }) => {
            // Advanced Search (checks if serach term and match have all characters in common)
            return [...searchTerm.toLowerCase()].every((char) => {
                return [...name.toLowerCase()].includes(char);
            });
        })
    );
    }, [searchTerm, sourceAnimals]);

    if (animals.length === 0) return (
        <div className="relative">
            <input autoFocus type="text" className="inp absolute r-0 -mt-6" placeholder="Search For Animals" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            <NotFound />
        </div>
    )


    const unAdoptedAnimals = animals.filter(animal => (String(animal.isAdopted) === String(false)))
    const adoptedAnimals = animals.filter(animal => (String(animal.isAdopted) === String(true)))

    return (
        <div>
            {animals.length === 0? <Loading />:
                <>
                    <div className="flex justify-between relative">
                        <h1>Animals in need of help</h1>
                        <input type="text" className="inp absolute r-0 -mt-6" placeholder="Search for animal by name" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} autoFocus />
                    </div>
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

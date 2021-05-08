import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import InfoBoxBW from '../infoBox/InfoBoxBW'
import moment from 'moment'
import Loading from '../loading/Loading'
import './animalsGrid.css'

export default function AnimalsGrid(props) {
    const state = useContext(GlobalState)
    if (state.animalsAPI.animals[0].length === 0) return <Loading />

    const animals = state.animalsAPI.animals[0].data

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

import React, { useContext } from 'react'
import InfoBoxBW from '../infoBox/InfoBoxBW'
import moment from 'moment'
import Loading from '../../mainpages/utils/loading/Loading'
import './animalsGrid.css'
import { GlobalState } from '../../../GlobalState'
// import { useToasts } from 'react-toast-notifications'

export default function AnimalsGrid(props) {
    // const { addToast } = useToasts()
    const state = useContext(GlobalState)

    const [animals] = state.animalsAPI.animals


    if (animals.length === 0) {
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

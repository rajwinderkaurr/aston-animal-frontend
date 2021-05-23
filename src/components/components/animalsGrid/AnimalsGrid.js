import React from 'react'
import InfoBoxBW from '../infoBox/InfoBoxBW'
import moment from 'moment'
import './animalsGrid.css'
import NotFound from '../../mainpages/utils/notFound/NotFound'

export default function AnimalsGrid({animals}) {
    // const { addToast } = useToasts()
    if (!animals) return <NotFound />

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

import React from 'react'
import InfoBoxBW from '../infoBox/InfoBoxBW'
import './animalsGrid.css'

export default function AnimalsGrid({animals}) {
    return (
        <div className="animals-grid">
            {animals.map(animal => {
                return (
                    <InfoBoxBW 
                        id={animal.id}
                        name={animal.name}
                        image_url={animal.image_url}
                        description={animal.description}
                        age={animal.age} breed={animal.breed}
                        category={animal.category} 
                    />
                )
            })}
        </div>
    )
}

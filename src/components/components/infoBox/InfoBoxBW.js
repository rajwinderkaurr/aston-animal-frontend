import React from 'react'
import { Link } from 'react-router-dom'
import './infoBoxBW.css'

export default function InfoBoxBW({ id, name, image_url, description, age, breed, category }) {
    return (
        <Link to={`/animals/${id}`} className="info-box-bw">
            <img src={image_url} alt={name + "'s image"}/>
            <div className="else">
                <div className="part-2">
                    <h2>{name}</h2>
                    <p>{ `${breed} ${category}・${age} year(s) old` }</p>
                </div>
                <div className="part-3">
                    <h3>Description</h3>
                    <p>{description}</p>
                </div>
            </div>
        </Link>
    )
}

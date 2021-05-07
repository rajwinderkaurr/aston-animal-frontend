import React from 'react'
import { Link } from 'react-router-dom'
import './infoBoxBW.css'

export default function InfoBoxBW({ id, name, images, description, age, breed, category }) {
    return (
        <Link to={`/animals/${id}`} className="info-box-bw">
            <div style={{display: "flex", justifyContent:"center"}}>
                <img src={images.slice(0,1)} alt={name + "'s image"}/>
            </div>
            <div className="else">
                <div className="part-2">
                    <h2>{name}</h2>
                    <p>{ `${breed} ${category}・${age} old` }</p>
                </div>
                <div className="part-3">
                    <h3>Description</h3>
                    <p>{description}</p>
                </div>
            </div>
        </Link>
    )
}

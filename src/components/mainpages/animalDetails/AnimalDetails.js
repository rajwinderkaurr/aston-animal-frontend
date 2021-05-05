import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import './animalDetails.css'
import AnimalsGrid from '../../components/animalsGrid/AnimalsGrid'

import {animals} from '../home/Home'


const details = {
    id: "jkhdsfjkds",
    name: "Bluffy Bluff",
    images: [
        "https://media.npr.org/assets/img/2017/04/25/istock-115796521-fcf434f36d3d0865301cdcb9c996cfd80578ca99.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/3/36/Funambulus_palmarum_%28Bengaluru%29.jpg",
        "https://images.theconversation.com/files/334473/original/file-20200512-82357-11i5o76.jpg?ixlib=rb-1.1.0&rect=4%2C130%2C2987%2C1491&q=45&auto=format&w=1356&h=668&fit=crop",
    ] ,
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa quam maiores inventore illum nihil ut quas quia adipisci, ducimus facilis consequatur? Vel repellendus explicabo suscipit aut id harum itaque laboriosam, quibusdam illo voluptatum nisi minima eveniet minus molestias, tempore officia nostrum sapiente cupiditate error! Corporis, expedita repellendus commodi ab omnis dolorem ad explicabo id et quidem nisi in voluptatum deleniti adipisci culpa ipsam porro est sit sed quibusdam? Quo quas asperiores tenetur vitae deserunt nam aliquid ad impedit culpa animi. Rem, expedita. Nam laborum sint necessitatibus, aspernatur molestias, cum totam ipsa iste at dicta maxime. Ratione ut deleniti vitae eos?" ,
    age: 5,
    breed: "Iranion",
    category: "Squirrel",
    adopted: 35
}

export default function AnimalDetails() {
    const params = useParams()
    const id = params.id
    const [imageURL, setImageURL] = useState(details.images.slice(0,1))
    console.log(id)

    const handlePress = () => {
        console.log("Hey guys")
    }

    return (
        <div className="animal-details">
            <div className="top">
                <div className="left-side">
                    <div className="img-main">
                        <img src={imageURL} alt={ details.name }/>
                    </div>
                    <div className="extra-images">
                
                            {
                                details.images.map(img => {
                                    return (
                                        <div className="extra-image" onClick={() => setImageURL( img )}>
                                            <img src={img} alt={ details.name }/>
                                        </div>
                                    )
                                })
                            }
                    </div>
                </div>
                <div className="right-side">
                    <h3>{`${details.breed} ${details.category}・${details.age} year(s) old`}</h3>
                    <h1>{details.name}</h1>
                    <button className="btn" onClick={() => handlePress()}>Raise Adoption Request</button>
                    <h3>{details.adopted} people already adopted these {details.category.toLowerCase()}s</h3>
                    <hr/>
                    <h2>About Me</h2>
                    <p>{details.description}</p>
                </div>
            </div>
            <div className="bottom">
                <hr/>
                <h1>My friends</h1>
                <AnimalsGrid animals={animals} />
            </div>
        </div>
    )
}

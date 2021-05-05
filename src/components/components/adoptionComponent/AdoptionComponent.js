import React from 'react'
import './adoptionComponent.css'

const requests = [
    {
        name: "Cocoa Cokani",
        breed: "Brazilian",
        age: 5,
        category: "Rabbit",
        status: "pending",
        images: ["https://media.npr.org/assets/img/2017/04/25/istock-115796521-fcf434f36d3d0865301cdcb9c996cfd80578ca99.jpg"]
    }
]

export default function AdoptionComponent() {

    const adoptions = requests.map(request => {
        return (
            <div className="adoption">
            <div className="left-side">
                <img src={request.images.slice(0, 1)} alt={request.name}/>
            </div>
            <div className="right-side">
                <div className="absolute-delete">
                    {/* Bootstrap Icon here */}
                </div>
                <h3>Status</h3>
                <h1>{request.status}</h1>

            </div>
            </div>
        )
    })
    return (
        {adoptions}
    )
}

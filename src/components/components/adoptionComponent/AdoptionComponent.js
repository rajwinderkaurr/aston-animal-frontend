import React from 'react'
import './adoptionComponent.css'
import { Trash } from 'react-bootstrap-icons'

const requests = [
    {
        _id: "jkhsadfjkjkqwe324df",
        name: "Cocoa Cokani",
        breed: "Brazilian",
        age: 5,
        category: "Rabbit",
        status: "pending",
        updated_at: "16 January, 2021",
        images: ["https://media.npr.org/assets/img/2017/04/25/istock-115796521-fcf434f36d3d0865301cdcb9c996cfd80578ca99.jpg"],
    },
    {
        _id: "asdiod8qwhf8ashdufhew",
        name: "Cocoa Cokani",
        breed: "Brazilian",
        age: 5,
        category: "Rabbit",
        status: "approved",
        by: "Nancy Drew",
        updated_at: "12 January, 2020",
        images: ["https://media.npr.org/assets/img/2017/04/25/istock-115796521-fcf434f36d3d0865301cdcb9c996cfd80578ca99.jpg"],
    },
    {
        _id: "sdh5urwhf34q4ui3tr",
        name: "Cocoa Cokani",
        breed: "Brazilian",
        age: 5,
        category: "Rabbit",
        status: "rejected",
        by: "Nancy Drew",
        updated_at: "12 January, 2020",
        images: ["https://media.npr.org/assets/img/2017/04/25/istock-115796521-fcf434f36d3d0865301cdcb9c996cfd80578ca99.jpg"],
        reason: "Not so happy"
    }
]
export default function AdoptionComponent() {

    const handleDelete = () => {
        console.log("deleted")
    }

    console.log(requests)
    const adoptions = requests.map(request => {
        return (
            <div className="adoption" key={request._id}>
                <div className="left-side">
                    <img src={request.images.slice(0, 1)} alt={request.name}/>
                </div>
                <div className="right-side">
                    {request.status === "pending" && (
                        <button onClick={handleDelete} className="absolute-delete">
                            <Trash />
                        </button>
                    )}
                        <h3>Status</h3>
                        <h1 style={{ textTransform: "capitalize" }}>{request.status}</h1>
                        <h2>{request.name}</h2>
                        <h4>{ `${request.breed} ${request.category}・${request.age} old` }</h4>
                    <hr/>
                        <h2>
                            {request.status!== "pending"? `By ${request.by}・${request.updated_at}`: "Waiting for Approval"}
                        </h2>
                        <h4>
                        {
                            {
                            'pending': "You will recieve a mail when the status changes",
                            'approved': `Let us know how’s your life with ${request.name.split(" ")[0]} is going...`,
                            'rejected': `Reason: ${request.reason}`
                            }[request.status]
                        }
                        </h4>
                        <h5>Request { {"pending": "Raised", "approved": "Approved", "rejected": "Reejcted"}[request.status]}: {request.updated_at}</h5>
            </div>
        </div>
        )
    })
    return (
        <>
            {adoptions}
        </>
    )
}

import React from 'react'
import AnimalsGrid from '../../components/animalsGrid/AnimalsGrid'

export const animals = [
    {
        id: "jkhdsfjkds",
        name: "Bluffy Bluff",
        image_url: "https://media.npr.org/assets/img/2017/04/25/istock-115796521-fcf434f36d3d0865301cdcb9c996cfd80578ca99.jpg" ,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam placerat luctus lacus, id feugiat dolor dictum a. Vestibulum..." ,
        age: 5,
        breed: "Iranion",
        category: "Squirrel"
    },
    {
        id: "jkhdsfjkds",
        name: "Bluffy Bluff",
        image_url: "https://media.npr.org/assets/img/2017/04/25/istock-115796521-fcf434f36d3d0865301cdcb9c996cfd80578ca99.jpg" ,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam placerat luctus lacus, id feugiat dolor dictum a. Vestibulum..." ,
        age: 5,
        breed: "Iranion",
        category: "Squirrel"
    },
    {
        id: "jkhdsfjkds",
        name: "Bluffy Bluff",
        image_url: "https://media.npr.org/assets/img/2017/04/25/istock-115796521-fcf434f36d3d0865301cdcb9c996cfd80578ca99.jpg" ,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam placerat luctus lacus, id feugiat dolor dictum a. Vestibulum..." ,
        age: 5,
        breed: "Iranion",
        category: "Squirrel"
    },
    {
        id: "jkhdsfjkds",
        name: "Bluffy Bluff",
        image_url: "https://media.npr.org/assets/img/2017/04/25/istock-115796521-fcf434f36d3d0865301cdcb9c996cfd80578ca99.jpg" ,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam placerat luctus lacus, id feugiat dolor dictum a. Vestibulum..." ,
        age: 5,
        breed: "Iranion",
        category: "Squirrel"
    }
]

export default function Home() {
    return (
        <div>
            <h1>Animals in need of help</h1>
            <AnimalsGrid animals={animals}/>
        </div>
    )
}

import axios from 'axios';
import React, { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import { useToasts } from 'react-toast-notifications'
import DatePicker from 'react-datepicker'
import Loading from '../utils/loading/Loading'
import 'react-datepicker/dist/react-datepicker.css'

// Sample Form data for testing
// const initialState = {
//     "name": "Robinson Hutkins",
//     "breed": "African",
//     "category": "rabbit",
//     "dob": new Date(),
//     "description": "Hey, I'm a cute little rabbit with many super-rabbit powers. However, I was seperated from my family this month, and worse of all, lost my job during th lockdown. I now have a college student loan of $100,000. I am completely homeless and need your help. help me please 👉🥺👈"
// }

export default function AddAnimal() {
    const { addToast } = useToasts()
    const state = useContext(GlobalState)
    const [animal, setAnimal] = useState({})
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)

    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    let toAdd = []

    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return addToast("You're not an admin", {appearance: 'error'})
            

            Array.from(e.target.files).forEach(async file => {
                if(!file) return addToast("File does not exist.", {appearance: 'error'})

                if(file.size > 1024 * 1024) // 1mb
                    return addToast(`Size of ${file.name} too large! Upload less than 1 mb`, {appearance: 'error'})

                if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                    return addToast(`File format for ${file.name} is incorrect. Upload .jpeg or .png, got ${file.type}`, {appearance: 'error'})

                let formData = new FormData()
                formData.append('file', file)

                setLoading(true)
                await axios.post('/api/upload', formData, {
                    headers: {'content-type': 'multipart/form-data', Authorization: token}
                }).then(res => {
                    toAdd = [...toAdd, res.data]
                    setImages(toAdd)
                }).catch(err => addToast(`Error ${err.response.status}: ${ err.response.data.message || err.response.statusText }`, {appearance: "error"} ))
                setLoading(false)
            })

        } catch (err) {
            // addToast(`Error ${err.response.status}: ${ err.response.data.message || err.response.statusText }` )
            alert(err)
        }
    }

    const handleChange = e => {
        setAnimal({...animal, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (images.length === 0) return addToast("At least 1 photo of the animal is required.", {appearance: "warning"})
        const toPost = {...animal, dob: animal.dob, images}
        axios.post("/api/animals", toPost, {
            headers: { Authorization: token }
        }).then(res => {
            addToast("Added the animal successfully", {appearance: "success"})
        }).catch(err => {
            addToast(`Error ${err.response.status}: ${ err.response.data.message || err.response.statusText }`, {appearance: "error"})
        })
        
    }

const handleDestroy = async (image) => {
        try {
            if(!isAdmin) return alert("You're not an admin")
            setLoading(true)
            await axios.post('/api/destroy', {public_id: image.public_id}, {
                headers: {Authorization: token}
            }).catch()
            setLoading(false)
            setImages(images.filter((img) => {return img.public_id === image.public_id}))
        } catch (err) {
            addToast(`Error ${err.response.status}: ${ err.response.data.message || err.response.statusText }` )
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }
    return (
        <div className="center">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Add Animal</h1>
                <input onChange={handleChange} value={animal.name} name="name" type="text" placeholder="Name" />
                <div className="col-2">
                    <input onChange={handleChange} value={animal.breed} name="breed" type="text" placeholder="Breed" />  
                    <input onChange={handleChange} value={animal.category} name="category" type="text" placeholder="Category" />
                </div>
                <DatePicker selected={animal.dob} onChange={(date) => setAnimal({...animal, dob: date})} style={{width: "100%"}} placeholder="Date Of Birth"/>
                <textarea onChange={handleChange} value={animal.description} name="description" type="text" placeholder="Description" />
                <input type="file" name="file" id="file_up" onChange={handleUpload} multiple/>
                {
                    images.map(image =>{
                        return (loading ? <div id="file_img"><Loading /></div>

                        :<div id="file_img" style={styleUpload}>
                            <img src={image ? image.url : ''} style={{width: "100%"}} alt=""/>
                            <span onClick={() => handleDestroy(image)}>X</span>
                        </div>)
                    })
                }
                <button className="btn small">Submit</button>
            </form>
        </div>
    )
}

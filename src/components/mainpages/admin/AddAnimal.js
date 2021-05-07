import axios from 'axios';
import React, { useState } from 'react'
import { useToasts } from 'react-toast-notifications'

export default function AddAnimal() {
    const { addToast } = useToasts()
    const [state, setState] = useState({ name: "", breed: "", "category": "", description: "", images: "" })
    
    function upload(file, onUploadProgress) {
        let formData = new FormData();
    
        formData.append("file", file);
    
        return axios.post("/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // addToast(state, {appearance: 'warning', autoDismiss: true})
        console.log(state)
    }

    const fileUpload = e => {
        setState({...state, [e.target.name]: e.target.files})

    }

    return (
        <div className="center">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Add Animal</h1>
                <input onChange={e => setState({...state, [e.target.name]: e.target.value})} value={state.name} name="name" type="text" placeholder="Name" />
                <div className="col-2">
                    <input onChange={e => setState({...state, [e.target.name]: e.target.value})} value={state.breed} name="breed" type="text" placeholder="Breed" />  
                    <input onChange={e => setState({...state, [e.target.name]: e.target.value})} value={state.category} name="category" type="text" placeholder="Category" />
                </div>
                <input name="images" type="file" onChange={fileUpload}/>
                <button className="btn small">Submit</button>
            </form>
        </div>
    )
}

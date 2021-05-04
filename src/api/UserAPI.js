import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function UserAPI(token) {

    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    const getUser = async () => {
        try {
            const res = await axios.get('/user/infor', {
                headers: { Authorization: token }
            })

            setIsLogged(true)
            res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        if (token) {
            getUser()
        }
    }, [token])

    return {
        isLogged: [ isLogged, setIsLogged ],
        isAdmin: [ isAdmin, setIsAdmin ]
    }
}

